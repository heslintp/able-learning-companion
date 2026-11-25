import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [screen, setScreen] = useState('welcome');
  const [visitedActivities, setVisitedActivities] = useState([]);
  const [textSize, setTextSize] = useState('normal');
  const [theme, setTheme] = useState('rose');
  const [preferences, setPreferences] = useState(['Pictures']);
  const [category, setCategory] = useState('Maths');
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState("");
  const [speechStatus, setSpeechStatus] = useState('');
  const [gameAnswer, setGameAnswer] = useState('');
  const [flippedCards, setFlippedCards] = useState([]);
const [matchedPairs, setMatchedPairs] = useState([]);
const [memoryMessage, setMemoryMessage] = useState("");
const [showCelebration, setShowCelebration] = useState(false);
const [answerSubmitted, setAnswerSubmitted] = useState(false);
const answerLock = useRef(false);

  // Select or deselect learning preferences
  const togglePreference = (item) => {
    setPreferences((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item]
    );
  };

  // Open a learning activity
  
const openActivity = (name) => {
  setVisitedActivities((current) =>
    current.includes(name)
      ? current
      : [...current, name]
  );

  setCategory(name);
  setShowCelebration(false);
  setAnswer('');
  setAnswerSubmitted(false);
  answerLock.current = false;
  setScore(0);
  setQuestionIndex(0);
  setScreen('activity');
};


  // Check the Maths answer
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const mathsQuestions = [
    {
      question: 'How many apples can you see?',
      picture: '🍎 🍎 🍎',
      options: [2, 3, 4],
      correct: 3,
    },
    {
      question: 'How many stars can you see?',
      picture: '⭐ ⭐',
      options: [1, 2, 3],
      correct: 2,
    },
    {
      question: 'How many flowers can you see?',
      picture: '🌸 🌸 🌸 🌸',
      options: [3, 4, 5],
      correct: 4,
    },
  ];

  const wordQuestions = [
    {
      picture: '🐱',
      question: 'What animal do you see?',
      options: ['CAT', 'DOG', 'SUN', 'BALL'],
      correct: 'CAT',
    },
    {
      picture: '☀️',
      question: 'What is this?',
      options: ['MOON', 'STAR', 'SUN', 'TREE'],
      correct: 'SUN',
    },
    {
      picture: '🍎',
      question: 'What fruit do you see?',
      options: ['BANANA', 'APPLE', 'MANGO', 'GRAPES'],
      correct: 'APPLE',
    },
  ];


const lifeSkillsQuestions = [
  {
    question: "What should you do before eating?",
    options: ["Wash your hands 🧼", "Watch TV 📺", "Play outside ⚽"],
    answer: "Wash your hands 🧼"
  },
  {
    question: "What should you do after waking up?",
    options: ["Brush your teeth 🪥", "Go back to sleep 😴", "Eat sweets 🍬"],
    answer: "Brush your teeth 🪥"
  },
  {
    question: "Which food is a healthy choice?",
    options: ["Apple 🍎", "Candy 🍬", "Chips 🍟"],
    answer: "Apple 🍎"
  },
  {
    question: "What should you wear before going outside in the sun?",
    options: ["A hat 🧢", "A blanket 🛏️", "Pajamas 💤"],
    answer: "A hat 🧢"
  }
];


 

const checkAnswer = (number) => {
  if (answerLock.current) return;

  if (number === mathsQuestions[questionIndex].correct) {
    answerLock.current = true;
    setAnswer("Wonderful! That's correct! ⭐");
    setScore((current) => current + 1);
    setAnswerSubmitted(true);

    if (questionIndex === mathsQuestions.length - 1) {
      setShowCelebration(true);
    }
  } else {
    setAnswer("Good try! Let's count together. 🌷");
  }
};

 


const checkWordAnswer = (word) => {
  if (answerLock.current) return;

  if (word === wordQuestions[questionIndex].correct) {
    answerLock.current = true;
    setAnswer("Wonderful! That's the correct word! ⭐");
    setScore((current) => current + 1);
    setAnswerSubmitted(true);

    if (questionIndex === wordQuestions.length - 1) {
      setShowCelebration(true);
    }
  } else {
    setAnswer('Good try! Look at the picture once again. 🌷');
  }
};







