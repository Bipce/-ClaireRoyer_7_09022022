import Topic from "../components/Topic";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Message from "../components/Message";
import "./TopicPage.css";
import { UserContext } from "../contexts/User";

const TopicPage = () => {
  const [topic, setTopic] = useState();
  const { id } = useParams();
  const { user, login } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:3001/api/topics/${id}`
      );
      setTopic(response.data);
    })();
  }, []);

  if (!topic) return null;

  return (
    <div className="topicPage">
      <Topic data={topic} hasButtons />
      <div className="messages">
        {topic.messages.map((message) => (
          <Message key={message.id} data={message} />
        ))}
      </div>
      <div className="textAreaContainer">
        <textarea
          id="textArea"
          rows={5}
          cols={40}
          placeholder="Envoyer un message."
          autoFocus
        ></textarea>
        <div className="topicPage__buttons">
          <button className="textAreaButton button__style">Envoyer</button>
          <button className="return__button button__style">Retour</button>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
