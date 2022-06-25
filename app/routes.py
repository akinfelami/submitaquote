from flask import redirect, request_tearing_down, session, request, url_for, render_template
from app import app
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv
import json
from app import db
from app.models import Quotes, QuotesToApprove, ApprovedQuotes
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
    # return build page for users
    return "Hello World"

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


# Approve quote from admin
@app.route('/api/admin/approve', methods=['POST'])
def approve_quote():
    
    # move into quotes db
    data = request.get_json()
    new_db_entry = Quotes(
        name = data['name'],
        author = data['author'], 
        source = data['source'],
        quote = data['quote']
    )

    db.session.add(new_db_entry)
    
    # Move quotes into Approved quotes db
    new_db_entry_too = ApprovedQuotes(
        name = data['name'],
        author = data['author'], 
        source = data['source'],
        quote = data['quote']
    )

    db.session.add(new_db_entry_too)

    db.session.commit()

    # Remove from quotestoapprove
    to_delete = QuotesToApprove.query.filter_by(quote=data['quote']).first()
    db.session.delete(to_delete)

    db.session.commit()

    return {"msg": "Success"}

# Delete Quotes from Quotes db and ApprovedQuotes db
@app.route('/api/admin/deletequote', methods=['POST'])
def deletequote():
    data = request.get_json()
    to_delete = Quotes.query.filter_by(quote=data['quote']).first()
    db.session.delete(to_delete)
    to_delete_too = ApprovedQuotes.query.filter_by(quote=data['quote']).first() 
    db.session.delete(to_delete_too)

    db.session.commit()
    
    return {"msg": "Success"}



# Receives requests to submit new quote
@app.route('/api/newquote', methods=['POST'])
def new():
    data = request.get_json()
    new_db_entry = QuotesToApprove(
        name = data['name'],
        author = data['author'], 
        source = data['source'],
        quote = data['quote']
    )
    db.session.add(new_db_entry)
    db.session.commit()

    return {'msg': 'Thank you, your quote has been received and is under revision!'}


# --  Admin Panel --- #

# Log out
@app.route('/api/admin/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return redirect(url_for('admin'))

# Log in Admin 
@app.route('/api/admin', methods=['GET', 'POST'])
# Check login credentials for admin
def admin():
    # Admin login page
    if request.method == 'POST':
        if request.form['username'] == 'admin' and check_password_hash(hashed_password, request.form['password']):
            session['username'] = request.form['username']
            # Actually return build folder for admin
            return "Logged in"
        return "You are not authorized to view this page"
        
    # if GET request the return admin login page
    else:
        if 'username' in session:
            # return admin build page
            return "Logged in"
        return render_template('adminlogin.html', title='Admin')












    
