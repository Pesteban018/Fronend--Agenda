import Navbar from "../components/Navbar";
function Contac() {
  return (

  <div className="max-w-md mx-auto mt-[10%]">
      <Navbar/>
  <form className=" bg-zinc-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
      <div className="">

<p>Correo Electrónico: Agenda.m.e@gmail.com</p>

</div>
    </div>
  </form>
</div>



 
  )
}

export default Contac