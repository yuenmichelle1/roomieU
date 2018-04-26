import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import "./RoommateCard.css";

const RoommateCard = props => {
  return (
    <div className="RoommateCard">
      <Card>
        <CardImg
          top
          width="100%"
          src={
            props.photo
              ? props.photo
              : "https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180"
          }
          alt=""
        />
        <CardBody className="text-center">
          <CardTitle>{props.name}</CardTitle>
          <CardSubtitle>{props.school}</CardSubtitle>
          <CardText><b>Bio:</b>{props.bio}</CardText>
          <Button onClick={() => props.handleLike(props.id)} data-id={props.id}>Roomie?</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default RoommateCard;
