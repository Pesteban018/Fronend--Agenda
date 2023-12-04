import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { HiOutlineHome, HiOutlineUser, HiOutlineDocument, HiOutlineEye } from 'react-icons/hi';
import { TiThMenu, TiThMenuOutline } from 'react-icons/ti';
import { IoMdExit } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';
import { useLocation } from 'react-router-dom';
function Navbar() {
  const { logout, user } = useAuth();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const location = useLocation();

  // Lista de rutas donde quieres mostrar la sección del usuario
  const allowedRoutes = ['/calendario', '/card']; // Agrega las rutas que desees

  // Verifica si la ruta actual está en la lista permitida
  const shouldShowUserSection = allowedRoutes.includes(location.pathname);



  const toggleNavVisibility = () => {
    setIsNavVisible((prevVisibility) => !prevVisibility);
  };

  useEffect(()=>{
console.log(user);

  },[user])


  return (
    <>
      <button
        className={`fixed top-1 p-2 bg-gray-800 left-0 ml-${isNavVisible ? '64' : '16'} text-white transition-all duration-300 ease-in-out z-10`}
        onClick={toggleNavVisibility}
        data-tip={isNavVisible ? 'Ocultar menú' : 'Mostrar menú'}
      >
        {isNavVisible ? <TiThMenu /> : <TiThMenuOutline />}
      </button>


      <nav
        className={`bg-gray-800 fixed left-0 top-0 flex flex-col text-white transition-all duration-300 ${
          isNavVisible ? "w-64 h-[100%]" : "w-16 h-[100%]"
        }`}
      >
        <ul className="p-2 flex-1">
          <li className="mb-2">
            <Link
              to="/calendario"
              className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300"
              title="Inicio"
            >
              <HiOutlineHome />
              {isNavVisible && <span className="tooltip-text">Inicio</span>}
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/profile"
              className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300"
              title="Perfil"
            >
              
              <HiOutlineUser />
              {isNavVisible && <span className="tooltip-text">Perfil</span>}
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/card"
              className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300"
              title="Mis tareas"
            >
              <HiOutlineDocument />
              {isNavVisible && <span className="tooltip-text">Mis tareas</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={() => {
                logout();
              }}
              className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300"
              title="Cerrar sesión"
            >
          <IoMdExit />
              {isNavVisible && <span className="tooltip-text">Cerrar sesión</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {shouldShowUserSection && (
        <div className={`bg-white h-11 fixed top-0 right-0 left-0 transition-all duration-300 ml-${isNavVisible ? '64' : '16'} text-black h-10 items-center p-2`}>
          <ul> 
            <li className="flex items-center justify-end">
              <h1 className="text-black">{` ${user.username}`}</h1>
              <img src={user.image} alt="Usuario" className="w-[32px] h-[32px] rounded-full ml-2" />
            </li>
          </ul>
        </div>
      )}


<Tooltip
        className="tooltip-custom"
        effect="solid"
        place="right"
      />
    </>
  );
}

export default Navbar;
