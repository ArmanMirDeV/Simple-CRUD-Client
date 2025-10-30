import React from 'react';
import { useLoaderData } from 'react-router';

const UserDetails = () => {

    const user = useLoaderData();

    console.log(user);
    

    return (
        <div>
            <h2> User Details</h2>
            
        </div>
    );
};

export default UserDetails;<h2> User Details</h2>