from app import db


class Quotes(db.Model):
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
                'like_count': self.like_count,
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


