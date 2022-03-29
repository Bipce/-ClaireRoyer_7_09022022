import Topic from "../components/Topic";
import { useEffect, useState } from "react";
import axios from "axios";
import "./TopicsPage.css";
import useForm from "../hooks/useForm";

const TopicPage = () => {
  const [topics, setTopics] = useState([]);
  const initialState = { content: "", title: "" };
  const [state, handleChange, setState] = useForm(initialState);

  const getTopics = async () => {
    const response = await axios.get("http://localhost:3001/api/topics");
    setTopics(response.data);
  };

  useEffect(() => {
    (async () => {
      await getTopics();
    })();
  }, []);

  const createTopic = async () => {
    try {
      await axios.post("http://localhost:3001/api/topics", state);
      setState(initialState);
      await getTopics();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {topics.length > 0 && (
        <div className="topics">
          {topics.map((topic) => (
            <Topic key={topic.id} data={topic} />
          ))}
        </div>
      )}
      <div className="textAreaContainer">
        <input
          className="topic__title--input"
          onChange={handleChange}
          type="text"
          id="title"
          placeholder="Votre titre"
          value={state.title}
        />
        <textarea
          className="topic__content--area"
          onChange={handleChange}
          id="content"
          rows={5}
          value={state.content}
          placeholder="Contenu de votre topic."
          autoFocus
        ></textarea>
        <button
          className="button__style topic__button"
          type="submit"
          onClick={createTopic}
        >
          Créer un topic
        </button>
      </div>
    </div>
  );
};

export default TopicPage;
