import React from "react";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import API from "../../utils/API";

export default class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleFormSubmit = (event, data) => {
    const userData = { ...this.state };
    event.preventDefault();
    API.loginUser(userData).then(userInfo=>{
        // should link to dashboard once it's ready
        // window.location = "/roommatepreferences";
        // user information will be in userInfo
        if (userInfo.data.roommatePrefs[0]) {
          window.location="/dashboard";
        } else {
          window.location = "/roommatepreferences";
        }
        console.log(`THIS IS MY USERINFO ${userInfo.data.roommatePrefs[0].gender}`);
    })
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        {/* <NavBar/> */}
        <br />
        <br />
        <br />
        <br />
        {" "}
        {" "}
        <h1 className="text-center"> Log in With Your Email Address</h1>
        <Form onSubmit={this.handleFormSubmit}>
          <FormGroup row>
            <Label for="userEmail" sm={2}>
              Email
            </Label>
            <Col sm={10}>
              <Input
                type="email"
                name="email"
                id="userEmail"
                placeholder="Enter Your Email"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="userPassword" sm={2}>
              Password
            </Label>
            <Col sm={10}>
              <Input
                type="password"
                name="password"
                id="userPassword"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
