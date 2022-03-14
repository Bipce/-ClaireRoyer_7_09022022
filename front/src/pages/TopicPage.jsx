import Topic from "../components/Topic";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Message from "../components/Message";

const TopicPage = () => {
  let [topic, setTopic] = useState();
  // const [message, setMessage] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:3001/api/topics/${id}`
      );
      setTopic(response.data);
    })();
  }, []);

  if (!topic) return null;

  return (
    <>
      <Topic data={topic} hasButtons />
      <Message />
    </>
  );
};

export default TopicPage;

// One topic
