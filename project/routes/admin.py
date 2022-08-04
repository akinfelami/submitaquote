from flask import Blueprint, jsonify, url_for, redirect, json, request
from project.models import Quotes, QuotesToApprove, ApprovedQuotes, DeclinedQuotes
from project import db


admin =  Blueprint('admin', __name__, static_folder='../../admin/build', static_url_path='/')




@admin.route('/')
def index():
  return jsonify({"msg": "Welcome, you are an Admin" }), 200


@admin.route('/logout')
def logout():
  return redirect(url_for('index'))


@admin.route('/login', methods=['POST'])
# Check login credentials for admin
def admin_login():
  return jsonify({"msg": "You are now Logged in as and admin"})


@admin.route('/quotes')
def admin_quotes():
    # Get all quotes in database
    quotes = QuotesToApprove.query.all()
    q = []
    for quote in quotes:
        q.append({
            "id": quote.id,
            "name": quote.name,
            'author': quote.author,
            'source': quote.source,
            'quote': quote.quote
        })
    return jsonify({"msg": "Success", "Quote": q})


@admin.route('/quotestoapprove')
def admin_quotes_to_approve():
    # Get all quotes in database
    quotes = QuotesToApprove.query.all()
    q = []
    for quote in quotes:
        q.append({
            "id": quote.id,
            "name": quote.name,
            'author': quote.author,
            'source': quote.source,
            'quote': quote.quote
        })
    return jsonify({"msg": "Success", "Quote": q})

@admin.route('/quotesapproved')
def admin_quotes_approved():

    quotes = ApprovedQuotes.query.all()
    q = []
    for quote in quotes:
        q.append({
            "id": quote.id,
            "name": quote.name,
            'author': quote.author,
            'source': quote.source,
            'quote': quote.quote
        })
    return jsonify({"msg": "Success", "Quote": q})


@admin.route('/quotesdeclined')
def admin_quotes_declined():

    quotes = DeclinedQuotes.query.all()
    q = []
    for quote in quotes:
        q.append({
            "id": quote.id,
            "name": quote.name,
            'author': quote.author,
            'source': quote.source,
            'quote': quote.quote
        })
    return jsonify({"msg": "Succesfully declined", "Quote": q})

@admin.route('/approve', methods=['POST'])
def approve_quote():

    # move into quotes db
    data = request.get_json()
    new_db_entry = Quotes(
        name=data['name'],
        author=data['author'],
        source=data['source'],
        quote=data['quote']
    )

    db.session.add(new_db_entry)

    # Move quotes into Approved quotes db
    new_db_entry_too = ApprovedQuotes(
        name=data['name'],
        author=data['author'],
        source=data['source'],
        quote=data['quote']
    )

    db.session.add(new_db_entry_too)

    db.session.commit()

    # Remove from quotestoapprove
    to_delete = QuotesToApprove.query.filter_by(quote=data['quote']).first()
    db.session.delete(to_delete)

    db.session.commit()

    return jsonify({"msg": "Succes", "Quote": new_db_entry})


@admin.route('/declinequote', methods=['POST'])
def declinequote():

    data = request.get_json()
    new_db_entry = DeclinedQuotes(
        name=data['name'],
        author=data['author'],
        source=data['source'],
        quote=data['quote']
    )

    db.session.add(new_db_entry)

    to_delete = QuotesToApprove.query.filter_by(quote=data['quote']).first()
    db.session.delete(to_delete)
    db.session.commit()

    return jsonify({"msg": "Succes", "Quote": new_db_entry})


# Delete Quotes from Quotes db and ApprovedQuotes db
@admin.route('/deletequote', methods=['POST'])
def deletequote():
    data = request.get_json()
    to_delete = Quotes.query.filter_by(quote=data['quote']).first()
    db.session.delete(to_delete)
    db.session.commit()
    to_delete_too = ApprovedQuotes.query.filter_by(quote=data['quote']).first()
    db.session.delete(to_delete_too)
    db.session.commit()

    return jsonify({"msg": "Success", "Quote": to_delete})

# Delete declined quote
@admin.route('/deletedeclined', methods=['POST'])
def delete_declined_quote():
    data = request.get_json()
    to_delete = DeclinedQuotes.query.filter_by(quote=data['quote']).first()
    db.session.delete(to_delete)
    db.session.commit()

    return jsonify({"msg": "Succes", "Quote": to_delete})


