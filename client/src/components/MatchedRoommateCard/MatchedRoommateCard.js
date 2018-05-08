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
import "./MatchedRoommateCard.css";

const MatchedRoommateCard = props => {
  return (
    // <div className="MatchedRoommateCard">
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
            <span className="compat-percent">{100*props.matchScore/5}% Match</span>
          </Col>
        </Row>
        <CardBody className="text-left">
          <CardTitle className="header-text name-text">{props.convertTitle(props.name)}</CardTitle>
          <CardSubtitle className="school-text">{props.school}</CardSubtitle>
          <CardText className="bio-text"><b>Bio:</b> {props.bio}</CardText>
          <Row style={{position: "absolute", bottom: "20px", left: "80px"}} className="text-center">
            <Col xs="12" className="text-center">
              <Button className="btn roomie-btn details-btn" outline color="warning" onClick={() => props.changeDashboard(props.id)} id={props.id}>Match Details</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    // </div> 
  );
};

export default MatchedRoommateCard;
