import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import crossAnimation from "./assets/cross.json";

export default function Splash({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFinish?.(); // call parent callback if provided
    }); // match your animation length

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Lottie

        animationData={crossAnimation}
        loop={true}   // play once
      />
    </div>
  );
}
