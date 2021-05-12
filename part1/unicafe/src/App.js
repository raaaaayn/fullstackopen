import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  return (
    <div>
      <h1>Give feedback</h1>
      <Button
        handleClick={() =>
          setFeedback({
            good: feedback.good + 1,
            neutral: feedback.neutral,
            bad: feedback.bad,
          })
        }
        text="good"
      />
      <Button
        handleClick={() =>
          setFeedback({
            good: feedback.good,
            neutral: feedback.neutral + 1,
            bad: feedback.bad,
          })
        }
        text="neutral"
      />
      <Button
        handleClick={() =>
          setFeedback({
            good: feedback.good,
            neutral: feedback.neutral,
            bad: feedback.bad + 1,
          })
        }
        text="bad"
      />

      <h1>Statistaks</h1>
      <p>Good: {feedback.good}</p>
      <p>Neutral: {feedback.neutral}</p>
      <p>Bad: {feedback.bad}</p>
    </div>
  );
};

export default App;
