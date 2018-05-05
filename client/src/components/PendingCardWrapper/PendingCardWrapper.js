import React from "react";
import Slider from "react-slick";
import "./PendingCardWrapper.css";
import PendingRoommateCard from "../PendingRoommateCard";
import { Badge } from 'reactstrap';
import next from '../PotentialCardWrapper/next.png';
import back from '../PotentialCardWrapper/back.png';

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
    //   <div
    //     className={className}
    //     style={{ ...style, display: "block", background: "red" }}
    //     onClick={onClick}
    //   />
    <div className={className}>
        <img className="arrow" src={next} alt="" onClick={onClick}/>
    </div>
    );
}

function BackArrow(props) {
    const { className, style, onClick } = props;
    return (
    //   <div
    //     className={className}
    //     style={{ ...style, display: "block", background: "red" }}
    //     onClick={onClick}
    //   />
    <div className={className} id="trans-bg">
        <img className="arrow back-arrow" src={back} alt="" onClick={onClick}/>
    </div>
    );
}

const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,   
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <BackArrow />,
    responsive: [
        {
            breakpoint: 1670,
            settings: {
            slidesToShow: 5,
            slidesToScroll: 2,
            infinite: true,
            dots: true
            }
        },
        {
            breakpoint: 1366,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
            }
        },
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
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

const PendingCardWrapper = props => {
  return ( 
    <div>
        <Slider {...settings}> 
            {props.pendingRoommates.map((user, i) => {
            return <PendingRoommateCard
                    key={i}
                    photo={user.photo}
                    name={user.name}
                    school={user.school}
                    bio={user.bio}
                    id={user._id}
                    matchScore={user.matchScore}
                    handleClick={props.handleClick}
                    convertTitle={props.convertTitle} 
                />
            })} 
        </Slider> 
    </div> 
  );
};

export default PendingCardWrapper;
