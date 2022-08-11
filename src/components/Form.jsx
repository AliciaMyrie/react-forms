import { useEffect } from "react";
import { useState } from "react";

export default function Form({
  ronsProps,
  aliciasProps,
  handleClose,
  setStateFromChild,
}) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({});

  console.log("props here", ronsProps, aliciasProps);

  useEffect(() => {
    //fetch
    if (form?.title?.length > 3 && form?.description?.length > 10) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [form]);

  async function formSubmit(e) {
    e.preventDefault(); // stops page from refreshing

    if (!validForm) {
      setErrorMessage("Not a valid form");
      return;
    }

    try {
      const results = await fetch("https://sql.bocacode.com/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      handleClose();
      setStateFromChild(form);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "there was an error submitting your comment" + error.toString()
      );
      // console.log(title);
    }
  }

  console.log("this is form =>", form);

  const updateForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // console.log("form submitted");
  //   setErrorMessage("");

  return (
    <div className="App">
      <h3>
        {ronsProps} {aliciasProps[0]}
      </h3>
      <form onSubmit={formSubmit}>
        <h1>Comments</h1>
        <label>Title</label>
        <input
          type="text"
          name="title"
          // required
          value={form.title}
          onChange={updateForm}
        />
        <h3>{form.title}</h3>
        <label>Description</label>
        <textarea
          value={form.description}
          name="description"
          // required
          onChange={updateForm}
        />
        <h3>{form.description}</h3>
        <label>Author</label>
        <select value={form.author} name="author" onChange={updateForm}>
          <option value="" selected>
            Choose One
          </option>
          <option value="todd albert">Todd</option>
          <option value="ludwigson">Cisco</option>
          <option value="other">Other</option>
        </select>

        <h3>{form.author}</h3>
        <button onClick={() => setStateFromChild("hello father")}>
          {" "}
          send stuff back to parent
        </button>
        {!formSubmitted && <button>Submit Form</button>}
        {errorMessage && (
          <h1>
            There was an error:
            <br />
            {errorMessage}
          </h1>
        )}
      </form>
    </div>
  );
}
