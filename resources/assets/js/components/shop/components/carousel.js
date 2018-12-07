/**
 * @fileoverview Compoenente, renderiza un carousel 
 * 
 * @version 1
 * 
 * @author Camilo Arias <CamiloArias47>
 * 
 * History
 * v1 Creación componente
 */

 import React from 'react'
 import "react-responsive-carousel/lib/styles/carousel.min.css";
 import { Carousel as Carrousel} from 'react-responsive-carousel';

 /**
  * @prop {array} images //array con las imagenes del carrusel
  * @prop {string} defaultImg //ruta de la imagen por defecto en caso que pasen un array vacio
  */
 class Carousel extends React.Component{
     constructor(props){
         super(props)
         var imgDefault = [{id:1,route:this.props.defaultImg}]

         this.state = {images : (this.props.images && this.props.images.length > 0) ? this.props.images : imgDefault,
                       default : [{id:1,route:this.props.defaultImg}] }
     }

     componentWillReceiveProps(nextProps){
         var img = (nextProps.images && nextProps.images.length > 0) ? nextProps.images : this.state.default
         this.setState({images:img})
     }


     renderCarousel(){
        let imgs = []
        this.state.images.map(img => {
          imgs.push(<div key={"imgCarouse"+img.id}>
                        <img src={img.route}/>
                    </div>)
        })
    
        return imgs
      }

      render(){
          var imgs = this.renderCarousel()
          return <Carrousel>
                    {imgs}
                 </Carrousel>
      }
 }

export default Carousel