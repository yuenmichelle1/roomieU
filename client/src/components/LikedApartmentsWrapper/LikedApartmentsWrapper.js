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

  render() {
    return (
      <AuthConsumer>
        {(userInfo, isLoading, error) =>
          userInfo ? (
            <div roomies-div>
              <Row className="dash-header">
                <Col xs="12">
                  <h1 className="header-text" style={{marginTop:"30px"}}> Your Liked Apartments </h1>
                </Col>
              </Row>
              {/* Apartment Card */}
              <Row>
                <Col xs="12">
                  <Button
                    onClick={this.goToApartmentsPage}
                    style={{ width: "300px" }}
                  >
                    {" "}
                    + Apartments{" "}
                  </Button>
                  <Slider {...settings}>
                {this.state.apartments.map((apt, i) => (
                  <ApartmentCardTest
                    aptPhoto={apt.photos[0]}
                    address={apt.address}
                    rent={apt.rent}
                    listingName={apt.listingName}
                    key={i}
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
