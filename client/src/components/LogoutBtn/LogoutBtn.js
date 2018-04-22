import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Button } from 'reactstrap';

//props should have all the information of the logged in user
const LogoutBtn = (props) => (
    <Nav className="ml-auto" navbar>
        <NavItem> Welcome {props.userInfo.name} </NavItem>
        <NavLink href="/"><Button onClick = {props.handleLogout} color="warning" id="login-btn" className="btns login-btn">Log Out</Button></NavLink>
    </Nav>
)

export default LogoutBtn;



           