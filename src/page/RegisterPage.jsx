import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, user, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/calendario");
  }, [isAuthenticated]);
  console.log(user);
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });
  return (
    <div className="flex h-[calc(100vh-100px)] w-[calc(170vh-100px)] ml-[25%]  items-center justify-center ">
      <div className=" max-w-sm w-full rounded-xl bg-zinc-200 shadow-2xl  px-8 pt-6 pb-8 mb-4">
      
       
      
                <div className=" flex items-center justify-center">

<img src="\src\img\registrar.png" alt="" className="h-auto w-[55%]"/>
<h1 class=" text-2xl  items-center justify-between">Crear usuario</h1>
</div>  
{
            registerErrors.map((error, i) => (
                <div className="bg-red-500 p-2 text-white" key={i}>
                    {error}
                </div>
            ))
        }
      <form onSubmit={onSubmit}>
      <label htmlFor="title">Usuario</label>
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full px-4 mt-[-1%] py-2 rounded-md my-2 shadow appearance-none border  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Usuario"
        />
        {errors.username && <p className="text-red-500">El usuario es requerido</p>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full px-4 mt-[-1%] py-2 rounded-md my-2 shadow appearance-none border  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Email"
        />
         {errors.email && <p className="text-red-500">El email es requerido</p>}
         <label htmlFor="paswordd">Contraseña</label>
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full px-4 mt-[-1%] py-2 rounded-md my-2 shadow appearance-none border  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Contraseña"
        />
         {errors.password && <p className="text-red-500">La contraseña es requerida</p>}
         <div className=" flex justify-between">
          <button type="submit" 
        className="bg-green-500 text-white px-4 py-2 rounded-md my-2 "
        >Registrar</button>

<Link to="/"><button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-md my-2 "
          >
            Cancelar
          </button>
          
          </Link>
          </div>
      </form>
      <div className=" justify-between text-center">
      <p>
          Ya tienes una cuenta? <Link to="/login" className="text-sky-500">Inciar Sesión </Link>
        </p>
    </div></div>
    </div>
  );
}
export default RegisterPage;
