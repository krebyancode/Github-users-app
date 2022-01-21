import React from "react";

const User = ({ user, editUser, deleteUser }) => {
  const {
    id,
    name,
    username,
    email,
    address: { city, street, suite },
  } = user;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>{`${city}, ${street}, ${suite}`}</td>
      <td style={{ textAlign: "center" }}>
        <button className="btn btn-edit" onClick={() => editUser(id)}>
          Edit
        </button>
      </td>
      <td style={{ textAlign: "center" }}>
        <button
          className="btn btn-del"
          onClick={() => {
            const confirmDelete = window.confirm(
              "Are you sure about to delete this user from list?"
            );
            if (confirmDelete === true) {
              deleteUser(id);
            }
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
