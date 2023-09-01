import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ReactSkeletalLoader = ({ count }) => {
  return Array(count).fill(
    <Skeleton width={328} height={250} duration={1} borderRadius={"10px"} />
  );
};

export default ReactSkeletalLoader;
