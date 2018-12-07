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
              <div className="nav-wrapper topNavDashboard">
                <a href="#" className="brand-logo">Ambientes sostenibles</a>
                <a  href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              </div>
            </nav>)
    }
}

export default NavBar