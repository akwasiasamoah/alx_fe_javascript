document.addEventListener("DOMContentLoaded", () => {
  let quotes = [
    {
      text: "The only limit to our realization of tomorrow is our doubts of today.",
      category: "Inspiration",
    },
    {
      text: "Life is what happens when you're busy making other plans.",
      category: "Life",
    },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
  ];

  const quoteDisplay = document.getElementById("quote-display");
  const addQuoteFormContainer = document.getElementById(
    "add-quote-form-container"
  );

  function showRandomQuote() {
    if (quotes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
  }

  function createAddQuoteForm() {
    const form = document.createElement("form");
    form.id = "add-quote-form";

    const textLabel = document.createElement("label");
    textLabel.textContent = "Quote: ";
    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.id = "quote-text";
    textInput.required = true;
    textLabel.appendChild(textInput);

    const categoryLabel = document.createElement("label");
    categoryLabel.textContent = "Category: ";
    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.id = "quote-category";
    categoryInput.required = true;
    categoryLabel.appendChild(categoryInput);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Add Quote";
    submitButton.type = "submit";

    form.appendChild(textLabel);
    form.appendChild(document.createElement("br"));
    form.appendChild(categoryLabel);
    form.appendChild(document.createElement("br"));
    form.appendChild(submitButton);

    form.onsubmit = (event) => {
      event.preventDefault();

      const newQuoteText = textInput.value.trim();
      const newQuoteCategory = categoryInput.value.trim();

      if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        textInput.value = "";
        categoryInput.value = "";

        showRandomQuote();
      }
    };

    addQuoteFormContainer.innerHTML = ""; // Clear any existing form
    addQuoteFormContainer.appendChild(form);
  }

  // Initial setup: Show a random quote and create the add quote form
  showRandomQuote();
  createAddQuoteForm();
});
