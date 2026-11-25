
// ==========================================
// EERU NETHI – OUR LITTLE MEMORIES 💗
// Complete Website JavaScript
// ==========================================


// ------------------------------------------
// 1. PAGE NAVIGATION
// ------------------------------------------

const puzzlePage = document.querySelector(".puzzle-page");
const galleryPage = document.getElementById("galleryPage");
const timelinePage = document.getElementById("timelinePage");
const quizPage = document.getElementById("quizPage");
const surprisePage = document.getElementById("surprisePage");
const finalPage = document.getElementById("finalPage");
const endingPage = document.getElementById("endingPage");

const pages = [
    puzzlePage,
    galleryPage,
    timelinePage,
    quizPage,
    surprisePage,
    finalPage,
    endingPage
];

function showPage(pageToShow) {
    pages.forEach(page => {
        if (!page) return;

        page.classList.remove("page-enter");
        page.style.display = "none";
    });

    if (pageToShow) {
        // The puzzle page uses flex; the other chapters use block.
        pageToShow.style.display =
            (pageToShow === puzzlePage || pageToShow === endingPage)
    ? "flex"
    : "block";

        void pageToShow.offsetWidth;
        pageToShow.classList.add("page-enter");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Start with the puzzle page
showPage(puzzlePage);


// ------------------------------------------
// 2. PICTURE PUZZLE
// ------------------------------------------

const puzzle = document.getElementById("puzzle");
const message = document.getElementById("message");
const shuffleButton = document.getElementById("shuffleButton");
const successPanel = document.getElementById("successPanel");
const continueButton = document.getElementById("continueButton");

const puzzleImage = "images/puzzle-photo.jpg";

let puzzlePieces = [];
let selectedPiece = null;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function createPuzzle() {
    if (!puzzle) return;

    puzzle.innerHTML = "";
    puzzle.style.display = "grid";
    puzzle.style.gridTemplateColumns = "repeat(3, 1fr)";

    puzzlePieces.forEach((piece, position) => {
        const tile = document.createElement("button");

        tile.type = "button";
        tile.className = "puzzle-piece";
        tile.setAttribute(
            "aria-label",
            "Puzzle piece " + (position + 1)
        );

        const originalRow = Math.floor(piece / 3);
        const originalColumn = piece % 3;

        tile.style.backgroundImage = `url("${puzzleImage}")`;
        tile.style.backgroundSize = "300% 300%";
        tile.style.backgroundPosition =
            `${originalColumn * 50}% ${originalRow * 50}%`;

        tile.style.width = "100%";
        tile.style.aspectRatio = "1 / 1";
        tile.style.border = "2px solid white";
        tile.style.cursor = "pointer";
        tile.style.padding = "0";

        if (selectedPiece === position) {
            tile.style.outline = "4px solid #e879a9";
            tile.style.outlineOffset = "-4px";
        }

        tile.addEventListener("click", () => {
            handlePuzzleClick(position);
        });

        puzzle.appendChild(tile);
    });
}

function checkPuzzle() {
    return puzzlePieces.every((piece, index) => piece === index);
}

function handlePuzzleClick(position) {
    if (successPanel && successPanel.style.display === "block") {
        return;
    }

    if (selectedPiece === null) {
        selectedPiece = position;
        createPuzzle();
    } else {
        const firstPiece = selectedPiece;

        [
            puzzlePieces[firstPiece],
            puzzlePieces[position]
        ] = [
            puzzlePieces[position],
            puzzlePieces[firstPiece]
        ];

        selectedPiece = null;
        createPuzzle();

        if (checkPuzzle()) {
            if (message) {
                message.textContent = "You solved it! Amazing! 🌸";
            }

            if (successPanel) {
                successPanel.style.display = "block";
            }

            if (shuffleButton) {
                shuffleButton.style.display = "none";
            }
        } else {
            if (message) {
                message.textContent =
                    "Keep going! You're getting closer. 💗";
            }
        }
    }
}

function shufflePuzzle() {
    puzzlePieces = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8]);

    // Make sure the puzzle does not start solved
    if (checkPuzzle()) {
        [puzzlePieces[0], puzzlePieces[1]] =
            [puzzlePieces[1], puzzlePieces[0]];
    }

    selectedPiece = null;

    if (successPanel) {
        successPanel.style.display = "none";
    }

    if (shuffleButton) {
        shuffleButton.style.display = "inline-block";
    }

    if (message) {
        message.textContent = "Take your time. You've got this! 🌸";
    }

    createPuzzle();
}