const checkLifeSkillsAnswer = () => {
  if (answerLock.current) return;

  const correctAnswer = lifeSkillsQuestions[questionIndex].answer;

  if (answer === correctAnswer) {
    answerLock.current = true;
    setFeedback("Wonderful! You got it right! ⭐");
    setScore((current) => current + 1);
    setAnswerSubmitted(true);

    if (questionIndex === lifeSkillsQuestions.length - 1) {
      setShowCelebration(true);
    }
  } else {
    setFeedback("Good try! Let's learn together. 🌸");
  }
};




  const checkShapeAnswer = (shape) => {
    if (shape === 'Circle') {
      setGameAnswer('Wonderful! You found the circle! ⭐');
    } else {
      setGameAnswer('Good try! Look carefully at the shapes. 🌷');
    }
  };
  const memoryCards = [
    { id: 1, symbol: "🍎", pair: "apple" },
    { id: 2, symbol: "🌸", pair: "flower" },
    { id: 3, symbol: "🍎", pair: "apple" },
    { id: 4, symbol: "🌸", pair: "flower" }
  ];
  
  
const handleMemoryCard = (card) => {
  if (
    flippedCards.length === 2 ||
    flippedCards.includes(card.id) ||
    matchedPairs.includes(card.pair)
  ) {
    return;
  }
    const nextCards = [...flippedCards, card.id];
  
    setFlippedCards(nextCards);
  
    if (nextCards.length === 2) {
      const firstCard = memoryCards.find(
        (item) => item.id === nextCards[0]
      );
  
      if (firstCard.pair === card.pair) {
        setMatchedPairs((current) => [
          ...current,
          card.pair
        ]);
  
        setMemoryMessage("Wonderful! You found a matching pair! ⭐");
      } else {
        setMemoryMessage("Not a match yet. Try another pair! 🌷");
      }
    }
  };
  
  const resetMemoryGame = () => {
    setFlippedCards([]);
    setMatchedPairs([]);
    setMemoryMessage("");
  };

  
