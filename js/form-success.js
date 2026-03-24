document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".kontakt-formular__form[data-success-message]");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      alert(form.dataset.successMessage || "Tak. Din formular er sendt.");
      form.reset();
    });
  });
});