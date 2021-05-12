import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Meth = ({ feedback, total, whattodo }) => {
  if (whattodo === "avg") {
    return (
      <p>
        Average resentment:
        {(feedback.good - feedback.bad) / total}
      </p>
    );
  }
  if (whattodo === "p") {
    return <p>Postive feedback: {(feedback.good / total) * 100}%</p>;
  }
};

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const total = feedback.good + feedback.neutral + feedback.bad;
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
      <p>All: {total}</p>

      <Meth feedback={feedback} total={total} whattodo="avg" />
      <Meth feedback={feedback} total={total} whattodo="p" />
    </div>
  );
};

export default App;
