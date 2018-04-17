import React from "react";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";

export default class RoomieForm extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="genderSelect">I wound prefer my roommate to be: </Label>
          <Input type="select" name="genderSelect" id="genderSelect">
            <option>Male</option>
            <option>Female</option>
            <option>Any gender is a good gender.</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="scheduleSelect">I wound prefer my roommate's schedule to be: </Label>
          <Input type="select" name="scheduleSelect" id="scheduleSelect">
            <option>Morning Bird</option>
            <option>Night Owl</option>
            <option>Neither</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="userPartying">Partying: What Type of Party Animal Are You? </Label>
          <Input type="select" name="userPartying" id="userPartying">
            <option>I'm a Party Animal! I love having my friends over to throw a rager! </option>
            <option>I'm not really a party animal, but we can throw some parties at our place. </option>
            <option>I'm not ok with partying at our place.</option>
          </Input>
        </FormGroup>     
        <Button>Submit</Button>
      </Form>
    );
  }
}
