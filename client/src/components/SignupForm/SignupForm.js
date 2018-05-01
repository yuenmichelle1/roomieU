import React from "react";
// import Signupform.css
import "./SignupForm.css";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
//   FormText
} from "reactstrap";

import API from "../../utils/API";
import Schools from "../../CollegesUniversities.json";
import Autosuggest from "react-autosuggest";

import firebase from "firebase";
// import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
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

const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

export default class SignUpForm extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    phone: "",
    // file: "",
    value: "",
    suggestions: [],
    //for photo storage
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

    handleUploadStart = () => this.setState({isUploading: true, progress:0});
    
    handelProgress = (progress) => this.setState({progress});
    
    handleUploadError = (err) => {this.setState({isUploading: false});console.log(err)};
    
    handleUploadSuccess = (filename)=>{
        this.setState({avatar: filename, progress: 100, isUploading: false});
        firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
    };

  handleFormSubmit = (event, data) => {
    const userData = { 
      email: this.state.email, 
      password: this.state.password,
      name: this.state.name,
      phone: this.state.phone,
      school: this.state.value,
      photo:this.state.avatarURL
    };
    event.preventDefault();
    // console.log(userData);
    // API.createUser(userData).then((window.location = "/roommatepreferences"));
    API.createUser(userData).then(userInfo=>{
        window.location = "/roommatepreferences"
        // console.log(userInfo)
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
              <h1 className="header-text text-center form-header-top">Sign Up With Your School Email</h1>
            </Col>
          </Row>
          <Row className="form-div">
            <Col xs="12" sm="12" md="12" lg="12">
              <Form onSubmit={this.handleFormSubmit}>
                <FormGroup row>
                  <Label for="userEmail" sm={4}>
                    School Email
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="email"
                      name="email"
                      id="userEmail"
                      placeholder="Enter a valid .edu email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="userPassword" sm={4}>
                    Password
                  </Label>
                  <Col sm={3}>
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
                <FormGroup row>
                  <Label for="userName" sm={4}>
                    Name
                  </Label>
                  <Col sm={4}>
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
                  <Label for="userPhone" sm={4}>
                    Phone Number
                  </Label>
                  <Col sm={3}>
                    <Input
                      type="tel"
                      name="phone"
                      id="userPhone"
                      placeholder="Enter Phone Number"
                      value={this.state.phone}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Col>
                </FormGroup>
              <FormGroup row>
                  <Label for="imageFile" sm={4}>Upload Your Image</Label>
                  <Col sm={2}>
                      {/* {this.state.isUploading && <p>Progress: {this.state.progress}</p> } */}
                      <CustomUploadButton
                          id="imageFile"
                          accept="image/*"
                          name="avatar"
                          randomizeFilename 
                          storageRef={firebase.storage().ref('images')}
                          onUploadStart={this.handleUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleUploadSuccess}
                          onProgress={this.handleProgress}
                          style={{backgroundColor: '#aaa', color: 'white', padding: '5px 15px', borderRadius: 4}}
                      > Upload
                      </CustomUploadButton>
                  </Col>
                  <Col sm={8}>
                      {this.state.avatarURL && <img alt="avatar" src={this.state.avatarURL}          
                          style={{height:"200px"}}
                      />}                
                  </Col>

              </FormGroup>
                <FormGroup row>
                  <Label for="userSchool" sm={4}>
                    School
                  </Label>
                  <Col sm={6}>
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                      getSuggestionValue={getSuggestionValue}
                      renderSuggestion={renderSuggestion}
                      inputProps={inputProps}
                      style={{ width: "900px"}}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={4}/>
                  <Col sm={{ size: 8 }}>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" id="checkbox2" /> I agree to Terms and
                        Conditions.
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <br />
                <br />
                <FormGroup row>
                  <Col sm={4}/>
                  <Col sm={8}>
                    <Button className="centerBlock submit-btn" type="submit" color="success">Submit</Button>
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
