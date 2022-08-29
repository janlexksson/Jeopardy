const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

const jeopardyCategories = [
  {
    genre: "DO I",
    questions: [
      {
        question: "Do I have drivers license?",
        answers: ["Yes", "No"],
        correct: "Yes",
        level: "easy",
      },
      {
        question: "Do I got more than 5 years of experience in programming?",
        answers: ["Yes", "No"],
        correct: "No",
        level: "medium",
      },
      {
        question: "Do I like to help other people ?",
        answers: ["Yes", "No"],
        correct: "Yes",
        level: "hard",
      },
    ],
  },
  {
    genre: "WHERE",
    questions: [
      {
        question: "Where do I live?",
        answers: ["Lund", "Malmö"],
        correct: "Malmö",
        level: "easy",
      },
      {
        question: "Where did I get my Sjuksköterskeexamen?",
        answers: ["Malmö", "Lund"],
        correct: "Malmö",
        level: "medium",
      },
      {
        question: "Where did I take my Gymnasie-utbildning?",
        answers: ["Teknikum", "Kungsmad"],
        correct: "Kungsmad",
        level: "hard",
      },
    ],
  },
  {
    genre: "WHEN",
    questions: [
      {
        question: "When is Christmas?",
        answers: ["30:th of Dec", "24th/25th of Dec"],
        correct: "24th/25th of Dec",
        level: "easy",
      },
      {
        question: "When was I born",
        answers: ["1970-th", "1990-th"],
        correct: "1970-th",
        level: "medium",
      },
      {
        question: "When did I start at Lexicon this year?",
        answers: ["220419", "220619"],
        correct: "220419",
        level: "hard",
      },
    ],
  },
  {
    genre: "DO I SPEAK",
    questions: [
      {
        question: "Swedish?",
        answers: ["YES", "NO"],
        correct: "YES",
        level: "easy",
      },
      {
        question: "English",
        answers: ["YES", "NO"],
        correct: "YES",
        level: "medium",
      },
      {
        question: "GERMAN?",
        answers: ["YES", "NO"],
        correct: "YES",
        level: "hard",
      },
    ],
  },
  {
    genre: "HOW MANY",
    questions: [
      {
        question: "How many skills shows under Skills?",
        answers: ["5", "8"],
        correct: "8",
        level: "easy",
      },
      {
        question: "How many seconds in an hour",
        answers: ["36000", "3600"],
        correct: "3600",
        level: "medium",
      },
      {
        question: "How many Laptops do I Own?",
        answers: ["1", "3"],
        correct: "1",
        level: "hard",
      },
    ],
  },
];

let score = 0;

function addCategory(category) {
  const column = document.createElement("div");
  column.classList.add("genre-column");

  const genreTitle = document.createElement("div");
  genreTitle.classList.add("genre-title");
  genreTitle.innerHTML = category.genre;

  column.appendChild(genreTitle);
  game.append(column);

  category.questions.forEach((question) => {
    const card = document.createElement("div");
    card.classList.add("card");
    column.append(card);

    if (question.level === "easy") {
      card.innerHTML = 100;
    }
    if (question.level === "medium") {
      card.innerHTML = 200;
    }
    if (question.level === "hard") {
      card.innerHTML = 300;
    }

    card.setAttribute("data-question", question.question);
    card.setAttribute("data-answer-1", question.answers[0]);
    card.setAttribute("data-answer-2", question.answers[1]);
    card.setAttribute("data-correct", question.correct);
    card.setAttribute("data-value", card.getInnerHTML());

    card.addEventListener("click", flipCard);
  });
}

jeopardyCategories.forEach((category) => addCategory(category));

function flipCard() {
  this.innerHTML = "";
  this.style.fontSize = "15px";
  this.style.lineHeight = "30px";
  const textDisplay = document.createElement("div");
  textDisplay.classList.add("card-text");
  textDisplay.innerHTML = this.getAttribute("data-question");
  const firstButton = document.createElement("button");
  const secondButton = document.createElement("button");
  firstButton.classList.add("first-button");
  secondButton.classList.add("second-button");
  firstButton.innerHTML = this.getAttribute("data-answer-1");
  secondButton.innerHTML = this.getAttribute("data-answer-2");
  firstButton.addEventListener("click", getResult);
  secondButton.addEventListener("click", getResult);
  this.append(textDisplay, firstButton, secondButton);

  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.removeEventListener("click", flipCard));
}

function getResult() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => card.addEventListener("click", flipCard));

  const cardOfButton = this.parentElement;

  if (cardOfButton.getAttribute("data-correct") == this.innerHTML) {
    score = score + parseInt(cardOfButton.getAttribute("data-value"));
    scoreDisplay.innerHTML = score;
    cardOfButton.classList.add("correct-answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = cardOfButton.getAttribute("data-value");
    }, 100);
    alert("Very Good");
  } else {
    cardOfButton.classList.add("wrong-answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = 0;
    }, 100);
    alert("Hmm, sorry!! Don´t give up, try an other question!");
  }
  cardOfButton.removeEventListener("click", flipCard);
}
