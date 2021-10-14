import React from "react";

const updateHash = (highlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

function Sidebar({ highlights, teacher }) {
  return (
    <div className="sidebar" style={{ width: "25vw" }}>
      <div className="description" style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Comentarios:</h2>

        {teacher ? (
          <p style={{ fontSize: "0.7rem" }}>
            Seleccione un área de texto para agregar un comentario.
          </p>
        ) : (
          <p style={{ fontSize: "0.7rem" }}>
            Estos son los comentarios dejados por tu director.
          </p>
        )}
      </div>

      <ul className="sidebar__highlights">
        {highlights &&
          highlights.map((highlight, index) => (
            <li key={index} className="sidebar__highlight">
              <div>
                <strong>{highlight.comment.text}</strong>
                {highlight.content.text ? (
                  <blockquote style={{ marginTop: "0.5rem" }}>
                    {`${highlight.content.text.slice(0, 90).trim()}…`}
                  </blockquote>
                ) : null}
                {highlight.content.image ? (
                  <div
                    className="highlight__image"
                    style={{ marginTop: "0.5rem" }}
                  >
                    <img src={highlight.content.image} alt={"Screenshot"} />
                  </div>
                ) : null}
              </div>
              <div className="highlight__location">
                Página {highlight.position.pageNumber}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Sidebar;
