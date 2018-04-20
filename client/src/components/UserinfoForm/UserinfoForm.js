import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const UserinfoForm = props => {
  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="userGender">I am a: </Label>
          <input
            type="radio"
            style={{ marginLeft: "10px" }}
            value="male"
            data-score="1"
            onChange={props.setUserQuals}
            data-name="userGender"
            checked={props.userGender === "male"}
          />
          Male
          <input
            type="radio"
            style={{ marginLeft: "10px" }}
            onChange={props.setUserQuals}
            data-name="userGender"
            checked={props.userGender === "female"}
            value="female"
            data-score="2"
          />
          Female
          <input
            type="radio"
            style={{ marginLeft: "10px" }}
            onChange={props.setUserQuals}
            data-name="userGender"
            value="N/A"
            data-score="0"
            checked={props.userGender === "N/A"}
          />
          N/A
        </FormGroup>
        <FormGroup>
          <Label for="userBudget">
            My maximum budget for rent per month is around:{" "}
          </Label>
          <Input
            type="select"
            data-name="budget"
            id="userBudget"
            onChange={props.grabUserProfile}
          >
            <option>$0 - $500</option>
            <option>$501 - $750 </option>
            <option>$751 - $1,000</option>
            <option>$1,001 - $1,250 </option>
            <option>$1,251 - $1,500</option>
            <option>$1,501 - $1,750 </option>
            <option>$1,751 - $2,000</option>
            <option>$2,001 - $2,250 </option>
            <option>$2,251 - $2,500</option>
            <option>$2,501 - $3,000 </option>
            <option>$3,001+</option>
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
            <option>6-10 miles</option>
            <option>11-15miles</option>
            <option>15+ miles</option>
          </Input>
        </FormGroup>
        <FormGroup tag="fieldset">
          Do you Smoke?
          <input
            type="radio"
            style={{ marginLeft: "10px" }}
            onChange={props.setUserQuals}
            data-name="userSmoke"
            checked={props.userSmoke === "Yes"}
            value="Yes"
            data-score="1"
          />
          Yes
          <input
            type="radio"
            style={{ marginLeft: "10px" }}
            onChange={props.setUserQuals}
            data-name="userSmoke"
            value="No"
            data-score="0"
            checked={props.userSmoke === "No"}
          />
          No
        </FormGroup>

        <FormGroup>
          <Label for="userSchedule">What is Your Schedule Like?</Label>
          <input
            type="radio"
            style={{ marginLeft: "10px" }}
            onChange={props.setUserQuals}
            data-name="userSchedule"
            checked={props.userSchedule === "Morning Bird"}
            value="Morning Bird"
            data-score="1"
          />
          Morning Bird
          <input
            type="radio"
            style={{ marginLeft: "10px" }}
            onChange={props.setUserQuals}
            data-name="userSchedule"
            value="Night Owl"
            data-score="2"
            checked={props.userSchedule === "Night Owl"}
          />
          Night Owl
          <input
            type="radio"
            style={{ marginLeft: "10px" }}
            onChange={props.setUserQuals}
            data-name="userSchedule"
            value="N/A"
            data-score="0"
            checked={props.userSchedule === "N/A"}
          />
          N/A
        </FormGroup>
        <FormGroup>
          <Label for="userPartying">
            Partying: What Type of Party Animal Are You At Home?{" "}
          </Label>
          <input
            type="radio"
            style={{ marginLeft: "10px" }}
            onChange={props.setUserQuals}
            data-name="userParty"
            checked={props.userParty === "Party Animal"}
            value="Party Animal"
            data-score="1"
          />
          Party Animal
          <input
            type="radio"
            style={{ marginLeft: "10px" }}
            onChange={props.setUserQuals}
            data-name="userParty"
            value="Not even"
            data-score="2"
            checked={props.userParty === "Not even"}
          />
          Not even
          <input
            type="radio"
            style={{ marginLeft: "10px" }}
            onChange={props.setUserQuals}
            data-name="userParty"
            value="N/A"
            data-score="0"
            checked={props.userParty === "N/A"}
          />
          N/A
        </FormGroup>
        <FormGroup>
          <Label for="userPets">Pets: Do you have any?</Label>
          <input
            type="radio"
            style={{ marginLeft: "10px" }}
            onChange={props.setUserQuals}
            data-name="userPets"
            checked={props.userPets === "Yes"}
            value="Yes"
            data-score="1"
          />
          Yes
          <input
            type="radio"
            style={{ marginLeft: "10px" }}
            onChange={props.setUserQuals}
            data-name="userPets"
            value="No"
            data-score="0"
            checked={props.userPets === "No"}
          />
          No
        </FormGroup>
        <FormGroup>
          <Label for="userBio">Bio:</Label>
          <Input
            type="textarea"
            data-name="bio"
            id="userBio"
            onChange={props.grabUserProfile}
          />
        </FormGroup>
      </Form>
    </div>
  );
};

export default UserinfoForm;
