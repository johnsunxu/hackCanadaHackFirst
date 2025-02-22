from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb+srv://jasontran2134:y9kSSG40xcK1oyZp@cluster0.z2ry0.mongodb.net/?ssl=true")
db = client["Cluster0"]
collection = db["users"]

def initialize_user(email, password, goals=None):
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
        "time_spent_on_social_media_today": 0

    }

    collection.insert_one(user_data)
    print(f"User {email} initialized!")

def increment_data(email, distance_scrolled, time_spent, friends):
    result = collection.update_one(
        {"email": email},
        {
            "$inc": {
                "distance_scrolled": distance_scrolled,
                "time_spent_on_social_media_today": time_spent
            },
            "$set":{
                "friends": friends
            }
        },
        upsert=True  # If user doesn't exist, create a new one
    )
    print(f"User {email} updated")
    return result

@app.route('/increment_user', methods=['POST'])
def update_user():
    data = request.get_json()
    email = data.get('email')
    distance_scrolled = data.get('distance_scrolled')
    time_spent = data.get('time_spent')

    if not email:
        return jsonify({"error": "Username is required"}), 400
    
    result = increment_data(email, distance_scrolled, time_spent)

    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "sucessfully updated user"}), 200

if __name__ == "__main__":
    app.run(debug=True)


initialize_user("jason", "jasontran2134@gmail.com", "123456")