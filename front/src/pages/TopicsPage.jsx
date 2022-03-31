import Topic from "../components/Topic";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./TopicsPage.css";
import useForm from "../hooks/useForm";

const TopicPage = () => {
  const [topics, setTopics] = useState([]);
  const initialState = { content: "", title: "" };
  const [state, handleChange, setState] = useForm(initialState);
  const topicsDivRef = useRef();
  const fileInput = useRef();
  const [fileCount, setFileCount] = useState(0);

  const getTopics = async () => {
    const response = await axios.get("http://localhost:3001/api/topics");
    setTopics(response.data.sort((t1, t2) => t1.created < t2.created));
  };

  useEffect(() => {
    (async () => {
      await getTopics();
    })();
  }, []);

  const createTopic = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", state.title);
      formData.append("content", state.content);
      for (const file of fileInput.current.files) {
        formData.append("image", file);
      }
      await axios.post("http://localhost:3001/api/topics", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setState(initialState);
      fileInput.current.value = "";
      setFileCount(0);
      await getTopics();
      topicsDivRef.current.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInput}
        multiple
        onChange={(e) => setFileCount(e.target.files.length)}
      />
      {topics.length > 0 && (
        <div className="topics" ref={topicsDivRef}>
          {topics.map((topic) => (
            <Topic key={topic.id} data={topic} />
          ))}
        </div>
      )}
      <div className="textAreaContainer">
        <form onSubmit={createTopic}>
          <input
            className="topic__title--input"
            onChange={handleChange}
            type="text"
            id="title"
            placeholder="Votre titre"
            value={state.title}
          />
          <input
            className="topic__content--area"
            onChange={handleChange}
            id="content"
            rows={5}
            value={state.content}
            placeholder="Contenu de votre topic."
            autoFocus
          />
          <div className="button__topics">
            <button className="button__style topic__button" type="submit">
              Créer un topic
            </button>
            <div className="file__count">
              <button
                className="button__style images__button"
                onClick={(e) => {
                  e.preventDefault();
                  fileInput.current.click();
                }}
              >
                Images
              </button>
              {fileCount > 0 && <p>{fileCount} fichier(s)</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopicPage;
