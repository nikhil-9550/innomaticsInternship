document.addEventListener("DOMContentLoaded", () => {
    const categories = {
        Fruits: ["🍎", "🍌", "🍇", "🍉", "🍓", "🍍", "🥭", "🍑"],
        Emojis: ["😀", "😂", "😍", "😎", "😡", "😭", "😱", "🤩"],
        Animals: ["🐶", "🐱", "🐭", "🐰", "🦊", "🐼", "🐸", "🐯"],
        Planets: ["🌍", "🌕", "🪐", "🌟", "☀️", "🌖", "🌑", "💫"]
    };

    let selectedCategory = "";
    let flippedCards = [];
    let matchedPairs = 0;
    let score = 0;
    let timer;
    let timeLeft = 30;

    const gameContainer = document.getElementById("game-container");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");

    const flipSound = new Audio('./sounds/cardflip.mp3');
    const matchSound = new Audio("match.mp3");
    const winSound = new Audio("./sounds/win.wav");
    const gameOverSound = new Audio("gameover.mp3");

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedCategory = button.dataset.category;
            startGame();
        });
    });

    function startGame() {
        gameContainer.innerHTML = "";
        score = 0;
        matchedPairs = 0;
        timeLeft = 30;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;

        let categoryItems = categories[selectedCategory];
        let gameCards = [...categoryItems, ...categoryItems];
        gameCards.sort(() => Math.random() - 0.5);

        gameCards.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.value = item;
            card.innerHTML = "?";
            card.addEventListener("click", handleCardClick);
            gameContainer.appendChild(card);
        });
        startTimer();
    }

    function handleCardClick(event) {
        let card = event.target;
        if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
            flipSound.play();
            card.innerHTML = card.dataset.value;
            card.classList.add("flipped");
            flippedCards.push(card);
        }

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }

    function checkMatch() {
        let [card1, card2] = flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            matchSound.play();
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedPairs++;
            score += 10;
        } else {
            card1.innerHTML = "?";
            card2.innerHTML = "?";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }
        flippedCards = [];
        scoreDisplay.textContent = score;
        if (matchedPairs === 8) {
            clearInterval(timer);
            winSound.play();
            alert("Congratulations! You won!");
        }
    }

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft === 0) {
                clearInterval(timer);
                gameOverSound.play();
                alert("Game Over! Time's up.");
                document.querySelectorAll(".card").forEach(card => card.removeEventListener("click", handleCardClick));
            }
        }, 1000);
    }
});