import styles from "../styles/styles";
import Navbar from "../components/Navbar";

import Carousel from "../context/Carousel";



function HomePage() {
  return (
    <div className="w-[calc(164vh-70px)] content-center items-center justify-between">
      <Navbar/>
      <div className="  bg-zinc-50">
        <title>Agenda</title>
        <link rel="stylesheet" href="./index.css" />

        <div className="  w-auto h-auto mx-auto mt-[-10%] "> 
        <Carousel/>

          <section className="informacion" id="informacion"></section>
          
          <div className="flex mt-9 ml-9  mr-9">
            <div className=" text-center w-[45%]">
              <img
                className="h-auto w-[32%] ml-[37%]"
                src="\src\\img\informacion.png"
                alt=""
              />
              <h3 className=" mt-2 text-2xl font-semibold">Información</h3>
              <h4>
                Podras tener la informacion de tu agenda de manera organizada
              </h4>
            </div>
            <div className="text-center w-[45%]">
              <img
                className="h-auto w-[32%] ml-[37%] "
                src="\src\\img\productividad.png"
                alt=""
              />
              <h3 className=" mt-2 text-2xl font-semibold">Productividad</h3>
              <h4>Tendras un control de todas tus tareas registradas</h4>
            </div>
            <div className="text-center w-[45%]">
              <img
                className="h-auto w-[32%] ml-[37%]"
                src="\src\\img\agenda.png"
                alt=""
              />
              <h2 className=" mt-2 text-2xl font-semibold">Agenda</h2>
              <h4>
                Podras tener tu agenda en cualquier parte del mundo, mientras
                tengas acceso a internet
              </h4>
            </div>
          </div>
        </div>
        <section id="Section" className="py-10">
          <h2 className="text-3xl font-semibold text-center mb-5">
            ¿Qué ofrece nuestra página?
          </h2>
          <div className="flex justify-center items-center">
            <table className="w-full max-w-sm border-collapse mx-auto text-center">
              <thead>
                <tr className="bg-gray-200 even:bg-white">
                  <th
                    className="bg-green-500 text-white py-2 text-center"
                    colSpan="2"
                  >
                    Funcionalidad de la agenda
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-200 even:bg-white">
                  <td className="py-4 border border-gray-300 first-letter:">
                    Seguridad de información
                  </td>
                  <td className="py-4 border border-gray-300">
                    <div className="cheque flex items-center justify-center">
                      <img
                        src="\src\img\cheque.png"
                        alt=""
                        className="w-6 h-6"
                      />
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-200 even:bg-white">
                  <td className="py-4 border border-gray-300">
                    Perfil personalizado
                  </td>
                  <td className="py-4 border border-gray-300">
                    <div className="cheque flex items-center justify-center">
                      <img
                        src="\src\img\cheque.png"
                        alt=""
                        className="w-6 h-6"
                      />
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-200 even:bg-white">
                  <td className="py-4 border border-gray-300">
                    Alerta de notificaciones al correo
                  </td>
                  <td className="py-4 border border-gray-300">
                    <div className="cheque flex items-center justify-center">
                      <img
                        src="\src\img\cheque.png"
                        alt=""
                        className="w-6 h-6"
                      />
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-200 even:bg-white">
                  <td className="py-4 border border-gray-300 ">
                    Facil uso de la app web
                  </td>
                  <td className="py-4 border border-gray-300">
                    <div className="cheque flex items-center justify-center">
                      <img
                        src="\src\img\cheque.png"
                        alt=""
                        className="w-6 h-6"
                      />
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-200 even:bg-white">
                  <td className="py-4 border border-gray-300">bla bla</td>
                  <td className="py-4 border border-gray-300">
                    <div className="cheque flex items-center justify-center">
                      <img
                        src="\src\img\cheque.png"
                        alt=""
                        className="w-6 h-6"
                      />
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-200 even:bg-white">
                  <td className="py-4 border border-gray-300">bla bla</td>
                  <td className="py-4 border border-gray-300">
                    <div className="cheque flex items-center justify-center">
                      <img
                        src="\src\img\cheque.png"
                        alt=""
                        className="w-6 h-6"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className=" ml-9  mr-9 ">
          <h1 className="  text-center  text-xl font-semibold">
            ¿Quieres ver cómo luce nuestra agenda antes de acceder a ella?
          </h1>
          <p className="text-center  text-lg">
            Te ofrecemos una vista previa de nuestra agenda para que tengas una
            idea de lo que puedes esperar:
          </p>
        </div>
        <div className=" mt-4 flex  ml-20  mr-9">
        <div className="">
          <img className=" rounded-xl h-auto w-[90%] transform transition-transform hover:scale-110" src="\src\img\img1calendar.PNG" alt="" />
          <img className="mt-[30px] rounded-xl  h-auto w-[90%] transform transition-transform hover:scale-110" src="\src\img\img2perfil.PNG" alt="" />
        </div>
        <div className="preview2">
          <img className=" h-auto rounded-xl w-[90%] transform transition-transform hover:scale-110" src="\src\img\img3task.PNG" alt="" />
          <img className=" mt-[30px] rounded-xl h-auto w-[90%] transform transition-transform hover:scale-110" src="\src\img\img4agregar.PNG" alt="" />
        </div>
        </div>

        <footer className=" mt-10 bg-neutral-800 text-white p-2 flex">
          <div className="contacto">
            <h2 className="text-2xl font-semibold ">Contactanos</h2>
            <p>Correo Electrónico: Agenda.m.e@gmail.com</p>
            <p>Teléfono: (849) 456-7890</p>
          </div>
          <div className=" ml-[15%] mt-[5%]">
            <p>&copy; 2023 Agenda web</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default HomePage;
