import React, { Fragment } from 'react';
import { Link } from "react-router-dom";


const Carrito = ({ cart, removeProductCart, cancelCompra, total, pagar }) => {   
        
  return (
        <Fragment>           
            <div className="container bg-warning">              
              <form>  
                  <Link to="/inicio" className="close m-1"><span aria-hidden="true">&times;</span></Link>      
              </form>

              <div className="row margin bg-warning ">

                 <div className="col-sm-12 text-white ">
                    <h1 className="mt-3 mb-3">Carrito de mis compras</h1>
                 </div>
                
                 <div className="col-sm-6">
                    {cart.map(product=> (    
                   <div className="card mb-3" key={product.id}>                    

                     <ul className="list-group">
                       <li className="list-group-item">
                         <div className="row no-gutters">
                           <div className="col-md-4">
                               <img src={product.img} className="card-img" height="80" alt=""/>
                           </div>
                           <div className="col-md-7">
                              <div className="card-body pt-0 pb-0">
                                 <h6 className="card-title mb-0">{product.nombre}</h6>
                                 <p className="card-text mb-0">unidades pedidas: {product.productosPedidos}</p>
                                 <p className="card-text "><small className="text-muted">Subtotal: ${product.subTotal}</ small></p>
                              </div>
                            </div>
                            <div className="col-md-1 text-right">
                               <button onClick={()=>removeProductCart(product)}><i className="fas fa-trash-alt" style={{color:'red'}}></i></button>
                            </div>
                         </div>                         
                       </li>
                     </ul>                   
                    </div>
                  ))}
                  </div>

                  <div className="col-sm-6 text-center">
                     <div className="col-sm-12">
                        <h1>Total: ${total} </h1>
                     </div>
                     <div className="col-sm-12">
                        <button className="cancelar btn btn-danger mr-2" type="button" name="button" onClick={()=>cancelCompra(cart)} >Cancelar</button>
                        <button className="btn btn-success ml-2+" type="button" name="button" onClick={()=>pagar()}>Pagar</button>
                     </div>
                  </div>
                  <div className="col-sm-12">
                       <Link to="/inicio" className="btn btn-dark mb-3">Atrás</Link> 
                  </div>
               </div> 
                 
            </div>        
                
    </Fragment>
    );
}
 
export default Carrito;
