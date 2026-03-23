// 1. DINE SPØRGSMÅL (Super nemt at tilføje flere her!)
const faqData = [
    { 
        question: "Skal jeg have erfaring for at være frivillig?", 
        answer: "Meget godt svar lige her." 
    },
    { 
        question: "Hvor meget tid skal jeg bruge?", 
        answer: "Det bestemmer du selv. Mange bruger 1-5 timer om ugen, men du kan også hjælpe en gang imellem." 
    },
    { 
        question: "Kan jeg prøve det af først?", 
        answer: "Meget godt svar lige her." 
    },
    { 
        question: "Får jeg oplæring?", 
        answer: "Meget godt svar lige her." 
    },
    { 
        question: "Hvad hvis jeg bliver i tvivl undervejs?", 
        answer: "Du står aldrig alene. Du kan altid tale med de andre frivillige eller en koordinator." 
    },
    {
        question: "Kan jeg stoppe igen, hvis det ikke passer mig?",
        answer: "Meget godt svar lige her"
    },
    {
        question: "Hvad får jeg ud af at være frivillig?",
        answer: "Meget godt svar lige her"
    }
];

// 2. Byg HTML automatisk
const faqContainer = document.getElementById('faq-container');

faqData.forEach(item => {
    // Vi skaber <details> kassen
    const detailsBox = document.createElement('details');
    detailsBox.classList.add('faq-section__item');
    
    // Vi fylder den med HTML'en og dataen fra arrayet
    detailsBox.innerHTML = `
        <summary class="faq-section__question">
            ${item.question}
            <span class="faq-section__icon">+</span>
        </summary>
        <div class="faq-section__answer">
            <p>${item.answer}</p>
        </div>
    `;
    
    faqContainer.appendChild(detailsBox);
});

// 3. Harmonika-effekt (Sikrer at kun ét spørgsmål er åbent ad gangen)
const allFaqBoxes = document.querySelectorAll('.faq-section__item');

allFaqBoxes.forEach(box => {
    box.addEventListener('toggle', () => {
        // Hvis vi lige har åbnet denne boks...
        if (box.open) {
            // ...luk alle de andre
            allFaqBoxes.forEach(otherBox => {
                if (otherBox !== box) {
                    otherBox.open = false;
                }
            });
        }
    });
});