const nextQuestion = () => {
  const totalQuestions =
    category === 'Life Skills'
      ? lifeSkillsQuestions.length
      : category === 'Words'
      ? wordQuestions.length
      : mathsQuestions.length;

  if (questionIndex < totalQuestions - 1) {
    setQuestionIndex((current) => current + 1);
    answerLock.current = false;
    setAnswer('');
    setAnswerSubmitted(false);
    setFeedback('');
  } else {
    setShowCelebration(true);
  }
};


  // Read the selected communication message aloud
  const readMessageAloud = () => {
    if (!message) {
      setSpeechStatus('Please select a message first.');
      return;
    }

    if (!('speechSynthesis' in window)) {
      setSpeechStatus('Speech is not supported by this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(message);

    speech.lang = 'en-US';
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onstart = () => {
      setSpeechStatus('Speaking your message...');
    };

    speech.onend = () => {
      setSpeechStatus('Finished reading your message.');
    };

    speech.onerror = (event) => {
      setSpeechStatus('Speech could not play: ' + event.error);
    };

    window.speechSynthesis.speak(speech);
  };

  // Clear the communication message
  const clearMessage = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setMessage('');
    setSpeechStatus('');
  };

  return (
    <div className={`app theme-${theme} ${textSize}`}>
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          ABLE <span>✿</span>
        </div>

        <p>Learning at your own pace</p>

        <button onClick={() => setScreen('preferences')}>⚙ Settings</button>
      </header>

      {/* MAIN CONTENT */}
      <main className="main">
        {/* WELCOME SCREEN */}
        {screen === 'welcome' && (
          <section className="panel welcome">
            <div className="flower">✿ ☁ ★</div>

            <h1>Hello, learner!</h1>

            <h2>Welcome to ABLE</h2>

            <p>A friendly space to learn, explore and grow at your own pace.</p>

            <button
              className="primary"
              onClick={() => setScreen('preferences')}
            >
              Get started →
            </button>

            <p className="small-text">Every child learns in their own way.</p>
          </section>
        )}

        {/* PREFERENCES SCREEN */}
        {screen === 'preferences' && (
          <section className="panel">
            <button className="back" onClick={() => setScreen('welcome')}>
              ← Back
            </button>

            <h1>Let's make ABLE yours!</h1>

            <p>
              Choose what makes learning comfortable. You can change these
              settings later.
            </p>

            <h2>Choose your text size</h2>

            <div className="cards">
              <button
                aria-pressed={textSize === 'normal'}
                className={textSize === 'normal' ? 'selected' : ''}
                onClick={() => setTextSize('normal')}
              >
                Aa Regular
              </button>

              <button
                aria-pressed={textSize === 'large'}
                className={textSize === 'large' ? 'selected' : ''}
                onClick={() => setTextSize('large')}
              >
                Aa Large
              </button>
            </div>

            <h2>How would you like to learn?</h2>

            <p>You can select more than one.</p>

            <div className="cards">
              {['Pictures', 'Audio', 'Text', 'Touch'].map((item) => (
                <button
                  key={item}
                  aria-pressed={preferences.includes(item)}
                  className={preferences.includes(item) ? 'selected' : ''}
                  onClick={() => togglePreference(item)}
                >
                  {preferences.includes(item) ? '✓ ' : ''}

                  {item === 'Pictures' && '🖼️ '}
                  {item === 'Audio' && '🔊 '}
                  {item === 'Text' && '📖 '}
                  {item === 'Touch' && '👆 '}

                  {item}
                </button>
              ))}
            </div>

            <h2>Choose your background</h2>

            <div className="theme-options">
              <button
                className={theme === 'rose' ? 'selected' : ''}
                onClick={() => setTheme('rose')}
              >
                🌸 Rose
              </button>

              <button
                className={theme === 'sage' ? 'selected' : ''}
                onClick={() => setTheme('sage')}
              >
                🌿 Sage
              </button>

              <button
                className={theme === 'sky' ? 'selected' : ''}
                onClick={() => setTheme('sky')}
              >
                ☁ Sky
              </button>
            </div>

            <button className="primary" onClick={() => setScreen('dashboard')}>
              Save and continue →
            </button>
          </section>
        )}

        {/* LEARNER DASHBOARD */}
        {screen === 'dashboard' && (
          <section className="panel">
            <h1>Hello, friend! ☀</h1>

            <p>What would you like to explore today?</p>


<div className="progress-section">
  <h2>🌟 My Learning Progress</h2>

  <p>
    Activities explored: {visitedActivities.length} / 5
  </p>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{
        width: `${(visitedActivities.length / 5) * 100}%`
      }}
    ></div>
  </div>

  <p>Keep learning and growing! 🌱</p>
</div>


            <div className="cards">
              <button onClick={() => openActivity('Maths')}>🔢 Maths</button>

              <button onClick={() => openActivity('Words')}>📖 Words</button>

              <button onClick={() => openActivity('Games')}>🧩 Games</button>

              <button onClick={() => openActivity('Memory Match')}>🧠 Memory Match</button>


              <button onClick={() => openActivity('Life Skills')}>
                🌱 Life Skills
              </button>
            </div>

            {/* COMMUNICATION BOARD */}
            <h2>My communication board</h2>

            <p>Choose a message you want to share.</p>

            <div className="cards">
              {[
                'I need help',
                'I need a break',
                'I am ready',
                "I don't understand",
              ].map((item) => (
                <button
                  key={item}
                  aria-pressed={message === item}
                  className={message === item ? 'selected' : ''}
                  onClick={() => {
                    setMessage(item);
                    setSpeechStatus('');
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            {message && (
              <div className="message" aria-live="polite">
                <h2>Your message:</h2>

                <p className="communication-message">{message}</p>

                <div className="communication-actions">
                  <button onClick={readMessageAloud}>🔊 Read aloud</button>

                  <button onClick={clearMessage}>✖ Clear message</button>
                </div>

                <p className="speech-status" aria-live="polite">
                  {speechStatus}
                </p>
              </div>
            )}
          </section>
        )}

        {/* LEARNING ACTIVITY */}
        {screen === 'activity' && (
          <section className="panel">
            <button className="back" onClick={() => setScreen('dashboard')}>
              ← Back to learning space
            </button>

            <h1>{category}</h1>

            {showCelebration || (
  category === 'Maths' &&
  questionIndex === mathsQuestions.length - 1 &&
  answer === "Wonderful! That's correct! ⭐"
) ? (
  <div className="celebration-message">
    <h2>🎉 Wonderful Work!</h2>
    <p>You did a great job. Keep learning and growing! 🌟</p>
    <button
      className="primary"
      onClick={() => setShowCelebration(false)}
    >
      Continue Learning
    </button>
  </div>
) : null}

            {category === 'Maths' ? (
              <>
                <h2>Let's count! 🌟</h2>
                <p>
                  Question {questionIndex + 1} of {mathsQuestions.length}
                </p>

                <div className="apples">
                  {mathsQuestions[questionIndex].picture}
                </div>

                <h2>{mathsQuestions[questionIndex].question}</h2>

                <div className="cards">
                  {mathsQuestions[questionIndex].options.map((number) => (
                    <button key={number} onClick={() => checkAnswer(number)}>
                      {number}
                    </button>
                  ))}
                </div>

                <p aria-live="polite">{answer}</p>
                <p>⭐ Score: {score}</p>

                {answer && questionIndex < mathsQuestions.length - 1 && (
                  <button className="primary" onClick={nextQuestion}>
                    Next question →
                  </button>
                )}

                {answer && questionIndex === mathsQuestions.length - 1 && (
                  <button
                    className="primary"
                    onClick={() => {
                      answerLock.current = false;
setAnswerSubmitted(false);
setShowCelebration(false);
setFeedback('');
                      setQuestionIndex(0);
                      setScore(0);
                      setAnswer('');
                    }}
                  >
                    Play again ↻
                  </button>
                )}
              </>
            ) : category === 'Words' ? (
              <>
                <h2>Let's learn words! 📖</h2>
                <p>
                  Question {questionIndex + 1} of {wordQuestions.length}
                </p>

                <div className="apples">
                  {wordQuestions[questionIndex].picture}
                </div>

                <h2>{wordQuestions[questionIndex].question}</h2>

                <div className="cards">
                  {wordQuestions[questionIndex].options.map((word) => (
                    <button key={word} onClick={() => checkWordAnswer(word)}>
                      {word}
                    </button>
                  ))}
                </div>

                <p aria-live="polite">{answer}</p>
                <p>⭐ Score: {score}</p>

                {answer && questionIndex < wordQuestions.length - 1 && (
                  <button
                    className="primary"
                    onClick={nextQuestion}
                  >
                    Next question →
                  </button>
                )}

                {answer && questionIndex === wordQuestions.length - 1 && (
                  <button
                    className="primary"
                    onClick={() => {
                      answerLock.current = false;
setAnswerSubmitted(false);
setShowCelebration(false);
setFeedback('');
                      setQuestionIndex(0);
                      setScore(0);
                      setAnswer('');
                    }}
                  >
                    Play again ↻
                  </button>
                )}
              </>

) : category === 'Memory Match' ? (
  <>
    <h2>Let's play Memory Match! 🧠</h2>
    <p>Find two matching pictures!</p>

    <div className="memory-grid">
      {memoryCards.map((card) => (
        <button
          key={card.id}
          className="memory-card"
          onClick={() => handleMemoryCard(card)}
          disabled={
            matchedPairs.includes(card.pair) ||
            flippedCards.includes(card.id)
          }
          aria-label={
            flippedCards.includes(card.id) ||
            matchedPairs.includes(card.pair)
              ? card.symbol
              : "Hidden card"
          }
        >
          {flippedCards.includes(card.id) ||
          matchedPairs.includes(card.pair)
            ? card.symbol
            : "❓"}
        </button>
      ))}
    </div>

    <p aria-live="polite">{memoryMessage}</p>

    {matchedPairs.length === 2 && (
      <h2>Congratulations! You matched all the pairs! 🎉</h2>
    )}

    <button
      className="primary"
      onClick={resetMemoryGame}
    >
      Play again ↻
    </button>
  </>

) : category === 'Life Skills' ? (
  <>
    <h2>Everyday Situations 🌱</h2>

    <p>
      {lifeSkillsQuestions[questionIndex].question}
    </p>

    <div className="options">
      {lifeSkillsQuestions[questionIndex].options.map((option) => (
        <button
          key={option}
          onClick={() => setAnswer(option)}
          className={answer === option ? "selected" : ""}
        >
          {option}
        </button>
      ))}
    </div>

    <button className="primary" onClick={checkLifeSkillsAnswer}>
      Check Answer
    </button>

    <p aria-live="polite">{feedback}</p>

{questionIndex < lifeSkillsQuestions.length - 1 && (
  <button className="primary" onClick={nextQuestion}>
    Next Question →
  </button>
)}

{questionIndex === lifeSkillsQuestions.length - 1 && (
  <button
    className="primary"
    onClick={() => {
      answerLock.current = false;
      setQuestionIndex(0);
      setScore(0);
      setAnswer('');
      setFeedback('');
      setAnswerSubmitted(false);
      setShowCelebration(false);
    }}
  >
    Play Again ↻
  </button>
)}
  </>

            ) : category === 'Games' ? (
              <>
                <h2>Let's play Shape Match! 🧩</h2>
                <p>Which one is a circle?</p>

                <div className="cards">
                  <button onClick={() => checkShapeAnswer('Circle')}>
                    🔴 Circle
                  </button>

                  <button onClick={() => checkShapeAnswer('Square')}>
                    🟦 Square
                  </button>

                  <button onClick={() => checkShapeAnswer('Triangle')}>
                    🔺 Triangle
                  </button>
                </div>

                <p aria-live="polite">{gameAnswer}</p>

                <button className="primary" onClick={() => setGameAnswer('')}>
                  Try again ↻
                </button>
              </>
            ) : (
              <div className="message">
                <h2>Coming soon! 🌱</h2>
                <p>
                  We are preparing more {category.toLowerCase()} activities for
                  you.
                </p>
              </div>
            )}
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer>Take your time. You can pause whenever you need.</footer>
    </div>
  );
}

export default App;
