import "./Topic.css";
import "../styles/buttons.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Topic = (props) => {
  const { id, user, title, content, created } = props.data;
  const { hasButtons } = props;

  const [createdDate, setCreatedDate] = useState();

  useEffect(() => {
    const timestamp = parseInt(created);
    const date = new Date(timestamp);

    setCreatedDate(
      `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`
    );
  }, []);

  return (
    <div className="topic">
      <Link to={"/topic/" + id}>
        <div className="topic__pseudo-time">
          <p>
            {user.username} {createdDate}
          </p>
        </div>
        <div className="topic__title-content">
          <h1 className="topic__title">{title}</h1>
          <div style={{ paddingBottom: !hasButtons ? "1rem" : "0" }}>
            {content}
          </div>
        </div>
      </Link>
      {hasButtons && (
        <div className="button">
          <button className="button--del">Supprimer</button>
          <button className="button--mod">Modifier</button>
        </div>
      )}
    </div>
  );
};

export default Topic;
