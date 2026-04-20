import React from "react"
import "./Login.css";

export default function Login() {


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
            <h1 align="center">Login</h1>
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
                            <form action="">
                                <label htmlFor="correo">Correo electrónico</label>
                                <input type="email" id="correo"/>
                                
                                <label htmlFor="contrasena">Contraseña</label>
                                <input type="password" id="contrasena"/>
                                
                                <button type="submit">Login</button>
                            </form>

                            <div className="register_option">
                                <span>¿No tienes cuenta?</span>
                                <a href="/rehister">regístrate</a>
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

    </>)
}