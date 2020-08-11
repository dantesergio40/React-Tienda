import React, {useState} from 'react';
import './login.css';
import {fb} from '../../firebase';
import { Link, withRouter } from "react-router-dom";  

const Login = (props) => {  
  
  const { history } = props; 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');   

  const ingresar = (e) => {
    e.preventDefault();
    console.log(email, password)
    fb.auth().signInWithEmailAndPassword(email, password).then(()=>{            
      alert("correcto");      
      history.push("/inicio");     
    })
    .catch((error) => {  
      let errorCode = error.code;     
      if(errorCode === "auth/user-not-found"){
        alert("Usuario NO Registrado. Pudo haber sido eliminado")
      }else if(errorCode === "auth/wrong-password"){
        alert("La contraseña es Inválida")
      }else if(errorCode === "auth/invalid-email"){
        alert("formato de email incorrecto")
      };      
      
      console.log("errores en -ingresar()-",error.code, error.message)
      
    })
     
  }

 return (
        
    <div className="img-fondo "> 

        <div className="container col-sm-6 col-sm-offset-3">          
            
                <h1 className="text-center p-5">Login</h1>

                <form >
                     <div className="form-group">
                       <label  htmlFor="email-input">Correo electrónico:</label>
                       <input 
                         type="email" 
                         placeholder="Ingrese email"
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
                          className="btn btn-success mt-3"
                          onClick={ingresar}
                          >
                          <h4>INGRESAR</h4>
                         </button>
                     </div>
                     
                </form> 
                <div className="form-group mt-3">
                     <p className="text-black ">Crea una cuenta aquí <Link to="/register" className="btn btn-outline-warning font-italic">Registrarme</Link> </p>
                </div>                                              
          </div> 
     </div>            
    );
}
 


export default withRouter(Login);
