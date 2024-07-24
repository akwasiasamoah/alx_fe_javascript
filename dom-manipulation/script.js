document.addEventListener("DOMContentLoaded", () => {
  let quotes = [];

  const quoteDisplay = document.getElementById("quote-display");
  const addQuoteFormContainer = document.getElementById(
    "add-quote-form-container"
  );
  const exportButton = document.getElementById("export-quotes-btn");
  const importFileInput = document.getElementById("importFile");

  function loadQuotes() {
    const savedQuotes = localStorage.getItem("quotes");
    if (savedQuotes) {
      quotes = JSON.parse(savedQuotes);
      // Display the first quote (or a random one if preferred)
      showRandomQuote();
      updateQuoteList();
    }
  }

  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  function showRandomQuote() {
    if (quotes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;

    sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
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
        saveQuotes();
        updateQuoteList();
      }
    };

    addQuoteFormContainer.innerHTML = "";
    addQuoteFormContainer.appendChild(form);
  }

  function updateQuoteList() {}

  function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes = importedQuotes;
      saveQuotes();
      showRandomQuote();
      updateQuoteList();
      alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
  }

  exportButton.addEventListener("click", exportQuotes);
  importFileInput.addEventListener("change", importFromJsonFile);

  loadQuotes();
  createAddQuoteForm();
});
