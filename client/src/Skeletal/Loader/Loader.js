import { FadeLoader } from "react-spinners";

import "./Loader.css";

const Loader = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="loader-container">
        <FadeLoader size={150} color={"#999999"} />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
