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

const btnMenu = {display: "inlineBlock"},
      formClose = {fontSize: "16px",
                  color: "#26a69a",
                  display: "block",
                  lineHeight: "22px",
                  padding: "14px 16px"},
      btnClose = {border: "none",
                  backgroundColor: "transparent",
                  padding: "0px",
                  textAlign: "left",
                  width: "100%"}

/**
*Renderiza La barra de navegación superior
* @prop {string} loginStatus 1 si esta logeado, "" si no
* @prop {string} logInRoute ruta para loguearse
* @prop {string} register ruta al formulario de rigistro
* @prop {string} dashboard ruta para acceder al dashboard
* @prop {string} logOut ruta para cerrar sessión
* @prop {string} token token de seguridad
*/
class NavBar extends React.Component{

    componentDidMount(){
      $(".dropdown-trigger").dropdown();
    }

    render(){
      var logIn;

      if(this.props.loginStatus == "1"){
        logIn = <li>
                  <a className="dropdown-trigger" href="#!" data-target="dropdown1">{this.props.user.name}<i className="material-icons right">arrow_drop_down</i></a>
                </li>
      }
      else{
        logIn = <div>
                      <li><a href={this.props.logInRoute} >Iniciar sessión</a></li>
                      <li><a href={this.props.register} >Registrarsé</a></li>
                </div>
      }

      return(<div className="navbar-fixed">
                <ul id="dropdown1" className="dropdown-content">
                  <li>
                    <a href="#!">two</a>
                  </li>
                  <li>
                      <form method="POST" action={this.props.logOut} style={formClose}>
                        <input type="hidden" name="_token" value={this.props.token}/>
                        <button type="submit" style={btnClose}>Salir</button>
                      </form>
                  </li>
                  <li className="divider"></li>
                  <li><a href={this.props.dashboard}>Panel de administración</a></li>
                </ul>
                <nav id="topNav">
                  <div className="nav-wrapper topNavDashboard">
                    <a href="#" className="brand-logo">Ambientes</a>
                    <a  href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                      <li>
                        
                      </li>
                      {logIn}
                    </ul>
                  </div>
                </nav>
            </div>)
    }
}

export default NavBar