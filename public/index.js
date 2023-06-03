document.getElementById('prompt-form').addEventListener('submit', async (e) => {
  try {
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

    /**
     * response looks like this:
     * {
     *  "message": {
     *   "role": "assistant",
     *   "content": "Hello! How can I help you today?"
     * }
     */
    const { message } = await response.json();
    const messageContent = message.content;

    completionDisplay.textContent = messageContent;
  } catch (err) {
    console.error('There was an error completing the prompt', err);
    completionDisplay.textContent =
      'There was an error completing the prompt, check your developer console, you probably did something wrong :)';
  }
});
