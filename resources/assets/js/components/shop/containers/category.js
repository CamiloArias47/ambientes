/**
 * @fileoverview Componente, Contenedor principal de la vista de categorias
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
import {CardProduct} from '../components'

/**
* Contenedor principal de los productos de una categoria
* @prop {ProductModel} productModel //instancia de productModel para realizar peticiones a la API
* @prop {string} defaultImg // imagen default de productoss
* @prop {object} match 
*/
class ViewCategory extends React.Component{

    constructor(props){
      super(props)
      this.state = {products: []}

      this.productModel = this.props.productModel
    }
  
    componentDidMount(){
      let {match} = this.props
      this.getProducts(match.params.father, match.params.cat)
    }

    componentWillReceiveProps(nextProps){
      this.getProducts(nextProps.match.params.father, nextProps.match.params.cat )
    }

    getProducts(father, category){
      this.productModel.filter(father, category, "", "")
        .then( data => { this.setState({products:data.father})} )
        .catch(e => console.error(`[debug] error en petición filtro:${e}`,e) )
    }
  
    renderCardProduct(){
      let cards = []
      var set = []
      var i = 0,
          j = 0;
      this.state.products.forEach( product =>{
        set.push(<CardProduct key={"cardProduct-id"+product.id}
                                product={product}
                                defaultImg={this.props.defaultImg}/>)
        i++;
        j++;
        if(i == 3 || (this.state.products.length == j && i < 3) ){
          cards.push(<div className="row" key={"rowproduct"+product.id}>{set}</div>)
          set = [];
          i = 0;
        }
      })
  
      return cards
    }
  
    render(){
      let products = this.renderCardProduct()
      return(<div id="contenedorProductos">
              <center><h1>Categoria, subcategoria</h1></center>
                {products}
             </div>)
    }
  }

  export default ViewCategory