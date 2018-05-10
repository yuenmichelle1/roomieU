import React from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import API from "../../utils/API";
import "./login.css";

export default class LoginForm extends React.Component {
  state = {
    email: "",
    password: "",
    wronglogin: false
  };

  handleFormSubmit = (event, data) => {
    const userData = { ...this.state };
    event.preventDefault();
    API.loginUser(userData).then(userInfo=>{
        if (userInfo.data.roommatePrefs[0]) {
          window.location="/dashboard";
        } else {
          window.location = "/roommatepreferences";
        }
        console.log(`THIS IS MY USERINFO ${userInfo.data.roommatePrefs[0].gender}`);
    }).catch(err=>{
        console.log(err)
        this.setState({wronglogin:true});
    })
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Row className="container-row">
        <Col xs="12" sm="12" md="12" lg="12">
          <Row className="title-div">
            <Col xs="12" sm="12" md="12" lg="12">
              <h1 className="header-text text-center form-header-top">Log in and Find Your Roomie!</h1>
            </Col>
          </Row>
          <Row className="form-div">
            <Form onSubmit={this.handleFormSubmit} className="login-form">
              <FormGroup row>
                <Label for="userEmail" className="login-label" sm={4} xs={6}>
                  Email
                </Label>
                <Col sm={4}>
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
                <Label for="userPassword" className="login-label" sm={4} xs={6}>
                  Password
                </Label>
                <Col sm={4}>
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
              <br/>
              <br/>
              <FormGroup row>
                <Col sm={4} xs={1}/>
                <Col sm={8} xs={1}>
                  <Button type="submit" className="centerBlock submit-btn" color="success">Login</Button>
                  {this.state.wronglogin?(<p style={{color: "red"}}>Wrong email or password</p>):("")}
                </Col>
                <Col sm={4} xs={10}/>
              </FormGroup>
            </Form>
            {/* End Form */}
          </Row>
        </Col>
      </Row>
    );
  }
}
