import "./Message.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Message = () => {
  return (
    <div className="message">
      <StyledLink to={"/message"}>
        <div className="message__pseudo-time">
          <p>Pseudo+heure</p>
        </div>
        <div className="message__user">
          <p className="test">
            Commentaire Commentaire Commentaire Commentaire Commentaire
          </p>
        </div>
      </StyledLink>
    </div>
  );
};

export default Message;
