import "./Topic.css";
import "../styles/buttons.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import axios from "axios";

const Topic = (props) => {
  const { id, user, title, content, created, imagesUrl } = props.data;
  const { user: userData } = useContext(UserContext);
  const { getTopics, hasDeleteButton } = props;

  const [createdDate, setCreatedDate] = useState();

  const deleteTopic = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/api/topics/${id}`);
      await getTopics();
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="topic__content">
            {content}
            <div className="images">
              {imagesUrl &&
                imagesUrl
                  .split("|")
                  .map((file) => (
                    <img
                      key={file}
                      src={`${process.env.REACT_APP_SERVER}/images/${file}`}
                      alt={file}
                    />
                  ))}
            </div>
          </div>
        </div>
      </Link>
      {(userData.isAdmin === 1 || userData.id === user.id) && hasDeleteButton && (
        <div className="button">
          <button className="button__del button__style" onClick={deleteTopic}>
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
};

export default Topic;
