import React from "react";
import "./DivSkeletal.css";

const DivSkeltal = ({ type, count }) => {
  if (type === "property") {
    return Array(count).fill(<div className="skeletal-img"></div>);
  } else if (type === "city") {
  } else if (type === "type") {
  }
};

export default DivSkeltal;
