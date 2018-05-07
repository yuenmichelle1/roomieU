import React from "react";
import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import "./UserinfoForm.css";
import female from './img/female.svg';
import male from './img/male.svg';
import smoking from './img/smoking.svg';
import nosmoking from './img/no-smoking.svg';
import morning from './img/morning.svg';
import night from './img/night.svg';
import party from './img/party.svg';
import peace from './img/peace.svg';

const UserinfoForm = props => {
  return (
    <Row className="container-row">
      <Col xs="12" sm="12" md="12" lg="12">
        <Form>
          <FormGroup>
            <Label for="userGender">I am: </Label>
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              value="male"
              data-score="1"
              onChange={props.setUserQuals}
              data-name="userGender"
              checked={props.userGender === "male"}
            />
            <img src={male} alt="male" className="icon" />Male
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="userGender"
              checked={props.userGender === "female"}
              value="female"
              data-score="2"
            />
            <img src={female} alt="female" className="icon" />Female
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="userGender"
              value="Other"
              data-score="0"
              checked={props.userGender === "Other"}
            />
            Non-binary Gender
          </FormGroup>
          <FormGroup>
            <Label for="userBudget">
              Maximum combined (roommate + myself) budget for rent per month is around:{" "}
            </Label>
            <Input
              type="select"
              data-name="budget"
              id="userBudget"
              onChange={props.grabUserProfile}
            >
              <option>$0 - $800</option>
              <option>$801 - $1000 </option>
              <option>$1001 - $1200</option>
              <option>$1201 - $1400 </option>
              <option>$1401 - $1600</option>
              <option>$1601 - $1800 </option>
              <option>$1801 - $2000</option>
              <option>$2001 - $2200 </option>
              <option>$2,201 - $2,400</option>
              <option>$2401 - $2600 </option>
              <option>$2601 - $2800 </option>
              <option>$2801 - $3000 </option>
              <option>$3001 or higher...</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="userRadius">
              How far from campus are you willing to live?
            </Label>
            <Input
              type="select"
              data-name="radius"
              id="userRadius"
              onChange={props.grabUserProfile}
            >
              <option>0-5 miles</option>
              <option>6-9 miles</option>
              <option>10+ miles</option>
            </Input>
          </FormGroup>
          <FormGroup tag="fieldset">
            Do you Smoke?
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="userSmoke"
              checked={props.userSmoke === "Yes"}
              value="Yes"
              data-score="1"
            />
            <img src={smoking} alt="smoker" className="icon smoking-icons" />
            Yes
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="userSmoke"
              value="No"
              data-score="0"
              checked={props.userSmoke === "No"}
            />
            <img src={nosmoking} alt="not smoker" className="icon smoking-icons" />
            No
          </FormGroup>

          <FormGroup>
            <Label for="userSchedule">What is Your Schedule Like?</Label>
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="userSchedule"
              checked={props.userSchedule === "Morning Bird"}
              value="Morning Bird"
              data-score="1"
            />
            <img src={morning} alt="morning bird" className="icon schedule-icons" />
            Morning Bird
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="userSchedule"
              value="Night Owl"
              data-score="2"
              checked={props.userSchedule === "Night Owl"}
            />
            <img src={night} alt="night owl" className="icon schedule-icons" />
            Night Owl
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="userSchedule"
              value="N/A"
              data-score="0"
              checked={props.userSchedule === "N/A"}
            />
            N/A or Random
          </FormGroup>
          <FormGroup>
            <Label for="userPartying">
              Would you consider yourself a "Party Animal"?{" "}
            </Label>
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="userParty"
              checked={props.userParty === "Party Animal"}
              value="Party Animal"
              data-score="1"
            />
            <img src={party} alt="party animal" className="icon" />
            Hell Yeah!
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="userParty"
              value="Not even"
              data-score="2"
              checked={props.userParty === "Not even"}
            />
            <img src={peace} alt="peace" className="icon" />
            No, I like my peace and quiet.
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="userParty"
              value="Both"
              data-score="0"
              checked={props.userParty === "Both"}
            />
            A little bit of both!
          </FormGroup>
          <FormGroup>
            <Label for="userPets">Do you have any pets?</Label>
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="userPets"
              checked={props.userPets === "Yes"}
              value="Yes"
              data-score="1"
            />
            Yes
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="userPets"
              value="No"
              data-score="0"
              checked={props.userPets === "No"}
            />
            No
          </FormGroup>
          <FormGroup>
            <Label for="userBio">Tell us a little bit about yourself:</Label>
            <Input
              type="textarea"
              data-name="bio"
              id="userBio"
              onChange={props.grabUserProfile}
            />
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
};

export default UserinfoForm;
