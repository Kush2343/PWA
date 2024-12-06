import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    let deferredPrompt;

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the default mini-infobar from appearing on mobile
      event.preventDefault();

      // Save the event so it can be triggered later
      deferredPrompt = event;

      // Show the install button
      const installBtn = document.getElementById('installBtn');
      installBtn.style.display = 'block';

      // Add a click event listener to the install button
      installBtn.addEventListener('click', async () => {
        // Hide the install button
        installBtn.style.display = 'none';

        // Show the install prompt
        if (deferredPrompt) {
          deferredPrompt.prompt();

          // Wait for the user's response
          const { outcome } = await deferredPrompt.userChoice;

          if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }

          // Clear the deferred prompt
          deferredPrompt = null;
        }
      });
    };

    // Attach the event listener
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Optional: Handle the appinstalled event
    window.addEventListener('appinstalled', () => {
      console.log('PWA installed successfully!');
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <div className="App">
      <h1>
        Hello This Is Demo Of <abbr title="Progressive Web App">PWA</abbr>
      </h1>
      <button id="installBtn" style={{ display: 'none' }}>
        Install App
      </button>
    </div>
  );
}

export default App;
