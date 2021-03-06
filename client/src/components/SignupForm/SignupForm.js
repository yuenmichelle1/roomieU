import React from "react";
import "./SignupForm.css";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input
  //   FormText
} from "reactstrap";

import API from "../../utils/API";
import Schools from "../../CollegesUniversities.json";
import Autosuggest from "react-autosuggest";

import firebase from "firebase";
// import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
const config = {
  apiKey: "AIzaSyC6GElWiN-c6OpaCp32KPkUNOZ1pS89ZgI",
  authDomain: "roomieu.firebaseapp.com",
  databaseURL: "https://roomieu.firebaseio.com",
  projectId: "roomieu",
  storageBucket: "gs://roomieu.appspot.com",
  messagingSenderId: "909135427924"
};

firebase.initializeApp(config);
const SchoolNames = Schools.features.map(el => el.properties.NAME);

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : SchoolNames.filter(
        el => el.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => <div>{suggestion}</div>;

export default class SignUpForm extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    phone: "",
    value: "",
    suggestions: [],
    //for photo storage
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    signUpError: false
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handelProgress = progress => this.setState({ progress });

  handleUploadError = err => {
    this.setState({ isUploading: false });
    console.log(err);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  handleFormSubmit = (event, data) => {
    const userData = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      phone: this.state.phone,
      school: this.state.value,
      photo: this.state.avatarURL
    };
    event.preventDefault();

    API.createUser(userData).then(userInfo => {
      // console.log(userInfo)
      if (userInfo.data.email) {
        window.location = "/roommatepreferences";
      } else {
        this.setState({ signUpError: userInfo.data.message });
      }
    });
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    // Autosuggest will pass through all these props to the input.
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Enter your School Name",
      value,
      onChange: this.onChange
    };

    return (
      <Row className="container-row">
        <Col xs="12" sm="12" md="12" lg="12">
          <Row className="title-div">
            <Col xs="12" sm="12" md="12" lg="12">
              <h1 className="header-text text-center form-header-top">
                Sign Up With Your School Email
              </h1>
            </Col>
          </Row>
          <Row className="form-div">
            <Col xs="12" sm="12" md="12" lg="12">
              <Form onSubmit={this.handleFormSubmit}>
                <FormGroup row>
                  <Label for="userEmail" xs={4} sm={4}>
                    School Email
                  </Label>
                  <Col xs={6} sm={6}>
                    <Input
                      type="email"
                      name="email"
                      // id="userEmail"
                      placeholder="Enter a valid .edu email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      required
                      pattern=".+@.+\.edu"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="userPassword" xs={4} sm={4}>
                    Password
                  </Label>
                  <Col xs={6} sm={6}>
                    <Input
                      type="password"
                      name="password"
                      // id="userPassword"
                      placeholder="Enter Password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="userName" xs={2} sm={4}>
                    Name
                  </Label>
                  <Col xs={6} sm={6}>
                    <Input
                      type="name"
                      name="name"
                      id="userName"
                      placeholder="Enter Full Name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="userPhone" xs={4} sm={4}>
                    Phone Number (in the form xxx-xxx-xxxx)
                  </Label>
                  <Col xs={6} sm={4}>
                    <Input
                      type="tel"
                      name="phone"
                      id="userPhone"
                      placeholder="Enter Phone Number"
                      value={this.state.phone}
                      onChange={this.handleInputChange}
                      required
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="imageFile" xs={4} sm={4}>
                    Upload Your Image
                  </Label>
                  <Col sm={4}>
                    {/* {this.state.isUploading && <p>Progress: {this.state.progress}</p> } */}
                    <CustomUploadButton
                      id="imageFile"
                      className="upload-btn"
                      accept="image/*"
                      name="avatar"
                      randomizeFilename
                      storageRef={firebase.storage().ref("images")}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleUploadSuccess}
                      onProgress={this.handleProgress}
                      style={{
                        backgroundColor: "#aaa",
                        color: "white",
                        padding: "5px 15px",
                        borderRadius: 4
                      }}
                    >
                      {" "}
                      Upload
                    </CustomUploadButton>

                    <Col sm={8}>
                      {this.state.avatarURL && (
                        <img
                          alt="avatar"
                          src={this.state.avatarURL}
                          style={{ height: "200px", marginLeft: "-15px" }}
                        />
                      )}
                    </Col>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="userSchool" xs={4} sm={4}>
                    School
                  </Label>
                  <Col xs={6} sm={6}>
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequested
                      }
                      onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                      }
                      getSuggestionValue={getSuggestionValue}
                      renderSuggestion={renderSuggestion}
                      inputProps={inputProps}
                      style={{ width: "900px" }}
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={4} />
                  <Col sm={{ size: 8 }}>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" id="checkbox2" required /> I
                        agree to Terms and Conditions.
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <br />
                <br />
                <FormGroup row>
                  <Col sm={4} />
                  <Col sm={8}>
                    <Button
                      className="centerBlock submit-btn"
                      type="submit"
                      color="success"
                    >
                      Submit
                    </Button>
                    {this.state.signUpError ? (
                      <p style={{ color: "red" }}>
                        A user with the given email is already registered
                      </p>
                    ) : (
                      ""
                    )}
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
