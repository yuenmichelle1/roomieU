import React from "react";
import Slider from "react-slick";
import "./PendingCardWrapper.css";
import PendingRoommateCard from "../PendingRoommateCard";
import { Badge } from 'reactstrap';

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
