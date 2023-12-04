import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      // Aquí deberías agregar una verificación adicional para asegurarte de que estás en la página correcta
      if (window.location.pathname !== "/calendario") {
        navigate("/calendario");
      } else {
        window.location.reload();
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-[calc(100vh-100px)] w-[calc(170vh-100px)] ml-[25%] items-center justify-center ">
       <div className=" max-w-sm w-full rounded-xl bg-zinc-200 shadow-2xl  px-8 pt-6 pb-8 mb-4">
      
        <div className=" flex items-center justify-center">

          <img src="\src\img\login.png" alt="" className="h-auto w-[45%]"/>
        </div>
        {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white my-2" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full px-4 mt-[-1%] py-2 rounded-md my-2 shadow appearance-none border  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Usuario requerido</p>}
          <label htmlFor="paswordd">Contraseña</label>
          
          <input
          
            type="password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 mt-[-1%] rounded-md my-2 shadow appearance-none border  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500">Contraseña requerida</p>
          )}
            <div className=" flex justify-between">
          <button
            type="submit"
            className="bg-green-500 text-white px-4  rounded-md my-3 "
          >
            Inciar Sesió
          </button>
        
          <Link to="/"><button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-md my-3 "
          >
            Cancelar
          </button>
          
          </Link>
          </div>
        </form>
        <div className=" justify-between text-center">
        <p >
          Aun no tienes una cuenta?{" "}
          <Link to="/register" className="text-sky-500">
            Registrar{" "}
          </Link>
        </p></div>
      </div>
    </div>
  );
}
export default LoginPage;
