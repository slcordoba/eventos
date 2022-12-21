/*import React, { Component } from "react";

class PageEventos extends Component{
    render(){
        return <h1>Página Eventos</h1>
    }
}

export default PageEventos*/



//////////////////////////////

///////////////////////////////////////////////////


import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Select from "react-select";

const urlEventos = process.env.REACT_APP_URL_EVENTOS
const urlDeportes = process.env.REACT_APP_URL_DEPORTES
const urlEquipos = process.env.REACT_APP_URL_EQUIPOS
const fieldId= process.env.REACT_APP_FIELD_ID_EVENTO


class  PageEventos extends Component {
  state = {
    eventos:[],
    equipos:[],
    deportes:[],
    modalInsertar:false,
    modalEliminar:false,
    tipoModal:'',
    form:{
      eve_id:"",
      eve_fecha:"",
      equ_equipo1:"",
      equ_equipo2:"",
      eve_marca1:"",
      eve_marca2:"",
      dep_id:"",
      eve_descrip:""
    },
  }

  //--------CRUD(create, read, update, delete)-------

  //GET
  peticionEventosGet = () => {
    axios.get(urlEventos)
    .then(response => {
      this.setState({
        eventos: response.data,
      })
      console.log("aqui" + this.state.eventos)
    }).catch(err => {
      console.log(err.message);
    })
  }

  peticionEquiposGet = () => {
    axios.get(urlEquipos)
    .then(response => {
      //console.log(response.data);
      this.setState({
        equipos: response.data
      })
    }).catch(err => {
      console.log(err.message);
    })
  }

  peticionDeportesGet = () => {
    axios.get(urlDeportes)
    .then(response=>{
      //console.log(response.data);
      this.setState({
        deportes: response.data
      })
    }).catch(err => {
      console.log(err.message);
    })
  }

  //POST
  peticionPost = async () => {
    delete this.state.form.eve_id
    await axios.post(urlEventos, this.state.form)
    .then(response=>{
      this.modalInsertar(); /// para cerrar la modal
      this.peticionEventosGet(); /// para actualizar el listado
    }).catch(err => {
      console.log(err.message);
    })
  }

  //PUT
  peticionPut = async () => {
    await axios.put(urlEventos + '/' + fieldId + '/' + this.state.form.eve_id, this.state.form)
    .then(response => {
      this.modalInsertar();
      this.peticionEventosGet();
    }).catch(err => {
      console.log(err.message);
    })
  }

  //DELETE
  peticionDelete=()=>{
    axios.delete(urlEventos + '/' + fieldId + '/' + this.state.form.eve_id)
    .then(response=>{
      this.modalEliminar();
      this.peticionEventosGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }
  //---------Fin del CRUD--------------------------

  modalInsertar=()=>{
    this.setState({
      modalInsertar: !this.state.modalInsertar
    })
  }

  modalEliminar=()=>{
    this.setState({
      modalEliminar: !this.state.modalEliminar
    })
  }

  handleChange = async e => {  /// función para capturar los datos del usuario. Es en 2do plano debe ser asincrona
    e.persist();           /// y por eso debemos especificar persistencia
    await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
      form:{
        ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
        [e.target.name]: e.target.value  /// los nombres de los imputs deben ser iguales a los del arreglo
      }
    });
    //console.log(this.state.form);  /// probar por consola lo que se guarda
  }

  seleccionarEvento = (evento) => {
    this.setState({
      tipoModal: 'actualizar',
      form:{
        eve_id: evento.eve_id,
        eve_fecha: evento.eve_fecha,
        equ_equipo1: evento.equ_equipo1,
        equ_equipo2: evento.equ_equipo2,
        eve_marca1: evento.eve_marca1,
        eve_marca2: evento.eve_marca2,
        dep_id: evento.dep_id,
        eve_descrip: evento.eve_descrip
      }
    })
  }

  componentDidMount(){
  this.peticionEventosGet();
  this.peticionEquiposGet();
  this.peticionDeportesGet();
  }

