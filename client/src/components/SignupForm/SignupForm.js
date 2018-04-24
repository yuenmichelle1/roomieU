import React from "react";
import {
  Col,
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

//   fileUpload = event => {
//     event.preventDefault();
//     let userfile = event.target.files[0];
//     console.log(userfile);

//     if (userfile) {
//       let data = new FormData();
//       data.append("file", userfile);
//       this.setState({ file: userfile });
//     }
//   };

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
      <div>
        <br />
        <br />
        <br />
        <br /> <h1 className="text-center"> Sign Up With Your Email Address</h1>
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
          <FormGroup row>
            <Label for="userName" sm={2}>
              Name
            </Label>
            <Col sm={10}>
              <Input
                type="name"
                name="name"
                id="userName"
                placeholder="Enter Your Name to Display on Your Portfolio"
                value={this.state.name}
                onChange={this.handleInputChange}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="userPhone" sm={2}>
              Phone Number
            </Label>
            <Col sm={10}>
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
          {/* <FormGroup row>
            <Label for="imageFile" sm={2}>
              Upload Your Image
            </Label>
            <Col sm={10}>
              <Input
                type="file"
                name="file"
                id="imageFile"
                onChange={this.fileUpload}
                required
              />
              <FormText color="muted">
                Please note uploading a photo gives you a higher chance of
                finding a roomie.
              </FormText>
            </Col>
          </FormGroup> */}
        <FormGroup row>
            <Label for="imageFile" sm={2}>Upload Your Image</Label>
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
                    style={{backgroundColor: 'steelblue', color: 'white', padding: 6, borderRadius: 4}}
                > Upload
                </CustomUploadButton>
            </Col>
            <Col sm={8}>
                {this.state.avatarURL && <img src={this.state.avatarURL}          
                    style={{height:"200px"}}
                />}                
            </Col>
        </FormGroup>
          <FormGroup row>
            <Label for="userSchool" sm={2}>
              School
            </Label>
            <Col sm={10}>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 10 }}>
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
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button className="centerBlock" type="submit" style={{ width: "200px"}}>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
