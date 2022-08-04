from flask_cors import CORS
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os


# CONFIG
app = Flask(__name__)



app.secret_key = os.getenv('SESSION_KEY')

CORS(app)

# DATABASE  
basedir = os.path.dirname(os.path.abspath(__file__))
db_file = "sqlite:///{}".format(os.path.join(basedir, "app.db")) 
app.config["SQLALCHEMY_DATABASE_URI"] = db_file
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)


# BLUEPRINTS  

from project.routes.users import users
from project.routes.admin import admin

app.register_blueprint(users, url_prefix= '/users')
app.register_blueprint(admin, url_prefix = '/admin')

# ERROR HANDLERS
@app.errorhandler(404)
def not_found(e):
    return "This page does not exist", 404


@app.errorhandler(500)
def internal_server_error(e):
    return "This one is on us. Check back later", 500

@app.route('/')
def welcome():
    return jsonify({"msg": "Server is live"})

from project import models, routes