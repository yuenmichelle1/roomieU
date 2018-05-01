import React from "react";
import { Row, Col, Form, FormGroup, Label} from "reactstrap";
import './RoomieForm.css';
import female from '../UserinfoForm/img/female.svg';
import male from '../UserinfoForm/img/male.svg';
import smoking from '../UserinfoForm/img/smoking.svg';
import nosmoking from '../UserinfoForm/img/no-smoking.svg';
import morning from '../UserinfoForm/img/morning.svg';
import night from '../UserinfoForm/img/night.svg';
import party from '../UserinfoForm/img/party.svg';
import peace from '../UserinfoForm/img/peace.svg';

const RoomieForm = props => {
  return (
    <Row className="container-row">
      <Col xs="12" sm="12" md="12" lg="12">
        <Form>
          <FormGroup>
            <Label for="genderSelect">I wound prefer my roommate to be: </Label>
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="genderPref"
              checked={props.genderPref === "Male"}
              value="Male"
              data-score="1"
            />
            <img src={male} alt="male" className="icon" />
            Male
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="genderPref"
              value="Female"
              data-score="2"
              checked={props.genderPref === "Female"}
            />
            <img src={female} alt="female" className="icon" />
            Female
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="genderPref"
              value="Any gender is a good gender"
              data-score="0"
              checked={props.genderPref === "Any gender is a good gender"}
            />
            Any gender is a good gender
          </FormGroup>
          <FormGroup>
            <Label for="smokeSelect">
              Are you okay living with a roommate that smokes?{" "}
            </Label>
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="smokePref"
              checked={props.smokePref === "Yes"}
              value="Yes"
              data-score="1"
            />
            <img src={smoking} alt="smoker" className="icon smoking-icons" />
            Yes
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="smokePref"
              value="No"
              data-score="0"
              checked={props.smokePref === "No"}
            />
            <img src={nosmoking} alt="not smoker" className="icon smoking-icons" />
            No
          </FormGroup>
          <FormGroup>
            <Label for="scheduleSelect">
              I wound prefer my roommate's schedule to be:{" "}
            </Label>
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="schedulePref"
              checked={props.schedulePref === "Morning Bird"}
              value="Morning Bird"
              data-score="1"
            />
            <img src={morning} alt="morning bird" className="icon schedule-icons" />
            Morning Bird
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="schedulePref"
              value="Night Owl"
              data-score="2"
              checked={props.schedulePref === "Night Owl"}
            />
            <img src={night} alt="night owl" className="icon schedule-icons" />
            Night Owl
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="schedulePref"
              value="N/A"
              data-score="0"
              checked={props.schedulePref === "N/A"}
            />
            I don't care...
          </FormGroup>
          <FormGroup>
            <Label for="partySelect">
              Would you be okay living with a "Party Animal"?{" "}
            </Label>
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="partyPref"
              checked={props.partyPref === "Party Animal"}
              value="Party Animal"
              data-score="1"
            />
            <img src={party} alt="party animal" className="icon" />
            Hell Yeah!
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="partyPref"
              value="Not even"
              data-score="2"
              checked={props.partyPref === "Not even"}
            />
            <img src={peace} alt="peace" className="icon" />
            No, I still like my peace and quiet.
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="partyPref"
              value="Both"
              data-score="0"
              checked={props.partyPref === "Both"}
            />
            A little bit of both?
          </FormGroup>
          <FormGroup>
            <Label for="petSelect">Would you live with someone with a pet?</Label>
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="petsPref"
              checked={props.petsPref === "Yes"}
              value="Yes"
              data-score="1"
            />
            Yes
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="petsPref"
              value="No"
              data-score="0"
              checked={props.petsPref === "No"}
            />
            No
            <input
              type="radio"
              style={{ marginLeft: "10px", marginRight: "5px" }}
              onChange={props.setUserQuals}
              data-name="petsPref"
              value="Doesn't matter"
              data-score="2"
              checked={props.petsPref === "Doesn't matter"}
            />
            Doesn't matter
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
};

export default RoomieForm;