if (shuffleButton) {
    shuffleButton.addEventListener("click", shufflePuzzle);
}

if (continueButton) {
    continueButton.addEventListener("click", () => {
        showPage(galleryPage);
    });
}

// Create the first shuffled puzzle
shufflePuzzle();


// ------------------------------------------
// 3. PHOTO GALLERY
// ------------------------------------------

const galleryImages = document.querySelectorAll(".gallery-image");
const photoViewer = document.getElementById("photoViewer");
const largePhoto = document.getElementById("largePhoto");
const closeViewer = document.getElementById("closeViewer");

galleryImages.forEach(image => {
    image.addEventListener("click", () => {
        if (photoViewer && largePhoto) {
            largePhoto.src = image.src;
            largePhoto.alt = image.alt;
            photoViewer.style.display = "flex";
        }
    });
});

if (closeViewer) {
    closeViewer.addEventListener("click", () => {
        photoViewer.style.display = "none";
    });
}

if (photoViewer) {
    photoViewer.addEventListener("click", event => {
        if (event.target === photoViewer) {
            photoViewer.style.display = "none";
        }
    });
}

// Gallery → Timeline
const nextPageButton = document.getElementById("nextPageButton");

if (nextPageButton) {
    nextPageButton.addEventListener("click", () => {
        showPage(timelinePage);
    });
}


// ------------------------------------------
// 4. MEMORY TIMELINE → QUIZ
// ------------------------------------------

const nextTimelineButton =
    document.getElementById("nextTimelineButton");

if (nextTimelineButton) {
    nextTimelineButton.addEventListener("click", () => {
        showPage(quizPage);
    });
}


// ------------------------------------------
// 5. OUR LITTLE QUIZ
// ------------------------------------------

// You can edit the questions, options, answers and feedback here.
// The answer number starts at 0:
// 0 = first option, 1 = second option,
// 2 = third option, 3 = fourth option.

const quizQuestions = [
    {
        emoji: "😂",
        question: "Who is the most dramatic one between us?",
        options: [
            "Me 😂",
            "You 🤭",
            "Both of us 😭",
            "Neither 😇"
        ],
        answer: 2,
        feedback: "Haha! We both deserve an award for drama! 😂"
    },
    {
        emoji: "❤️",
        question: "What's my favourite thing about you?",
        options: [
            "Your smile",
            "Your Eye's",
            "Your masive Forehead",
            "Everything about you"
        ],
        answer: 3,
        feedback: "Of course! How could I choose just one? ❤️"
    },
    {
        emoji: "🥹",
        question: "If I go away will you come finding me?",
        options: [
            "Why should I?",
            "No,I wont!",
            "Fu*k I'll nvr",
            "I have friends why should I?"
        ],
        answer: 3,
        feedback: "Thats the truth Asshole. 💗"
    },
    {
        emoji: "🤭",
        question: "Who am I to you?",
        options: [
            "Just a cusion",
            "I dont kn u",
            "Annnnaaaaaaaa",
            "Just judeson"
        ],
        answer: 2,
        feedback: "I kn wht's happening grace,dont worry i wont disturb ur anna era"
    },
    {
        emoji: "🦄",
        question: "What makes our moments special?",
        options: [
            "The little laughs",
            "The long talks",
            "The silly things",
            "All of these"
        ],
        answer: 3,
        feedback: "It's the little things that make our story special! 🌸"
    },
    {
        emoji: "💕",
        question: "In every univers i would choose you grace, will i??",
        options: [
            "Noooooo",
            "He already has option",
            "yessssss",
            "he would die for me"
        ],
        answer: 3,
        feedback: "i would die for you! Birthday girl. 💕"
    },
    {
        emoji: "💍",
        question: "What do I want more of in our future?",
        options: [
            "More adventures",
            "More memories",
            "More silly moments",
            "None of the above"
        ],
        answer: 3,
        feedback: "if i get back my old grace i will be with till end grace ! 💞"
    }
];

let currentQuizQuestion = 0;
let quizScore = 0;
let quizAnswered = false;

const quizEmoji = document.getElementById("quizEmoji");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const quizNextBtn = document.getElementById("quizNextBtn");
const quizCounter = document.getElementById("quizCounter");
const quizProgressBar = document.getElementById("quizProgressBar");
const quizCard = document.getElementById("quizCard");
const quizResult = document.getElementById("quizResult");
const quizResultMessage = document.getElementById("quizResultMessage");
const quizContinueBtn = document.getElementById("quizContinueBtn");

