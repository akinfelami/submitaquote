from flask import redirect, flash, session, request, url_for, render_template, send_from_directory
from app import app
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv
import json
from app import db
from app.models import Quotes, QuotesToApprove, ApprovedQuotes, DeclinedQuotes
load_dotenv()

password = os.getenv('PASSWORD')
hashed_password = generate_password_hash(password)

# Set the secret key to some random bytes. Keep this really secret!
app.secret_key = os.getenv('SESSION_KEY')


@app.errorhandler(404)
def not_found(e):
    return "This page does not exist"


@app.errorhandler(500)
def internal_server_error(e):
    return "This one is on us. Check back later"


@app.route('/')
def index():
    if 'username' in session:
        # return Admin Page
        return "Admin Page"
    return render_template('adminlogin.html')

# --  Admin Panel --- #

# Log out


@app.route('/api/admin/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

# Log in


@app.route('/api/login', methods=['POST'])
# Check login credentials for admin
def admin():
    # Admin login page
    if request.form['username'] == 'admin' and check_password_hash(hashed_password, request.form['password']):
        session['username'] = request.form['username']

        # Return Admin page
        return "Admin Page"
    return "You are not authorized to view this page"

# --- db access and manipulation ---

# Sends all quotes in Quotes db to user


@app.route('/api/quotes')
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
    return json.dumps(q)

# Get all quotes to be approved for admin page


@app.route('/api/admin/quotes')
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
    return json.dumps(q)

# Get all quotesalready approved


@app.route('/api/admin/quotesapproved')
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
    return json.dumps(q)

# Get all Quotes already Declined


@app.route('/api/admin/quotesdeclined')
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
    return json.dumps(q)


# Approve quote from admin
@app.route('/api/admin/approve', methods=['POST'])
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

    return redirect(url_for('admin'))

# Decline Quotes


@app.route('/api/admin/declinequote', methods=['POST'])
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

    return redirect(url_for('admin'))

# Delete Quotes from Quotes db and ApprovedQuotes db


@app.route('/api/admin/deletequote', methods=['POST'])
def deletequote():
    data = request.get_json()
    print(data)
    to_delete = Quotes.query.filter_by(quote=data['quote']).first()
    db.session.delete(to_delete)
    db.session.commit()
    to_delete_too = ApprovedQuotes.query.filter_by(quote=data['quote']).first()
    db.session.delete(to_delete_too)
    db.session.commit()

    return redirect(url_for('admin'))

# Delete declined quote


@app.route('/api/admin/deletedeclined', methods=['POST'])
def delete_declined_quote():
    data = request.get_json()
    to_delete = DeclinedQuotes.query.filter_by(quote=data['quote']).first()
    db.session.delete(to_delete)
    db.session.commit()

    return redirect(url_for('admin'))


# Receives requests to submit new quote
@app.route('/api/newquote', methods=['POST'])
def new():

    new_db_entry = QuotesToApprove(
        name=request.form['name'],
        author=request.form['author'],
        source=request.form['source'],
        quote=request.form['quote']
    )
    db.session.add(new_db_entry)
    db.session.commit()
    return redirect(url_for('index'))
