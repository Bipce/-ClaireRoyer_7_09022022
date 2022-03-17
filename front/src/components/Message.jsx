import "./Message.css";
import "../styles/buttons.css";
import { useEffect, useState } from "react";

const Message = (props) => {
  const { user, content, created } = props.data;

  const [createdDate, setCreatedDate] = useState();

  useEffect(() => {
    const timestamp = parseInt(created);
    const date = new Date(timestamp);

    setCreatedDate(
      `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`
    );
  }, []);

  return (
    <div className="message">
      <div className="message__informations">
        <div className="message__userName-time margin0_4">
          <p className="message__userName capitalize ">{user.username}</p>
          <p>{createdDate}</p>
        </div>
        <p className="message__content margin0_4">{content}</p>
      </div>
      <div className="message__button">
        <button className="message__button--del button__style">
          Supprimer
        </button>
        <button className="message__button--mod button__style">Modifier</button>
      </div>
    </div>
  );
};

export default Message;

// All message.
