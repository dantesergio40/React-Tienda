import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {db} from '../../firebase';


const Vermas = ({match}) => {  
  
  const idProduct = match.params.id;
  const [products, setProducts] = useState([])  

  const getProductos = async () => {
    await db.collection('productos').onSnapshot((querySnapshot) => {
          const docs = [];          
          querySnapshot.forEach( (doc) => {
            if(doc.id === idProduct){
              docs.push({...doc.data(), id:doc.id});
            }            
          }); 
          //console.log("viendo docs",docs);
          setProducts(docs)
      });  
  };

  useEffect(()=>{
    //console.log("Obtiendo datos en Ver mas")
    getProductos();//lamado cada vez que carga la aplicacion
  }, []);

    return (
      <Fragment>           
        <div className="container bg-info">
           <form>  
              <Link to="/inicio" className="close m-1"><span aria-hidden="true">&times;</span></Link>      
           </form>
           {products.map(product => (
               <div className="row no-gutters" key={product.id} >          
                 <div className="col-md-4 mt-3 mb-3">
                      <img src={"/" + product.img}  alt="" height='240'/>                  
                 </div>
                 <div className="col-md-8 ">
                    <div className="card-body m-3">                  
                      <h1 className="card-title">Nombre: {product.nombre} </h1>  
                      <h2><p className="card-text">Precio: $ {product.precio}</p></h2>
                      <h4><p className="card-text">Unidades disponibles: {product.cantidad}</p></h4>
                    </div>
                  </div>            
               </div>
             )
            )}
           <div className="col-sm-12">
              <Link to="/inicio" className="btn btn-dark mb-3">Atrás</Link> 
           </div>
        </div>           
      </Fragment>   
    );
}
 
export default Vermas;


