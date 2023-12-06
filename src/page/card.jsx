import React, { Component } from "react";
import { Link } from "react-router-dom";
import notify from "../context/notify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getTasksRequest,
  createTaskRequest,
  updateTasksRequest,
  deleteTaskRequest,
} from "../api/tasks";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { MdDeleteForever, MdAddTask } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import moment from "moment";
class App extends Component {
  state = {
    tasks: [],
    modalActualizar: false,
    modalInsertar: false,
    modalEliminar: false,
    form: {
      title: "",
      description: "",
      date: "",
      user: "",
    },
    tareaEliminar: null,
    selectedEvent: null,
    maxDescriptionLength: 30,
    maxTitleLength: 15,
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
        console.error("Error al obtener datos de tareas:", error);
      });
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

  eliminar = () => {
    const { tareaEliminar } = this.state;
    console.log("Deleting task with ID:", tareaEliminar._id);

    deleteTaskRequest(tareaEliminar._id)
      .then(() => {
        console.log("Task deleted successfully");
        this.setState((prevState) => ({
          tasks: prevState.tasks.filter(
            (task) => task._id !== tareaEliminar._id
          ),
          modalEliminar: false,
        }));
      })
      .catch((error) => {
        console.error("Error al eliminar tarea:", error);
      });
  };

  render() {
    const {
      tasks,
      modalEliminar,
      tareaEliminar,
      selectedEvent,
      maxDescriptionLength,
      maxTitleLength,
    } = this.state;
    const { isNavVisible } = this.props;
    const dynamicMaxDescriptionLength = isNavVisible
      ? 10
      : maxDescriptionLength;
    const dynamicMaxtitleLength = isNavVisible ? 10 : maxTitleLength;

    return (
      <>
         <div className={`fixed bg-white ${isNavVisible ? 'right-[0%] left-[1%] relative top-[50px]' : ' relative left-[-24%] -mr-[23%] top-[50px]'} transition-all duration-300 ease-in-out h-max mr-3 rounded-lg`}>
    
          <ToastContainer />
          <div className=" rbc-toolbar"></div>
          <Link to="/add-task">
            <Button className="bg-green-500 ml-2 hover:bg-green-700 flex space-x-2 items-center text-white font-bold rounded mb-3 mt-7">
              <MdAddTask /> <span> Nueva Tarea</span>
            </Button>
          </Link>

          <Container>
          <Table responsive className="relative ml-auto mr-auto h-44">
  <thead>
    <tr>
      <th>Titulos</th>
      <th>Descripciones</th>
      <th>Fechas</th>
      <th>Acciónes</th>
    </tr>
  </thead>
  <tbody>
    {tasks.length === 0 ? (
      <tr>
        <td colSpan="4" className="text-center">
          <div className="absolute left-60 mt-14">
            <h1 className="mb-2">NO SE ENCUENTRAN TAREAS AGREGADAS...</h1>
          </div>
        </td>
      </tr>
    ) : (
      tasks.map((elemento) => (
        <tr key={elemento._id}>
          <td
            className={`max-title-length transition-all duration-300 ease-in-out ${
              isNavVisible ? "max-w-[100px]" : "max-w-[300px]"
            }`}
          >
            {elemento.title.length > dynamicMaxtitleLength
              ? `${elemento.title.substring(
                  0,
                  dynamicMaxtitleLength
                )}...`
              : elemento.title}
          </td>
          <td
            className={`max-description-length transition-all duration-300 ease-in-out ${
              isNavVisible ? "max-w-[100px]" : "max-w-[300px]"
            }`}
          >
            {elemento.description.length >
            dynamicMaxDescriptionLength
              ? `${elemento.description.substring(
                  0,
                  dynamicMaxDescriptionLength
                )}...`
              : elemento.description}
          </td>
          <td>{new Date(elemento.date).toLocaleDateString()}</td>
          <td>
            <Link
              to={`/tasks/${elemento._id}`}
              className="btn btn-primary mr-2"
            >
              <CiEdit />
            </Link>
            <button
              className="btn btn-danger mr-2"
              onClick={() => this.mostrarModalEliminar(elemento)}
            >
              <MdDeleteForever />
            </button>
            <button
              className="btn btn-info "
              onClick={() => this.setState({ selectedEvent: elemento })}
            >
              <IoEye />
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</Table>

          </Container>

          <Modal isOpen={modalEliminar}>
            <ModalHeader>
              <div>
                <h3>Eliminar Tarea</h3>
              </div>
            </ModalHeader>

            <ModalBody>
              <h2 className="whitespace-normal overflow-auto">
                ¿Estás seguro de que deseas eliminar la tarea con el Nombre:{" "}
                <span className="font-bold">
                  {tareaEliminar ? tareaEliminar.title : ""}
                </span>
              </h2>
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
          {selectedEvent && (
            <Modal
              isOpen={true}
              onRequestClose={() => this.setState({ selectedEvent: null })}
              contentlabel="Detalles del Evento"
              className="ml-[40%] bg-white p-8 rounded shadow-md max-w-md mx-auto overflow-auto"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <div className="max-w-md" style={{ maxHeight: "80vh" }}>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                  <h1 className="text-lg font-bold mb-1 mr-2">Titulo:</h1>
                  <h2 className="text-lg text-black">{selectedEvent?.title}</h2>
                </div>
                <h1
                  className="text-gray-700 mb-1"
                  style={{
                    wordWrap: "break-word",
                    maxHeight: "60vh",
                    overflow: "auto",
                  }}
                >
                  <h2 className=" text-lg font-bold mb-1 text-black">
                    Descripción:
                  </h2>{" "}
                  <h2 className="text-lg text-black">
                    {selectedEvent?.description}
                  </h2>
                </h1>
                <h1 className="text-gray-700 mb-4 mr-2">
                  <div style={{ display: "flex", marginBottom: "1rem" }}>
                    <h2 className="text-lg font-bold mb-1 text-black">
                      Fecha:
                    </h2>
                    <h2 className="text-lg text-black">
                      {moment(selectedEvent?.start).format("LLL")}
                    </h2>
                  </div>
                </h1>
                <h1 className="text-gray-700 mb-4 mr-2">
                  <div style={{ display: "flex", marginBottom: "1rem" }}>
                    <h2 className="text-lg font-bold mb-1 text-black">Hora:</h2>
                    <h2 className="text-lg text-black">
                      {moment(selectedEvent?.start).format("LT")}
                    </h2>
                  </div>
                </h1>
                <button
                  className="bg-blue-500 text-white px-4 ml-[35%] py-2 rounded "
                  onClick={() => this.setState({ selectedEvent: null })}
                >
                  Cerrar
                </button>
              </div>
            </Modal>
          )}
        </div>
      </>
    );
  }
}

export default App;
