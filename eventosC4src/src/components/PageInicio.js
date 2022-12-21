import React, { Component } from "react";

class PageInicio extends Component{
    render(){
        return <h1>Página Inicio</h1>
    }
}

export default PageInicio

///////////////////////////////////


/*import React, { Component } from 'react'
import '../hojas-de-estilo/PageInicio.css'

import axios from "axios";//
import "bootstrap/dist/css/bootstrap.min.css";//


const url = process.env.REACT_APP_URL_MARCADORES

class PageInicio extends Component{

    state={
        data: []
    }


    peticionGet = () => {
        axios.get(url)
        .then(response => {
          //console.log(response.data);
          this.setState({
            data:response.data
          })
          //console.log(this.state.data);
        }).catch(error => {
          console.log(error.message);
        })
      }

      componentDidMount(){
        this.peticionGet()
      }


    render(){
        return <div className='divPrincipalInicio'>
            <table className="table ">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Equipo1</th>
            <th>Marcador Equipo1</th>
            <th>Equipo2</th>
            <th>Marcador Equipo2</th>
            <th>Deporte</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(evento => {
            return(
              <tr key={evento.eve_id}>
                <td>{evento.eve_fecha}</td>
                <td>{evento.equ_equipo1}</td>
                <td><h5>{evento.eve_marca1}</h5></td>
                <td>{evento.equ_equipo2}</td>
                <td><h5>{evento.eve_marca2}</h5></td>
                <td>{evento.dep_id}</td>
                <td>{evento.eve_descrip}</td>
              </tr>
            )
          })}
        </tbody>
        </table>
        </div>
    }
}

export default PageInicio*/