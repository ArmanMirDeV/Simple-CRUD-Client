import React from "react";

const Users = () => {
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;

    console.log(email, name);

    // save this user data to the database (via server)
    fetch()
      .then((res) => res.json())
      .then((data) => {
        console.log("after saving user", data);
      });
  };

  return (
    <div>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
    </div>
  );
};

export default Users;
