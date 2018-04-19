import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default class Example extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="genderSelect">I wound prefer my roommate to be: </Label>
          <Input type="select" data-name="gender" id="genderSelect" onChange={this.props.setIdealRoommate}>
            <option>Male</option>
            <option>Female</option>
            <option>Any gender is a good gender.</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="scheduleSelect">
            I wound prefer my roommate's schedule to be:{" "}
          </Label>
          <Input type="select" data-name="schedule" id="scheduleSelect" onChange={this.props.setIdealRoommate}>
            <option>Morning Bird</option>
            <option>Night Owl</option>
            <option>I actually don't care.</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="petSelect">Pets: I prefer my roommate to have: </Label>
          <Input type="select" data-name="pets" id="petSelect" onChange={this.props.setIdealRoommate}>
            <option>No Pets Allowed.</option>
            <option>
              Pets live here already, but MINE ONLY. Yours will not.
            </option>
            <option>Bring your pets! I love all animals!</option>
            <option>I actually don't care.</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="smokeSelect">
            Smoking: I prefer my roommate to have:{" "}
          </Label>
          <Input type="select" data-name="smokeSelect" id="smokeSelect" onChange={this.props.setIdealRoommate}>
            <option> No smoking at all!</option>
            <option>
              I prefer a non-smoking household. He/She can smoke outdoors but
              not inside.{" "}
            </option>
            <option>He/she should be ok with a smoking household.</option>
            <option>I actually don't care.</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="partySelect">
            Partying: I prefer my roommate to be a:{" "}
          </Label>
          <Input type="select" data-name="partySelect" id="partySelect" onChange={this.props.setIdealRoommate}>
            <option> Party Animal! Let's throw some great parties!</option>
            <option>You can party just not at our place.</option>
            <option>No partying!</option>
            <option>I actually don't care.</option>
          </Input>
        </FormGroup>
      </Form>
    );
  }
}
