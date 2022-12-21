/*import React, { Component } from "react";

class PageDeportes extends Component{
    render(){
        return <h1>Página Deportes</h1>
    }
}

export default PageDeportes*/

import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import env from 'react-dotenv'

const url = 'http://localhost:9000/api/deportes'
const fieldId = '/dep_id/'


class  PageDeportes extends Component {
  state = {
    data:[],
    modalInsertar:false,
    modalEliminar:false,
    tipoModal:'',
    form:{
      dep_id:'',
      dep_nombre:''
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
    }).catch(err => {
      console.error(err.message);
    })
  }

//POST
  peticionPost = async() => {
    delete this.state.form.dep_id
    await axios.post(url, this.state.form)
    .then(response => {
      this.modalInsertar(); /// para cerrar la modal
      this.peticionGet(); /// para actualizar el listado
    }).catch(err => {
      console.log (err.message);
    })
  }

//PUT
  peticionPut = () => {
    axios.put(url + fieldId + this.state.form.dep_id, this.state.form)
    .then(response => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(err => {
      console.log (err.message);
    })
  }

  //DELETE
  peticionDelete = () => {
    axios.delete(url +  fieldId  + this.state.form.dep_id)
    .then(response => {
      this.modalEliminar();
      this.peticionGet();
    }).catch(err => {
      console.log (err.message);
    })
  }
//---------Fin del CRUD--------------------------


  modalInsertar = () => {
    this.setState({
      modalInsertar: !this.state.modalInsertar
    })
  }

  modalEliminar = () => {
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
    //console.log (this.state.form);  /// probar por consola lo que se guarda
  }

  seleccionarDeporte = (deporte) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        dep_id: deporte.dep_id,
        dep_nombre: deporte.dep_nombre
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
        <button
        className="btn btn-success"
        onClick = { () => { this.setState({form:null, tipoModal:'insertar'});
        this.modalInsertar()} }>Adicione el deporte
        </button>
        <br /><br />

          <table className="table ">
            <thead>
              <tr>
                <th>Identificador</th>
                <th>Nombre del deporte</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map ( deportes => {
                  return (
                    <tr>
                      <td>{deportes.dep_id}</td>
                      <td>{deportes.dep_nombre}</td>

                      <td>
                        {deportes.dep_acciones}
                        <button
                        className='btn btn-primary'
                        onClick = { () => {
                          this.seleccionarDeporte(deportes);
                          this.modalInsertar()
                        }}>
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </button>
                        {"  "}

                        <button
                        className='btn btn-danger'
                        onClick = { () => {
                          this.seleccionarDeporte(deportes);
                          this.modalEliminar()
                        }}>
                        <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
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
              <label htmlFor="dep_id">Identificador</label>
              <input
              className="form-control"
              type="text" name="dep_id"
              readOnly onChange={this.handleChange}
              value = {form?form.dep_id:this.state.data.length+1}> 
              </input><br />

              <label htmlFor="dep_nombre">Nombre</label>
              <input
              className='form-control'
              type="text" name="dep_nombre"
              onChange={this.handleChange}
              value = {form?form.dep_nombre:''}>
              </input><br />
            </ModalBody>
            <ModalFooter>
              {
                this.state.tipoModal === 'insertar'?
                  <button
                    className='btn btn-success'
                    onClick = { () => this.peticionPost()}>Insertar
                  </button>
                  :<button
                    className='btn btn-success'
                    onClick = {() => this.peticionPut()}>Modificar
                  </button>
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

export default PageDeportes;