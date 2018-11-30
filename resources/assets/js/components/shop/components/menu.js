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

/**
* Renderiza el menú izquierdo
* @prop {object} routes //rutas de la app
* @prop {string} logo //ruta del logo de la tienda
* @prop {object} fatherC //categorias padre
*/
class Menu extends React.Component{

    setList(){
      var list = []
      this.props.fatherC.forEach( father => {
        list.push(<LiFatherC father={father} key={"li"+father.id}/>)
      })
      return list;
    }
  
    render(){
      console.log(`[debug] fatherC: ${this.props.fatherC}`,this.props.fatherC);
      return(<ul id="slide-out" className="sidenav sidenav-fixed">
                        <li id="logoMain">
                          <div className="user-view">
                                <div className="responsive-img">
                                  <center><a href={this.props.routes.shop}><img src={this.props.logo} style={ {width:"100%"} }/></a><br/></center>
                                </div>
                          </div>
                      </li>
                      <li>
                        <Link to="/ecotienda"><span className="tittles rem1-5 tittle">Ambientes sostenibles</span></Link>
                      </li>
                      <li>
                        <Link to="/ecotienda/producto/8">ir</Link>
                      </li>
                
                  <li className="search">
                      <form method="GET" action={this.props.routes.busqueda} autoComplete="off" role="search">
  
                               <div className="search-wrapper card">
                                  <input id="search" name="search"/><i className="material-icons" placeholder="Buscar..." value="">search</i>
                                  <div className="search-results"></div>
                               </div>
  
                      </form>
                  </li>
  
                  <ul className="container_menu">
                              <li className="no-padding">
                                 <ul className="collapsible " data-collapsible="expandable">
                                         {this.setList()}
                                  </ul>
                              </li>
                  </ul>
  
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
                  <a href="#" className="collapsible-header waves-effect waves-orange">
                    {category.name}
                  </a>
                </li>)
    })
    this.setState({list:list})

    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});
  }

  render(){
    return(<li className="bold"><a className="collapsible-header waves-effect waves-orange list"><b className="list">{this.props.father.name}</b></a>
              <div className="collapsible-body">
                  <ul className="collapsible " data-collapsible="expandable">
                      {this.state.list}
                  </ul>
              </div>
          </li>)
  }
}

export default Menu