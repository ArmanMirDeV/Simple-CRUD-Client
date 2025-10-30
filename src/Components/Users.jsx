import React, { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);

  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;

    console.log(email, name);

    const newUser = { name, email };

    // save this user data to the database (via server)
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after saving user", data);
        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);
          alert("Users Created Successfully");
          e.target.reset();
        }
      });
  };

  const handleDeleteUser = (id) => {
    console.log("Delete Button Click", id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After Delete ", data);
        if (data.deletedCount) {
          alert("Deleted Successfully");
          const remaining = users.filter((user) => user._id !== id);
          setUsers(remaining);
        }
      });
  };

  return (
    <div>
      <h3>Users: {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>

      <p>--------------------------------</p>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} <br /> Email: {user.email} <br />{" "}
            <Link to={`/users/${user._id}`}>Details</Link> <br />{" "}
            <Link to={`/update/${user._id}`}>Edit</Link> <br />{" "}
            <button onClick={() => handleDeleteUser(user._id)}>X</button>{" "}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
