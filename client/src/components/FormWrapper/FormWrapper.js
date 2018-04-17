import React from "react";
import RoomieForm from "../RoomieForm";
import UserinfoForm from "../UserinfoForm";

const FormWrapper = () => {
  return (
    <div className="wrapper">
      <h1 className="text-center"> Tell Us A Bit About You</h1>
      <UserinfoForm />
      <h1 className="text-center"> Your Ideal Roommate</h1>
      <RoomieForm />
    </div>
  );
};

export default FormWrapper;
