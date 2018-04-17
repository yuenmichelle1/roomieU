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
import Navbar from "../NavBar";

export default class SignUpForm extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1 className="text-center"> Sign Up With Your Email Address</h1>
        <Form>
          <FormGroup row>
            <Label for="userEmail" sm={2}>
              Email
            </Label>
            <Col sm={10}>
              <Input
                type="email"
                name="useremail"
                id="userEmail"
                placeholder="Enter Your Email"
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
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="imageFile" sm={2}>
              Upload Your Image
            </Label>
            <Col sm={10}>
              <Input type="file" name="file" id="imageFile" />
              <FormText color="muted">
                Please note uploading a photo gives you a higher chance of
                finding a roomie.
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 10 }}>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" id="checkbox2" /> I agree to Terms and Conditions.
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
