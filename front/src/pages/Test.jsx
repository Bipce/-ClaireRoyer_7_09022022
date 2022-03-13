import { useState } from "react";

const Test = () => {
  const num1 = 10;
  const [num, updateNum] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return isOpen ? (
    <div>
      <button onClick={() => setIsOpen(false)}>Fermer</button>

      <h1>Nombre 1: {num1}</h1>
      <button onClick={() => updateNum(num + num1)}>Ajouter</button>
      <h2>
        Total: {[num]} + {num1} = {num + num1}
      </h2>
    </div>
  ) : (
    <button onClick={() => setIsOpen(true)}>Ouvrir</button>
  );
};

export default Test;
