import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Meth = ({ feedback, total, whattodo }) => {
  console.log(feedback, total);
  console.log((feedback.good - feedback.bad) / total);
  if (whattodo === "avg") {
    let resentment = 0;
    resentment = (feedback.good - feedback.bad) / total;
    return isNaN(resentment) ? (
      <p>Average resentment: 0</p>
    ) : (
      <p>Average resentment: {resentment}</p>
    );
  }
  if (whattodo === "p") {
    let positivity = "0";
    positivity = (feedback.good / total) * 100;
    return isNaN(positivity) ? (
      <p>Positivity: 0%</p>
    ) : (
      <p>Positivity: {positivity}%</p>
    );
  }
};

const Statistak = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistaks = ({ feedback, total }) => {
  if (total === 0) {
    return <p>No feedback given ;__;</p>;
  }
  return (
    <div>
      <h1>Statistaks</h1>
      <Statistak text="good" value={feedback.good} />
      <Statistak text="neutral" value={feedback.neutral} />
      <Statistak text="bad" value={feedback.bad} />
      <Statistak text="All" value={total} />

      <Meth feedback={feedback} total={total} whattodo="avg" />
      <Meth feedback={feedback} total={total} whattodo="p" />
    </div>
  );
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
      <h1>Gib feedback UwW</h1>
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
      <Statistaks feedback={feedback} total={total} />
    </div>
  );
};

export default App;
