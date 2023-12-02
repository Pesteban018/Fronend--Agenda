import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getTasksRequest,
  createTaskRequest,
  updateTasksRequest,
  deleteTaskRequest,
} from '../api/tasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class App extends Component {
  state = {
    tasks: [],
    modalActualizar: false,
    modalInsertar: false,
    modalEliminar: false, // Agregado para el modal de eliminación
    form: {
      title: '',
      description: '',
      date: '',
      user: '',
    },
    tareaEliminar: null, // Agregado para almacenar la tarea que se va a eliminar
  };

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    getTasksRequest()
      .then((response) => {
        this.setState({ tasks: response.data });
      })
      .catch((error) => {
        console.error('Error al obtener datos de tareas:', error);
      });
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalEliminar = (dato) => {
    this.setState({
      tareaEliminar: dato,
      modalEliminar: true,
    });
  };

  cerrarModalEliminar = () => {
    this.setState({
      tareaEliminar: null,
      modalEliminar: false,
    });
  };

  editar = (dato) => {
    updateTasksRequest(dato._id, dato)
      .then((response) => {
        this.setState((prevState) => ({
          tasks: prevState.tasks.map((task) =>
            task._id === response.data._id ? response.data : task
          ),
          modalActualizar: false,
        }));
      })
      .catch((error) => {
        console.error('Error al editar tarea:', error);
      });
  };

  eliminar = () => {
    const { tareaEliminar } = this.state;

    deleteTaskRequest(tareaEliminar._id)
      .then(() => {
        this.setState((prevState) => ({
          tasks: prevState.tasks.filter((task) => task._id !== tareaEliminar._id),
          modalEliminar: false,
        }));
      })
      .catch((error) => {
        console.error('Error al eliminar tarea:', error);
      });
  };

  render() {
    const { tasks, modalEliminar, tareaEliminar } = this.state;

    return (
      <>
        <Container>
          <br />
          <Button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
            onClick={() => this.mostrarModalInsertar()}
          >
            Crear
          </Button>
          <br />
          <br />
          <Table className="ml-[25%] mr -[20%]">
            <thead>
              <tr>
                <th>Titulos</th>
                <th>Descripciones</th>
                <th>Fechas</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((elemento) => (
                <tr key={elemento._id}>
                  <td>{elemento.title}</td>
                  <td>{elemento.description}</td>
                  <td>{elemento.date}</td>
                  <td>
                    <Link
                      to={`/tasks/${elemento._id}`}
                      className="btn btn-primary"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.mostrarModalEliminar(elemento)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* Modal de eliminación */}
        <Modal isOpen={modalEliminar}>
          <ModalHeader>
            <div>
              <h3>Eliminar Tarea</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <p>
              ¿Estás seguro de que deseas eliminar la tarea con el ID{' '}
              {tareaEliminar ? tareaEliminar._id : ''}?
            </p>
          </ModalBody>

          <ModalFooter>
            <Button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={this.eliminar}
            >
              Sí, eliminar
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={this.cerrarModalEliminar}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
