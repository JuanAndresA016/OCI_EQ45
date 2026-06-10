import { useState } from "react";
import { API_URL } from "../../services/api";
import "./Header.css";

export default function Header({ proyectoId }) {

    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [resultados, setResultados] = useState([]);
    const [mostrarResultados, setMostrarResultados] = useState(false);

    const buscarSemantico = async () => {

        if (!textoBusqueda.trim()) return;

        try {

            const token = localStorage.getItem("token");

            const res = await fetch(
                `${API_URL}/api/tareas/ia/buscar-semantico`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify({
                        texto: textoBusqueda,
                        limite: 10
                    })
                }
            );

            const data = await res.json();

            setResultados(data);
            setMostrarResultados(true);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <header className="dashboard_container_header">

                <div className="input_header_container">

                    <i
                        className="fa-solid fa-magnifying-glass"
                        onClick={buscarSemantico}
                    ></i>

                    <input
                        type="text"
                        placeholder="Buscar tareas similares..."
                        value={textoBusqueda}
                        onChange={(e) => setTextoBusqueda(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                buscarSemantico();
                            }
                        }}
                    />

                </div>

                <div className="dashboard_container_announcements">
                    <i className="fa-regular fa-bell"></i>
                </div>

            </header>

            {mostrarResultados && (

                <div className="modal">

                    <div className="modal_content_search">

                        <h3>Resultados</h3>

                        {resultados.map(tarea => (

                            <div
                                key={tarea.tareaId}
                                className="resultado_semantico"
                                onClick={() => {
                                    window.location.href =
                                        `/proyecto_miembro/${proyectoId}/tarea/${tarea.tareaId}`;
                                }}
                            >
                                <h4>{tarea.titulo}</h4>

                                <p>{tarea.descripcion}</p>

                                <span>
                                    Similitud: {tarea.similitud}%
                                </span>
                            </div>

                        ))}

                        <button
                            onClick={() => setMostrarResultados(false)}
                        >
                            Cerrar
                        </button>

                    </div>

                </div>

            )}

        </>
    );
}