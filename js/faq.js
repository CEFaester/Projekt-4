// 1. Find alle vores <details> bokse. 
// Array.from() tager listen og forvandler den til et ægte JavaScript Array, så vi overholder dine regler!
const faqArray = Array.from(document.querySelectorAll('.faq-section__item'));

// 2. Kør igennem vores array af FAQ-bokse
faqArray.forEach(faqBox => {
    
    // 3. Lyt efter hvornår boksen skifter tilstand (åbner eller lukker)
    faqBox.addEventListener('toggle', () => {
        
        // 4. Hvis den boks vi lige har trykket på nu er ÅBEN...
        if (faqBox.open) {
            
            // ...så kigger vi hele vores array igennem igen...
            faqArray.forEach(otherBox => {
                
                // ...og hvis boksen IKKE er den, vi lige har trykket på, så tvinger vi den til at lukke.
                if (otherBox !== faqBox) {
                    otherBox.open = false;
                }
            });
        }
    });
});