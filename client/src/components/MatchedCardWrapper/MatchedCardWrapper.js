import React from "react";
import Slider from "react-slick";
import "./MatchedCardWrapper.css";
import MatchedRoommateCard from "../MatchedRoommateCard";
import { Badge } from 'reactstrap';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
    };

const MatchedCardWrapper = props => {
  return ( 
    <div>
        <h1>Matched Roommates <Badge color="secondary">{props.matchedRoommates?
        props.matchedRoommates.length:0}</Badge></h1>
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
    </div>
  );
};

export default MatchedCardWrapper;
