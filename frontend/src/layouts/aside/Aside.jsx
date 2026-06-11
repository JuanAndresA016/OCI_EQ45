import "./Aside.css";
import { useState } from "react";

export default function Aside() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="mobile_menu_btn"
                onClick={() => setOpen(true)}
            >
                ☰
            </button>

            <div className={`aside_container ${open ? "open" : ""}`}>

                <button
                    className="close_menu_btn"
                    onClick={() => setOpen(false)}
                >
                    ✕
                </button>

                <div className="aside_container_element">

                    <div className="aside_container_element_logo">
                        <img src="/logo.png" alt="" />

                        <div className="aside_container_element_logo_text">
                            <p>MazeTask</p>
                            <span>Manager Portal</span>
                        </div>
                    </div>

                    <div className="aside_container_element_options">
                        <nav className="aside_container_element_options_nav">
                            <a href="/dashboard">
                                <i className="fa-regular fa-folder"></i>
                                Proyectos
                            </a>

                            <a href="/calendar">
                                <i className="fa-solid fa-calendar"></i>
                                Calendarios
                            </a>

                            <a href="/kpis">
                                <i className="fa-solid fa-arrow-trend-up"></i>
                                KPIs
                            </a>
                        </nav>
                    </div>
                </div>

                <div className="aside_container_element">

                    <div className="aside_container_element_container">
                        <img src="/user2.png" alt="" />

                        <div className="aside_container_element_container_user">
                            <p>Manager</p>
                            <span>Administrador</span>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}