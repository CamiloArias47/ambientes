import React     from 'react'
import ReactDOM  from 'react-dom'
import ProductController from '../../controllers/productController.js'

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
    		        	<span className="tittles rem1-5 tittlee">Ambientes sostenibles</span>
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
*
*/
class ContenedorMain extends React.Component{

  render(){
    return(<div id="contenedorProductos">
            <center><h1>Últimos productos</h1></center>
            <div>
              <div className="row">
                <div className="col s12 m6 l4">
    							<div className="card">
    								<div className="card-image waves-effect waves-block waves-light">
    									<img className="activator" src="" />
    								</div>
    								<div className="card-content">
    									<span className="card-title activator grey-text text-darken-4">Contenedores de sopa <i className="zmdi zmdi-more-vert right"></i></span>
    									<p><a href="#">Más información.</a></p>
    								</div>
    								<div className="card-reveal">
    									<span className="card-title grey-text text-darken-4">Contenedores de sopa <i className="zmdi zmdi-close right"></i></span>
    									<p>Estas bandejas están hechas de Bagasse, un recurso fácilmente renovable: ¡es tallo de caña de azúcar! La calidad de estos platos superfuertes es asombrosa y lo mejor, ningún árbol se dañó para hacerlos.
                      <br />El tamaño del compartimento miden 10 x 8 x 1.0 y tienen 5 compartimentos.
                      </p>
    								</div>
    							</div>
    						</div>
              </div>
            </div>
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

  componentDidMount(){
    this.productController.getProducts( products => {
      console.log(`[debug] Tengo todos los productos: ${products}`, products);
    })
  }

  render(){
    return(<div>
              <SocialBar/>
              <NavBar />
              <Menu routes={this.props.props.routes}
                    logo={this.props.props.logo}
                    fatherC={this.props.props.fatherC}/>
              <main>
                <Banner bannerImg={this.props.props.bannerImg}/>
                <ContenedorMain/>
              </main>
              <Footer />

           </div>)
  }
}


setTimeout(()=>{
	ReactDOM.render(<Index props={props}/>, document.getElementById('ReactRoot'))
},1000)
