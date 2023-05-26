document.getElementById('prompt-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const promptInput = document.getElementById('prompt-input');
  const completionDisplay = document.getElementById('completion-display');

  const response = await fetch('/api/completion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: promptInput.value }),
  });
  const completion = await response.text();

  completionDisplay.textContent = completion;
});
