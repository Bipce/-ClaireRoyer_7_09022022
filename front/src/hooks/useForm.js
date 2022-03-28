import { useState } from "react";

const useForm = (initialState) => {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return [state, handleChange, setState];
};

export default useForm;
