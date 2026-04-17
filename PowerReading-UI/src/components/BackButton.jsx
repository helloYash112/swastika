// components/BackButton.js
import { useNavigate } from "react-router-dom";


function BackButton({ to = "/home", label = "Back to Home" }) {
  const navigate = useNavigate();

  return (
    <button 
    type="btn"
      className="back-button"
      onClick={() => navigate(to)}
    >
      {label}
    </button>
  );
}

export default BackButton;
