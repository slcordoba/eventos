import './App.css';
import { Component } from 'react';
import Menu from './components/Menu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageInicio from './components/PageInicio';
import PageDeportes from './components/PageDeportes';
import PageEquipos from './components/PageEquipos';
import PageEventos from './components/PageEventos';
import PageUsuarios from './components/PageUsuarios';

class App extends Component {


  render() {
    return (
        <Router>    
        <Menu />
        <Routes>
          <Route path='/' element={<PageInicio />} />
          <Route path='/PageInicio' element={<PageInicio />} />
          <Route path='/PageDeportes' element={<PageDeportes />} />
          <Route path='/PageEquipos' element={<PageEquipos />} />
          <Route path='/PageEventos' element={<PageEventos />} />
          <Route path='/PageUsuarios' element={<PageUsuarios />} />

        </Routes>
        </Router>

        
    );
  }
}

export default App;
