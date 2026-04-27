import "./Aside.css";


export default function Aside(){


    return(
        <>
            <div className="aside_container">

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
                            <a href="/dashboard"><i class="fa-regular fa-folder"></i>Proyectos</a>
                            <a href=""><i class="fa-solid fa-users"></i>Equipos</a>
                            <a href="/kpis"><i class="fa-solid fa-arrow-trend-up"></i>KPIs</a>
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
    )
}