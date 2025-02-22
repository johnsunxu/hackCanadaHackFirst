from pymongo import MongoClient

client = MongoClient("mongodb+srv://jasontran2134:y9kSSG40xcK1oyZp@cluster0.z2ry0.mongodb.net/?ssl=true")
db = client["Cluster0"]
collection = db["users"]

def insert_or_update_user(username, uncompleted_goals, completed_goals, distance_scrolled, time_spent):
    collection.update_one(
        {"username": username},
        {
            "$set": {"uncompleted_goals": uncompleted_goals,
                     "completed_goals": completed_goals},  # Update goals if changed
            "$inc": {
                "distance_scrolled": distance_scrolled,
                "time_spent_on_social_media_today": time_spent
            }
        },
        upsert=True  # If user doesn't exist, create a new one
    )
    print(f"User {username} updated or inserted.")

# insert_or_update_user("jason", ["Read 10 pages", "Do 50 pushups"], 550, 35)
user = collection.find_one({"username": "jason"})
if user:
    print(user)
else:
    print("User not found.")

