import React, { useContext, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import { useSharedState } from "../context/SharedStateContext ";
import { updateUser } from "../api/auth";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dssfhet6d/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "rewjvfk6";

function ProfilePage({ isNavVisible }) {
  const { user, setUser, changePassword, UpdateUser } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isimgcamioVisible, setIsimgcambioVisible] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const { perfilExtendido } = useSharedState();
  const [profileLeft, setProfileLeft] = useState(72);

  const handlePasswordChange = async () => {
    try {
   
      if (!currentPassword || !newPassword) {
        toast.error("Completa los campos de contraseña antes de cambiarla");
        return;
      }

      if (currentPassword !== newPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }

      if (newPassword.length < 8) {
        toast.error("La nueva contraseña debe tener al menos 8 caracteres");
        return;
      }

      await updateUser({ password: newPassword });

      toast.success("Contraseña cambiada exitosamente");
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);

      if (error.response && error.response.status === 400) {
        toast.error("Error de validación del servidor");
      } else {
        toast.error("Error al cambiar la contraseña");
      }
    }
  };
  const handleImageChange = async (img) => {
    console.log("Updating user image:", img);
    try {
      const updatedUser = { ...user, image: img };
      await UpdateUser(updatedUser);
      setUser(updatedUser);  // Actualiza el estado después de una actualización exitosa
      toast.success("Imagen de perfil cambiada exitosamente");
    } catch (error) {
      console.error("Error al cambiar la imagen de perfil:", error);
      toast.error("Error al cambiar la imagen de perfil");
    }
  };
  
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);

      const img = new Image();
      img.onload = () => {
        console.log("Ancho:", img.width);
        console.log("Alto:", img.height);

        if (img.width === 32 && img.height === 32) {
          console.log("Image resolution is perfect.");
        } else {
          console.warn(
            "Image resolution is not 32x32. Consider using an image with this resolution."
          );
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    setSelectedImage(file);
    setIsDragging(false);

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
      formData.append("file", selectedImage);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const file = await res.json();
      const imgURL = file.secure_url;
      console.log("Image URL:", imgURL);
      handleImageChange(imgURL);
      setPreviewImage(null);
      setSelectedImage(null);
    } else {
      console.log("No se ha seleccionado ninguna imagen.");
    }
  };

  const toggleimgcambioVisibility = () => {
    console.log("Toggling Profile Visibility");
    setIsProfileVisible(true);
  };

  useEffect(() => {
    setIsimgcambioVisible(location.pathname === "/imgcambio");
  }, [location.pathname]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={`fixed bg-white ${
        isNavVisible
          ? "right-[0%] left-[1%] relative"
          : " relative left-[-20%] -mr-[23%]"
      } transition-all duration-300 ease-in-out h-max mr-3 rounded-lg`}
    >
      <ToastContainer style={{ pointerEvents: "none" }} autoClose={2000} />

      <div
        className={`p-10 ${
          isNavVisible ? "left-64" : "right-4"
        } bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className=" h-52 bg-white relative rounded-lg  mb-96 shadow-md transition-all duration-300">
          <div className="relative mb-4 h-40">
            <h2
              className={`text-2xl  mb-2 font-semibold text-center ${
                isNavVisible
                  ? "ml-[-200px] transition-all duration-300 ease-in-out"
                  : " mr-[18%] transition-all duration-300 ease-in-out"
              }`}
            >
              Perfil de Usuario
            </h2>
            <Link to="/imgcambio" onClick={toggleimgcambioVisibility}>
              <div
                className={`bg-stone-300 rounded-full p-1 cursor-pointer absolute ml-${
                  isNavVisible
                    ? "lefth ml-[346px] top-48 transition-all duration-300 ease-in-out mt-[-30px]"
                    : "lefth ml-[456px] top-48  transition-all duration-300 mt-[-30px]"
                } `}
                style={{ zIndex: 9999 }}
              >
                <FontAwesomeIcon icon={faPencilAlt} className="bg-stone-300" />
              </div>
            </Link>
            <div
              style={{
                borderColor: user.image
                  ? "your-color-related-to-image "
                  : "#ccc",
              }}
              className={`border-4 border-solid ${
                isNavVisible
                  ? "left-[237px] transition-all duration-300 ease-in-out "
                  : "left-[347px]"
              } rounded-full overflow-hidden w-[150px] h-[150px] relative transition-all duration-300 ease-in-out`}
            >
              <img
                src={user.image}
                alt="Usuario"
                className="w-full h-full object-cover"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="flex">
            <div className="grid grid-cols-2 gap-3 w-96 mt-14">
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
                <h3 className="text-lg font-semibold">Usuario:</h3>
                <input
                  type="text"
                  value={user.username}
                  disabled
                  className="form-input mt-1 block w-full bg-gray-100 px-2 py-1 rounded"
                />
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold">Nombre:</h3>
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="form-input mt-1 block w-full bg-gray-100 px-2 py-1 rounded"
                />
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold">Apellidos:</h3>
                <input
                  type="text"
                  value={user.firstname}
                  disabled
                  className="form-input mt-1 block w-full bg-gray-100 px-2 py-1 rounded"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-96 mt-14 ml-14 ">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Cambiar Contraseña:</h3>

                <label className="block mb-2">
                  Nueva contraseña:
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={({ target }) => setCurrentPassword(target.value)}
                    className="form-input mt-1 block border-2"
                    required
                  />
                </label>

                {currentPassword.length > 0 && currentPassword.length < 8 && (
                  <div
                    className={`text-red-500 text-sm mb-2 ${
                      isNavVisible
                        ? "transition-all duration-300 ease-in-out"
                        : "mr-[-100%] transition-all duration-300 ease-in-out"
                    }${
                      isNavVisible
                        ? " transition-all duration-300 ease-in-out"
                        : ""
                    }`}
                  >
                    La nueva contraseña debe tener al menos 8 caracteres
                  </div>
                )}

                <label className="block mb-2">
                  Verificar contraseña:
                  <input
                    name="password"
                    type="password"
                    value={newPassword}
                    onChange={({ target }) => setNewPassword(target.value)}
                    className="form-input mt-1 block border-2"
                    required
                  />
                </label>

                {newPassword !== currentPassword && (
                  <div className="text-red-500 text-sm mb-2">
                    La contraseña no coincide
                  </div>
                )}

                <button
                  onClick={handlePasswordChange}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
      {isimgcamioVisible && (
        <div className="imgcambio-container">
          <Imgcambio isNavVisible={isNavVisible} />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
