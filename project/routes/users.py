from flask import Blueprint, jsonify, request
from project.models import Quotes, QuotesToApprove
from project import app, db

users =  Blueprint('users', __name__)

@users.route('/')
def index():
    return "Welcome, you are a User"


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