import { useEffect } from "react";
import { useState } from "react";

export default function Form() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({});

  useEffect(() => {
    //fetch
    if (form?.title?.length > 3 && form?.description?.length > 10) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [form]);

  // console.log(title);

  async function formSubmit(e) {
    e.preventDefault();

    if (!validForm) {
      setErrorMessage("Not a vaild form");
      return;
    }

    try {
      // console.log("form submitted");
      //   setErrorMessage("");

      // really submit it to an API
      const results = await fetch("https://sql.bocacode.com/comments", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log(results);
      const data = await results.json();
      console.log(data);

      setFormSubmitted(true);
      setErrorMessage("");
      setValidForm(true);
      alert("Wow! Submitted");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "there was an error submitting your comment" + error.toString()
      );
    }
  }

  console.log("this is form =>", form);

  const updateForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    // setForm(oldForm => {..oldForm,})
  };

  return (
    <div className="App">
      <form onSubmit={formSubmit}>
        <h1>Comments</h1>

        {/* here goes the title */}

        <label>Title</label>
        <input
          type="text"
          name="title"
          // required
          value={form.title}
          onChange={updateForm}
        />
        <h3>{form.title}</h3>

        {/* // setForm({ [e.target.name]: e.target.value });
        this is the description */}
        <label>Description</label>
        <textarea
          value={form.description}
          name="description"
          onChange={updateForm}
        />
        <h3>{form.description}</h3>
        {/* THIS IS THE AUTHOR */}
        <label>Author</label>
        <select value={form.author} name="author" onChange={updateForm}>
          <option value="" selected>
            Choose One
          </option>
          <option value="todd">Todd</option>
          <option value="cisco">Cisco</option>
          <option value="other">Other</option>
        </select>
        <h3>{form.author}</h3>

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
