
import Lottie from "lottie-react";
import "./lottiePlayer.css";

const LottiePlayer = ({ animationData, message, loop = true }) => {
  return (
    <div className="lottie-container">
      <Lottie
        animationData={animationData}
        loop={loop}
        style={{ width: 180, height: 180 }} 
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice",
        }}
      />

      {message && <p className="lottie-text">{message}</p>}
    </div>
  );
};

export default LottiePlayer;