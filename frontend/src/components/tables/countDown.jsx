import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
let difference = Math.floor(Math.random() * (30000 - 5000 + 1)) + 5000;
function CountDown(props) {
  const calculateTimeLeft = () => {
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor(difference / 60000),
        seconds: Math.floor((difference / 1000)),
        milliseconds: Math.floor(difference)
      };
      difference = difference - 1;
    }
    if(difference == 0){
        props.countReachesZero()
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}

export default CountDown