import React from "react";
import Slider from "react-slick";
import "./PotentialCardWrapper.css";
import PotentialRoommateCard from "../PotentialRoommateCard";
import next from './next.png';
import back from './back.png';

function NextArrow(props) {
    const { className, onClick } = props;
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
    const { className, onClick } = props;
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
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,   
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <BackArrow />,
    responsive: [
        {
            breakpoint: 1680,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
            centerMode: false
            }
        },
        {
            breakpoint: 1440,
            settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            initialSlide: 0,
            infinite: true,
            dots: true,
            centerMode: false
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
            breakpoint: 1200,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
            }
        },
        {
            breakpoint: 992,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            infinite: true,
            dots: true
            }
        },
        {
            breakpoint: 768,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 0,
            dots: true,
            infinite: true,
            centerMode: true
            }
        },
        {
            breakpoint: 575,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            dots: true,
            infinite: true,
            centerMode: true
            }
        },
        {
            breakpoint: 375,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            dots: true,
            infinite: true,
            centerMode: true
            }
        }
    ]
    };

const PotentialCardWrapper = props => {
  return ( 
    <div>
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
                    convertTitle={props.convertTitle}
                    cancelPotential={props.cancelPotential}
                />
            })} 
        </Slider> 
    </div> 
  );
};

export default PotentialCardWrapper;
