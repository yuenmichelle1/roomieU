import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand
} from 'reactstrap';
import logo from './logo.svg';
import './navbar.css';
import API from "../../utils/API";
import {AuthConsumer} from '@hasura/react-check-auth';
import LogoutBtn from '../LogoutBtn';
import LoginSignupBtn from'../LoginSignupBtn';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout= (event) => {
    event.preventDefault();
    API.logoutUser().then(userInfo=>{
        window.location = "/"
        console.log(userInfo)
    })
  };
  render() {
    return (
        <AuthConsumer> 
            {({userInfo, isLoading, error}) => (userInfo ?          
                (<Navbar color="faded" light expand="md">
                    <NavbarBrand href="/"><img alt="RoomieU" src={logo} className="navbar-logo" /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>  
                        <LogoutBtn handleLogout={this.handleLogout} userInfo={userInfo}/>
                    </Collapse>
                </Navbar>):
                (<Navbar color="faded" light expand="md">
                    <NavbarBrand href="/"><img alt="RoomieU" src={logo} className="navbar-logo" /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <LoginSignupBtn/>
                    </Collapse>
                </Navbar>)        
            )}
        </AuthConsumer> 
    );
  }
}