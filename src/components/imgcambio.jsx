import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from "react-router-dom";
import { useTasks } from '../context/TasksContext';
import { useSharedState } from '../context/SharedStateContext ';


const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dssfhet6d/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rewjvfk6';

function ProfilePage({ isNavVisible }) {
  const { user, setUser, changePassword, UpdateUser } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
 
  const [profileLeft, setProfileLeft] = useState(72);
  const [isDragging, setIsDragging] = useState(false);
  const [resolutionMessage, setResolutionMessage] = useState('');
  const [isimgcamioVisible, setIsimgcambioVisible] = useState(false); // Nuevo estado para controlar la visibilidad del calendario
   

  const handlePasswordChange = () => {
    changePassword(currentPassword, newPassword);
  };

  const handleImageChange = async (img) => {
    console.log('Updating user image:', img);
    await UpdateUser({ ...user, image: img });
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
          setResolutionMessage('Resolución de imagen perfecta!');
   
        } else {
          setResolutionMessage('Recomendable que la imagen sea de una resolución 32 x 32');
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
      window.location.href = '/profile';
    } else {
      console.log('No se ha seleccionado ninguna imagen.');
    }
  };
  const handleSubmit2 = async () => {

      window.location.href = '/imgcambio';
  
  };



  const handleClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className={`fixed bg-white ${isNavVisible ? 'right-[0%] left-[26%]' : 'left-[7%] right-0'} transition-all duration-300 ease-in-out h-max mr-3 rounded-lg`}>
 
    <div
    className={` p-10 left-${profileLeft} right-4 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out`}
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave} 
  >

      <div>
      <h3 className="text-lg text-center mb-3 font-semibold">Cambiar Imagen de Perfil:</h3>
    <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        
        {selectedImage && (
          <div className={`mb-4 ${isDragging ? 'border-4 border-blue-500' : ''}`}>
                     
                     <div className='w-auto h-auto p-4 border-4 flex items-center justify-center'>
  <img src={previewImage} alt="Vista previa de la imagen" className="max-w-full" />
</div>

</div>
        )}
         {(!selectedImage && !previewImage) && (
          <div
            className={` w-[100%] h-64 border-dashed border-2 p-4 mb-4 cursor-pointer ${isDragging ? 'bg-blue-100' : ''}`}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
          <h1 className=' text-center mt-[16%]'> {isDragging ? 'Suelta aquí para seleccionar' : 'Arrastra y suelta una imagen aquí o haz clic para seleccionar un archivo'}
        </h1>   </div>
        )}
        
         {resolutionMessage && <p className=' font-bold text-center mb-4'>{resolutionMessage}</p>}
        <div className='flex justify-between'>
        <button
          onClick={handleSubmit}
          className="bg-green-500  hover:bg-green-600 text-white px-4 py-2 rounded-md my-2"
        >
          Cambiar Imagen de Perfil
        </button>
        
     
        <Link to="/profile">
            <button
            
              type="submit"
              className="bg-red-500 hover:bg-red-600  text-white px-4 py-2 rounded-md my-2"
            >
              Cancelar
            </button>
          </Link>
      </div></div>
    </div> </div>
  );
}

export default ProfilePage;