from project import db, login
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

@login.user_loader
def load_user(id):
    return User.query.get(int(id))


class Quotes(db.Model):
    id = db.Column(db.Integer, primary_key=True)    
    name = db.Column(db.String(64), index=True)
    author = db.Column(db.String(64), index=True)
    source = db.Column(db.String(128), index=True)
    quote =  db.Column(db.Text, index=True)
    stage = db.Column(db.String, default='quote')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    
    
    def __repr__(self):
        result = {
                "name": self.name,
                'author': self.author, 
                'source': self.source, 
                'quote': self.quote
            }
        
        return str(result)


class QuotesToApprove(db.Model):
    id = db.Column(db.Integer, primary_key=True)    
    name = db.Column(db.String(64), index=True)
    author = db.Column(db.String(64), index=True)
    source = db.Column(db.String(128), index=True)
    quote =  db.Column(db.Text, index=True)

    
    
    def __repr__(self):
        result = {
                "name": self.name,
                'author': self.author, 
                'source': self.source, 
                'quote': self.quote
            }
        
        return str(result)


class ApprovedQuotes(db.Model):
    id = db.Column(db.Integer, primary_key=True)    
    name = db.Column(db.String(64), index=True)
    author = db.Column(db.String(64), index=True)
    source = db.Column(db.String(128), index=True)
    quote =  db.Column(db.Text, index=True)

    
    
    def __repr__(self):
        result = {
                "name": self.name,
                'author': self.author, 
                'source': self.source, 
                'quote': self.quote
            }
        
        return str(result)

class DeclinedQuotes(db.Model):
    id = db.Column(db.Integer, primary_key=True)    
    name = db.Column(db.String(64), index=True)
    author = db.Column(db.String(64), index=True)
    source = db.Column(db.String(128), index=True)
    quote =  db.Column(db.Text, index=True)

    
    
    def __repr__(self):
        result = {
                "name": self.name,
                'author': self.author, 
                'source': self.source, 
                'quote': self.quote
            }
        
        return str(result)


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String, unique=True, nullable=False)
    username = db.Column(db.String, unique=False, nullable=False)
    _password = db.Column(db.String(128))
    authenticated = db.Column(db.Boolean, default=False)
    registered_on = db.Column(db.DateTime, nullable=True)
    last_logged_in = db.Column(db.DateTime, nullable=True)
    current_logged_in = db.Column(db.DateTime, nullable=True)
    role = db.Column(db.String, default='user')
    quotes = db.relationship('Quotes', backref='user', lazy='dynamic')

    def __init__(self, email, password, email_confirmation_sent_on=None, role='user'):
        self.email = email
        self.password = password
        self.authenticated = False
        self.registered_on = datetime.now()
        self.last_logged_in = None
        self.current_logged_in = datetime.now()
        self.role = role

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, password):
        self._password = generate_password_hash(password)

    @property
    def is_correct_password(self, password):
        return check_password_hash(self.password, password)

    @property
    def is_authenticated(self):
        """Return True if the user is authenticated."""
        return self.authenticated

    @property
    def is_active(self):
        """Always True, as all users are active."""
        return True

    @property
    def is_anonymous(self):
        """Always False, as anonymous users aren't supported."""
        return False

    def get_id(self):
        """Return the email address to satisfy Flask-Login's requirements."""
        """Requires use of Python 3"""
        return str(self.id)

    def __repr__(self):
        return '<User {}>'.format(self.email)

