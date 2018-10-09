import React            from 'react'
import ReactDOM         from 'react-dom'

import Ecommerce from "../ecommerce/index.js";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Main extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      name : this.props.name,
      routes : this.props.routes
    }

    this.exitSession = this.exitSession.bind(this);
  }

  exitSession(){
  let  opts =  {headers: {'Accept': 'application/json',
                          'Content-Type': 'application/json'},
                 method:'POST'
                }
    console.log(this);
  fetch(this.props.routes.logout,opts)
    .then( res => res.json() )
    .then( data => { console.log("[ambientes] adios!");} )
    .catch(e => console.error(`[peticion] '/saveCategory'`) )
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
  }

  render(){
    return(<Router>
             <div>
                <ul id="slide-out" className="sidenav sidenav-fixed">
                  <li>
                    <div className="user-view">
                      <div className="background">
                        <img src={ this.props.images.backgroundMenu } />
                      </div>
                      <a href="#user"><img className="circle" src={this.props.images.profileImg}/></a>
                      <a href="#name"><span className="white-text name">{this.state.name}</span></a>
                      <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                    </div>
                  </li>
                  <li><Link to="/dashboard"><i className="material-icons">home</i> Home</Link></li>
                  <li><Link to="/dashboard/ecommerce"><i className="material-icons">shopping_cart</i> Ecommerce</Link></li>
                  <li><div className="divider"></div></li>
                  <li><a className="subheader">Subheader</a></li>
                  <li>
                    <form method="POST" action={this.props.routes.logout}>
                      <input type="hidden" name="_token" value={this.props.token}/>
                      <button type="submit" className="btnExitSession"><i className="material-icons left">exit_to_app</i>Cerrar sesión</button>
                    </form>
                  </li>
                </ul>

                <main>
                  <nav id="topNavDashboard">
                    <div className="nav-wrapper topNavDashboard">
                      <a href="#" className="brand-logo">Titulo de sección</a>
                      <a  href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                      <ul className="right hide-on-med-and-down" id="mobile-demo">
                        <li><a href="#"><i className="material-icons">search</i></a></li>
                        <li><a href="#"><i className="material-icons">view_module</i></a></li>
                        <li><a href="#"><i className="material-icons">refresh</i></a></li>
                        <li>
                            <form method="POST" action={this.props.routes.logout}>
                              <input type="hidden" name="_token" value={this.props.token}/>
                              <button type="submit" className="btnExitSession"><i className="material-icons left">exit_to_app</i>Cerrar sesión</button>
                            </form>

                        </li>
                      </ul>
                    </div>
                  </nav>

                  <div>
                    <Route path="/dashboard/ecommerce" component={ (props) => <Ecommerce {...props} fatherCategories={this.props.fatherCategories}
                                                                                                brands={this.props.brands}
                                                                                                tags={tags}
                                                                                                routes={this.props.routes}
                                                                                                defaultImg={this.props.defaultImg}
                                                                                                maxUpload={this.props.maxUpload}
                                                                                                products={this.props.products}
                                                                                                prev={this.props.prev} /> } />
                  </div>
                </main>
             </div>
           </Router>)
  }
}



setTimeout(()=>{
	ReactDOM.render(<Main name={name}
                        images={images}
                        routes={routes}
                        token={token}

                        fatherCategories={fatherCategories}
  		                  brands={brands}
  		                  tags={tags}
  		                  routes={routes}
  		                  defaultImg={defaultImg}
  		                  maxUpload={maxUpload}
  		                  products={products}
  		                  prev={prev}/>, document.getElementById('ReactRoot'))
},1000)
