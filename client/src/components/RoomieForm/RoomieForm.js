import React from "react";
import { Form, FormGroup, Label} from "reactstrap";

const RoomieForm = props => {
  return (
    <Form>
      <FormGroup>
        <Label for="genderSelect">I wound prefer my roommate to be: </Label>
        <input
          type="radio"
          style={{ marginLeft: "10px" }}
          onChange={props.setUserQuals}
          data-name="genderPref"
          checked={props.genderPref === "Male"}
          value="Male"
          data-score="1"
        />
        Male
        <input
          type="radio"
          style={{ marginLeft: "10px" }}
          onChange={props.setUserQuals}
          data-name="genderPref"
          value="Female"
          data-score="2"
          checked={props.genderPref === "Female"}
        />
        Female
        <input
          type="radio"
          style={{ marginLeft: "10px" }}
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
          Smoking: Can you live in a smoking household?{" "}
        </Label>
        <input
          type="radio"
          style={{ marginLeft: "10px" }}
          onChange={props.setUserQuals}
          data-name="smokePref"
          checked={props.smokePref === "Yes"}
          value="Yes"
          data-score="1"
        />
        Yes
        <input
          type="radio"
          style={{ marginLeft: "10px" }}
          onChange={props.setUserQuals}
          data-name="smokePref"
          value="No"
          data-score="0"
          checked={props.smokePref === "No"}
        />
        No
      </FormGroup>
      <FormGroup>
        <Label for="scheduleSelect">
          I wound prefer my roommate's schedule to be:{" "}
        </Label>
        <input
          type="radio"
          style={{ marginLeft: "10px" }}
          onChange={props.setUserQuals}
          data-name="schedulePref"
          checked={props.schedulePref === "Morning Bird"}
          value="Morning Bird"
          data-score="1"
        />
        Morning Bird
        <input
          type="radio"
          style={{ marginLeft: "10px" }}
          onChange={props.setUserQuals}
          data-name="schedulePref"
          value="Night Owl"
          data-score="2"
          checked={props.schedulePref === "Night Owl"}
        />
        Night Owl
        <input
          type="radio"
          style={{ marginLeft: "10px" }}
          onChange={props.setUserQuals}
          data-name="schedulePref"
          value="N/A"
          data-score="0"
          checked={props.schedulePref === "N/A"}
        />
        N/A
      </FormGroup>
      <FormGroup>
        <Label for="partySelect">
          Partying: I prefer my roommate to be a:{" "}
        </Label>
        <input
          type="radio"
          style={{ marginLeft: "10px" }}
          onChange={props.setUserQuals}
          data-name="partyPref"
          checked={props.partyPref === "Party Animal"}
          value="Party Animal"
          data-score="1"
        />
        Party Animal
        <input
          type="radio"
          style={{ marginLeft: "10px" }}
          onChange={props.setUserQuals}
          data-name="partyPref"
          value="Not even"
          data-score="2"
          checked={props.partyPref === "Not even"}
        />
        Not even
        <input
          type="radio"
          style={{ marginLeft: "10px" }}
          onChange={props.setUserQuals}
          data-name="partyPref"
          value="N/A"
          data-score="0"
          checked={props.partyPref === "N/A"}
        />
        N/A
      </FormGroup>
      <FormGroup>
        <Label for="petSelect">Pets: I prefer my roommate to have: </Label>
        <input
          type="radio"
          style={{ marginLeft: "10px" }}
          onChange={props.setUserQuals}
          data-name="petsPref"
          checked={props.petsPref === "Yes"}
          value="Yes"
          data-score="1"
        />
        Yes
        <input
          type="radio"
          style={{ marginLeft: "10px" }}
          onChange={props.setUserQuals}
          data-name="petsPref"
          value="No"
          data-score="0"
          checked={props.petsPref === "No"}
        />
        No
        <input
          type="radio"
          style={{ marginLeft: "10px" }}
          onChange={props.setUserQuals}
          data-name="petsPref"
          value="Doesn't matter"
          data-score="2"
          checked={props.petsPref === "Doesn't matter"}
        />
        Doesn't matter
      </FormGroup>
    </Form>
  );
};

export default RoomieForm;
