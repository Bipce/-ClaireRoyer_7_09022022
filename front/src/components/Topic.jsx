import "./Topic.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Topic = () => {
  return (
    <div className="topic">
      <StyledLink to="/topic">
        <div className="topic__pseudo-time">
          <p>Pseudo+heure</p>
        </div>
        <div className="topic__title-content">
          <h1 className="topic__title">Title of topic</h1>
          <div>
            Text/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/ImageText/Image
          </div>
        </div>
      </StyledLink>
    </div>
  );
};

export default Topic;
