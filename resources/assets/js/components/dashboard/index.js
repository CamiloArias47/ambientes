import React            from 'react'
import ReactDOM         from 'react-dom'

import Ecommerce from "../ecommerce/index.js";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Main extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      routes : this.props.routes,
      titleModule : "Dashboard"
    }

    this.setTitleModule = this.setTitleModule.bind(this)
  }

  setTitleModule(title){
    this.setState({titleModule:title});
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

        var {images,user, routes, token, defaultImg, maxUpload, products, prev} = this.props;

        return(<Router>
             <div>
                <ul id="slide-out" className="sidenav sidenav-fixed">
                  <li>
                    <div className="user-view">
                      <div className="background">
                        <img src={ images.backgroundMenu } />
                      </div>
                      <a href="#user"><img className="circle" src={user.profileImg}/></a>
                      <a href="#name"><span className="white-text name">{user.name}</span></a>
                      <a href="#email"><span className="white-text email">{user.email}</span></a>
                    </div>
                  </li>
                  <li><a href={routes.shop}><i className="material-icons">home</i>Ecotienda</a></li>
                  <li><Link to="/dashboard"><i className="material-icons">pie_chart</i> Home</Link></li>
                  <li><Link to="/dashboard/ecommerce"><i className="material-icons">shopping_cart</i> Ecommerce</Link></li>
                  <li><div className="divider"></div></li>
                  <li><a className="subheader">Subheader</a></li>
                  <li>
                    <form method="POST" action={routes.logout}>
                      <input type="hidden" name="_token" value={token}/>
                      <button type="submit" className="btnExitSession"><i className="material-icons left">exit_to_app</i>Cerrar sesión</button>
                    </form>
                  </li>
                </ul>

                <main>
                  <nav id="topNavDashboard">
                    <div className="nav-wrapper topNavDashboard">
                      <a href="#" className="brand-logo">{this.state.titleModule}</a>
                      <a  href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                      <ul className="right hide-on-med-and-down" id="mobile-demo">
                        <li><a href="#"><i className="material-icons">search</i></a></li>
                        <li><a href="#"><i className="material-icons">view_module</i></a></li>
                        <li><a href="#"><i className="material-icons">refresh</i></a></li>
                        <li>
                            <form method="POST" action={routes.logout}>
                              <input type="hidden" name="_token" value={token}/>
                              <button type="submit" className="btnExitSession"><i className="material-icons left">exit_to_app</i>Cerrar sesión</button>
                            </form>

                        </li>
                      </ul>
                    </div>
                  </nav>

                  <div> 
                    <Route path="/dashboard/ecommerce" render={ (props) => <Ecommerce {...props} routes={routes}
                                                                                                 token={token}
                                                                                                 defaultImg={defaultImg}
                                                                                                 maxUpload={maxUpload}
                                                                                                 products={products}
                                                                                                 prev={prev}
                                                                                                 setTitleModule={this.setTitleModule} /> }
                    />


                  </div>
                </main>
             </div>
           </Router>)
  }
}


setTimeout(()=>{
	ReactDOM.render(<Main user={user}
                        images={images}
                        routes={routes}
                        token={token}

                        fatherCategories={fatherCategories}
  		                  defaultImg={defaultImg}
  		                  maxUpload={maxUpload}
  		                  products={products}
  		                  prev={prev}/>, document.getElementById('ReactRoot'))
},1000)
