import { useEffect, useState, useRef } from "react";
import LottiePlayer from "./LottiePlayer";
import authentication from "../assets/authentication.json";
import successAnim from "../assets/success.json";
import errorAnim from "../assets/error.json";
import './statusAnimation.css';
import { useSelector } from "react-redux";

export default function StatusAnimation() {
    const [visible, setVisible] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(null);
    const {status,error}=useSelector(state=>state.user);

    const loadStartTime = useRef(null);

    useEffect(() => {
        let timer;

        if (status === "loading") {
            loadStartTime.current = Date.now(); // track start time
            setVisible(true);
            setCurrentStatus("loading");
        }

        if (status === "success" || status === "error") {
            const elapsed = Date.now() - loadStartTime.current;
            const minDuration = 700; // minimum loader time

            const remainingTime = Math.max(minDuration - elapsed, 0);

            timer = setTimeout(() => {
                setCurrentStatus(status);

                // hide after showing success/error
                setTimeout(() => {
                    setVisible(false);
                    setCurrentStatus(null);
                }, 2500);

            }, remainingTime);
        }

        return () => clearTimeout(timer);
    }, [status]);

    if (!visible) return null;

    return (
        <div className="overlay">
            {currentStatus === "loading" && (
                <LottiePlayer
                    animationData={authentication}
                    message={"Checking user data..."}
                />
            )}

            {currentStatus === "success" && (
                <LottiePlayer
                    animationData={successAnim}
                    message={"Login successful..."}
                    loop={false}
                />
            )}

            {currentStatus === "error" && (
                <LottiePlayer
                    animationData={errorAnim}
                    message={
                        typeof error === "string"
                            ? error
                            : error?.error || error?.message || "Login failed"
                    }
                    loop={false}
                />
            )}
        </div>
    );
}