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


import React from 'react'

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

export default SocialBar