// ─────────────────────────────────────────────
// Scoring key
// Each answer letter maps to a point value.
// Total range across 5 questions: 5 – 20
//   A = 1 pt  →  Summer  (energetic, spontaneous)
//   B = 2 pts →  Spring  (hopeful, driven)
//   C = 3 pts →  Autumn  (warm, grounded)
//   D = 4 pts →  Winter  (introspective, still)
//
// Score ranges:
//   5  – 8  → Summer
//   9  – 12 → Spring
//   13 – 16 → Autumn
//   17 – 20 → Winter
// ─────────────────────────────────────────────
 
const pointValues = {
    A: 1,
    B: 2,
    C: 3,
    D: 4
};
 
// Object to store the user's selected answer per question block
const userAnswers = {};
 
// ─────────────────────────────────────────────
// Step 1: Toggle button fill and track answers
// ─────────────────────────────────────────────
 
// Select all question blocks on the page
const questionBlocks = document.querySelectorAll('.question-block');
 
// Loop over each question block
questionBlocks.forEach(function (block) {
 
    // Select all answer buttons inside this block
    const answerButtons = block.querySelectorAll('.answer-btn');
 
    answerButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
 
            // Remove 'selected' styling from every button in this block
            answerButtons.forEach(function (b) {
                b.classList.remove('selected');
                b.classList.remove('btn-primary');
                b.classList.add('btn-outline-primary');
            });
 
            // Highlight the clicked button
            btn.classList.remove('btn-outline-primary');
            btn.classList.add('btn-primary');
            btn.classList.add('selected');
 
            // Store the answer — use the parent container's id as the key
            const questionId = block.closest('[id^="question-"]').id;
            const answer = btn.getAttribute('data-answer');
            userAnswers[questionId] = answer;
 
            console.log('Recorded:', questionId, '→', answer, '(' + pointValues[answer] + ' pts)');
        });
    });
});
 
// ─────────────────────────────────────────────
// Step 2: Result definitions
// ─────────────────────────────────────────────
 
const results = {
    summer: {
        emoji: '☀️',
        title: 'Summer',
        description: 'You radiate warmth and enthusiasm! Spontaneous, optimistic, and full of energy — you live in the present and bring sunshine wherever you go. People feel lighter just being around you.'
    },
    spring: {
        emoji: '🌸',
        title: 'Spring',
        description: 'You are full of potential and forward momentum! You believe in fresh starts and embrace change with optimism. Motivated and organised, you inspire the people around you to grow.'
    },
    autumn: {
        emoji: '🍂',
        title: 'Autumn',
        description: 'You are warm, grounded, and deeply loyal. At your best when things slow down enough to be appreciated, you have a gift for making people feel seen, heard, and at home.'
    },
    winter: {
        emoji: '❄️',
        title: 'Winter',
        description: 'Thoughtful and introspective, you value stillness and inner depth. There is a rich inner world beneath your calm surface, and others often seek you out for your honest, considered perspective.'
    }
};
 
// ─────────────────────────────────────────────
// Step 3: displayResult() function
// ─────────────────────────────────────────────
 
function displayResult() {
 
    // Check that every question has been answered
    const totalQuestions = document.querySelectorAll('[id^="question-"]').length;
    const answeredQuestions = Object.keys(userAnswers).length;
 
    if (answeredQuestions < totalQuestions) {
        const remaining = totalQuestions - answeredQuestions;
        alert('Please answer all questions first! You have ' + remaining + ' question(s) left.');
        return;
    }
 
    // Tally total score
    let totalScore = 0;
    for (const questionId in userAnswers) {
        const letter = userAnswers[questionId];
        totalScore += pointValues[letter];
    }
 
    console.log('Total score:', totalScore);
 
    // Determine result based on score range
    let resultKey;
    if (totalScore <= 8) {
        resultKey = 'summer';
    } else if (totalScore <= 12) {
        resultKey = 'spring';
    } else if (totalScore <= 16) {
        resultKey = 'autumn';
    } else {
        resultKey = 'winter';
    }
 
    const result = results[resultKey];
 
    // Update #result-text with the result
    const resultText = document.getElementById('result-text');
    resultText.innerHTML =
        '<span style="font-size: 2rem;">' + result.emoji + '</span><br>' +
        '<strong style="font-size: 1.2rem;">You are ' + result.title + '!</strong><br><br>' +
        result.description +
        '<br><br><small class="text-muted">Your score: ' + totalScore + ' / 20</small>';
 
    // Show the result container
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
 
    // Scroll smoothly to the result
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}
 
// ─────────────────────────────────────────────
// Step 4: Hook up the "Give Me the Results" button
// ─────────────────────────────────────────────
 
document.getElementById('show-result').addEventListener('click', displayResult);