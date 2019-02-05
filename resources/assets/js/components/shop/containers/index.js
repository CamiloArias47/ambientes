import React     from 'react'
import ReactDOM  from 'react-dom'
import {User,
        Product as ProductModel} from '../../../models'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Product from './product.js'
import ViewCategory from './category'
import {CardProduct,
        SocialBar,
        NavBar,
        Footer,
        Banner,
        Menu,
        ErrorBoundary
      } from '../components'


/**
* Contenedor principal que contiene los productos, en la p
* @prop {ProductModel} productModel //instancia de productModel para realizar peticiones a la API
* @prop {string} defaultImg // imagen default de productoss
*/
class ContenedorMain extends React.Component{

  constructor(props){
    super(props)
    this.state = {products: []}
  }

  componentDidMount(){
    this.props.productModel.getProducts( data => {
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


/**
* Renderiza el home de la ecommer
* @prop {string} bannerImg //ruta de la imagen principal
* @prop {ProductModel} productModel //instancia de productModel para realizar peticiones
* @prop {string} defaultImg //ruta de la imagen por defecto para productos sin imagen
*/
class Home extends React.Component{
  render(){
    return(<div>
              <Banner bannerImg={this.props.bannerImg}/>
              <ContenedorMain productModel={this.props.productModel}
                              defaultImg={this.props.defaultImg}/>
           </div>)
  }
}



/**
*
*/
class Index extends React.Component{

  constructor(props){
    super(props)

    this.state = {product:null,
                  user: {name:"nombre",
                         email:"email"}}

    var routesproducts = {getProducts: this.props.props.routes.getProducts,
                          getProduct: this.props.props.routes.getProduct,
                          filter: this.props.props.routes.filter}

    this.productModel = new ProductModel(this.props.props.token, routesproducts)
    this.userModel = new User(this.props.props.token, {getuser: this.props.props.routes.getuser})

  }

  componentDidMount(){
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {preventScrolling:false,
                                           onOpenEnd: ()=>{
                                             //var overlay = document.querySelectorAll('.sidenav-overlay')
                                             //overlay[0].style.display = "none";
                                             //console.log(`Overlay : ${overlay}`, overlay[0]);
                                           } });
    var instance = M.Sidenav.getInstance(elems[0]);

    if(this.props.props.auht == "1"){
      console.log(`Entre aca`)
      this.userModel.getUser.then(data => this.setState({user: data}))
                            .catch(e => console.error(`[debug] error al obtener usuario ${e}`));
    }
  }

  render(){
    return(<Router>
            <div>
                <SocialBar/>
                <NavBar loginStatus={this.props.props.auht} 
                        logInRoute={this.props.props.routes.logIn}
                        register={this.props.props.routes.register}
                        dashboard={this.props.props.routes.dashboard}
                        logOut={this.props.props.routes.logOut}
                        token={this.props.props.token}
                        user={this.state.user}/>
                <Menu routes={this.props.props.routes}
                      logo={this.props.props.logo}
                      fatherC={this.props.props.fatherC}
                      user={this.state.user}
                      loginStatus={this.props.props.auht} 
                      token={this.props.props.token}
                      dashboard={this.props.props.routes.dashboard}/>
                <main>
                  <Route path="/ecotienda" exact render={ (props) => <Home bannerImg={this.props.props.bannerImg}
                                                                           productModel={this.productModel}
                                                                           defaultImg={this.props.props.imgDefaultProduct}/> }
                  />

                  <Route path="/ecotienda/producto/:id" render={ (props) => <ErrorBoundary>
                                                                              <Product match={props.match}
                                                                                      productModel={this.productModel}
                                                                                      defaultImg={this.props.props.imgDefaultProduct}/>
                                                                            </ErrorBoundary> }/>

                  <Route path="/ecotienda/categoria/:father/subcategoria/:cat" render={ props => <ViewCategory match={props.match}
                                                                                                               productModel={this.productModel}
                                                                                                               defaultImg={this.props.props.imgDefaultProduct}/>}/>
                </main>
                <Footer />

            </div>
          </Router>)
  }
}



setTimeout(()=>{
	ReactDOM.render(<Index props={props}/>, document.getElementById('ReactRoot'))
},1000)
