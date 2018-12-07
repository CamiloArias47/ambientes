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
import {Loader, Carousel} from '../components'

/**
*Renderiza la vista de detalles de un producto
*@prop {object} match 
*@prop {ProductController} productController
*@prop {string} defaultImg //ruta de imagen producto por defecto
*/
class Product extends React.Component{

  constructor(props){
    super(props)

    this.state = {product : null,
                  productId : this.props.match.params.id,}
  }

  componentDidMount(){
    this.getProduct(this.state.productId);
  }

  componentWillReceiveProps(nextProps){
    this.setState({productId:nextProps.match.params.id})
    this.getProduct(nextProps.match.params.id)
  }

  getProduct(id){
    this.props.productController.getProduct(id, data=>{this.setState({product:data.product})})
  }

  renderCarousel(){
    let imgs = []
    this.state.product.shop_images.map(img => {
      imgs.push(<a className="carousel-item" href={"#"+img.id} key={"imgCarouse"+img.id}><img src={img.route}/></a>)
    })

    return <div className="carousel">{imgs}</div>
  }

  /**
  * Hacer un ErrorBoundary para las peticiones
  */
  render(){
    if(this.state.product){
      let {product} = this.state

      return(<section>
              <div className="section white">
                <div className="row">
                  <div className="col m6 s12">
                    <Carousel images={product.shop_images} 
                              defaultImg={this.props.defaultImg}/>
                  </div>
                  <div className="col m6 s12">
                    <hr/>
                    <h1>{product.name}</h1>
                    <hr/>
                    <div id="ranking">
                      <a href="#" className="fa-star fa"></a>
                      <a href="#" className="fa-star fa"></a>
                      <a href="#" className="fa-star fa"></a>
                      <a href="#" className="fa-star fa"></a>
                      <a href="#" className="fa-star fa"></a>
                    </div>
                    <span>De <a href="#">{product.shop_brand.name}</a>  </span>
                    <div>
                      <p dangerouslySetInnerHTML={{__html: product.description}}></p>
                    </div>
                  </div>
                </div>
              </div>
             </section>)
    }

    return  <Loader />
  }
}


export default Product
