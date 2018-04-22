import React from 'react';
import {
    Nav,
    NavItem,
    NavLink,
    Button } from 'reactstrap';

const LoginSignupBtn = () => (
    <Nav className="ml-auto" navbar>
        <NavItem>
            <NavLink href="/signup"><Button color="success" className="btns signup-btn">Sign Up</Button></NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/login"><Button color="warning" id="login-btn" className="btns login-btn">Log In</Button></NavLink>
        </NavItem>
    </Nav>
);


export default LoginSignupBtn