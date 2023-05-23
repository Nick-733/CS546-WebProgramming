let myForm = document.getElementById("my_form");
let textInput = document.getElementById("text_input");
let results = document.getElementById("results");
let label = document.getElementById("label");
let errors = document.getElementById("error");

textInput.classList.remove("inputError");
label.classList.remove("labelError");

if (myForm) {
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!textInput.value || textInput.value.trim().length === 0) {
      textInput.classList.add("inputError");
      label.classList.add("labelError");
      errors.hidden = false;
      errors.innerHTML =
        "Input Can't be Empty String or String with Just Spaces !";
      myForm.reset();
      textInput.focus();
    } else {
      textInput.classList.remove("inputError");
      label.classList.remove("labelError");
      errors.hidden = true;

      let totalLetters = textInput.value
        .toLowerCase()
        .replace(/[^a-z]/g, "").length;
      let totalNonLetters = textInput.value
        .toLowerCase()
        .replace(/[a-z]/g, "").length;
      let totalVowels =
        textInput.value.toLowerCase().match(/[aeiou]/gi)?.length || 0;
      let totalConsonants =
        textInput.value.toLowerCase().match(/[bcdfghjklmnpqrstvwxyz]/gi)
          ?.length || 0;
      let words = textInput.value.toLowerCase().split(/[^a-zA-Z]+/);
      words = words
        .map((element) => element.replace(/[^a-z]/g, ""))
        .filter((element) => /[a-z]/.test(element));
      let totalWords = words.length;
      let uniqueWords = new Set(words).size;
      let longWords = words.filter((word) => word.length >= 6).length;
      let shortWords = words.filter((word) => word.length <= 3).length;

      const dl = document.createElement("dl");

      dl.innerHTML = `
                <dt>Original Input:</dt>
                <dd>${textInput.value}</dd>

                <dt>Total Letters:</dt>
                <dd>${totalLetters}</dd>

                <dt>Total Non-Letters:</dt>
                <dd>${totalNonLetters}</dd>

                <dt>Total Vowels:</dt>
                <dd>${totalVowels}</dd>

                <dt>Total Consonants:</dt>
                <dd>${totalConsonants}</dd>

                <dt>Total Words:</dt>
                <dd>${totalWords}</dd>

                <dt>Unique Words:</dt>
                <dd>${uniqueWords}</dd>

                <dt>Long Words:</dt>
                <dd>${longWords}</dd>

                <dt>Short Words:</dt>
                <dd>${shortWords}</dd>
                
                <br>
            `;
      results.appendChild(dl);
      myForm.reset();
      textInput.focus();
    }
  });
}
