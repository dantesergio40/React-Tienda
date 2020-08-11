import React, { Fragment, useEffect, useState } from 'react';
import {db} from '../../firebase';
import { Link } from "react-router-dom";


const Catalogo = ({addToCart}) => {  
  
    const initialStateDatos = {    
           productPedidos: 1
    }; 
    const [products, setProducts] = useState([]);   
    const [datos, setDatos] = useState(initialStateDatos);     
    const [termino, setTermino] = useState("");
    
    const getProductos = async () => {
        await db.collection('productos').onSnapshot((querySnapshot) => {
              const docs = [];
              querySnapshot.forEach( (doc) => {                
                docs.push({...doc.data(), id:doc.id});//agregar al objeto docs
              });               
              setProducts(docs)
          });  
      };
     
    useEffect(()=>{
        //console.log("Obtiendo datos get")
        getProductos();//lamado cada vez que carga la aplicacion        
      }, []); 
          
   const HandleInputChange = (event) => {    
       //console.log("hanleInputChange",event.target.value)          
       setDatos({
          ...datos,[event.target.name] : event.target.value
       })
    };

  const handleSubmit = (event) => {  
      event.preventDefault();  
      if(!termino) {
        return alert('ingresa texto')
      }      
    };

  const filtrarNombre = products.filter((product)=>{ 
    return product.nombre.toLowerCase().includes(termino.toLowerCase())    
   });
    
    return (
    <Fragment>          
        <div className="container bg-danger">

           <div className="d-flex justify-content-between text-white">
             <div className=" mt-3">
                 <h2>Catálogo</h2>
             </div>
             <div className="mt-4">
             <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">Qué estás buscando?</label>
                    <input 
                        value={termino}
                        type="text"
                        placeholder="Buscar producto"
                        name= "termino"
                        maxLength="8"
                        onChange={e=>setTermino(e.target.value)}
                    />
                </form>
             </div>
           </div>  
          <hr/>
          <div className="row">                        
                
            {filtrarNombre.map(product => (
                <div className="col-sm-3" key={product.id}>
                    <div className="card mb-3">
                           <img src={product.img} alt="" height='120'/>
                      <div className="card-body">
                         <h3>{product.nombre}</h3>
                         <p>Precio: $ {product.precio}</p>
                         <p>Disponibles: {product.cantidad}</p>                                
                         <div className="btn-group">                            
                            <Link to={"/vermas/"+ product.id} onClick={()=>console.log("click en boton verMas")} className="btn btn-primary" >Ver Más</Link>
                            <button className="btn btn-warning" onClick={()=>addToCart(product, datos)}>Añadir</button>
                           
                            <input                                                        
                                name="productPedidos"                                
                                className="text-center" 
                                type="number" 
                                onChange={HandleInputChange}
                                style={{width: 60}}
                                min="1"
                                max={product.cantidad}
                                placeholder="1"                                
                            />                             
                         </div>  
                      </div>
                    </div>
                </div>
               )
             )}
          </div>                
            
        </div>   
    </Fragment>
    );
}
 
export default Catalogo;

