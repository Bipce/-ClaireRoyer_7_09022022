// import { useState } from "react";
// import Axios from "axios";

// const Test = () => {
//   const num1 = 10;
//   const [num, updateNum] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);

//   // return isOpen ? (
//   //   <div>
//   //     <button onClick={() => setIsOpen(false)}>Fermer</button>

//   //     <h1>Nombre 1: {num1}</h1>
//   //     <button onClick={() => updateNum(num + num1)}>Ajouter</button>
//   //     <h2>
//   //       Total: {[num]} + {num1} = {num + num1}
//   //     </h2>
//   //   </div>
//   // ) : (
//   //   <button onClick={() => setIsOpen(true)}>Ouvrir</button>
//   // );

//   const [topics, setTopics] = useState("");

//   const getTopics = () => {
//     Axios.get("http://localhost:3001/api/topics").then((response) => {
//       setTopics(
//         response.data.map((topics) => (
//           <h1 className="topic__title" key={topics.title}>
//             Title: {topics.title}
//           </h1>
//         ))
//       );
//       console.log(topics.title);
//     });
//   };

//   return (
//     <div>
//       Hello <button onClick={getTopics}>Get API</button>
//       {topics}
//     </div>
//   );
// };

// export default Test;
