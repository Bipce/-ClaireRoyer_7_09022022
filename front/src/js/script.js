// const main = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/api/topics");
//     const topics = await response.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

// main();

fetch("http://localhost:3000/api/topics")
  .then((response) => response.json())
  .then((topics) => {});
