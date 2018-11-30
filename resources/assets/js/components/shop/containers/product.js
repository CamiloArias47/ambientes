/**
 * @fileoverview Componente contenedor de la información de un producto (vista de un producto)
 *
 * @version 1
 *
 * @author Camilo Arias <CamiloArias47>
 * @copyright 
 *
 * History
 * v1 Creacion componente <CamiloArias47>
*/



import React     from 'react'
import {Loader} from '../components'

/**
*Renderiza la vista de detalles de un producto
*@prop {object} match 
*@prop {ProductController} productController
*/
class Product extends React.Component{

  constructor(props){
    super(props)

    this.state = {product : null,
                  productId : this.props.match.params.id,}
  }

  componentDidMount(){
    console.log(`[debug] product.js componentDidMount match: ${this.props.match}`,this.props.match);
    console.log(`[debug] product.js componentDidMount productController: ${this.props.productController}`,this.props.productController)
    this.getProduct(this.state.productId);
  }

  componentWillReceiveProps(nextProps){
    console.log(`[debug] product.js nextProps: ${nextProps}`,nextProps)
    this.setState({productId:nextProps.match.params.id})
    this.getProduct(nextProps.match.params.id)
  }

  getProduct(id){
    console.log(`[debug] getProduct() id: ${id}`)
    this.props.productController.getProduct(id, data=>{this.setState({product:data.product})})
  }

  /**
  * Hacer un ErrorBoundary para las peticiones
  */
  render(){
    if(this.state.product){
      return(<div>
              <h3>ID: {this.state.product.name}</h3>
             </div>)
    }

    return  <Loader />
  }
}


export default Product
