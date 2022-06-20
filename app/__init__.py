from flask_cors import CORS
from flask import Flask


app = Flask(__name__)

# auth = HTTPBasicAuth()
CORS(app)


from app import routes