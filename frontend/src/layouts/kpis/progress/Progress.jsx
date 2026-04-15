import React from "react";
import "./Progress.css";

export default function Progress() {
  const value = 50;

  return (
    <>
      <div className="progress">
        <div className="progress_container">
          <span>Progreso General</span>

          {/* Barra personalizada */}
          <div className="progressBar">
            <div
              className="progressFill"
              style={{ width: `${value}%` }}
            ></div>
          </div>

        </div>
      </div>
    </>
  );
}