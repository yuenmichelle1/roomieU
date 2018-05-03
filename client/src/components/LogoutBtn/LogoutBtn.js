import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Button } from 'reactstrap';
import './LogoutBtn.css';

//props should have all the information of the logged in user
const LogoutBtn = (props) => (
    <Nav className="ml-auto" navbar>
        <Row className="nav-rightside">
            <Col xs="8">
                <NavItem className="nav-welcome header-text">{props.userInfo.name}</NavItem>
                <NavLink href="/"><Button onClick = {props.handleLogout} color="warning" id="login-btn" className="btns login-btn logout-btn">Log Out</Button></NavLink>
            </Col>
            <Col xs="4">
            <img src={props.userInfo.photo} style={{width:"70px", height:"70px", borderRadius: "50%", marginLeft: "5px", marginTop: "10px"}} alt=""/>
            </Col>
        </Row>
    </Nav>
)

export default LogoutBtn;



           