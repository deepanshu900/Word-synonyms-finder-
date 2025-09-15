function findSynonyms() {
  const word = document.getElementById("wordInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Searching...</p>";

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    .then(data => {
      const synonyms = [];

      if (!data[0] || !data[0].meanings) {
        resultDiv.innerHTML = `<p>No synonyms found for "<strong>${word}</strong>".</p>`;
        return;
      }

      data[0].meanings.forEach(meaning => {
        meaning.definitions.forEach(def => {
          if (def.synonyms) {
            synonyms.push(...def.synonyms);
          }
        });
      });

      const unique = [...new Set(synonyms)];

      if (unique.length > 0) {
        resultDiv.innerHTML = `<p><strong>Synonyms of "${word}":</strong></p><ul>` +
          unique.map(s => `<li>${s}</li>`).join('') +
          `</ul>`;
      } else {
        resultDiv.innerHTML = `<p>No synonyms found for "<strong>${word}</strong>".</p>`;
      }
    })
    .catch(err => {
      console.error(err);
      resultDiv.innerHTML = `<p>Error fetching data. Try again later.</p>`;
    });
}