function loadQuizQuestion() {
    if (!quizOptions || !quizQuestion) return;

    const q = quizQuestions[currentQuizQuestion];

    quizAnswered = false;

    quizEmoji.textContent = q.emoji;
    quizQuestion.textContent = q.question;

    quizCounter.textContent =
        `Question ${currentQuizQuestion + 1} of ${quizQuestions.length}`;

    quizProgressBar.style.width =
        `${((currentQuizQuestion + 1) / quizQuestions.length) * 100}%`;

    quizFeedback.textContent = "";
    quizNextBtn.disabled = true;

    quizNextBtn.textContent =
        currentQuizQuestion === quizQuestions.length - 1
            ? "See My Result 💗"
            : "Next Question 💕";

    quizOptions.innerHTML = "";

    q.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "quiz-option";
        button.textContent = option;

        button.addEventListener("click", () => {
            selectQuizAnswer(button, index);
        });

        quizOptions.appendChild(button);
    });
}

function selectQuizAnswer(button, index) {
    if (quizAnswered) return;

    quizAnswered = true;

    const q = quizQuestions[currentQuizQuestion];
    const buttons = quizOptions.querySelectorAll(".quiz-option");

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    button.classList.add("selected");

    if (index === q.answer) {
        quizScore++;
        button.classList.add("correct");
        quizFeedback.textContent = q.feedback;
    } else {
        button.classList.add("incorrect");
        quizFeedback.textContent =
            "Dont lie Asshole!!! 💗";

        // Show the intended answer too
        buttons[q.answer].classList.add("correct");
    }

    quizNextBtn.disabled = false;
}

function nextQuizQuestion() {
    if (!quizAnswered) return;

    currentQuizQuestion++;

    if (currentQuizQuestion < quizQuestions.length) {
        loadQuizQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    if (quizCard) {
        quizCard.style.display = "none";
    }

    if (quizCounter) {
        quizCounter.style.display = "none";
    }

    const progressContainer = document.querySelector(".quiz-progress");

    if (progressContainer) {
        progressContainer.style.display = "none";
    }

    if (quizResult) {
        quizResult.style.display = "block";
    }

    if (quizResultMessage) {
        let resultMessage = "";

        if (quizScore === quizQuestions.length) {
            resultMessage =
                "Perfect score! You know our little world so well! 🥹💗";
        } else if (quizScore >= 5) {
            resultMessage =
                "Awww, you know us pretty well! Here's to more memories together. 💕";
        } else if (quizScore >= 3) {
            resultMessage =
                "Not bad at all! We still have so many things to discover together. 🌷";
        } else {
            resultMessage =
                "Hehe! Looks like we need more silly talks and memory-making. 😂❤️";
        }

        quizResultMessage.textContent =
            `${resultMessage} Your score: ${quizScore}/${quizQuestions.length}`;
    }
}

if (quizNextBtn) {
    quizNextBtn.addEventListener("click", nextQuizQuestion);
}

if (quizContinueBtn) {
    quizContinueBtn.addEventListener("click", () => {
        showPage(surprisePage);
    });
}

// Prepare the first quiz question
loadQuizQuestion();


// ------------------------------------------
// 6. THREE SURPRISE ENVELOPES
// ------------------------------------------

const envelopes = document.querySelectorAll(".envelope");
const surpriseMessages =
    document.querySelectorAll(".surprise-message");

envelopes.forEach(envelope => {
    envelope.addEventListener("click", () => {
        const messageId = envelope.dataset.message;

        surpriseMessages.forEach(messageBox => {
            messageBox.style.display = "none";
        });

        const selectedMessage =
            document.getElementById(messageId);

        if (selectedMessage) {
            selectedMessage.style.display = "block";
        }
    });
});

// Surprise → Final chapter
const nextSurpriseButton =
    document.getElementById("nextSurpriseButton");

if (nextSurpriseButton) {
    nextSurpriseButton.addEventListener("click", () => {
        showPage(finalPage);
    });
}


// ------------------------------------------
// 7. FINAL SURPRISE
// ------------------------------------------

const finalSurpriseButton =
    document.getElementById("finalSurpriseButton");

const finalSurprise =
    document.getElementById("finalSurprise");

if (finalSurpriseButton && finalSurprise) {
    finalSurpriseButton.addEventListener("click", () => {
        const isHidden =
            getComputedStyle(finalSurprise).display === "none";

        if (isHidden) {
            finalSurprise.style.display = "block";
            finalSurpriseButton.textContent = "Close Surprise 💗";
        } else {
            finalSurprise.style.display = "none";
            finalSurpriseButton.textContent =
                "Open Your Final Surprise 🎁";
        }
    });
}
// CHAPTER 6 → CHAPTER 7

const openEndingButton =
    document.getElementById("openEndingButton");

if (openEndingButton && endingPage) {
    openEndingButton.addEventListener("click", () => {
        showPage(endingPage);
    });
}

// ------------------------------------------
// 8. JAR OF LITTLE NOTES
// ------------------------------------------

const noteCollections = {
    happy: [
        "You are my favorite person. 🌸",
        " Happy that you read all this for me 💗",
        "I can't stop thinking about you😊",
        "You matter to me.! 🌷"
    ],

    funny: [
        "Loosu kudhi nee 😂",
        "graceeeeeee 🤭",
        "Treat needed mf 😆",
        "mental kudhiiiiiii 😜"
    ],

    kind: [
        "HAPPY BIRTHDAY GNGG. ❤️",
        "I Wish you to get all the happniess and joy u ever needed. 🌷",
        "Tell me whn u get committed. ✨",
        "Always remember how valuable you are too me!!!. 💗"
    ]
};

let selectedCategory = "happy";
let notesDiscovered = 0;

const lastNoteIndex = {
    happy: -1,
    funny: -1,
    kind: -1
};

const pickNoteButton =
    document.getElementById("pick-note-btn");

const randomNoteDisplay =
    document.getElementById("random-note");

const noteCounter =
    document.getElementById("note-counter");

const noteJar = document.querySelector(".note-jar");

const categoryButtons =
    document.querySelectorAll(".category-btn");

// Category selection
categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
        selectedCategory = this.dataset.category;

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        if (randomNoteDisplay) {
            randomNoteDisplay.textContent =
                "Pick a little note to discover something special 💗";

            randomNoteDisplay.classList.remove("show-note");
        }
    });
});

