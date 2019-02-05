/**
 * @fileoverview Componente, Menu lateral aplicación
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
import { Link } from "react-router-dom";

const btnClose =  {border: "none",
                   backgroundColor: "transparent",
                   padding: "0 23.5px 0 31px",
                   textAlign : "left",
                   fontSize: "14px",
                   width: "100%"}

/**
* Renderiza el menú izquierdo
* @prop {object} routes //rutas de la app
* @prop {string} logo //ruta del logo de la tienda
* @prop {object} fatherC //categorias padre
* @prop {string} loginStatus //Indica si hay una sessión activa, 1 = true.
* @prop {object} user //información del usuario logueado
* @prop {string} token token de seguridad
* @prop {string} dashboard ruta para acceder al dashboard
*/
class Menu extends React.Component{

    componentDidMount(){
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elems, {});
    }

    setList(){
      var list = []
      this.props.fatherC.forEach( father => {
        list.push(<LiFatherC father={father} key={"li"+father.id}/>)
      })
      return list;
    }
  
    render(){
      var {logo,routes,loginStatus,user, token, dashboard} = this.props;
      var liOptions;

      if(loginStatus == "1"){
        liOptions = <li className="no-padding">
                      <ul className="collapsible collapsible-accordion">
                        <li>
                          <a className="collapsible-header">{user.name}<i className="material-icons">arrow_drop_down</i></a>
                          <div className="collapsible-body">
                            <ul>
                              <li>
                                <form method="POST" action={routes.logOut} >
                                  <input type="hidden" name="_token" value={token}/>
                                  <button type="submit" style={btnClose}>Salir</button>
                                </form>
                              </li>
                              <li>
                                <a href={dashboard} className="collapsible-header waves-effect waves-green">Panel de administración</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </li>
      }
      else{
        liOptions = <div>
                          <li><a href={routes.logIn} >Iniciar sessión</a></li>
                          <li><a href={routes.register} >Registrarsé</a></li>
                    </div>
      }

      return(<ul id="slide-out" className="sidenav sidenav-fixed">
                        <li id="logoMain">
                          <div className="user-view">
                                <div className="responsive-img">
                                  <center><a href={routes.shop}><img src={logo} style={ {width:"100%"} }/></a><br/></center>
                                </div>
                          </div>
                      </li>
                      <li>
                        <Link to="/ecotienda"><span className="tittles rem1-5 tittle">Ambientes sostenibles</span></Link>
                      </li>
                
                  <li className="search">
                      <form method="GET" action={routes.busqueda} autoComplete="off" role="search">
  
                               <div className="search-wrapper card">
                                  <input id="search" name="search"/><i className="material-icons" placeholder="Buscar..." value="">search</i>
                                  <div className="search-results"></div>
                               </div>
  
                      </form>
                  </li>
                  
                  {liOptions}

                  {this.setList()}
  
                  
             </ul>)
    }
}


/**
* Renderiza los li con las categorias padre de el menu
* @prop {object} father //informacion de la categoria padre
*/
class LiFatherC extends React.Component{

  constructor(props){
    super(props)
    this.state = {list:[]}
  }

  componentDidMount(){
    let list = []
    this.props.father.shop_categories.forEach( category => {
      list.push(<li key={category.id}>
                  <Link to={"/ecotienda/categoria/"+this.props.father.id+"/subcategoria/"+category.id} className="collapsible-header waves-effect waves-green">
                      {category.name}
                  </Link>
                </li>)
    })
    this.setState({list:list})

    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});
  }

  render(){
    return(<li className="no-padding">
            <ul className="collapsible collapsible-accordion">
              <li>
                <a className="collapsible-header">{this.props.father.name}<i className="material-icons">arrow_drop_down</i></a>
                <div className="collapsible-body">
                  <ul>
                    {this.state.list}
                  </ul>
                </div>
              </li>
            </ul>
          </li>)
  }
}

export default Menu