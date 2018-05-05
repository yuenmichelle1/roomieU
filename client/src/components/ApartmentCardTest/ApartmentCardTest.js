import React from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import "./ApartmentCardTest.css";

const ApartmentCardTest = props => {
  return (
    <div>
      <Card className="user-card">
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
          <CardTitle className="header-text name-text" style={{fontSize:"1.3em"}}>{props.address}</CardTitle>
          <CardText><b>Description:</b>{props.listingName}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default ApartmentCardTest;