// Pick a random note
if (pickNoteButton && randomNoteDisplay && noteJar) {
    pickNoteButton.addEventListener("click", () => {
        noteJar.classList.remove("shake");
        void noteJar.offsetWidth;
        noteJar.classList.add("shake");

        const notes = noteCollections[selectedCategory];

        let randomIndex =
            Math.floor(Math.random() * notes.length);

        // Avoid repeating the previous note in this category
        if (
            notes.length > 1 &&
            randomIndex === lastNoteIndex[selectedCategory]
        ) {
            randomIndex = (randomIndex + 1) % notes.length;
        }

        lastNoteIndex[selectedCategory] = randomIndex;

        randomNoteDisplay.classList.remove("show-note");
        void randomNoteDisplay.offsetWidth;

        randomNoteDisplay.textContent = notes[randomIndex];
        randomNoteDisplay.classList.add("show-note");

        notesDiscovered++;

        if (noteCounter) {
            noteCounter.textContent =
                `Notes discovered: ${notesDiscovered} 💌`;

            noteCounter.classList.remove("updated");
            void noteCounter.offsetWidth;
            noteCounter.classList.add("updated");
        }
    });
}


// ------------------------------------------
// 9. INITIAL VISIBILITY SETTINGS
// ------------------------------------------

if (successPanel) {
    successPanel.style.display = "none";
}

if (photoViewer) {
    photoViewer.style.display = "none";
}

surpriseMessages.forEach(box => {
    box.style.display = "none";
});

if (finalSurprise) {
    finalSurprise.style.display = "none";
}


// ------------------------------------------
// 10. FLOATING HEARTS, FLOWERS & BUTTERFLIES
// ------------------------------------------

const decorationContainer = document.createElement("div");

decorationContainer.className = "floating-decorations";
decorationContainer.setAttribute("aria-hidden", "true");

document.body.appendChild(decorationContainer);

const decorations = ["💞", "🦄", "🦋", "🌷", "💕", "🤍"];

for (let i = 0; i < 15; i++) {
    const item = document.createElement("span");

    item.className = "floating-item";

    item.textContent =
        decorations[Math.floor(Math.random() * decorations.length)];

    item.style.left = Math.random() * 100 + "%";

    item.style.fontSize =
        (16 + Math.random() * 15) + "px";

    item.style.animationDuration =
        (9 + Math.random() * 10) + "s";

    item.style.animationDelay =
        (-Math.random() * 15) + "s";

    decorationContainer.appendChild(item);
}


