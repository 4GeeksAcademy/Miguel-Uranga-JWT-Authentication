import React, { useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {Context} from '../store/appContext.js'


export const RegisterUser = () => {
    const [userInfo, setUserInfo] = useState({
        username:  "",
        password: "",
        repeatPassword: "",
        is_active: true,
        first_name: "",
        last_name: "",
    })

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    
    const userInfoSubmit = async e =>{
        let response = ""

        e.preventDefault()
        if (userInfo.repeatPassword != userInfo.password){
            alert("The passwords do not match")
            return -1
        }
        if (userInfo.name == "" && userInfo.password == "" && userInfo.first_name == "" && userInfo.last_name == ""){
            alert("Please fill all the required fields.")
            return -1
        }
        response = await actions.registerUser(userInfo)
        console.log(response)
        response.msg ? alert(response.msg): navigate("/successful")
         
    }

    const inpuntHandling = e => {
        e.preventDefault()
        const {name, value} = e.target;
        setUserInfo(prevInfo => (
            {
                ...prevInfo, [name]:value
            }));
    }

    return (
        <div className='container-fluid w-75 mt-5'>
            <form className="row g-3 needs-validation" onSubmit={userInfoSubmit} novalidate>
                <label for="full_Name" className="form-label fw-bold text-light">Username</label>
                <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="Enter your username" aria-label="Username" id="full_Name" required
                        name = "username" value= {userInfo.username}  onChange={inpuntHandling}
                    />
                    <div className="valid-feedback"></div>
                </div>
                <label for="password" className="form-label fw-bold text-light">Password</label>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Enter password" aria-label="Username" id="email" required
                        name = "password" value= {userInfo.password}  onChange={inpuntHandling}
                    />
                    <div className="valid-feedback"></div>
                </div>

                <label for="password" className="form-label fw-bold text-light">Repeat password</label>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Enter password" aria-label="Username" id="password" required
                        name = "repeatPassword" value= {userInfo.repeatPassword}  onChange={inpuntHandling}
                    />
                    <div className="valid-feedback"></div>
                </div>

                <label for="First name" className="form-label fw-bold text-light">First Name</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter your first name" aria-label="Username" id="phone" required
                        name = "first_name" value= {userInfo.first_name}  onChange={inpuntHandling}
                    />
                    <div className="valid-feedback"></div>
                </div>

                <label for="Last name" className="form-label fw-bold text-light">Last Name</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter your last name" aria-label="Username" id="address" required
                    name = "last_name" value= {userInfo.last_name}  onChange={inpuntHandling}
                    />
                    <div className="valid-feedback"></div>
                </div>

                <button className='w-100 bg-primary' style={{border: "none", height: "40px","border-radius": "5px"}} type="submit">
                    <div className='text-light fw-bold'>Sign Up</div></button>
                <Link to="/login">Or get back to login</Link>
            </form>
        </div>
    )
}