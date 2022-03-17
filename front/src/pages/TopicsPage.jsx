import Topic from "../components/Topic";
import { useEffect, useState } from "react";
import axios from "axios";

const TopicPage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3001/api/topics");
      setTopics(response.data);
    })();
  }, []);

  return (
    <div className="topics">
      {topics.map((topic) => (
        <Topic key={topic.id} data={topic} />
      ))}
    </div>
  );
};

export default TopicPage;

// All topics.
