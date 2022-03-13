import { useEffect } from "react";

const Topics = () => {
  useEffect(() => {
    fetch("http://localhost:3001/api/topics").then((res) =>
      res
        .json()
        .then((topics) => {
          console.log(topics[0]);
        })
        .catch((err) => console.log(err))
    );
  }, []);
};

export default Topics;
