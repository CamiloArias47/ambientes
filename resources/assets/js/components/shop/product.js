import React     from 'react'
import Loader from './loader'

/**
*Renderiza la vista de detalles de un producto
*/
class Product extends React.Component{

  constructor(props){
    super(props)

    this.state = {product : this.props.product}
  }

  componentDidMount(){
    console.log(`[debug] match.params.id : ${this.props.match.params.id}`);
    this.props.getProduct(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps){
    this.props.getProduct(this.props.match.params.id)
    this.setState({product:nextProps})

  }

  /**
  * Hacer un ErrorBoundary para las peticiones
  */
  render(){
    if(this.state.product){
      return(<div>
              <h3>ID: {this.props.product.name}</h3>
             </div>)
    }

    return  <Loader />
  }
}


export default Product
