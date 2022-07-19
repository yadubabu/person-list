import React from "react";
import { useState } from "react";
import "./App.css";
import Modal from "react-modal";
import { useEffect } from "react";

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState({
    error: false,
    msg: "",
  });
  const [input, setInput] = useState({
    name: "",
    age: "",
    email: "",
  });
  const [persons, setPersons] = useState([
    {
      name: "John",
      age: "34",
      email: "john@gmail.com",
    },
    {
      name: "Adom",
      age: "28",
      email: "adom@gmail.com",
    },
    {
      name: "Steves",
      age: "40",
      email: "steves@gmail.com",
    },
  ]);
  useEffect(() => {
    fetchPersons();
  }, []);
  const fetchPersons = () => {
    return persons;
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const { name, age, email } = input;
    if (name === "" || age === "" || email === "") {
      setMessage({ error: true, msg: "All Fields are mandatory" });
    } else {
      setPersons([...persons, { ...input }]);
      setMessage({ error: false, msg: "New Person added" });
      setInput("");
      setModalIsOpen(false);
    }
  };
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <div className="ui container">
      <center>
        <h1 className="main">My Persons List</h1>
      </center>
      {!message.error ? <h1 className="msg">{message.msg}</h1> : ""}

      <table className="box">
        <tr className="ui header">
          <td>Name</td>
          <td>Age</td>
          <td>Email</td>
        </tr>
        <tbody>
          {persons !== ""
            ? fetchPersons().map((person) => (
                <tr>
                  <td className="row">{person.name}</td>
                  <td className="row">{person.age}</td>
                  <td className="row">{person.email}</td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
      <button className="btn" onClick={() => setModalIsOpen(true)}>
        Add Person
      </button>
      <Modal isOpen={modalIsOpen}>
        <h1>Add new person</h1>
        {message.error ? <h1 className="err">{message.msg}</h1> : ""}
        <form className="ui form" onSubmit={submitHandler}>
          <label>Name:</label>
          <input type="text" name="name" onChange={changeHandler} />
          <br />
          <label>Age:</label>
          <input type="number" name="age" onChange={changeHandler} />
          <br />
          <label>Email:</label>
          <input type="text" name="email" onChange={changeHandler} />
          <br />
          <input
            value="Submit"
            type="submit"
            className="ui button primary"
            onSubmit={submitHandler}
          />
          <button className="close" onClick={() => setModalIsOpen(false)}>
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
};
export default Home;
