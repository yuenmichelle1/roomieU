import React from 'react';

import {AuthConsumer} from '@hasura/react-check-auth';
// Use the AuthConsumer component to check 
// if userInfo is available
const test = () => (
    <div>      
      <AuthConsumer> 
        {({userInfo, isLoading, error}) => ( 
          userInfo ?
            (<span>Hi {userInfo.name}</span>) :
            (<a href="/login">Login</a>)
        )}
       </AuthConsumer>
    </div>
  );
export default test;