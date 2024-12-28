"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os, json
from flask import Flask, request, jsonify, url_for, Blueprint, JWTManager
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

api.config["JWT_SECRETE_KEY"] = "A*SJR*89432Jk1l2@"
jwt = JWTManager(api)

# Allow CORS requests to this API
CORS(api)

@api.route('/')
def sitemap():
    return generate_sitemap(api)


@api.route('/signup', methods=['POST'])
def user_signup():
    response_body = json.loads(request.data)
    new_User = User(
        username = response_body["username"],
        password = response_body["password"],
        is_active = True,
        first_name = response_body["first_name"],
        last_name = response_body["last_name"]
    ) 

    if not response_body:
        return jsonify({"msg": "There was no information provided"}), 401

    db.session.add(new_User)
    db.session.commit()
    serialized_user = new_User.serialize()

    return jsonify({"msg": f"Created user: {serialized_user}"}), 200

#Creation of the JWT authentication token 
@api.route("/token", methods = ["POST"])
def token_generation():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username=username, password=password).first()

    if not user:
        return jsonify({"msg": "There was an error. Incorrect username or password"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id":user.username})


@api.route("/login", methods = ["GET"])
@jwt_required()
def user_logon():
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    if not user:
        return jsonify({"msg": "The previously authenticated user does not exist anymore."}), 401

    return jsonify({"id": user.id, "username": user.username }), 200
