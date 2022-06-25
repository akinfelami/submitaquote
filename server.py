from app import app, db
from app.models import Quotes

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Quotes': Quotes}

    
if __name__ == '__main__':
    app.run()
