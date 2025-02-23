from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb+srv://jasontran2134:y9kSSG40xcK1oyZp@cluster0.z2ry0.mongodb.net/?ssl=true")
db = client["Cluster0"]
collection = db["users"]

def initialize_object(email, password, goals=None):
    if goals is None:
        goals = [] 

    if collection.find_one({"email": email}):
        print("User already exists")
        return
    
    user_data = {
        "email": email,
        "password": password,
        "goals": goals,
        "distance_scrolled": 0,
        "time_spent_on_social_media_today": 0,
        "friends": []

    }

    result = collection.insert_one(user_data)
    print(f"User {email} initialized!")
    return result

def increment_data(email, distance_scrolled, time_spent):
    print('incrementing', email, distance_scrolled, time_spent)
    result = collection.update_one(
        {"email": email},
        {
            "$inc": {
                "distance_scrolled": distance_scrolled,
                "time_spent_on_social_media_today": time_spent
            },
        },
        upsert=True  # If user doesn't exist, create a new one
    )
    print(f"User {email} updated")
    return result

@app.route('/initialize_user', methods=['POST'])
def initialize_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email:
        return jsonify({"error": "Username is required"}), 404
    
    result = initialize_object(email, password)

    if result.matched_count == 0:
        return jsonify({"message": "user successfully initialized!"}), 200
    return jsonify({"error", "username is taken"}), 404

@app.route('/increment_user', methods=['POST'])
def update_user():
    try: 
        # print('got here')
        data = request.get_json()
        email = data.get('email')
        distance_scrolled = data.get('distance_scrolled')
        time_spent = data.get('time_spent')

        if not email:
            return jsonify({"error": "Username is required"}), 400
        # print('before increment')
        result = increment_data(email, distance_scrolled, time_spent)

        if result.matched_count == 0:
            return jsonify({"error": "User not found"}), 404
        return jsonify({"message": "sucessfully updated user"}), 200
    except Exception as e: 
        print('excepting', e)
        return jsonify({"error": e}), 404

@app.route('/get_goals', methods=['GET'])
def get_goals():
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "email field required"}), 404
    user = collection.find_one({"email": email}, {"_id": 0, "goals": 1})
    if not user:
        return jsonify({"error": "email not found"}), 404
    goals = user.get('goals', [])
    return jsonify({"email": email, "goals": goals}), 200

@app.route('/todo', methods=['POST', 'DELETE'])
def manage_tools():
    print("post or deleting")
    data = request.get_json()
    email = data.get("email")
    todo_item = data.get("todo_item")

    if not email or not todo_item:
        return jsonify({"error": "email and todo item are required"}), 404
    
    user = collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "email not found"}), 404
    
    if request.method == 'POST':
        result = collection.update_one(
            {"email": email},
            {"$addToSet": {"goals": todo_item}}
        )

        if result.modified_count > 0:
            return jsonify({"message": "item successfully added to goals list"}), 200
        else:
            return jsonify({"error": "todo item already in goals list"}), 404
        
    elif request.method == 'DELETE':
        result = collection.update_one(
            {"email": email},
            {"$pull": {"goals": todo_item}}
        )

        if result.modified_count > 0:
            return jsonify({"message": "item successfully delete from goals list"}), 200
        else:
            return jsonify({"error": "todo item not found in goals list"}), 404

@app.route('/get_user_info', methods=['GET'])
def get_user_info():
    email = request.args.get("email")
    if not email:
        return jsonify({"error": "email is required"}), 404
    
    user = collection.find_one(
        {"email": email},
        {"_id": 0, "distance_scrolled": 1, "time_spent_on_social_media": 1}
    )

    if not user:
        return jsonify({"error": "user not found"}), 404
    return jsonify(user), 200

if __name__ == "__main__":
    app.run(debug=True)


# initialize_user("jason", "jasontran2134@gmail.com", "123456")