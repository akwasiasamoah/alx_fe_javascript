document.addEventListener("DOMContentLoaded", () => {
  let quotes = [];
  let categories = new Set();

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  const addQuoteForm = document.getElementById("addQuoteForm");
  const exportQuotesButton = document.getElementById("exportQuotes");
  const importFileInput = document.getElementById("importFile");
  const categoryFilter = document.getElementById("categoryFilter");

  function loadQuotes() {
    const savedQuotes = localStorage.getItem("quotes");
    if (savedQuotes) {
      quotes = JSON.parse(savedQuotes);
      quotes.forEach((quote) => categories.add(quote.category));
      populateCategoryFilter();
      showRandomQuote();
    }
  }

  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  function populateCategoryFilter() {
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  function showRandomQuote() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes =
      selectedCategory === "all"
        ? quotes
        : quotes.filter((quote) => quote.category === selectedCategory);

    if (filteredQuotes.length === 0) {
      quoteDisplay.textContent = "No quotes available for this category.";
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;

    sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
  }

  addQuoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const quoteText = document.getElementById("quoteText").value.trim();
    const quoteCategory = document.getElementById("quoteCategory").value.trim();

    if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
      categories.add(quoteCategory);
      saveQuotes();
      populateCategoryFilter();
      showRandomQuote();
      addQuoteForm.reset();
    }
  });

  exportQuotesButton.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
  });

  importFileInput.addEventListener("change", (event) => {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const importedQuotes = JSON.parse(event.target.result);
      importedQuotes.forEach((quote) => categories.add(quote.category));
      quotes = [...quotes, ...importedQuotes];
      saveQuotes();
      populateCategoryFilter();
      showRandomQuote();
      alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
  });

  categoryFilter.addEventListener("change", showRandomQuote);

  loadQuotes();

  newQuoteButton.addEventListener("click", showRandomQuote);
});
