import React, {useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {Context} from '../store/appContext.js'
import StareFace from '../../img/stare.png'


const customMargins = {
    "margin-top": "15vh",
    padding: "35px",
    border: "solid 1px",
    "border-radius": "3%"
}

const imgStyle = {
    height:"50%",
    width: "50%",
    "border-radius": "50%"
}


export const UserLogin = () => {
    const { store, actions } = useContext(Context);
    const {data, setData} = useState({
            "username": "",
            "password": "",
            "is_active": true,
            "first_name": "",
            "last_name": ""
    });

    //getting the user values
    const inpuntHandling = e => {
        const {name, value} = e.target;
        setData(prevInfo => (
            {
                ...prevInfo, [name]:value
            }));
        console.log("AAAAA");
    }


    const loginUserHandling = (e) => {
        e.preventDefault()
        actions.loginAccount(data.username, data.password)
        return -1
    }

    return (
            <div className='container-fluid w-25 border-secondary' style={customMargins}>
                    <div className= "col d-flex justify-content-center">
                        <img src={StareFace} className="img-thumbnail" alt="..." style={imgStyle}></img>
                    </div>
                    
                    
                    <form  onSubmit={loginUserHandling}>
                        <label for="full_Name" className="form-label fw-bold text-light">Username</label>
                        <div className="row mb-3">
                            <input type="text" className="form-control" placeholder="Enter your username" id="inputUser" name = "username"
                                value= {data.username}  onChange={inpuntHandling}/>                            
                                <div class="invalid-feedback"></div>
                        </div>
                
                        <label for="email" className="form-label fw-bold text-light">Password</label>
                        <div className="row mb-3">
                            <input type="password" className="form-control" placeholder="Enter password" id="inputPassword" name= "password"
                                value= {data.password}  onChange={inpuntHandling}
                                />
                                <div class="invalid-feedback"></div>
                            </div>            
                        <button className='w-100 bg-primary' style={{border: "none", height: "40px","border-radius": "5px"}} type="submit"
                        ><div className='text-light fw-bold'>Login</div></button>
                        

                    </form>
                    <Link to="/signup" className = "text-primary">Don't have an account? Sign-up!</Link>
         
            </div>
        )
}