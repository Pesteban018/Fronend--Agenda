import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function ProfilePage() {
  const { user, updateUserProfile, changePassword } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [image, setImage] = useState(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [profileLeft, setProfileLeft] = useState(72);

  const handlePasswordChange = () => {

    changePassword(currentPassword, newPassword);
  };

  const handleImageChange = () => {

    updateUserProfile({ ...user, image });
  };

  const toggleNavVisibility = () => {
    setIsNavVisible((prevVisibility) => !prevVisibility);
    setProfileLeft((prevLeft) => prevLeft + (prevVisibility ? 16 : -16));
  };

  return (
    <div
      className={`mx-auto mt-12 p-10 left-${profileLeft} right-0 fixed bg-white rounded-lg shadow-md md:ml-${
        isNavVisible ? '16' : '[-16rem]'
      } transition-all duration-300 ease-in-out`}
    >
      <h2 className="text-2xl font-semibold mb-4">Perfil de Usuario</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Correo Electrónico:</h3>
        <p>{user.email}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Nombre de Usuario:</h3>
        <p>{user.username}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Cambiar Contraseña:</h3>
        <label className="block mb-2">
          Contraseña Actual:
          <input
            type="password"
            value={currentPassword}
            onChange={({ target }) => setCurrentPassword(target.value)}
            className="form-input mt-1 block w-full"
          />
        </label>
        <label className="block mb-2">
          Nueva Contraseña:
          <input
            type="password"
            value={newPassword}
            onChange={({ target }) => setNewPassword(target.value)}
            className="form-input mt-1 block w-full"
          />
        </label>
        <button
          onClick={handlePasswordChange}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Cambiar Contraseña
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Cambiar Imagen de Perfil:</h3>
        <input
          type="file"
          accept="image/*"
          onChange={({ target }) => setImage(target.files[0])}
          className="mb-2"
        />
       <button
        onClick={handleImageChange}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Cambiar Imagen de Perfil
      </button>
      </div>
      
    </div>
  );
}

export default ProfilePage;
