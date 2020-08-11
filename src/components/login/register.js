import React, { useState, Fragment } from 'react';
import {Link} from "react-router-dom";
import './register.css';
import {fb} from '../../firebase';

const Register = (props) => {   
  
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

const registrar = (e) => {
  e.preventDefault();
  fb.auth().createUserWithEmailAndPassword(email, password).then(()=>{
  
  alert ('registro exitoso!!!...puedes iniciar sesion')
  
}) 
 .catch(function(error) {      
     alert ("hay errores", error.message)   
  });
}  

return (
      <Fragment>        
         <div className="img-fondo"> 
          <div className="container col-sm-6 col-sm-offset-3">          
            
            <h1 className="text-center p-5">Register</h1>

                <form >
                     <div className="form-group">
                       <label htmlFor="email-input">Correo electrónico:</label>
                       <input 
                          type="email" 
                          placeholder="Ingrese Email"
                          className="form-control" 
                          id="email-input"  
                          name="email"  
                          required pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                          onChange={(ev) => setEmail(ev.target.value)}   
                       />
                       
                     </div>
                     <div className="form-group">
                       <label htmlFor="password-input">Contraseña:</label>
                       <input 
                          type="password" 
                          placeholder="Ingrese contraseña"
                          className="form-control" 
                          id="password-input" 
                          name="password"
                          onChange={(ev) => setPassword(ev.target.value)} 
                          required/>
                     </div>     
                    
                     <div className="text-center">
                        <button 
                        type="submit" 
                        className="btn btn-outline-warning mt-3 font-italic"
                        onClick={registrar}
                        ><h4>REGISTRARME</h4></button>
                     </div>
                </form> 
                   <div className="form-group mt-3">
                     <p className="text-black ">Si ya tienes una cuenta ingresa aquí <a className="font-italic"><Link to="/" className="btn btn-success font-italic">Login</Link></a> </p>
                   </div>                                                   
             </div> 
         </div>             
            
      </Fragment>
    );
}
 
export default Register;