import "./NotFound.css";

export default function NotFound() {
    return (
        <div className="not_found">

            <div className="not_found_container">

                <img
                    src="/logo.png"
                    alt="MazeTask"
                    className="not_found_logo"
                />

                <h1>404</h1>

                <h2>Página no encontrada</h2>

                <p>
                    La página que intentas visitar no existe o fue movida.
                </p>

                <div className="not_found_buttons">
                    <a href="/" className="btn_home">
                        Ir al inicio
                    </a>

                    <a href="/login" className="btn_dashboard">
                        Iniciar Sesión
                    </a>
                </div>

            </div>

        </div>
    );
}