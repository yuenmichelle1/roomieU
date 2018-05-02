import React from "react";
import Slider from "react-slick";
import "./PotentialCardWrapper.css";
import PotentialRoommateCard from "../PotentialRoommateCard";
import { Row, Col, Badge } from 'reactstrap';
const settings = {
    className: "slider variable-width",
    dots: true,
    // infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,   
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
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

const PotentialCardWrapper = props => {
  return ( 
    <div>
        <h1 className="header-text text-center">Potential Roommates <Badge color="secondary">{props.potentialRoommates.length}</Badge></h1>
        <Slider {...settings}> 
            {props.potentialRoommates.map((user, i) => {
            return <PotentialRoommateCard
                    key={i}
                    photo={user.photo}
                    name={user.name}
                    school={user.school}
                    bio={user.bio}
                    id={user._id}
                    handleClick={props.handleClick}
                    matchScore={user.matchScore}
                />
            })} 
        </Slider> 
    </div> 
  );
};

export default PotentialCardWrapper;
