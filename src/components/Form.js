import React, { useState, useEffect } from "react";

const Form = ({ addUser, userToBeEdited }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [suite, setSuite] = useState("");

  useEffect(() => {
    if (userToBeEdited) {
      setName(userToBeEdited.name);
      setUsername(userToBeEdited.username);
      setEmail(userToBeEdited.email);
      setStreet(userToBeEdited.address.street);
      setCity(userToBeEdited.address.city);
      setSuite(userToBeEdited.address.suite);
    }
  }, [userToBeEdited]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser({
      name,
      username,
      email,
      address: { city, street, suite },
    });
    setName("");
    setUsername("");
    setEmail("");
    setStreet("");
    setCity("");
    setSuite("");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="Address">City:</label>
        <input
          id="city"
          name="city"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="Address">Street:</label>
        <input
          id="street"
          name="street"
          required
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="Address">Suite:</label>
        <input
          id="suite"
          name="suite"
          required
          value={suite}
          onChange={(e) => setSuite(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-block">
        Save
      </button>
    </form>
  );
};

export default Form;
