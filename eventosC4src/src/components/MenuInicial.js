import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/offcanvas'
import 'bootstrap/js/dist/dropdown'
import { Link } from 'react-router-dom'
//import {useEffect, useState} from 'react'

import Cookies from 'universal-cookie'
//import Cronometro from './Cronometro'
const cookies = new Cookies();

class MenuInicial extends Component {

  state={
    estaLoguin:false
  }

  componentDidMount(){
    if(cookies.get("usu_nombres")){
      this.setState({estaLoguin:true})
    }else{
      this.setState({estaLoguin:false})
      // window.location.href="./" /// redirigir al inicio
    }
  }

  cerrarSesion(){
    cookies.remove("usu_id",{path:"/"})
    cookies.remove("usu_email",{path:"/"})
    cookies.remove("usu_nombres",{path:"/"})
    cookies.remove("usu_apellidos",{path:"/"})
    //window.location.href="./"
    this.setState({estaLoguin:false})
  }

render() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/' >
          <img src="" width={120} alt="Deportes" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item" hidden={this.state.estaLoguin}>
              <Link className="nav-link" aria-current="page" to='/PageLogin'><h4>Login</h4></Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLoguin}>
              <Link className="nav-link" aria-current="page" to='/PageInicio'><h4>Marcadores</h4></Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLoguin}>
              <Link className="nav-link" aria-current="page" to='/PageEventos'><h4>Eventos</h4></Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLoguin}>
              <Link className="nav-link" aria-current="page" to='/PageDeportes'><h4>Deportes</h4></Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLoguin}>
              <Link className="nav-link" aria-current="page" to='/PageEquipos'><h4>Equipos</h4></Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLoguin}>
              <Link className="nav-link" aria-current="page" to='/PageUsuarios'><h4>Usuarios</h4></Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLoguin}>
              <Link className="nav-link" onClick={()=>this.cerrarSesion()} to='/'><h4>Salir</h4></Link>
            </li>
          </ul>
        </div>
        <div hidden={!this.state.estaLoguin}>
          <h4 style = {{color:'white'}}>{cookies.get("usu_email")}</h4>
        </div>
      </div>
    </nav>
  );
}
}


export default MenuInicial;