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
        <div className="topic__informations ">
          <div className="topic__userName--time margin0_4">
            <p className="topic__userName capitalize">{user.username}</p>
            <p>{createdDate}</p>
          </div>
        </div>
        <div className="topic__title-content margin0_4">
          <h1 className="topic__title capitalize">{title}</h1>
          <div style={{ paddingBottom: !hasButtons ? "1rem" : "0" }}>
            {content}
          </div>
        </div>
      </Link>
      {hasButtons && (
        <div className="button">
          <button className="button__del button__style">Supprimer</button>
          <button className="button__mod button__style">Modifier</button>
        </div>
      )}
    </div>
  );
};

export default Topic;
