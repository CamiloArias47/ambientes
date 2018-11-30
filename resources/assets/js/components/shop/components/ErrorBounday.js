/**
 * @fileoverview Componente que se rendeiza en caso de error
 *  lo uso cuando en el componente Product (vista del producto)
 *  por si hay un error en la petición
 * 
 * @version 1
 * 
 * @author Camilo arias <CamiloArias47>
 * 
 * history
 * v1 Creación del componente <CamiloArias47>
 */

 import React from 'react'

 class ErrorBoundary extends React.Component{
     constructor(props){
         super(props)
         this.state = {hasError:false}
     }

     componentDidCatch(error,info){
         this.setState({hasError:true})
     }

     render(){
         if(this.state.hasError){
             return <h1>Algo ha ocurrido!...</h1>
         }

         return this.props.children
     }

 }

 export default ErrorBoundary