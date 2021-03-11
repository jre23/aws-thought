import React, { useState } from "react";

const ThoughtForm = ({ fetchData }) => {
  const [formState, setFormState] = useState({ username: "", thought: "" });
  const [characterCount, setCharacterCount] = useState(0);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setFormState({ ...formState, [event.target.name]: event.target.value });
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // POST method with formState
    const postData = async () => {
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });
        const thoughtData = await res.json();
        console.log(thoughtData);
      } catch (error) {
        console.log(error);
      } finally {
        fetchData();
      }
    };
    postData();
    // clear form value
    setFormState({ username: "", thought: "" });
    setCharacterCount(0);
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 ? "text-error" : ""}`}>
        Character Count: {characterCount}/280
        {/* {error && <span className="ml-2">Something went wrong...</span>} */}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <input
          placeholder="Name"
          name="username"
          value={formState.username}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></input>
        <textarea
          placeholder="Here's a new thought..."
          name="thought"
          value={formState.thought}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;
