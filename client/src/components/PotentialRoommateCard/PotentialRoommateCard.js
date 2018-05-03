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
import "./PotentialRoommateCard.css";

const PotentialRoommateCard = props => {
  return (
    // <div className="PotentialRoommateCard">
      <Card className="user-card">
        <Row className="user-photo">
          <Col xs="12" sm="12" md="12" lg="12">
            <CardImg
              top
              width="100%"
              src={
                props.photo
                  ? props.photo
                  : "https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180"
              }
              alt=""
              className="actual-img"
            />
          </Col>
        </Row>
        <CardBody className="text-left">
          <CardTitle className="header-text name-text">{props.name}</CardTitle>
          {/* <CardSubtitle>{props.school}</CardSubtitle> */}
          <CardSubtitle><b>Compatibility:</b> <span className="compat-percent">{100*props.matchScore/5}%</span></CardSubtitle>
          <CardText><b>School:</b> {props.school}</CardText>
          <CardText><b>Bio:</b> {props.bio}</CardText>
          <Button className="btn roomie-btn" color="warning" onClick={() => props.handleClick(props.id)}>Roomie?</Button>
        </CardBody>
      </Card>
    // </div> 
  );
};

export default PotentialRoommateCard;
