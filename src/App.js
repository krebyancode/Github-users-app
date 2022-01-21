import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Users from "./components/Users";
import { useFetch } from "./functions/fetchData";

const url = "https://jsonplaceholder.typicode.com/users";

function App() {
  const { loading, users } = useFetch(url);
  const [userList, setUserList] = useState([]);
  const [userToBeEdited, setUserToBeEdited] = useState("");
  const [userToBeEditedID, setUserToBeEditedID] = useState("");

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const addUser = (newUser) => {
    //Important: resource will not be really updated on the server but it will be faked as if.
    if (!userToBeEditedID) {
      //add a new user
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          address: {
            city: newUser.address.city,
            street: newUser.address.street,
            suite: newUser.address.suite,
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => setUserList([...userList, data]));
    } else {
      //edit the user by ID
      if (userToBeEditedID > 10) {
        //the fake user latest added cannot be fetched from the related end-point
        setUserList(
          userList.map((user) => {
            if (user.id === userToBeEditedID) {
              return {
                id: userToBeEditedID,
                ...newUser,
              };
            }
            return user;
          })
        );
      } else {
        fetch(`${url}/${userToBeEditedID}`, {
          method: "PUT",
          body: JSON.stringify({
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            address: {
              city: newUser.address.city,
              street: newUser.address.street,
              suite: newUser.address.suite,
            },
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUserList(
              userList.map((user) => {
                if (user.id === userToBeEditedID) {
                  return {
                    ...data,
                  };
                }
                return user;
              })
            );
          });
      }
      setUserToBeEdited("");
      setUserToBeEditedID("");
    }
  };

  const editUser = (id) => {
    //Important: resource will not be really updated on the server but it will be faked as if.
    setUserToBeEditedID(id);
    setUserToBeEdited(userList.find((user) => user.id === id));
  };

  const deleteUser = (id) => {
    //Important: resource will not be really updated on the server but it will be faked as if.
    fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    setUserList(userList.filter((user) => user.id !== id));
  };

  return (
    <div className="main">
      <div className="section-left">
        {loading ? (
          <h1>LOADING...</h1>
        ) : (
          <Users
            userList={userList}
            editUser={editUser}
            deleteUser={deleteUser}
          />
        )}
      </div>
      <Form
        className="section-right"
        addUser={addUser}
        userToBeEdited={userToBeEdited}
      />
    </div>
  );
}

export default App;
