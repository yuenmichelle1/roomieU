import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
//   Button
} from "reactstrap";
import "./MatchedRoommateCard.css";

const MatchedRoommateCard = props => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1   
        // dots: true,
        //   infinite: false,
        //   speed: 500,
        //   slidesToShow: 4,
        //   slidesToScroll: 4,
        //   initialSlide: 0,
        //   responsive: [
        //     {
        //       breakpoint: 1024,
        //       settings: {
        //         slidesToShow: 3,
        //         slidesToScroll: 3,
        //         infinite: true,
        //         dots: true
        //       }
        //     },
        //     {
        //       breakpoint: 600,
        //       settings: {
        //         slidesToShow: 2,
        //         slidesToScroll: 2,
        //         initialSlide: 2
        //       }
        //     },
        //     {
        //       breakpoint: 480,
        //       settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1
        //       }
        //     }
        //   ]
        };
  return (
    // <div className="MatchedRoommateCard">
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
          {/* <Button onClick={() => props.handleClick(props.id)}>Roomie?</Button> */}
        </CardBody>
      </Card>
    // </div> 
  );
};

export default MatchedRoommateCard;
