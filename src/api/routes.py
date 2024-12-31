"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os, json
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# @api.route('/')
# def sitemap():
#     return generate_sitemap(api)



@api.route('/signup', methods=['POST'])
def user_signup():
    response_body = json.loads(request.data)
    new_User = User(
        username = response_body["username"],
        password = current_app.bcrypt.generate_password_hash(response_body["password"]).decode('utf-8'),
        is_active = True,
        first_name = response_body["first_name"],
        last_name = response_body["last_name"]
    ) 

    if not response_body:
        return jsonify({"msg": "There was no information provided"}), 401
    

    user = User.query.filter_by(username=new_User.username).first()

    if user:
        return jsonify({"msg": "This user already exists"}), 401

    db.session.add(new_User)
    db.session.commit()
    serialized_user = new_User.serialize()

    return jsonify({"User_created": f"Created user: {serialized_user}"}), 200

#Creation of the JWT authentication token 
@api.route("/login", methods = ["POST"])
def token_generation():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"msg": "There was an error. Incorrect username or password"}), 401
    
    valid_password = current_app.bcrypt.check_password_hash(user.password, password)

    if not valid_password:
        return jsonify({"msg": "There was an error. Incorrect username or password"}), 401
    
    access_token = create_access_token(identity=username)
    return jsonify({"token": access_token, "username":user.username}), 200

#Authenticating the user
@api.route("/access", methods = ["GET"])
@jwt_required()
def user_logon():
    current_user = get_jwt_identity()
    print(current_user)
    user = User.query.filter_by(username = current_user).first()

    if not user:
        return jsonify({"msg": "The previously authenticated user does not exist anymore."}), 401
    
    serialized_user = User.serialize(user)
    return jsonify("User_info", serialized_user), 200
