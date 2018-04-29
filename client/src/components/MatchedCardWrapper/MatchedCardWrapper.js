import React from "react";
import Slider from "react-slick";
import "./MatchedCardWrapper.css";
import MatchedRoommateCard from "../MatchedRoommateCard";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
    };

const MatchedCardWrapper = props => {
  return ( 
    <Slider {...settings}> 
        {props.matchedRoommates.map((user, i) => {
        return <MatchedRoommateCard
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

export default MatchedCardWrapper;
