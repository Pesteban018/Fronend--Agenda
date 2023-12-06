import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import notify from "../context/notify";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  const [notificationShown, setNotificationShown] = useState(false);

  const notify = (message, isSuccess) => {
    if (!notificationShown) {
      const type = isSuccess ? "success" : "error";
      toast[type](message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      });
  
      setNotificationShown(true);
    }
  };
  


  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        try {
          const task = await getTask(params.id);
          const fecha = dayjs(task.date).format("YYYY-MM-DD");

          setValue("title", task.title);
          setValue("description", task.description);
          setValue("date", fecha);
        } catch (error) {
          console.error("Error al cargar la tarea:", error);
          notify("Hubo un error al cargar la tarea", false);
        }
      }
    }

    loadTask();
  }, [params.id, getTask, setValue, notify]);

  const onSubmit = handleSubmit(async (data) => {
    const formattedData = {
      ...data,
      date: data.date ? dayjs(data.date).toISOString() : dayjs().toISOString(),
      time: data.time ? dayjs(data.time, "HH:mm").toISOString() : undefined,
    };

    try {
      if (params.id) {
        await updateTask(params.id, formattedData);
        notify("La tarea se editó correctamente", true);
      } else {
        await createTask(formattedData);
        notify("La tarea se creó correctamente", true);
      }
      navigate("/card");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        "Hubo un error al " + (params.id ? "editar" : "crear") + " la tarea";
      notify(errorMessage, false);
    }
  });

  return (
    <div className="bg-white pt-6 pb-8 mb-4 max-w-md top-20 left-[25%] right-[5%] relative rounded-md h-full flex flex-col items-center justify-center w-full shadow-2xl px-10">
  
      <form onSubmit={onSubmit} className="w-full mt-3">
           <ToastContainer />
        <label htmlFor="title" className=" text-lg">
          Titulo
        </label>
        <input
          type="text"
          placeholder="Titulo"
          {...register("title", { required: true })}
          className="w-full px-4 mt-[-1%] py-2 rounded-md my-2 shadow appearance-none border  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          autoFocus
        />
        <label htmlFor="description" className=" text-lg">
          Descripción
        </label>
        <textarea
          rows="3"
          placeholder="Descripción"
          {...register("description", { required: true })}
          className="w-full px-4 mt-[-1%] py-2 rounded-md my-2 shadow appearance-none border  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        <div className="flex">
          <div>
            <label htmlFor="date" className="text-lg">
              Fecha
            </label>
            <input
              type="date"
              {...register("date")}
              className="w-full px-4 mt-[-1%] py-2 rounded-md my-2 shadow appearance-none border  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
          </div>
           {/* <div className="ml-10">
            <label htmlFor="time" className="text-lg">
              Hora
            </label>
            <input
              type="time"
              {...register("time", { required: true })}
              className="w-full px-4 mt-[-1%] py-2 rounded-md my-2 shadow appearance-none border  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               />
          </div> */}
        </div>
        <div className="flex justify-between">
        <button
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md my-2"
      type="submit"
    >
      Guardar
    </button>
    <Link to="/card">
      <button
        type="button"
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md my-2"
      >
        Cancelar
      </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default TaskFormPage;
