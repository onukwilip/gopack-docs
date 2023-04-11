import { Bars } from "react-loader-spinner";

const Loader = () => {
  const loaderProps = {
    visible: true,
    width: "50",
    height: "50",
    duration: 1,
    color: " rgb(125, 208, 228)",
  };
  return (
    <div className={"loader"}>
      <Bars {...loaderProps} />
    </div>
  );
};

export default Loader;
