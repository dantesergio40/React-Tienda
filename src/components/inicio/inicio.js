import  React, {useState} from 'react';
import  Catalogo  from "./catalogo";
import  Carrito  from "./carrito";
import  Vermas from "./vermas";    
import './inicio.css';
import {db, fb} from '../../firebase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,  
  withRouter  
} from "react-router-dom";


const Inicio = (props) => { 

   const { history } = props;
   
   const [cart, setCart] = useState([]);
   const [total, setTotal] = useState(0);
   

////////////////      pagar     ////////////////////////////   
  const pagar = () => {
     if(total === 0){
       alert("carrito vacio")       
     }
    for(let i=0; i<cart.length; i++){
      let id = cart[i].id;
      let quedan = cart[i].productStock;     
      db.collection('productos').doc(id).update({ cantidad: quedan })
     .then(()=>{        
        alert("Compra exitosa!!!")      
      });  
    }    
    setCart([]);
    setTotal(0); 
  };

/////////////////      Logout       //////////////////
  const onLogout = () =>{
   
    fb.auth().signOut().then(function() {
         history.push("/");
    // Sign-out successful.
  }).catch(function(error) {

    console.log(error)
    // An error happened.
  });
 };


////////////////      Vaciar Carrito      ////////////////////////////
  const cancelCompra = (cart) => {
    if(cart.length === 0){
      alert("Tu Carrito esta vacio")      
    };

   if(window.confirm("Se vaciara tu carrito, Quieres Vaciarlo?")){
      setCart([]);
      setTotal(0);           
    }      
   // history.push("/inicio");
  };

 
/////////////  agregar productos al carrito //////////////////////////  
  const addToCart = (product, datos) =>{  
    //console.log("ver datos en addtoCart , vienen de aniadir",datos, datos.productPedidos);    
    const productosPedidos = datos.productPedidos;
    const subTotal = productosPedidos * product.precio;
    const productStock = product.cantidad - productosPedidos;  
    
    setTotal(total + subTotal) 
  
  const producto = {
    id: product.id,
    img: product.img,
    nombre: product.nombre,
    precio: product.precio,
    cantidad: product.cantidad,
    subTotal: subTotal,
    productStock:productStock,
    productosPedidos: productosPedidos
  } 

  const check = cart.every(item =>{
    return item.id !== product.id
   })
   if(check){    
    setCart([...cart, producto ]);    
   }else {    
    alert ("Este Producto ya esta en el carrito!!!")
   }  
};

////////////////////// eliminar producto del carrito /////////////////////

const removeProductCart = (productToRemove) =>{
  //console.log("en eliminar", productToRemove)
  if(window.confirm("Se elimara este Producto,Quieres Elimarlo?")){
    setCart(cart.filter((product) => product !== productToRemove));
    setTotal(total - productToRemove.subTotal)
  }  
};

//////////////////////////////////////////////////////////////////////////
  return (
    <Router>
     <div className="inicio-fondo"> 
      <div className="container">
        <nav className="navbar navbar-dark bg-secondary mb-4 ">
        <h1 className="text-white">TiendaOnline</h1> 
         <ul className="nav" >                  
            <li className="nav-item">              
              <Link to="/inicio" className="btn bg-secondary"><i className="fas fa-home" style={{color:'white'}} /></Link>
            </li>
            <li className="nav-item">              
              <Link to="/carrito" className="btn bg-secondary "><i className="fas fa-shopping-cart" style={{color:'yellow'}}/><span id="badge" className="badge badge-pill badge-warning" style={{color:'black'}}>{cart.length}</span></Link>
            </li>      
            <li className="nav-item">              
              <button 
                className="btn bg-secondary" 
                onClick={onLogout}
                //onClick={()=> history.push('/')}
                >
                <i className="fas fa-running"/>
              </button>
            </li>                    
         </ul>  
        </nav>      
        <hr/>
        <Switch>
          <Route path="/inicio">
             <Catalogo addToCart={addToCart}/>
          </Route >          
          <Route path="/carrito">
             <Carrito cart={cart} 
                      total={total} 
                      removeProductCart={removeProductCart} 
                      cancelCompra={cancelCompra}
                      pagar={pagar}
                      />
          </Route >
          <Route path="/vermas/:id" component={Vermas}/>                                                
        </Switch>
      </div>
     </div>
    </Router>
  );
}

export default withRouter(Inicio);


