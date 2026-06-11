import { useEffect, useState } from "react";
import { API_URL } from "../../services/api";
import "./ComentariosTarea.css";

export default function ComentariosTarea({ tareaId, personaId }) {
    const [comentarios, setComentarios] = useState([]);
    const [contenido, setContenido] = useState("");

    const fetchComentarios = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/api/comentarios/tarea/${tareaId}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            const data = await res.json();
            setComentarios(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        }
    };

    const crearComentario = async () => {
        if (!contenido.trim()) {
            alert("Escribe un comentario");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/api/comentarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({
                    tareaId: Number(tareaId),
                    personaId: Number(personaId),
                    contenido
                })
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }

            setContenido("");
            fetchComentarios();

        } catch (err) {
            console.error(err);
            alert("Error creando comentario");
        }
    };

    const eliminarComentario = async (comentarioId) => {
        if (!window.confirm("¿Eliminar comentario?")) return;

        try {
            const token = localStorage.getItem("token");

            await fetch(`${API_URL}/api/comentarios/${comentarioId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            setComentarios(prev => prev.filter(c => c.id !== comentarioId));

        } catch (err) {
            console.error(err);
            alert("Error eliminando comentario");
        }
    };

    useEffect(() => {
        if (tareaId) {
            fetchComentarios();
        }
    }, [tareaId]);

    return (
        <div className="comentarios_container">
            <h3>Comentarios</h3>

            <div className="comentario_form">
                <textarea
                    placeholder="Escribe un comentario..."
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                />

                <button onClick={crearComentario}>
                    Comentar
                </button>
            </div>

            <div className="comentarios_lista">
                {comentarios.length === 0 ? (
                    <span>No hay comentarios todavía</span>
                ) : (
                    comentarios.map(comentario => (
                        <div className="comentario_item" key={comentario.id}>
                            <div className="comentario_header">
                                <strong>{comentario.nombrePersona}</strong>

                                <span>
                                    {comentario.fechaCreacion
                                        ? new Date(comentario.fechaCreacion).toLocaleString()
                                        : ""}
                                </span>
                            </div>

                            <p>{comentario.contenido}</p>

                            {Number(comentario.personaId) === Number(personaId) && (
                                <button
                                    className="comentario_delete"
                                    onClick={() => eliminarComentario(comentario.id)}
                                >
                                    Eliminar
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}