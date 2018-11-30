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


/**
* Contenedor principal de los productos de una categoria
* @prop {ProductController} productController //instancia de productController para realizar peticiones a la API
* @prop {string} defaultImg // imagen default de productoss
*/
class ContenedorMain extends React.Component{

    constructor(props){
      super(props)
      this.state = {products: []}
    }
  
    componentDidMount(){
      this.props.productController.getProducts( data => {
        console.log(`[debug] productos`, data);
        this.setState({products:data.products})
      })
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
      return(<div id="contenedorProductos">
              <center><h1>Últimos productos</h1></center>
              <div>
                <div className="row">
                  {this.renderCardProduct() }
                </div>
              </div>
             </div>)
    }
  }