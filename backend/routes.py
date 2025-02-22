from app import app, db
from flask import request, jsonify
from flask_cors import CORS
from models import Card

CORS(app) 

@app.route('/toDo', methods=['GET'])
def get_cards():
    cards = Card.query.all()
    res = [card.to_json() for card in cards]
    return jsonify(res)

@app.route('/toDo', methods=['POST'])
def create_cards():
    try:
        data = request.json
        
        required_fields = ["title", "description"]
        for i in required_fields:
            if i not in data or not data.get(i):
                return jsonify({"error":f"Missing field: {i}"}),400
        
        title = data.get('title')
        description = data.get('description')
        due_date = data.get('due_date')
        status = data.get('status')
        
        new_Card = Card(title=title, description=description, due_date=due_date, status=status)
        db.session.add(new_Card)
        db.session.commit()
        
        return jsonify(new_Card.to_json()),201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}),500

@app.route('/toDo/<int:id>', methods=['DELETE'])
def delete_card(id):
    try:
        card = Card.query.get(id)
        if card is None:
            return jsonify({"error":"Card not available"}), 404
        
        db.session.delete(card)
        db.session.commit()
        return jsonify({"message":"Card deleted"}),200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}),500
  
@app.route('/toDo/<int:id>', methods=['PATCH'])
def update_card(id):
    try:
        card = Card.query.get(id)
        if card is None:
            return jsonify({"error": "Card not available"}), 404
        
        data = request.json
        card.title = data.get("title", card.title)
        card.description = data.get("description", card.description)
        card.due_date = data.get("due_date", card.due_date)
        card.status = data.get("status", card.status)

        db.session.commit()
        return jsonify(card.to_json()), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500