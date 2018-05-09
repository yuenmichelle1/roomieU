import React from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import "./ApartmentCardTest.css";

const ApartmentCardTest = props => {
  return (
    <div>
      <Card className="user-card apt-card">
        <Row className="user-photo">
          <Col xs="12" sm="12" md="12" lg="12">
            <CardImg
              top
              width="100%"
              src={
                props.aptPhoto
                  ? props.aptPhoto
                  : "https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180"
              }
              alt=""
              className="actual-img"
            />
            <span className="compat-percent">${props.rent}/mo</span>
          </Col>
        </Row>
        <CardBody className="text-left">
          <CardTitle
            className="header-text name-text"
            style={{
              fontSize: "1.1em",
              marginBottom: "5px",
              textAlign: "center"
            }}
          >
            {props.address}
          </CardTitle>
          <Row>
            <Col xs="12" className="text-center">
              {props.showButton === "show" ? (
                <Row>
                  <Col xs="12">
                    <Button
                      outline
                      color="danger"
                      className="remove-btn apt-remove"
                      style={{ width: "85px", marginTop: "10px" }}
                      onClick={() => props.dislikeApt(props.address)}
                    >
                      Remove
                    </Button>
                    <Button
                      onClick={() => props.showAptData(props.apartmentObj)}
                      outline
                      color="warning"
                      className="viewapt-btn"
                      style={{ color:"#343a40", width: "160px", marginLeft: "10px", marginTop: "10px"}}
                    >
                      {" "}
                      View{" "}
                    </Button>
                  </Col>
                </Row>
              ) : (
                <p />
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default ApartmentCardTest;
