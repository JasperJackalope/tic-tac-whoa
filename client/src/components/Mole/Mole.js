import React, { Fragment, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Mole.css';

const TIME_LIMIT = 30000;
const MOLE_SCORE = 100;
const NUMBER_OF_MOLES = 5;
const POINTS_MULTIPLIER = 0.9;
const TIME_MULTIPLIER = 1.25;

const generateMoles = amount =>
  new Array(amount).fill().map(() => ({
    speed: gsap.utils.random(0.5, 1),
    delay: gsap.utils.random(0.5, 4),
    points: MOLE_SCORE,
  }));

const Moles = ({ children }) => <div className="moles">{children}</div>;

const Mole = ({ onWhack, points, delay, speed, pointsMin = 10 }) => {
  const [whacked, setWhacked] = useState(false);
  const bobRef = useRef(null);
  const pointsRef = useRef(points);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.set(buttonRef.current, {
      yPercent: 100,
      display: 'block',
    });

    bobRef.current = gsap.to(buttonRef.current, {
      yPercent: 0,
      duration: speed,
      yoyo: true,
      repeat: -1,
      delay: delay,
      repeatDelay: delay,
      onRepeat: () => {
        pointsRef.current = Math.floor(
          Math.max(pointsRef.current * POINTS_MULTIPLIER, pointsMin)
        );
      },
    });

    return () => {
      if (bobRef.current) bobRef.current.kill();
    };
  }, [pointsMin, delay, speed]);

  useEffect(() => {
    if (whacked) {
      pointsRef.current = points;
      bobRef.current.pause();
      gsap.to(buttonRef.current, {
        yPercent: 100,
        duration: 0.1,
        onComplete: () => {
          gsap.delayedCall(gsap.utils.random(1, 3), () => {
            setWhacked(false);
            bobRef.current.restart().timeScale(bobRef.current.timeScale() * TIME_MULTIPLIER);
          });
        },
      });
    }
  }, [whacked]);

  const whack = () => {
    setWhacked(true);
    onWhack(pointsRef.current);
  };

  return (
    <div className="mole-hole">
      <button className="mole" ref={buttonRef} onClick={whack}>
        <span className="sr-only">Whack</span>
      </button>
    </div>
  );
};

const Score = ({ value }) => <div className="info-text">{`Score: ${value}`}</div>;

const Timer = ({ time, interval = 1000, onEnd }) => {
  const [internalTime, setInternalTime] = useState(time);
  const timerRef = useRef(time);
  const timeRef = useRef(time);

  useEffect(() => {
    if (internalTime === 0 && onEnd) {
      onEnd();
    }
  }, [internalTime, onEnd]);

  useEffect(() => {
    timerRef.current = setInterval(() => setInternalTime((timeRef.current -= interval)), interval);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [interval]);

  return <div className="info-text">{`Time: ${internalTime / 1000}s`}</div>;
};

const WhacAMole = () => {
  const [score, setScore] = useState(0);
  const [timeOver, setTimeOver] = useState(false);

  const handleWhack = points => {
    setScore(prevScore => prevScore + points);
  };

  const handleTimeOver = () => {
    setTimeOver(true);
  };

  const handlePlayAgain = () => {
    setScore(0);
    setTimeOver(false);
  };

  const handleReturnHome = () => {
    window.location.href = '/dashboard';
  };
  

  useEffect(() => {
    if (timeOver) {
      alert(`Game Over! Your score: ${score}`);
    }
  }, [score, timeOver]);

  return (
    <Fragment>
      {timeOver ? (
        <div>
          <h2>Game Over!</h2>
          <p>Your score: {score}</p>
          <button onClick={handlePlayAgain}>Play Again</button>
          <button onClick={handleReturnHome}>Home</button>
        </div>
      ) : (
        <Fragment>
          <Score value={score} />
          <Timer time={TIME_LIMIT} interval={100} onEnd={handleTimeOver} />
          <Moles>
            {generateMoles(NUMBER_OF_MOLES).map((mole, index) => (
              <Mole
                key={index}
                onWhack={handleWhack}
                points={mole.points}
                delay={mole.delay}
                speed={mole.speed}
              />
            ))}
          </Moles>
        </Fragment>
      )}
    </Fragment>
  );
};

export default WhacAMole;
