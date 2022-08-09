import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("your description");
  const [author, setAuthor] = useState("cisco");

  useEffect(() => {
    //fetch
    if (title.length > 3 && description.length > 10) {
      setValidForm(true);
    }
  }, [title, description, author]);

  // console.log(title);

  async function formSubmit(e) {
    e.preventDefault();

    if (!validForm) {
      setErrorMessage("Not a vaild form");
      return;
    }

    try {
      // console.log("form submitted");
      setErrorMessage("");

      // const comment = {
      //   title: title,
      //   description: description,
      //   author: author,
      // };

      const comment = {
        title,
        description,
        author,
      };
      console.log(comment);

      // really submit it to an API
      const results = await fetch("https://sql.bocacode.com/comments", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      console.log(results);
      const data = await results.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "there was an error submitting your comment" + error.toString()
      );
    }
  }

  return (
    <div className="App">
      <form onSubmit={formSubmit}>
        <h1>Comments</h1>

        {/* here goes the title */}

        <label>Title</label>
        <input
          type="text"
          // required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <h3>{title}</h3>
        {/* this is the description */}
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <h3>{description}</h3>
        {/* THIS IS THE AUTHOR */}
        <label>Author</label>
        <select
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        >
          <option value="" selected>
            Choose One
          </option>
          <option value="todd">Todd</option>
          <option value="cisco">Cisco</option>
          <option value="other">Other</option>
        </select>
        <h3>{author}</h3>

        {!formSubmitted && <button>Submit Form</button>}

        {errorMessage && (
          <h1>
            there was an error:
            <br />
            {errorMessage}
          </h1>
        )}
      </form>
    </div>
  );
}

export default App;