  render(){

    const form = this.state.form
    return (
      <div className="App">
        <br /><br /><br />

        <button
        className="btn btn-success"
        onClick = { () => {this.setState({form:null, tipoModal:'insertar'});
        this.modalInsertar()}}>Agregar Evento
        </button>
        <br /><br />
        

        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Equipo1</th>
              <th>Marcador Equipo 1</th>
              <th>Equipo2</th>
              <th>Marcador Equipo 2</th>
              <th>Deporte</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.eventos.map(evento  => {
                return (
                  <tr key={evento.eve_id}>
                    <td>{evento.eve_id}</td>
                    <td>{evento.eve_fecha}</td>
                    <td>{evento.equ_equipo1}</td>
                    <td>{evento.eve_marca1}</td>
                    <td>{evento.equ_equipo2}</td>
                    <td>{evento.eve_marca2}</td>
                    <td>{evento.dep_id}</td>
                    <td>{evento.eve_descrip}</td>
                    <td>
                      {evento.eve_acciones}

                      <button
                      className='btn btn-primary'
                      onClick={()=>{this.seleccionarEvento(evento);
                      this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                      </button>
                      {"  "}
                      <button
                      className='btn btn-danger'
                      onClick={()=>{this.seleccionarEvento(evento);
                      this.modalEliminar()}}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{display:'block'}} />

          <ModalBody>
            <label htmlFor="eve_id">Id</label>
            <input
              className="form-control"
              type="text" name="eve_id"
              readOnly onChange={this.handleChange}
              value = {form?form.eve_id:this.state.eventos.length+1}>
            </input><br />

            <label htmlFor="eve_fecha">Fecha</label>
            <input
              className='form-control'
              type="text" name="eve_fecha"
              placeholder="YYYY-MM-DD"
              onChange={this.handleChange}
              value = {form?form.eve_fecha:""}>
            </input><br />

            <label htmlFor="equ_equipo1">Equipo1</label>
            <Select
              className="form-control"
              defaultValue={{label: form?form.equ_equipo1:"", value:""}}
              options = {this.state.equipos.map(equipo => ({label: equipo.equ_nombre +" ( id: "+ equipo.equ_id + " )", value: equipo.equ_id}) )}
              onChange={ async (e) => await this.setState({
                form:{
                  ...this.state.form,
                  equ_equipo1:e.value
                }
              })
              }
            /><br />

            <label htmlFor='eve_marca1'>Marcador Equipo1</label>
            <input
              className='form-control'
              type="text" name="eve_marca1"
              onChange={this.handleChange}
              value = {form?form.eve_marca1:''}>
            </input><br />

            <label htmlFor="equ_equipo2">Equipo2</label>
            <Select
              className="form-control"
              defaultValue={{label: form?form.equ_equipo2:"", value:""}}
              options = {this.state.equipos.map(equipo => ({label: equipo.equ_nombre +" ( id: "+ equipo.equ_id + " )", value: equipo.equ_id}) )}
              onChange={ (e) => {
                this.setState({
                  form:{
                    ...this.state.form,
                    equ_equipo2: e.value
                  }
                })
              } }
            /><br />

            <label htmlFor='eve_marca2'>Marcador Equipo2</label>
            <input
              className='form-control'
              type="text" name="eve_marca2"
              onChange={this.handleChange}
              value = {form?form.eve_marca2:''}>
            </input><br />

            <label htmlFor="dep_id">Deporte</label>
            <Select
              className="form-control"
              defaultValue={{label: form?form.dep_id:"", value:""}}
              options = {this.state.deportes.map(deporte => ({label: deporte.dep_nombre +" ( id: "+ deporte.dep_id + " )", value: deporte.dep_id}) )}
              onChange={ e => {
                this.setState({
                  form:{
                    ...this.state.form,
                    dep_id: e.value
                  }
                })
              } }
            /><br />

            <label htmlFor='eve_descrip'>Descripción</label>
            <input
              className='form-control'
              type="text" name="eve_descrip"
              onChange={this.handleChange}
              value = {form?form.eve_descrip:''}>
            </input><br />
          </ModalBody>

          <ModalFooter>
            {
              this.state.tipoModal === 'insertar'?
                <button className='btn btn-success' onClick={() => this.peticionPost()}>Insertar</button>
                :<button className='btn btn-success' onClick={() => this.peticionPut()}>Modificar</button>
            }
            <button className='btn btn-danger' onClick={() => this.modalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen = {this.state.modalEliminar}>
            <ModalBody>
              esta segur@ de eliminar este registro?
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-danger' onClick={() => {this.peticionDelete()}}>Si</button>
              <button className='btn btn-primary' onClick={()=>{this.modalEliminar()}} >No</button>
            </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PageEventos