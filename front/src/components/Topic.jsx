import "./Topic.css";
import "../styles/buttons.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";

const Topic = () => {
  const [topics, setTopics] = useState(false);

  const getTopics = () => {
    Axios.get("http://localhost:3001/api/topics").then((response) => {
      console.log(response.data.map((topics) => <p key={topics.id}></p>));
      setTopics(
        response.data.map((topics) => (
          <h1 key={topics.id}>Title: {topics.title}</h1>
        ))
      );
    });
  };

  return (
    <div className="topic">
      <Link to="/topic">
        <div className="topic__pseudo-time">
          <p>Pseudo+heure</p>
        </div>
        <div className="topic__title-content">
          <h1 className="topic__title">Title: {topics.title}</h1>
          <div>
            Text/Image Text/Image Text/Image Text/Image Text/Image Text/Image
            Text/Image Text/Image Text/Image Text/Image Text/ImageText/Image
            Text/Image Text/Image Text/Image Text/Image Text/Image Text/Image
            Text/Image Text/Image Text/Image Text/Image Text/Image Text/Image
            Text/Image Text/Image Text/Image Text/Image Text/Image Text/Image
            Text/Image Text/Image
          </div>
        </div>
      </Link>
      <div className="button">
        <button className="button--del">Supprimer</button>
        <button className="button--mod">Modifier</button>
      </div>
    </div>
  );
};

export default Topic;
