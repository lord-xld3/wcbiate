const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt
  event.preventDefault();
  // Store the event for later use
  const deferredPrompt = event;
  // Show the install button
  butInstall.style.display = 'block';

  // Event handler for the install button click
  butInstall.addEventListener('click', async () => {
    // Show the installation prompt
    deferredPrompt.prompt();
    // Wait for the user's choice
    const choiceResult = await deferredPrompt.userChoice;

    // Check if the user accepted the installation
    if (choiceResult.outcome === 'accepted') {
      console.log('PWA installation accepted');
    } else {
      console.log('PWA installation dismissed');
    }

    // Reset the install button display
    butInstall.style.display = 'none';
  });
});

// Event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed');
});
