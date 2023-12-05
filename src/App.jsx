import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TasksContext";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import TaskPage from "./page/TaskPage";
import TaskFormPage from "./page/TaskFormPage";
import ProfilePage from "./page/ProfilePage";
import Calendario from "./page/Calendario";
import Home from "./page/Home";
import ProtectedRouter from "./ProtectedRouter";

import HomePage from "./page/HomePage";
import Card from "./page/card";
import Contac from "./page/Contac";
import Navbardesple from "./components/navbardesple";
import Imgcambio from "./components/imgcambio";
import { SharedStateProvider } from './context/SharedStateContext ';
import Compcaledar from "./components/compcalendar";
import Comprofile from "./components/compprofile";
import Compimgcambio from "./components/compimgcambio";
import Comptask from "./components/comptask";


function App() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <div className="flex">
          
            
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/contac" element={<Contac />} />
                </Routes>
                <main className="ml-64  flex-grow">
                  <SharedStateProvider>
                <Routes>
                <Route element={<ProtectedRouter />}>
                  <Route path="/home" element={<Home />} />
                  <Route
                    path="/calendario"
                    element={
                      <>
                      <Navbardesple isNavVisible={isNavVisible} toggleNavVisibility={toggleNavVisibility} />
  
                        <Compcaledar isNavVisible={isNavVisible}  />
                      </>
                    }
                  />
                  <Route
                    path="/tasks"
                    element={
                      <>
                        <Navbardesple isNavVisible={isNavVisible} toggleNavVisibility={toggleNavVisibility} />
  
                        <TaskPage />
                      </>
                    }
                  />
                  <Route
                    path="/card"
                    element={
                      <>
                         <Navbardesple isNavVisible={isNavVisible} toggleNavVisibility={toggleNavVisibility} />
  
                        <Comptask isNavVisible={isNavVisible}/>
                      </>
                    }
                  />
                  <Route
                    path="/add-task"
                    element={
                      <>
                        <Navbardesple />
                        <TaskFormPage />
                      </>
                    }
                  />
                  <Route
                    path="/tasks/:id"
                    element={
                      <>
                        <Navbardesple />
                        <TaskFormPage />
                      </>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <>
                         <Navbardesple isNavVisible={isNavVisible} toggleNavVisibility={toggleNavVisibility} />
  
                        <Comprofile isNavVisible={isNavVisible}/>
                      </>
                    }
                  />

<Route
                    path="/imgcambio"
                    element={
                      <>
                         <Navbardesple isNavVisible={isNavVisible} toggleNavVisibility={toggleNavVisibility} />
  
                        <Compimgcambio isNavVisible={isNavVisible} />
                      </>
                    }
                  />
                </Route>
              </Routes>
              </SharedStateProvider>
            </main>
          </div>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
