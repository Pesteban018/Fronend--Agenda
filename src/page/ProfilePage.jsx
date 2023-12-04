import React, { useContext, useState, useRef, useEffect } from 'react';


import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';



const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dssfhet6d/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rewjvfk6';

function ProfilePage() {
  const { user, setUser, changePassword, UpdateUser } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [profileLeft, setProfileLeft] = useState(72);
  const [isDragging, setIsDragging] = useState(false);
  const handlePasswordChange = () => {
    changePassword(currentPassword, newPassword);
  };

  const handleImageChange = async (img) => {
    console.log('Updating user image:', img);
    await UpdateUser({ ...user, image: img });
  };
  

  const toggleNavVisibility = () => {
    setIsNavVisible((prevVisibility) => !prevVisibility);
    setProfileLeft((prevLeft) => prevLeft + (prevVisibility ? 16 : -16));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
  
      // Obtain dimensions of the image
      const img = new Image();
img.onload = () => {
  console.log('Ancho:', img.width);
  console.log('Alto:', img.height);

  // Check image resolution
  if (img.width === 32 && img.height === 32) {
    console.log('Image resolution is perfect.');
  } else {
    console.warn('Image resolution is not 32x32. Consider using an image with this resolution.');
  }

  // Now you can use these dimensions to show the image in the top bar
  // You can store these dimensions in the state if necessary
};
img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation(); // Detener la propagación del evento
  
    const file = event.dataTransfer.files[0];
    setSelectedImage(file);
    setIsDragging(false);
  
    // Leer la imagen y mostrar la vista previa
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };


  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleSubmit = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('file', selectedImage);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      const res = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });
      const file = await res.json();
      const imgURL = file.secure_url;
      console.log('Image URL:', imgURL);
      handleImageChange(imgURL);
      setPreviewImage(null); // Restablecer la vista previa después de cambiar la imagen
      setSelectedImage(null); // Restablecer la imagen seleccionada
    } else {
      console.log('No se ha seleccionado ninguna imagen.');
    }
  };
  useEffect(()=>{
    console.log(user);
    
      },[user])



  const handleClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div
    className={`p-10 left-${profileLeft} right-4 bg-white rounded-lg shadow-md 
    } transition-all duration-300 ease-in-out`}
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave} 
  >    
     <h2 className="text-2xl mb-2 font-semibold text-center">Perfil de Usuario</h2>

 <div className="right-4 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out">
   
      <div className="relative mb-4 h-40">
        <div
          style={{ borderColor: user.image ? 'your-color-related-to-image' : '#ccc' }}
          className="border-4 border-solid left-64 rounded-full overflow-hidden w-[150px] h-[150px] relative"
        >
          <img src={user.image} alt="Usuario" className="w-full h-full object-cover " />
        </div>

        <div className="absolute top-[79%] right-[43%] transform translate-x-1/2 -translate-y-1/2">
          <div style={{ borderColor: user.image ? 'your-color-related-to-image' : '#ccc' }}
          className=" bg-stone-400 rounded-full p-1 cursor-pointer">
            <Link to={"/imgcambio"}>
            <FontAwesomeIcon icon={faPencilAlt} className="text-white" onClick={() => { /* Manejar la acción del lápiz */ }} />
          </Link></div>
        </div>
      </div>
      </div>

<div className="flex justify-between">
  <div className="mb-4">

  <h3 className="text-lg font-semibold">Correo Electrónico:</h3>
  <input
    type="text"
    value={user.email}
    disabled
    className="form-input mt-1 block w-full bg-gray-100 px-2 py-1 rounded"
  />
</div>

<div className="mb-4">
  <h3 className="text-lg font-semibold">Nombre de Usuario:</h3>
  <input
    type="text"
    value={user.username}
    disabled
    className="form-input mt-1 block w-full bg-gray-100 px-2 py-1 rounded"
  />
</div>
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


    </div>
  );
}

export default ProfilePage;