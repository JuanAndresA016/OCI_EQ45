import "./Register.css";
import { useState, useEffect } from "react";
import { API_URL, EMBEDDINGS_URL } from "../../services/api";

export default function Register() {

    const [successMessage, SetSuccessMessage] = useState("")
    const [erroMessage, SetErrorMessage] = useState("");

    const registrar = async () => {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("correo").value;
    const password = document.getElementById("contrasena").value;

    if (!nombre || !apellido || !email || !password) {
        SetErrorMessage("Llena todos los campos");
        setTimeout(() => SetErrorMessage(""), 5000);
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre,
                apellido,
                email,
                password,
                rolId: null
            })
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            SetErrorMessage(data?.message || "No se pudo registrar el usuario");
            setTimeout(() => SetErrorMessage(""), 5000);
            return;
        }

        SetSuccessMessage("¡Ahora puedes iniciar sesión!");
        SetErrorMessage("");

        setTimeout(() => {
            window.location.href = "/login";
        }, 1500);

    } catch (error) {
        console.error(error);
        SetErrorMessage("No se pudo conectar con el servidor");
        setTimeout(() => SetErrorMessage(""), 5000);
    }
};

    function postForm() {
    if (document.getElementById("contrasena").value !== document.getElementById("passConf").value) {
        SetErrorMessage("Las contraseñas no coinciden");

        setTimeout(() => {
            SetErrorMessage("");
        }, 5000);

        return;
    }

    registrar();
}


    return (<>
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
            <h1 align="center">Registro</h1>
            {successMessage == "" ? <span></span> :

                <div className="success">
                    <span>{successMessage}</span>
                </div>
            }

            {erroMessage == "" ? <span></span> :

                <div className="error">
                    <span>{erroMessage}</span>
                </div>
            }
            <div className="main_login_formContainer">
                <div className="main_login_formContainer_container">

                    <div className="form_container">
                        <div className="login_form">
                            <form action="" onSubmit={e => { e.preventDefault(); postForm() }}>
                                <label htmlFor="correo">Correo electrónico</label>
                                <input type="email" id="correo" />

                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" id="nombre" />

                                <label htmlFor="apeelido">Apellido/s</label>
                                <input type="text" id="apellido" />

                                <label htmlFor="contrasena">Contraseña</label>
                                <input type="password" id="contrasena" />

                                <label htmlFor="passConf">Confirmar contraseña</label>
                                <input type="password" name="" id="passConf" />

                                <button type="submit">Registrarse</button>
                            </form>



                            <div className="register_option">
                                <span>¿Tienes cuenta?</span>
                                <a href="/login">Inicia sesión</a>
                            </div>
                        </div>
                    </div>


                    <div className="logo_container1">
                        <img src="/logo.png" alt="" />
                        <p>MazeTask</p>
                        <span>Manager Portal</span>
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

    </>)
}