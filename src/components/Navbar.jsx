import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Navbar() {


  const location = useLocation();

  if (location.pathname === "/login") {
    return null;
  }

  if (location.pathname === "/register") {
    return null;
  }

  const { isAuthenticated, logout, user } = useAuth();
  return (
    
    <nav className=" fixed left-0 z-10 bg-zinc-200 flex justify-between  w-full py-1 px-1 mt-4 top-[-24px] ">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <img src="\src\img\logo.png" alt="" className="w-70 h-14" />
      </Link>
      
      <ul className="flex gap-x-4 py-3 ">
      {(location.pathname === "/" || location.pathname === "/contac") && !isAuthenticated ? (

          <>
            <li className="transform transition-transform hover:scale-110 text-xl ">
              <Link to="/">Inicio</Link>
            </li>

            <li className="transform transition-transform hover:scale-110 text-xl ">
              <Link to="/contac">Contacto</Link>
            </li>
          </>
        ) : null}
      </ul>

      <ul className="flex gap-x-1 py-3">
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <Link
                to="/add-task"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className=" bg-red-500 text-white px-9 py-1 rounded-full hover:bg-red-600 "
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className=" bg-green-500 hover:bg-green-600  text-white px-9 py-1 rounded-full  "
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
