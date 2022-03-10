import "./Message.css";

const Message = () => {
  return (
    <div className="message">
      <div className="message__pseudo-time">
        <p>Pseudo+heure</p>
      </div>
      <div className="message__user">
        <p className="test">
          Commentaire Commentaire Commentaire Commentaire Commentaire
        </p>
      </div>
      <div className="button">
        <button className="button--del">Supprimer</button>
        <button className="button--mod">Modifier</button>
      </div>
    </div>
  );
};

export default Message;
