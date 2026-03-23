// Lærke: Billedecarousel JS - håndterer karousellen på index.html
// Lavet i samarbejde med AI (Gemini) - rettet og tilpasset af Lærke
// SE AI PROMPT DOKUMENT FOR MERE INFO OM KODEN

document.addEventListener("DOMContentLoaded", () => {
  console.log("Hero slider JS kører ✅");

  const slides = [
    {
      title: "Frivillig quizzen",
      text: "I tvivl om hvilken rolle du kunne have?",
      img: "img/sind__events__coffee.webp",
      buttons: [
        { label: "Bliv Frivillig", link: "#", type: "primary" },
        { label: "Tag frivillig quizzen her", link: "#", type: "secondary" }
      ]
    },
    {
      title: "Walk and talk",
      text: "Vi går snart, skal du med?",
      img: "img/sind__events__walkAndTalk.webp",
      buttons: [
        { label: "Bliv Frivillig", link: "#", type: "primary" },
        { label: "Læs mere", link: "#", type: "secondary" }
      ]
    },
    {
      title: "Få erfaring. Mød nye mennesker. Gør en forskel.",
      text: "Uanset om du kommer for fællesskabet eller fagligheden, er der plads til dig.",
      img: "img/sind__forside__img.webp",
      buttons: [
        { label: "Bliv Frivillig", link: "#", type: "primary" },
        { label: "Kom og mød os", link: "#", type: "secondary" }
      ]
    }
  ];

  let current = 0;

  const slideContainer = document.getElementById("slide-container");
  const dotsContainer = document.getElementById("slider-dots");
  const arrowLeft = document.getElementById("arrow-left");
  const arrowRight = document.getElementById("arrow-right");

  console.log("slideContainer:", slideContainer);
  console.log("dotsContainer:", dotsContainer);
  console.log("arrowLeft:", arrowLeft, "arrowRight:", arrowRight);

  if (!slideContainer || !dotsContainer) {
    console.error("Hero slider elementer blev ikke fundet i DOM'en.");
    return;
  }

  function renderSlides() {
    slideContainer.innerHTML = "";

    slides.forEach((slide, index) => {
      const div = document.createElement("div");
      div.className = "slide";
      div.style.backgroundImage = `url(${slide.img})`;

      if (index === current) div.classList.add("active");

      const buttonsHTML = slide.buttons
        .map(btn => `<a href="${btn.link}" class="btn-${btn.type}">${btn.label}</a>`)
        .join("");

      div.innerHTML = `
        <div class="hero-overlay">
          <div class="hero-content">
            <h1>${slide.title}</h1>
            <p>${slide.text}</p>
            <div class="hero-buttons">${buttonsHTML}</div>
          </div>
        </div>
      `;

      slideContainer.appendChild(div);
    });
  }

  function renderDots() {
    dotsContainer.innerHTML = "";

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("button");
      if (i === current) dot.classList.add("active");

      dot.addEventListener("click", () => {
        current = i;
        updateSlider();
      });

      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    renderSlides();
    renderDots();
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    updateSlider();
  }

  if (arrowLeft) {
    arrowLeft.addEventListener("click", () => {
      current = (current - 1 + slides.length) % slides.length;
      updateSlider();
    });
  }

  if (arrowRight) {
    arrowRight.addEventListener("click", () => {
      current = (current + 1) % slides.length;
      updateSlider();
    });
  }

  setInterval(nextSlide, 5000);

  updateSlider();
});
