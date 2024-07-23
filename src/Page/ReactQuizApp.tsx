import { useEffect, useState } from "react";
import "../App.css";
import CountdownTimer from "./Counter";

interface IAnssew {
  answer_content: string;
  correct: boolean;
}
interface IQuestionData {
  id: string;
  question_content: string;
  answers: IAnssew[];
}
const QuestionData: IQuestionData[] = [
  {
    id: "1",
    question_content: "React is mainly used for building ___.",
    answers: [
      {
        answer_content: "Database",
        correct: false,
      },
      {
        answer_content: "User interface",
        correct: true,
      },
      {
        answer_content: "Design Platform",
        correct: false,
      },
    ],
  },
  {
    id: "2",
    question_content: "The lifecycle methods are mainly used for ___.",
    answers: [
      {
        answer_content: "keeping track of event history",
        correct: false,
      },
      {
        answer_content: "enhancing components",
        correct: false,
      },
      {
        answer_content: "freeing up resources",
        correct: false,
      },
      {
        answer_content: "none of the above",
        correct: true,
      },
    ],
  },
  {
    id: "3",
    question_content:
      "___ can be done while multiple elements need to be returned from a component.",
    answers: [
      {
        answer_content: "Abstraction",
        correct: false,
      },
      {
        answer_content: "Insulation",
        correct: false,
      },
      {
        answer_content: "Wrapping",
        correct: true,
      },
    ],
  },
  {
    id: "4",
    question_content:
      "Which is the right way of accessing a function fetch() from an h1 element in JSX?",
    answers: [
      {
        answer_content: "<h1>{fetch()}</h1>",
        correct: true,
      },
      {
        answer_content: "<h1>${fetch()}</h1>",
        correct: false,
      },
      {
        answer_content: "<h1>{fetch}</h1>",
        correct: false,
      },
      {
        answer_content: "<h1>${fetch}</h1>",
        correct: false,
      },
    ],
  },
  {
    id: "5",
    question_content:
      "Which of the following methods in a React Component should be overridden to stop the component from updating?",
    answers: [
      {
        answer_content: "willComponentUpdate",
        correct: false,
      },
      {
        answer_content: "shouldComponentUpdate",
        correct: true,
      },
    ],
  },
];

function QuizReactApp(): JSX.Element {
  const [isReviewMode, setIsReviewMode] = useState<boolean>(true);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<IQuestionData[]>([]);
  const [prevQuizData, setprevQuizData] = useState<IQuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);
  const [selectedAnswerIndexes, setSelectedAnswerIndexes] = useState<number[]>(
    []
  );
  const [result, setResult] = useState<boolean[]>([]);

  useEffect(() => {
    return setQuizData(QuestionData);
  }, []);

  useEffect(() => {
    if (quizData.length > 0) {
      setprevQuizData([...quizData].sort(() => Math.random() - 0.5));
    }
  }, [quizData]);

  const handleNextQuestion = (): void => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < prevQuizData.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousQuestion = (): void => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex >= 1 ? prevIndex - 1 : prevIndex
    );
  };

  const handleSelectAnswer = (index: number, isCorrect: boolean): void => {
    const newSelectedAnswerIndexes = [...selectedAnswerIndexes];
    const newResult = [...result];
    newSelectedAnswerIndexes[currentQuestionIndex] = index;
    newResult[currentQuestionIndex] = isCorrect;
    setSelectedAnswerIndexes(newSelectedAnswerIndexes);
    setResult(newResult);
  };

  const handleTimerExpired2 = (): void => {
    alert("Do you want to submit answers ?");
    setCurrentQuestionIndex(0);
    setIsTimerExpired(true);
    setIsReviewMode(false);
  };

  const handleTimerExpired = (): void => {
    setCurrentQuestionIndex(0);
    setIsTimerExpired(true);
    setIsReviewMode(false);
    setQuizStarted(false);
  };

  const handleRestart = (): void => {
    setIsTimerExpired(false);
    setQuizStarted(false);
    setSelectedAnswerIndexes([]);
    setResult([]);
    setIsReviewMode(true);
    setCurrentQuestionIndex(0);
    setprevQuizData([...quizData].sort(() => Math.random() - 0.5));
  };

  if (quizStarted) {
    setTimeout(handleTimerExpired, 90000);
  }

  return (
    <div>
      {isReviewMode ? (
        <div>
          {!quizStarted ? (
            <div className="container-start">
              <h1>Welcome to React Quiz Game!</h1>
              <button onClick={() => setQuizStarted(true)}>Start</button>
            </div>
          ) : (
            <div className="container-quiz">
              {/* <div className="container-button">
                <button
                  className={
                    currentQuestionIndex === 0
                      ? "button-previous-default"
                      : "button-previous"
                  }
                  onClick={handlePreviousQuestion}
                >
                  Previous
                </button>
                <button
                  className={
                    currentQuestionIndex === prevQuizData.length - 1
                      ? "button-next"
                      : "button-next-default"
                  }
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
                {currentQuestionIndex === prevQuizData.length - 1 && (
                  <button
                    className="button-submit"
                    onClick={handleTimerExpired2}
                  >
                    Submit
                  </button>
                )}
              </div> */}

              <div className="container-question">
                <CountdownTimer />
                <p className="question">
                  <span>
                    {" "}
                    Question: {currentQuestionIndex + 1}/{prevQuizData.length}
                  </span>
                </p>
                <p className="title-question">
                  {prevQuizData[currentQuestionIndex].question_content}
                </p>
              </div>
              {prevQuizData[currentQuestionIndex].answers.map(
                (answer, index) => (
                  <div
                    key={index}
                    className="container-list-question"
                    onClick={() => handleSelectAnswer(index, answer.correct)}
                  >
                    <ul>
                      <li
                        style={
                          selectedAnswerIndexes[currentQuestionIndex] === index
                            ? {
                                backgroundColor: "#312E81",
                                color: "#fff",
                              }
                            : {}
                        }
                      >
                        {index + 1}) {answer.answer_content}
                      </li>
                    </ul>
                  </div>
                )
              )}
              <div className="container-button">
                <button
                  className={
                    currentQuestionIndex === 0
                      ? "button-previous-default"
                      : "button-previous"
                  }
                  onClick={handlePreviousQuestion}
                >
                  Previous
                </button>
                <button
                  className={
                    currentQuestionIndex === prevQuizData.length - 1
                      ? "button-next"
                      : "button-next-default"
                  }
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
                {currentQuestionIndex === prevQuizData.length - 1 && (
                  <button
                    className="button-submit"
                    onClick={handleTimerExpired2}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="container-end">
          <h4>Your score is :{result.filter((value) => value).length}</h4>
          <button onClick={handleRestart} className="button-next-default">
            Try again
          </button>
          <button
            onClick={() => setIsReviewMode(false)}
            className="button-next-default"
          >
            Review
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizReactApp;
