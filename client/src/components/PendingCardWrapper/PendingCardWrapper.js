import React from "react";
import Slider from "react-slick";
import "./PendingCardWrapper.css";
import PendingRoommateCard from "../PendingRoommateCard";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
    };

const PendingCardWrapper = props => {
  return ( 
    <Slider {...settings}> 
        {props.pendingRoommates.map((user, i) => {
        return <PendingRoommateCard
                key={i}
                photo={user.photo}
                name={user.name}
                school={user.school}
                bio={user.bio}
                id={user._id}
                handleClick={props.handleClick}
            />
        })} 
    </Slider>  
  );
};

export default PendingCardWrapper;
