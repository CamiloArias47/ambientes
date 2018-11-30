/**
 * @fileoverview Componente, barra lateral para moviles
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
*Renderiza La barra para moviles
*/
class NavBar extends React.Component{
    render(){
      return(<nav id="topNav">
              <div className="nav-wrapper topNav">
                <a href="#" className="brand-logo"><i className="material-icons">cloud</i></a>
                <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down" id="mobile-demo">
                  <li><a href="#"><i className="material-icons">search</i></a></li>
                  <li><a href="#"><i className="material-icons">view_module</i></a></li>
                  <li><a href="#"><i className="material-icons">refresh</i></a></li>
                  <li><a href="#"><i className="material-icons">more_vert</i></a></li>
                </ul>
              </div>
            </nav>)
    }
}

export default NavBar