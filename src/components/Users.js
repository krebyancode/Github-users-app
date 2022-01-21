import React, { useState, useEffect } from "react";
import User from "./User";

const Users = ({ userList, editUser, deleteUser }) => {
  const [sortedUsers, setSortedUsers] = useState([]);

  const sortUsers = () => {
    const copyUsers = [...userList];
    setSortedUsers(
      copyUsers.sort((a, b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        }
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        }
      })
    );
  };

  useEffect(() => {
    sortUsers();
  }, [userList]);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>USERNAME</th>
          <th>EMAIL</th>
          <th>ADDRESS</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <User
            key={user.id}
            user={user}
            editUser={editUser}
            deleteUser={deleteUser}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Users;
