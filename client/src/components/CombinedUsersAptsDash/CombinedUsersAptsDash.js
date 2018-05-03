import React, { Component } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  CardColumns,
  CardDeck,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import API from "../../utils/API";
import ApartmentCardTest from "../ApartmentCardTest/ApartmentCardTest";

class CombinedUsersAptsDash extends Component {
  state = {
    userId: "",
    otherUserId: "",
    matchedApts: [],
    otherUser: {},
    user: {}
  };
  componentDidMount() {
    //grab User Apartments
    API.getUserInfo().then(userData => {
      const userAptsArr = userData.data.apartments;
      const user = userData.data;
      console.log(this.props.id);
      // grab  other User data
      API.getPopulatedUserInfo(this.props.id).then(otherUser => {
        const otherUserApts = otherUser.data.apartments;
        const otherUserData = otherUser.data;
        const matchedAddressApts = userAptsArr.filter(
          address => otherUserApts.indexOf(address) > -1
        );
        API.getAllApts(matchedAddressApts).then(apts => {
          this.setState(
            { matchedApts: apts.data, otherUser: otherUserData, user: user },
            () => {
              console.log(this.state.otherUser);
            }
          );
        });
      });
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Button
              onClick={() => this.props.changeDashboard(this.state.userId)}
              style={{ width: "250px" }}
            >
              {" "}
              Back to Main Dashboard{" "}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <h1> {this.state.user.name} </h1>
            <CardDeck>
              <Card>
                <CardImg
                  src={
                    this.state.user.photo
                      ? this.state.user.photo
                      : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                  }
                  alt="You"
                />
                <CardBody>
                  <CardTitle>{this.state.user.name}</CardTitle>
                  <CardSubtitle>{this.state.user.school}</CardSubtitle>
                  <CardText>{this.state.user.bio}</CardText>
                </CardBody>
              </Card>
            </CardDeck>
          </Col>
          <Col xs="6">
            <h1> {this.state.otherUser.name} </h1>

            <CardDeck>
              <Card>
                <CardImg
                  src={
                    this.state.otherUser.photo
                      ? this.state.otherUser.photo
                      : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                  }
                  alt="You"
                />
                <CardBody>
                  <CardTitle>{this.state.otherUser.name}</CardTitle>
                  <CardSubtitle>{this.state.otherUser.school}</CardSubtitle>
                  <CardText>Contact: {this.state.otherUser.phone}</CardText>
                  <CardText>Email: {this.state.otherUser.email}</CardText>
                  <CardText>{this.state.otherUser.bio}</CardText>
                </CardBody>
              </Card>
            </CardDeck>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1> Common Liked Apartments</h1>
            {this.state.matchedApts[0] ? (
              <CardColumns>
                {this.state.matchedApts.map((apt, i) => (
                  <ApartmentCardTest
                    aptPhoto={apt.photos[0]}
                    address={apt.address}
                    rent={apt.rent}
                    listingName={apt.listingName}
                    key={i}
                  />
                ))}
              </CardColumns>
            ) : (
              <div className="centerText blockCenter">
                {" "}
                Currently No Common Apartments with {
                  this.state.otherUser.name
                }{" "}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CombinedUsersAptsDash;
