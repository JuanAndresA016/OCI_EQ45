import "./Landing.css";

export default function Landing() {
    return (
        <div className="landing_page">
            <nav className="landing_nav">
                <div className="landing_logo">
                    <img src="/logo.png" alt="MazeTask logo" />
                    <span>MazeTask Manager</span>
                </div>

                <div className="landing_nav_buttons">
                    <a href="/login" className="btn_secondary">Login</a>
                    <a href="/register" className="btn_primary">Registrarse</a>
                </div>
            </nav>

            <section className="landing_hero">
                <div className="landing_hero_text">
                    <span className="landing_badge">AI Project Management</span>

                    <h1>Organiza proyectos, tareas y equipos con inteligencia artificial.</h1>

                    <p>
                        MazeTask Manager te ayuda a crear proyectos, administrar tareas,
                        asignar roles, planificar sprints y visualizar el progreso de tu equipo
                        desde una sola plataforma.
                    </p>

                    <div className="landing_actions">
                        <a href="/login" className="btn_primary">Iniciar sesión</a>
                        <a href="/register" className="btn_secondary">Crear cuenta</a>
                    </div>
                </div>

                <div className="landing_hero_card">
                    <h3>AI Copilot</h3>
                    <p>“Quiero construir un ecommerce con login, catálogo, carrito y pagos.”</p>

                    <div className="fake_task">
                        <strong>Sprint 1 - Base del sistema</strong>
                        <span>Frontend · Backend · QA</span>
                    </div>

                    <div className="fake_task">
                        <strong>Sprint 2 - Módulo ecommerce</strong>
                        <span>Catálogo · Carrito · Pagos</span>
                    </div>

                    <div className="fake_task">
                        <strong>Sprint 3 - Pruebas y despliegue</strong>
                        <span>Testing · DevOps · Validación</span>
                    </div>
                </div>
            </section>

            <section className="landing_features">
                <div className="feature_card">
                    <i className="fa-solid fa-list-check"></i>
                    <h3>Tareas y subtareas</h3>
                    <p>Organiza el trabajo en estructuras flexibles con profundidad ilimitada.</p>
                </div>

                <div className="feature_card">
                    <i className="fa-solid fa-users"></i>
                    <h3>Roles del equipo</h3>
                    <p>Asigna responsabilidades por rol y controla qué puede ver cada miembro.</p>
                </div>

                <div className="feature_card">
                    <i className="fa-solid fa-chart-simple"></i>
                    <h3>KPIs visuales</h3>
                    <p>Consulta horas trabajadas, tareas completadas y rendimiento por developer.</p>
                </div>

                <div className="feature_card">
                    <i className="fa-solid fa-calendar-days"></i>
                    <h3>Calendario</h3>
                    <p>Visualiza fechas límite y próximas entregas de todas las tareas.</p>
                </div>

                <div className="feature_card">
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    <h3>AI Copilot</h3>
                    <p>Genera roles, sprints, tareas y subtareas desde un prompt.</p>
                </div>

                <div className="feature_card">
                    <i className="fa-solid fa-magnifying-glass-chart"></i>
                    <h3>Búsqueda inteligente</h3>
                    <p>Encuentra tareas similares usando embeddings y búsqueda vectorial.</p>
                </div>
            </section>

            <section className="landing_cta">
                <h2>Construye y administra proyectos de forma más inteligente.</h2>
                <p>Empieza a usar MazeTask Manager y convierte ideas en planes accionables.</p>
                <a href="/register" className="btn_primary">Comenzar ahora</a>
            </section>

            <footer className="landing_footer">
                <span>MazeTask Manager © 2026</span>
            </footer>
        </div>
    );
}