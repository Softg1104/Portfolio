function toggleColorMode() {
  const body = document.body;
  const isDarkMode = body.classList.contains('dark-mode');

  if (isDarkMode) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      document.querySelector('.mode-toggle').innerText = 'Toggle Dark Mode'; // Switch text for button
  } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      document.querySelector('.mode-toggle').innerText = 'Toggle Light Mode'; // Switch text for button
  }
}
