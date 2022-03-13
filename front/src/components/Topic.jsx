import "./Topic.css";
import "../styles/buttons.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Topic = () => {
  useEffect(() => {
    fetch("http://localhost:3001/api/topics").then((res) =>
      res
        .json()
        .then((topics) => {
          console.log(topics);
        })
        .catch((err) => console.log(err))
    );
  }, []);

  return (
    <div className="topic">
      <Link to="/topic">
        <div className="topic__pseudo-time">
          <p>Pseudo+heure</p>
        </div>
        <div className="topic__title-content">
          <h1 className="topic__title">title</h1>
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
