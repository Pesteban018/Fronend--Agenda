import React from "react";
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
import Navbar from "./components/Navbar";
import HomePage from "./page/HomePage";
import Card from "./page/card";
import Contac from "./page/Contac";
import Navbardesple from "./components/navbardesple";
import Imgcambio from "./components/imgcambio";

function App() {
  
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
                <Routes>
                <Route element={<ProtectedRouter />}>
                  <Route path="/home" element={<Home />} />
                  <Route
                    path="/calendario"
                    element={
                      <>
                        <Navbardesple />
                        <Calendario />
                      </>
                    }
                  />
                  <Route
                    path="/tasks"
                    element={
                      <>
                        <Navbardesple />
                        <TaskPage />
                      </>
                    }
                  />
                  <Route
                    path="/card"
                    element={
                      <>
                        <Navbardesple />
                        <Card />
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
                        <Navbardesple />
                        <ProfilePage />
                      </>
                    }
                  />

<Route
                    path="/imgcambio"
                    element={
                      <>
                        <Navbardesple />
                        <Imgcambio />
                      </>
                    }
                  />
                </Route>
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
