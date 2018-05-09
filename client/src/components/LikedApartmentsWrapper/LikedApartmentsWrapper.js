import React, { Component } from "react";
import API from "../../utils/API";
import { AuthConsumer } from "@hasura/react-check-auth";
import Home from "../Home";
import { Row, Col, Button, CardColumns } from "reactstrap";
import ApartmentCardTest from "../ApartmentCardTest/ApartmentCardTest";
import Schools from "../../CollegesUniversities.json";
import Slider from "react-slick";
import next from "../PotentialCardWrapper/next.png";
import back from "../PotentialCardWrapper/back.png";
import "./LikedApartmentsWrapper.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className}>
      <img className="arrow" src={next} alt="" onClick={onClick} />
    </div>
  );
}

function BackArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} id="trans-bg">
      <img className="arrow back-arrow" src={back} alt="" onClick={onClick} />
    </div>
  );
}

const settings = {
  className: "slider variable-width apt-slider",
  dots: true,
  infinite: true,
  // centerMode: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <NextArrow />,
  prevArrow: <BackArrow />,
  responsive: [
    {
      breakpoint: 1680,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        centerMode: false
      }
    },
    {
      breakpoint: 1440,
      settings: {
      slidesToShow: 4,
      slidesToScroll: 2,
      initialSlide: 0,
      infinite: true,
      dots: true,
      centerMode: false
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
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 1,
      dots: true,
      infinite: true,
      centerMode: true
      }
    },
    {
      breakpoint: 575,
      settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      dots: true,
      infinite: true,
      centerMode: true
      }
  },
  {
      breakpoint: 375,
      settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      dots: true,
      infinite: true,
      centerMode: true
      }
  }
  ]
};

class LikedApartmentsWrapper extends Component {
  state = {
    apartments: []
  };
  // grab liked apartments form user then push to state
  componentDidMount() {
    API.getUserInfo().then(data => {
      const userId = data.data._id;
      const userApartments = data.data.apartments;
      console.log(userId + " APARTMENTS TEST");
      API.getSavedApartments(userId, userApartments).then(result => {
        // results.data is an array of addresses
        this.setState({ apartments: [...result.data] });
      });
    });
  }

  goToApartmentsPage = () => {
    API.getUserInfo().then(data => {
      // Get User School
      const userSchoolName = data.data.school;
      const userSchoolObj = Schools.features.filter(
        el => el.properties.NAME === userSchoolName
      );
      console.log(userSchoolObj[0]);
      window.location = "/addapartments";
    });
    // get school by geolocation or zipcode using
    // find the element in array that has the name
  };

  dislikeApt = address => {
    console.log("Is dislike apt being hit? ");
    const aptsCopy = [...this.state.apartments];
    // filter and get rid of
    const newAptsArr = aptsCopy.filter(apt => apt.address !== address);
    console.log(newAptsArr);
    const newAptsAddrArr = newAptsArr.map(apt => apt.address);
    console.log(newAptsAddrArr);
    API.getUserInfo().then(data => {
      const userId = data.data._id;
      API.updateUser(userId, { apartments: newAptsAddrArr }).then(result => {
        console.log("result");
        this.setState({ apartments: newAptsArr }, () => {
          console.log(this.state.apartments);
        });
      });
    });
  };


  render() {
    return (
      <AuthConsumer>
        {(userInfo, isLoading, error) =>
          userInfo ? (
            <div className="roomies-div likedapts-div">
              <Row className="dash-header">
                <Col xs="12">
                  <h1 className="header2-text aptDiv-title">
                    {" "}
                    Your Liked Apartments{" "}
                  </h1>
                  <Button
                    color="success"
                    className="addapt-btn"
                    onClick={this.goToApartmentsPage}
                    style={{
                      fontSize: ".9em",
                      display: "inline-block",
                      width: "200px",
                      height: "35px",
                      width: "150px",
                      marginTop: "-10px",
                      marginLeft: "30px"
                    }}
                  >
                    Add Apartments
                  </Button>
                </Col>
              </Row>
              {/* Apartment Card */}
              <Row>
                <Col xs="12">
                  <Slider {...settings}>
                    {this.state.apartments.map((apt, i) => (
                      <ApartmentCardTest
                        aptPhoto={apt.photos[0]}
                        address={apt.address}
                        rent={apt.rent}
                        listingName={apt.listingName}
                        key={i}
                        showButton="show"
                        dislikeApt={this.dislikeApt}
                        showAptData={this.props.showAptData}
                        apartmentObj={apt}
                      />
                    ))}
                  </Slider>
                </Col>
              </Row>
            </div>
          ) : (
            <Home />
          )
        }
      </AuthConsumer>
    );
  }
}

export default LikedApartmentsWrapper;
