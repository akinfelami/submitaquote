from operator import index
from flask import flash, redirect, session, request, url_for
from app import app
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv

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
    return "Hello World"


@app.route('/api/newquote', methods=['POST'])
def new():
    return "New content recieved"

@app.route('/api/admin/quotes')
def adminpage():
    if 'username' in session:
        return "Welcome to admin page"
    return "You are not logged in"

@app.route('/api/admin/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

@app.route('/api/admin', methods=['POST'])
def admin():
    if request.form['username'] == 'admin' and check_password_hash(hashed_password, request.form['password']):
        session['username'] = request.form['username']
        return redirect(url_for('adminpage'))
    return "You are not authorized to view this page"
    