// ------------------------------------------
// 11. LOCAL MUSIC PLAYER
// ------------------------------------------

const backgroundMusic =
    document.getElementById("backgroundMusic");

const playMusicBtn =
    document.getElementById("playMusicBtn");

const muteMusicBtn =
    document.getElementById("muteMusicBtn");

const musicProgress =
    document.getElementById("musicProgress");

if (
    backgroundMusic &&
    playMusicBtn &&
    muteMusicBtn &&
    musicProgress
) {
    // Play and pause
    playMusicBtn.addEventListener("click", () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play()
                .then(() => {
                    playMusicBtn.textContent = "⏸ Pause Music";
                })
                .catch(error => {
                    console.error("Audio playback failed:", error);
                    alert(
                        "Could not play the music. Please check the audio file path."
                    );
                });
        } else {
            backgroundMusic.pause();
            playMusicBtn.textContent = "▶ Play Music";
        }
    });

    // Mute and unmute
    muteMusicBtn.addEventListener("click", () => {
        backgroundMusic.muted = !backgroundMusic.muted;

        muteMusicBtn.textContent = backgroundMusic.muted
            ? "🔇 Unmute"
            : "🔊 Mute";
    });

    // Update progress bar
    backgroundMusic.addEventListener("timeupdate", () => {
        if (
            Number.isFinite(backgroundMusic.duration) &&
            backgroundMusic.duration > 0
        ) {
            musicProgress.value =
                (backgroundMusic.currentTime /
                 backgroundMusic.duration) * 100;
        }
    });

    // Seek through the song
    musicProgress.addEventListener("input", () => {
        if (
            Number.isFinite(backgroundMusic.duration) &&
            backgroundMusic.duration > 0
        ) {
            backgroundMusic.currentTime =
                (musicProgress.value / 100) *
                backgroundMusic.duration;
        }
    });

    // Reset when song ends
    backgroundMusic.addEventListener("ended", () => {
        playMusicBtn.textContent = "▶ Play Music";
        musicProgress.value = 0;
    });
}


// ------------------------------------------
// 12. FLOATING MUSIC BUTTON
// ------------------------------------------

const floatingMusicBtn =
    document.getElementById("floatingMusicBtn");

if (floatingMusicBtn && backgroundMusic && playMusicBtn) {
    floatingMusicBtn.addEventListener("click", () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play()
                .then(() => {
                    playMusicBtn.textContent = "⏸ Pause Music";
                    floatingMusicBtn.textContent = "⏸";
                })
                .catch(error => {
                    console.error("Music playback failed:", error);
                });
        } else {
            backgroundMusic.pause();
            playMusicBtn.textContent = "▶ Play Music";
            floatingMusicBtn.textContent = "🎵";
        }
    });

    backgroundMusic.addEventListener("play", () => {
        floatingMusicBtn.textContent = "⏸";
    });

    backgroundMusic.addEventListener("pause", () => {
        floatingMusicBtn.textContent = "🎵";
    });

    backgroundMusic.addEventListener("ended", () => {
        floatingMusicBtn.textContent = "🎵";
    });
}


// ------------------------------------------
// 13. WELCOME SCREEN BUTTON
// ------------------------------------------

const welcomeScreen =
    document.getElementById("welcomeScreen");

const openMemoriesBtn =
    document.getElementById("openMemoriesBtn");

const welcomeEnvelope =
    document.querySelector(".welcome-envelope");

if (welcomeScreen && openMemoriesBtn && welcomeEnvelope) {
    openMemoriesBtn.addEventListener("click", () => {
        openMemoriesBtn.disabled = true;
        openMemoriesBtn.textContent =
            "Opening Your Memories... 💗";

        welcomeEnvelope.classList.add("opening");

        setTimeout(() => {
            welcomeScreen.style.transition = "opacity 0.8s ease";
            welcomeScreen.style.opacity = "0";

            setTimeout(() => {
                welcomeScreen.style.display = "none";
            }, 800);
        }, 1000);
    });
}
// FINAL ROMANTIC ENDING

function restartMemories() {
    showPage(puzzlePage);

    // Return to the first page of the website
    if (typeof showPage === "function") {
        showPage("puzzlePage");
    } else {
        location.reload();
    }
}