import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {


    const user = useLoaderData();
    console.log(user);
    
    const handleUpdateUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;

        console.log(name , email);
        
        const updatedUser = { name, email };
        
        // send data to the server
        
        fetch(`http://localhost:3000/users/${user._id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        })
          .then((res) => res.json())
          .then((data) => {
              // console.log("After Update ", data);
              if (data.modifiedCount) {
                  alert('User info updated')
              }
          });
    }


    return (
        <div>
            <h2>Edit a User</h2>
            <form onSubmit={handleUpdateUser}>
                <input type="text" name='name' defaultValue={user.name} /> <br />
                <input type="email" name="email" id="" defaultValue={user.email} /><br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default UpdateUser;