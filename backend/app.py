from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os


app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + os.path.join(basedir, "cards.db")


# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite///cards.db"  
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)  
frontend_folder = os.path.join(os.getcwd(),"..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

# @app.route("/", defaults={"filename": ""})
# @app.route("/<path:filename>")
# def index(filename):
#     if not filename:
#         filename = "index.html"
#     return send_from_directory(dist_folder, filename)

import routes

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug = True)