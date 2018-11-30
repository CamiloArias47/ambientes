/**
 * @fileoverview Componente, footer de la tienda
 *
 * @version 1
 *
 * @author Camilo Arias <CamiloArias47>
 * @copyright 
 *
 * History
 * v1 Creacion componente <CamiloArias47>
*/


import React from 'react'

/**
*Renderiza el footer de la tienda
*/
class Footer extends React.Component{
    render(){
      return(<footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <h5>Proveedores fabricantes.</h5>
                            </div>
  
                            <div className="col s12 m7">
                                <h5>CONTACTANOS</h5>
                                <hr/>
                                <p>
                                    <i className="fa fa-map-marker"></i> Carrera 2 # 60 – 107.  Cali–Colombia<br/>
                                    <i className="fa fa-mobile"></i> (57) (2)  - 315 251 6472 <br />
                                    <i className="fa fa-phone"></i> (57) (2)  - 388 2461<br />
                                    <i className="fa fa-envelope"></i> proyectoscol@ambientessostenibles.com
                                </p>
  
                            </div>
  
                            <div className="col s12 m5 follow">
                                <ul className="center-align">
                                    <p>
                                        <li><b>Siguenos</b></li>
                                        <br/>
                                        <li><a href="#"><i className="fa fa-facebook"></i> &nbsp; Facebook</a></li>
                                        <li><a href="#"><i className="fa fa-instagram"></i> &nbsp; Instagram</a></li>
                                    </p>
                                </ul>
                            </div>
  
  
  
                            <div className="col s12 tittles footer-copyright">Ambientes Sostenobles &copy; 2018</div>
                        </div>
                    </div>
                </footer>)
    }
}

export default Footer
