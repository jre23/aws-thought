import React from "react";
import { Link } from "react-router-dom";

const ThoughtList = ({ thoughts, title, deleteThought }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }
  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought.createdAt} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {thought.username}'s thought on{" "}
                {new Date(parseInt(thought.createdAt)).toString()}
              </Link>{" "}
            </p>
            {thought.thought && (
              <p className="px-2 ml-3">
                {thought.thought}
                <button
                  className="mt-1"
                  style={{ float: "right" }}
                  onClick={() =>
                    deleteThought(thought.createdAt, thought.username)
                  }
                >
                  X
                </button>
              </p>
            )}
            {thought.image && (
              <div>
                <p className="px-2">
                  <img
                    className="mt-2 ml-3 thought-image"
                    style={{
                      maxHeight: "500px",
                      maxWidth: "500px",
                      objectFit: "contain",
                    }}
                    src={thought.image}
                    alt="S3 bucket response"
                  />
                </p>
              </div>
            )}
            <div style={{ clear: "both" }}></div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
