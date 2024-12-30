import React, { useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {Context} from '../store/appContext.js'


export const RegisterUser = () => {
    const userInfo = {
        username:  "",
        password: "",
        is_active: true,
        first_name: "",
        last_name: "",
    }
    let repeatPassword = "";
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const registerUser = (userInfo) =>{
        if (repeatPassword != userInfo.password){
            alert("Please confirm your password.")
            return -1
        }
        if (userInfo.name == "" && userInfo.password == "" && userInfo.first_name == "" && userInfo.last_name == ""){
            alert("Please fill all the required fields.")
            return -1
        }
        //actions.AddContact(userInfo)
        //alert("Successfully added "+ userInfo.name + "!")
        navigate("/successful")
    }

    return (
        <div className='container-fluid w-75 mt-5'>
            <form className="row g-3 needs-validation" novalidate>
                <label for="full_Name" className="form-label fw-bold text-light">Username</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter your username" aria-label="Username" id="full_Name" required
                        onChange={
                        e=> {
                            userInfo.username = e.target.value
                            //console.log(userInfo.name)
                        }
                        }
                    />
                    <div className="valid-feedback"></div>
                </div>
                <label for="password" className="form-label fw-bold text-light">Password</label>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Enter password" aria-label="Username" id="email" required
                        onChange={
                            e=> {
                            userInfo.password = e.target.value
                            console.log(userInfo.password)
                            }
                        }
                    />
                    <div className="valid-feedback"></div>
                </div>

                <label for="password" className="form-label fw-bold text-light">Repeat password</label>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Enter password" aria-label="Username" id="email" required
                        onChange={
                            e=> {
                            repeatPassword = e.target.value
                            console.log(repeatPassword)
                            }
                        }
                    />
                    <div className="valid-feedback"></div>
                </div>

                <label for="First name" className="form-label fw-bold text-light">First Name</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter your first name" aria-label="Username" id="phone" required
                        onChange={
                            e=> {
                            userInfo.first_name = e.target.value
                            //console.log(userInfo.name)
                            }
                        }
                    />
                    <div className="valid-feedback"></div>
                </div>

                <label for="Last name" className="form-label fw-bold text-light">Last Name</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter your last name" aria-label="Username" id="address" required
                    
                    onChange={
                        e=> {
                        userInfo.last_name = e.target.value
                        //console.log(userInfo.name)
                        }
                    }/>
                    <div className="valid-feedback"></div>
                </div>

                <button className='w-100 bg-primary' style={{border: "none", height: "40px","border-radius": "5px"}} type="submit"
                    onClick={() => registerUser(userInfo)}
                ><div className='text-light fw-bold'>save</div></button>
                <Link to="/login">Or get back to login</Link>
            </form>
        </div>
    )
}