/**
 * @fileoverview Componente, renderiza una tarjeta de un producto
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
import { Link } from "react-router-dom"

/**
*Renderiza la tarjeta del producto
* @prop {object} product //objeto con la información del producto
* @prop {string} defaultImg //ruta de la imagen del producto por defecto
*/
class CardProduct extends React.Component{

    constructor(props){
      super(props)
      this.state = {imgRoute : (this.props.product.shop_images.length > 0) ? this.props.product.shop_images[0].route : this.props.defaultImg}
    }
  
    renderTags(){
      var tags = []
      this.props.product.shop_tags.forEach( tag => {
        tags.push(<div className="chip" key={"tag-"+tag.name+"id"+tag.id}>
                   {tag.name}
                  </div>)
      })
      return tags
    }
  
  
    render(){
      var {product} = this.props

      return(<div className="col s12 m6 l4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={ (product.shop_images.length > 0) ? product.shop_images[0].route : this.state.imgRoute } />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                    <Link to={"/ecotienda/producto/"+product.id}>{ this.props.product.name}</Link>
                    <i className="zmdi zmdi-more-vert right"></i>
                  </span>
                  <Link to={"/ecotienda/producto/"+product.id}>
                    <p>Más información.</p>
                  </Link>
                  
                  
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">{ this.props.product.name} <i className="zmdi zmdi-close right"></i></span>
                  <div dangerouslySetInnerHTML={{__html: this.props.product.description}}></div>
                  <div>{this.renderTags()}</div>
                </div>
              </div>
            </div>)
    }
  }

  export default CardProduct