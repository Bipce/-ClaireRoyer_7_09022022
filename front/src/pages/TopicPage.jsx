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
  const initialState = { content: "" };

  const [state, handleChange, setState] = useForm(initialState);
  const [topic, setTopic] = useState();
  const [fileCount, setFileCount] = useState();

  const messagesDivRef = useRef();
  const history = useHistory();
  const fileInput = useRef();

  const getTopic = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/topics/${id}`
    );
    setTopic(response.data);
  };

  useEffect(() => {
    getTopic();
  }, []);

  if (!topic) return null;

  const sendMessage = async () => {
    try {
      const formData = new FormData();
      formData.append("topicId", id);
      formData.append("content", state.content);
      for (const file of fileInput.current.files) {
        formData.append("image", file);
      }

      await axios.post(
        `${process.env.REACT_APP_SERVER}/api/messages`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setState(initialState);
      fileInput.current.value = "";
      setFileCount(null);
      await getTopic();
      messagesDivRef.current.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="topicPage">
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInput}
        multiple
        onChange={(e) => setFileCount(e.target.files.length)}
      />
      <Topic data={topic} />
      <div className="messages" ref={messagesDivRef}>
        {topic.messages
          .sort((m1, m2) => m1.created < m2.created)
          .map((message) => (
            <Message key={message.id} data={message} getTopic={getTopic} />
          ))}
      </div>
      <div className="textAreaContainer">
        <input
          onChange={handleChange}
          id="content"
          value={state.content}
          rows={5}
          cols={40}
          placeholder="Envoyer un message."
          autoFocus
        />
        <div className="topicPage__buttons">
          <button
            type="submit"
            className="textAreaButton button__style"
            onClick={sendMessage}
          >
            Envoyer
          </button>
          <button
            className="button__style images__button"
            onClick={() => {
              fileInput.current.click();
            }}
          >
            Images
          </button>
          {fileCount > 0 && (
            <p className="file__count">{fileCount} fichier(s)</p>
          )}
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
