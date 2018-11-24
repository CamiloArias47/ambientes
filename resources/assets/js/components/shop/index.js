import React     from 'react'
import ReactDOM  from 'react-dom'
import ProductController from '../../controllers/productController.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

/**
*Renderiza la barra de redes sociales
*/
class SocialBar extends React.Component{
  render(){
    return(<div className="social-bar">
              <a href="#" className="icon icon-facebook2" target="_blank"></a>
              <a href="#" className="icon icon-youtube" target="_blank"></a>
              <a href="#" className="icon icon-instagram" target="_blank"></a>
            </div>)
  }
}

/**
*Renderiza La barra para moviles
*/
class NavBar extends React.Component{
  render(){
    return(<nav id="topNav">
            <div className="nav-wrapper topNav">
              <a href="#" className="brand-logo"><i className="material-icons">cloud</i></a>
              <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down" id="mobile-demo">
                <li><a href="#"><i className="material-icons">search</i></a></li>
                <li><a href="#"><i className="material-icons">view_module</i></a></li>
                <li><a href="#"><i className="material-icons">refresh</i></a></li>
                <li><a href="#"><i className="material-icons">more_vert</i></a></li>
              </ul>
            </div>
          </nav>)
  }
}

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

/**
*Renderiza el footer de la tienda
*/
class Footer extends React.Component{
  render(){
    return(<footer className="footer">
          		<div className="container">
          			<div className="row">
          				<div className="col s12">
          					<h5>Proveedores fabricantes.</h5>
          				</div>

          				<div className="col s12 m7">
          					<h5>CONTACTANOS</h5>
          					<hr/>
          					<p>
          						<i className="fa fa-map-marker"></i> Carrera 2 # 60 – 107.  Cali–Colombia<br/>
          						<i className="fa fa-mobile"></i> (57) (2)  - 315 251 6472 <br />
          						<i className="fa fa-phone"></i> (57) (2)  - 388 2461<br />
          						<i className="fa fa-envelope"></i> proyectoscol@ambientessostenibles.com
          					</p>

          				</div>

          				<div className="col s12 m5 follow">
          					<ul className="center-align">
          						<p>
          							<li><b>Siguenos</b></li>
          							<br/>
          							<li><a href="#"><i className="fa fa-facebook"></i> &nbsp; Facebook</a></li>
          							<li><a href="#"><i className="fa fa-instagram"></i> &nbsp; Instagram</a></li>
          						</p>
          					</ul>
          				</div>



          				<div className="col s12 tittles footer-copyright">Ambientes Sostenobles &copy; 2018</div>
          			</div>
          		</div>
          	</footer>)
  }
}


/**
* Renderiza el banner de la tienda
*@prop {string} bannerImg //ruta de la imagen del banner
*/
class Banner extends React.Component{

  componentDidMount(){
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, {});
  }

  render(){
    return(<div id="index-banner" className="parallax-container">
              <div className="section no-pad-bot">
                <div className="container">
                  <br/><br/><br/><br/>
                  <h1 className="center color-green"><b>Ambientes sostenibles</b></h1>
                  <div className="row center">
                    <h5 className="header col s12 light">Comprometidos con tu bienestar y el de tu familia</h5>
                  </div>
                  <br/><br/>

                </div>
              </div>
              <div className="parallax"><img src={this.props.bannerImg} alt="" style={{transform: "translate3d(-50%, 356px, 0px)", display: "block"}}/></div>
           </div>)
  }
}


/**
* COntenedor principal que contiene los productos
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

/**
*Renderiza la tarjeta del producto
* @prop {object} product //objeto con la información del producto
* @prop {string} defaultImg //ruta de la imagen del producto por defecto
*/
class CardProduct extends React.Component{

  constructor(props){
    super(props)
    this.state = {imgRoute : (this.props.product.shop_images.length > 0) ? this.props.product.shop_images[0].route : "#"}
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
    return(<div className="col s12 m6 l4">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={ (this.props.product.shop_images.length > 0) ? this.props.product.shop_images[0].route : this.props.defaultImg } />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{ this.props.product.name}<i className="zmdi zmdi-more-vert right"></i></span>
                <p><a href="#">Más información.</a></p>
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

/**
* Renderiza el home de la ecommer
* @prop {string} bannerImg //ruta de la imagen principal
* @prop {ProductController} productController //instancia de productController para realizar peticiones
* @prop {string} defaultImg //ruta de la imagen por defecto para productos sin imagen
*/
class Home extends React.Component{
  render(){
    return(<div>
              <Banner bannerImg={this.props.bannerImg}/>
              <ContenedorMain productController={this.props.productController}
                              defaultImg={this.props.defaultImg}/>
           </div>)
  }
}

/**
*
*/
class Match extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(<div>
            <h3>ID: {this.props.match.params.id}</h3>
           </div>)
  }
}


/**
*
*/
class Index extends React.Component{

  constructor(props){
    super(props)

    var routesproducts = {getProducts: this.props.props.routes.getProducts}
    this.productController = new ProductController(this.props.props.token, routesproducts)
  }

  render(){
    return(<Router>
            <div>
                <SocialBar/>
                <NavBar />
                <Menu routes={this.props.props.routes}
                      logo={this.props.props.logo}
                      fatherC={this.props.props.fatherC}/>
                <main>
                  <Route path="/ecotienda" exact render={ (props) => <Home bannerImg={this.props.props.bannerImg}
                                                                               productController={this.productController}
                                                                               defaultImg={this.props.props.imgDefaultProduct}/> }
                  />
                <Route path="/ecotienda/:id" component={Match} />
                </main>
                <Footer />

            </div>
          </Router>)
  }
}


setTimeout(()=>{
	ReactDOM.render(<Index props={props}/>, document.getElementById('ReactRoot'))
},1000)
