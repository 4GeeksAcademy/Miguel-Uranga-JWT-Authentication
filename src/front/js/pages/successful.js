import React, { useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {Context} from '../store/appContext.js'
import Checkmark from '../../img/Checkmark.png'


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


export const SuccessfulRegister = () => {
    return (<>

            <div className='container-fluid w-25 border-secondary' style={customMargins}>
                <div className= "col d-flex justify-content-center">
                    <img src={Checkmark} className="img-thumbnail" alt="..." style={imgStyle}></img>
                        
                </div>
                <p className="text-center mt-5"><Link to="/login" className = "text-primary ">Volver a la pagina de acceso</Link></p>
            </div>

            
    </>
            
        )
}