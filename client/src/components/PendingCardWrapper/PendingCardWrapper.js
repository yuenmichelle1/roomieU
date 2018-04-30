import React from "react";
import Slider from "react-slick";
import "./PendingCardWrapper.css";
import PendingRoommateCard from "../PendingRoommateCard";
import { Badge } from 'reactstrap';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
    };

const PendingCardWrapper = props => {
  return ( 
    <div>
        <h1>Pending Roommates <Badge color="secondary">{props.pendingRoommates?
            props.pendingRoommates.length:0}</Badge></h1>
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
    </div> 
  );
};

export default PendingCardWrapper;
