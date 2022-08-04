from flask import Blueprint, jsonify, redirect, url_for, request
from flask_login import current_user, login_user
from flask_login import login_required
from project.models import Quotes, User
from project import app, db

users =  Blueprint('users', __name__)



@users.route('/')
@login_required
def index():
    return "Welcome, you are a User"

@users.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if current_user.is_authenticated:
            return redirect(url_for('index'))
        
        user = User.query.filter_by(email=request.form['email']).first()
        if user is None:
            return jsonify({"msg": 'User does not exist'})
        elif not user.is_correct_password(request.form['password']):
            return jsonify({"msg": "Invalid Credentials"})
        
        login_user(user)
        return jsonify({"msg": "Login Success", "User": user.username})
        
    return redirect(url_for('index'))



@users.route('/quotes')
def quotes():
    # Get all quotes in database
    quotes = Quotes.query.all()
    q = []
    for quote in quotes:
        q.append({
            "id": quote.id,
            "name": quote.name,
            'author': quote.author,
            'source': quote.source,
            'quote': quote.quote
        })
    return jsonify({"msg":"Success", "Quotes": q})

# Receives requests to submit new quote
@users.route('/newquote', methods=['POST'])
def new():
    new_db_entry = QuotesToApprove(
        name=request.form['name'],
        author=request.form['author'],
        source=request.form['source'],
        quote=request.form['quote']
    )
    db.session.add(new_db_entry)
    db.session.commit()
    return jsonify({"msg": "Success", "Quote": new_db_entry})