import Topic from "../components/Topic";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Message from "../components/Message";
import "./TopicPage.css";
import { useHistory } from "react-router-dom";
import useForm from "../hooks/useForm";

const TopicPage = () => {
  const { id } = useParams();
  const initialState = { content: "", topicId: id };
  const [state, handleChange, setState] = useForm(initialState);
  const [topic, setTopic] = useState();
  const messagesDivRef = useRef();
  const history = useHistory();

  const getTopic = async () => {
    const response = await axios.get(`http://localhost:3001/api/topics/${id}`);
    setTopic(response.data);
  };

  useEffect(() => {
    (async () => {
      await getTopic();
    })();
  }, []);

  if (!topic) return null;

  const sendMessage = async () => {
    try {
      await axios.post("http://localhost:3001/api/messages", state);
      setState(initialState);
      await getTopic();
      messagesDivRef.current.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="topicPage">
      <Topic data={topic} hasButtons />
      <div className="messages" ref={messagesDivRef}>
        {topic.messages
          .sort((m1, m2) => m1.created < m2.created)
          .map((message) => (
            <Message key={message.id} data={message} />
          ))}
      </div>
      <div className="textAreaContainer">
        <textarea
          onChange={handleChange}
          id="content"
          value={state.content}
          rows={5}
          cols={40}
          placeholder="Envoyer un message."
          autoFocus
        ></textarea>
        <div className="topicPage__buttons">
          <button
            type="submit"
            className="textAreaButton button__style"
            onClick={sendMessage}
          >
            Envoyer
          </button>
          <button
            className="return__button button__style"
            onClick={() => {
              history.push("/");
            }}
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
