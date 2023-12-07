import { useState } from 'react';

import Navbar from "../components/Navbar";
function Contac() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Correo electrónico enviado con éxito');
      } else {
        alert('Error al enviar el correo electrónico');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <div className="relative left-[30%] max-w-md mx-auto mt-[10%]">
    <Navbar />
    <form
      className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
    <h2 className="text-2xl font-bold mb-6 text-center">Contacto</h2>

    <div className="mb-4">
      <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
        Nombre:
      </label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
        Correo Electrónico:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>

    <div className="mb-6">
      <label htmlFor="mensaje" className="block text-gray-700 text-sm font-bold mb-2">
        Mensaje:
      </label>
      <textarea
        id="mensaje"
        name="mensaje"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        rows="4"
        required
      />
    </div>

    <div className="flex items-center justify-between">
      <button
        type="submit"
        className=" bg-green-500 hover:bg-green-600  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enviar
      </button>
      <div className=" relative left-4 ">

<p className=" font-bold">Correo Electrónico: Agenda.m.e@gmail.com</p>

</div>
    </div>
  </form>
</div>



 
  )
}

export default Contac