import React from "react";
import Slider from "react-slick";
import "./MatchedCardWrapper.css";
import MatchedRoommateCard from "../MatchedRoommateCard";
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
                    changeDashboard={props.changeDashboard}
                />
            })} 
        </Slider>
    </div>
  );
};

export default MatchedCardWrapper;
