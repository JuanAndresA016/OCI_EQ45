import React, { useEffect, useState } from "react"
import "./Login.css";
import { href } from "react-router-dom";

export default function Login() {

//     const getUser = async () => {
//   const token = localStorage.getItem("token");

//   const response = await fetch("http://localhost:8080/auth/me", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer " + token
//     }
//   });

//   if (!response.ok) {
//     throw new Error("No se pudo obtener el usuario");
//   }

//   const data = await response.json();
//   console.log("Usuario:", data);

//   return data;
// };

useEffect(() =>{
  console.log(localStorage.getItem("token"))
})

const [error, SetError] = useState("");


  const login = async (email, password) => {

    if(email == "" || password == ""){
      SetError("Llena todos los campos");
      setTimeout(() => {
          SetError("");
      }, 5000)
    }else{

    
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if("message" in data){
      SetError(data.message);
      setTimeout(() =>{
        SetError("")
      },5000)
    }
    else{

    
    console.log(data);

    localStorage.setItem("token", data.token);
    window.location.href = "http://localhost:5173/dashboard"
    }

  }
  };

  return (
    <>
      <header className="login_header">
        <div className="login_header_container">
          <div className="login_header_container_element">
            <div className="login_header_container_element_img">
              <img src="/logo.png" alt="" />
            </div>
            <div className="login_header_container_element_text">
              <p>Maze Task</p>
              <span>Manager Portal</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main_login">
        <h1 align="center">Login</h1>
        {error == "" ? <span></span> : <div className="error"><span>{error}</span></div>}

        <div className="main_login_formContainer">
          <div className="main_login_formContainer_container">

            <div className="logo_container">
              <img src="/logo.png" alt="" />
              <p>MazeTask</p>
              <span>Manager Portal</span>
            </div>

            <div className="form_container">
              <p>Bienvenido de vuelta</p>

              <div className="login_form">
                <form
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault();
                    login(
                      document.getElementById("correo").value,
                      document.getElementById("contrasena").value
                    );
                  }}
                >
                  <label htmlFor="correo">Correo electrónico</label>
                  <input type="email" id="correo" />

                  <label htmlFor="contrasena">Contraseña</label>
                  <input type="password" id="contrasena" />

                  <button type="submit">Login</button>
                </form>

                <div className="register_option">
                  <span>¿No tienes cuenta?</span>
                  <a href="/register">regístrate</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <footer className="login_footer">
        <div className="login_footer_container">
          <p>Todos los derechos reservados</p>
          <p>Manager Portal</p>
        </div>
      </footer>
    </>
  );
}