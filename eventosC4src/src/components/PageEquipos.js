/*import React, { Component } from "react";

class PageEquipos extends Component{
    render(){
        return <h1>Página Equipos</h1>
    }
}

export default PageEquipos*/

import React, { Component } from "react";
//import '../hojas-de-estilo/PageEquipos.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = 'http://localhost:9000/api/equipos'
const fieldId = '/equ_id/'


class  PageEquipos extends Component {
  state = {
    data:[],
    modalInsertar:false,
    modalEliminar:false,
    tipoModal:'',
    form:{
      equ_id:'',
      equ_nombre:'',
  }
}

//--------CRUD(create, read, update, delete)-------

//GET
  peticionGet = () => {
    axios.get(url).then(response=>{
     //console.log(response.data);
      this.setState({
        data: response.data
      })
    }).catch(error=>{
      console.log(error.message);
    })
  }

//POST
  peticionPost=async()=>{
    delete this.state.form.equ_id
    await axios.post(url,this.state.form).then(response=>{
      this.modalInsertar(); /// para cerrar la modal
      this.peticionGet(); /// para actualizar el listado
    }).catch(error=>{
      console.log(error.message);
    })
  }

//PUT
  peticionPut=()=>{
    axios.put(url +  fieldId +  this.state.form.equ_id, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  //DELETE
  peticionDelete=()=>{
    axios.delete(url+fieldId+this.state.form.equ_id).then(response=>{
      this.modalEliminar();
      this.peticionGet();
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

  seleccionarEquipo=(equipo)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        equ_id: equipo.equ_id,
        equ_nombre: equipo.equ_nombre
      }
    })
  }

  componentDidMount(){
  this.peticionGet();
  }
  render(){
    const form = this.state.form
    return (
      <div className="App">
        <br /><br /><br />
        <button className="btn btn-success" onClick={()=>{this.setState({form:null, tipoModal:'insertar'}); this.modalInsertar()}}>Agregar Equipo</button>
        <br /><br />
          <table className="table ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map(equipos=> {
                  return (
                    <tr>
                      <td>{equipos.equ_id}</td>
                      <td>{equipos.equ_nombre}</td>
                      <td>
                        {equipos.equ_acciones}
                        <button className='btn btn-primary' onClick={()=>{this.seleccionarEquipo(equipos); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                        {"  "}
                        <button className='btn btn-danger' onClick={()=>{this.seleccionarEquipo(equipos); this.modalEliminar()}}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{display:'block'}}>

            </ModalHeader>
            <ModalBody>
              <label htmlFor="equ_id">Id</label>
              <input className="form-control" type="text" name="equ_id" readOnly onChange={this.handleChange} value = {form?form.equ_id:this.state.data.length+1}></input><br />
              <label htmlFor="equ_nombre">Nombre</label>
              <input className='form-control' type="text" name="equ_nombre" onChange={this.handleChange} value = {form?form.equ_nombre:''}></input><br />
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

export default PageEquipos;
