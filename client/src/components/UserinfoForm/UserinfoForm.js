import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default class UserinfoForm extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="userGender">I am a: </Label>
          <Input type="select" name="userGender" id="userGender">
            <option>Male</option>
            <option>Female</option>
            <option>Does it really matter?</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="userBudget">My maximum budget for rent per month is around: </Label>
          <Input type="select" name="userBudget" id="userBudget">
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
          <Label for="userRadius">How far from campus are you willing to live?</Label>
          <Input type="select" name="userRadius" id="userRadius">
            <option>0-5 miles</option>
            <option>6-10 miles</option>
            <option>11-15miles</option>
            <option>15+ miles</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="userSmoking">Do you Smoke?</Label>
          <Input type="select" name="userSmoking" id="userSmoking">
            <option> I don't smoke at all!</option>
            <option>I smoke outside.</option>
            <option>I do smoke (outside and inside).</option>
            <option>I don't smoke but I don't mind the smell of it. </option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="userSchedule">What is Your Schedule Like?</Label>
          <Input type="select" name="userSchedule" id="userSchedule">
            <option> Morning Bird</option>
            <option>Night Owl</option>
            <option>I'm pretty much both</option>
            <option>I don't smoke but I don't mind the smell of it. </option>
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
        <FormGroup>
          <Label for="userPets">Pets: Do you have any?</Label>
          <Input type="select" name="userPets" id="userPets">
            <option>I don't have one and I would rather not live with one. </option>
            <option>I don't have a pet, but I'm ok if my roommate has one. </option>
            <option>I do have a pet/s, but he/she/they do not get along with other animals.</option>
            <option>I do have a pet/s and I would love to meet more pet friends.</option>
          </Input>
        </FormGroup>  
        <FormGroup>
          <Label for="userBio">Bio:</Label>
          <Input type="textarea" name="userBio" id="userBeio" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}