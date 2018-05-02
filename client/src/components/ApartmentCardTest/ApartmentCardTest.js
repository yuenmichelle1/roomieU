import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";


const ApartmentCardTest = props => {
  return (
    <div>
      <Card>
        <CardImg
          top
          width="100%"
          src={
            props.aptPhoto
              ? props.aptPhoto
              : "https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180"
          }
          alt=""
        />
        <CardBody className="text-center">
          <CardTitle>{props.address}</CardTitle>
          <CardSubtitle>${props.rent}</CardSubtitle>
          <CardText><b>Description:</b>{props.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default ApartmentCardTest;
