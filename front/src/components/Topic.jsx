import "./Topic.css";
import "../styles/buttons.css";
import { Link } from "react-router-dom";

const Topic = () => {
  return (
    <div className="topic">
      <Link to="/topic">
        <div className="topic__pseudo-time">
          <p>Pseudo+heure</p>
        </div>
        <div className="topic__title-content">
          <h1 className="topic__title">Title of topic</h1>
          <div>
            Text/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/Image
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
