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
import './CombinedUsersAptsDash.css';
import Slider from "react-slick";
import next from "../PotentialCardWrapper/next.png";
import back from "../PotentialCardWrapper/back.png";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    //   <div
    //     className={className}
    //     style={{ ...style, display: "block", background: "red" }}
    //     onClick={onClick}
    //   />
    <div className={className}>
      <img className="arrow" src={next} alt="" onClick={onClick} />
    </div>
  );
}

function BackArrow(props) {
  const { className, style, onClick } = props;
  return (
    //   <div
    //     className={className}
    //     style={{ ...style, display: "block", background: "red" }}
    //     onClick={onClick}
    //   />
    <div className={className} id="trans-bg">
      <img className="arrow back-arrow" src={back} alt="" onClick={onClick} />
    </div>
  );
}

const settings = {
  className: "slider variable-width",
  dots: true,
  infinite: true,
  centerMode: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <NextArrow />,
  prevArrow: <BackArrow />,
  responsive: [
    {
      breakpoint: 1670,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

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
          <Col xs="12" className="text-center">
            <h1 className="header-text">Your Match Details</h1>
            <Button color="success" onClick={() => this.props.changeDashboard(this.state.userId)} outline className="dashback-btn">
              {" "}
              Back to Main Dashboard{" "}
            </Button>
          </Col>
        </Row>
        <Row className="matched-row">
          <Col xs="4">
            {/* <h1 className="header-text"> {this.state.user.name} </h1> */}
            <CardDeck className="matched-div">
              <Card classname="user-card you-card">
                <CardImg
                  src={
                    this.state.user.photo
                      ? this.state.user.photo
                      : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                  }
                  alt="You"
                  className="you-img"
                />
                <CardBody className="text-left you-body">
                  <CardTitle className="header-text name-text">{this.state.user.name}</CardTitle>
                  <CardSubtitle className="school-text">{this.state.user.school}</CardSubtitle>
                  <CardText className="bio-text"><b>Bio:</b> {this.state.user.bio}</CardText>
                </CardBody>
              </Card>
            </CardDeck>
          </Col>
          <Col xs="8">
            {/* <h1 className="header-text matched-name"> Your Match: {this.state.otherUser.name} </h1> */}

            <CardDeck className="matched-div">
              <Card className="user-card matched-card">
                <CardImg
                  src={
                    this.state.otherUser.photo
                      ? this.state.otherUser.photo
                      : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                  }
                  alt="You"
                  className="matched-img"
                />
                <CardBody className="text-left matched-body">
                  <CardTitle className="header-text name-text">{this.state.otherUser.name}</CardTitle>
                  <CardSubtitle className="school-text">{this.state.otherUser.school}</CardSubtitle>
                  <CardText><b>Contact:</b> {this.state.otherUser.phone}</CardText>
                  <CardText><b>Email:</b> {this.state.otherUser.email}</CardText>
                  <CardText className="bio-text"><b>Bio:</b> {this.state.otherUser.bio}</CardText>
                </CardBody>
              </Card>
            </CardDeck>
          </Col>
        </Row>
        <Row>
          <Col xs="12" className="text-left">
            <h1 className="header-text liked-header">You Both Liked These Apartments</h1>
            {this.state.matchedApts[0] ? (
              <Slider {...settings} className="both-apts">
                {this.state.matchedApts.map((apt, i) => (
                  <ApartmentCardTest
                    aptPhoto={apt.photos[0]}
                    address={apt.address}
                    rent={apt.rent}
                    listingName={apt.listingName}
                    key={i}
                    showButton=""
                  />
                ))}
              </Slider>
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
