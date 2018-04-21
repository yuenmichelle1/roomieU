import React from "react";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import NavBar from "../NavBar";
import API from "../../utils/API";

export default class SignUpForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleFormSubmit = (event, data) => {
    const userData = { ...this.state };
    event.preventDefault();
    console.log(userData);
    // API.createUser(userData).then((window.location = "/roommatepreferences"));
    API.loginUser(userData).then(console.log(userData))
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <NavBar/>
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
