import { useState } from "react";
import { API_URL } from "../../services/api";
import "./AiCopilot.css";

export default function AiCopilot({ proyectoId, tareaPadreId = null, onPlanApplied }) {
    const [prompt, setPrompt] = useState("");
    const [plan, setPlan] = useState(null);
    const [loadingPlan, setLoadingPlan] = useState(false);
    const [loadingApply, setLoadingApply] = useState(false);
    const [open, setOpen] = useState(false);

    const generarPlan = async () => {
        if (!prompt.trim()) {
            alert("Escribe qué quieres construir u organizar");
            return;
        }

        try {
            setLoadingPlan(true);
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/api/ai/copilot/proyecto/${proyectoId}/planificar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    prompt,
                    tareaPadreId
                })
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }

            const data = await res.json();
            setPlan(data);

        } catch (err) {
            console.error(err);
            alert("Error generando plan IA");
        } finally {
            setLoadingPlan(false);
        }
    };

    const aplicarPlan = async () => {
        if (!plan) return;

        if (!window.confirm("¿Aplicar este plan? Se crearán nuevas tareas y roles, no se borrará nada.")) {
            return;
        }

        try {
            setLoadingApply(true);
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/api/ai/copilot/proyecto/${proyectoId}/aplicar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(plan)
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }

            const text = await res.text();
            alert(text);

            setPlan(null);
            setPrompt("");
            setOpen(false);

            if (onPlanApplied) {
                onPlanApplied();
            }

        } catch (err) {
            console.error(err);
            alert("Error aplicando plan IA");
        } finally {
            setLoadingApply(false);
        }
    };

    const renderTarea = (tarea, nivel = 0) => (
        <div key={`${tarea.titulo}-${nivel}-${Math.random()}`} className="ai_task_item" style={{ marginLeft: `${nivel * 18}px` }}>
            <strong>{tarea.titulo}</strong>
            <p>{tarea.descripcion}</p>

            <div className="ai_task_meta">
                <span>{tarea.estado}</span>
                <span>{tarea.tipoMedicion}</span>
                <span>{tarea.horasTrabajadas} h</span>
                {tarea.rolSugerido && <span>Rol: {tarea.rolSugerido}</span>}
            </div>

            {tarea.subtareas && tarea.subtareas.map(sub => renderTarea(sub, nivel + 1))}
        </div>
    );

    return (
        <>
            <button className="btn_ai_copilot" onClick={() => setOpen(true)}>
                <i className="fa-solid fa-wand-magic-sparkles"></i> AI Copilot
            </button>

            {open && (
                <div className="modal">
                    <div className="modal_content ai_copilot_modal">
                        <h2>AI Copilot del proyecto</h2>

                        <p>
                            Describe qué quieres construir, organizar o mejorar.
                        </p>

                        <textarea
                            className="ai_prompt_input"
                            placeholder="Ej: Quiero organizar un módulo de ecommerce con login, catálogo, carrito y pagos..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />

                        <div className="modal_buttons">
                            <button className="agregar" onClick={generarPlan} disabled={loadingPlan}>
                                {loadingPlan ? "Generando..." : "Generar plan"}
                            </button>

                            <button className="cancelar" onClick={() => setOpen(false)}>
                                Cerrar
                            </button>
                        </div>

                        {plan && (
                            <div className="ai_plan_result">
                                <h3>Plan propuesto</h3>

                                {plan.necesitaMasContexto ? (
                                    <div>
                                        <p>La IA necesita más contexto:</p>
                                        <ul>
                                            {plan.preguntas?.map((p, i) => (
                                                <li key={i}>{p}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <>
                                        <p>{plan.resumen}</p>

                                        <h4>Roles propuestos</h4>
                                        {plan.roles?.length > 0 ? (
                                            <div className="ai_roles">
                                                {plan.roles.map((rol, i) => (
                                                    <span key={i} className="role_tag">
                                                        {rol.nombre}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>No se crearán roles nuevos.</p>
                                        )}

                                        <h4>Tareas propuestas</h4>
                                        <div className="ai_tasks_tree">
                                            {plan.tareas?.map(tarea => renderTarea(tarea))}
                                        </div>

                                        <button
                                            className="agregar"
                                            onClick={aplicarPlan}
                                            disabled={loadingApply}
                                        >
                                            {loadingApply ? "Aplicando..." : "Aplicar plan"}
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}