/**
 * @fileoverview Componente, Banner de la tienda
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

export default Banner