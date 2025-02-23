import ollama
import requests
from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb+srv://jasontran2134:y9kSSG40xcK1oyZp@cluster0.z2ry0.mongodb.net/?ssl=true")
db = client["Cluster0"]
collection = db["users"]

def generate_insult(goals):

    selected_goals = goals[:3]
    goals_text = "\n".join([f"- {goal}" for goal in selected_goals])

    response = ollama.chat(model="mistral", messages=[
        {"role": "system", "content": "You are a motivator who insults the user for not completing their tasks in a humorous but slightly harsh way. Keep it brief—only 2-3 sentences."},
        {"role": "user", "content": f"I haven't done these tasks today:\n{goals_text}\nGive me an insult, but keep it to 2-3 sentences max!"}
    ])

    return response['message']['content']

@app.route('/generate_insult', methods=['GET'])
def insult_user():
    email = request.args.get('email')
    
    if not email:
        return jsonify({"error": "email parameter is required"}), 400

    user = collection.find_one({"email": email}, {"_id": 0, "goals": 1})

    if not user or "goals" not in user:
        return jsonify({"error": "No goals found for this user"}), 404

    goals = user["goals"]
    
    insult = generate_insult(goals)

    return jsonify({"insult": insult})

if __name__ == '__main__':
    app.run(debug=True)
