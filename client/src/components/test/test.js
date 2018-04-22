import React from 'react';

import {AuthConsumer} from '@hasura/react-check-auth';

import Navbar from '../NavBar'
// Use the AuthConsumer component to check 
// if userInfo is available
const test = () => (
    <div>      
      <AuthConsumer> 
        {({userInfo, isLoading, error}) => ( 
          userInfo ?
            (<div><Navbar></Navbar><span>Hi {userInfo.name}</span></div>) :
            (<a href="/login">Login</a>)
        )}
       </AuthConsumer>
    </div>
  );
export default test;