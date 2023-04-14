// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Add the .hidden class to the error modal in the HTML so it does not appear when the page first loads
const errorModal = document.querySelector("#modal");
errorModal.classList.add("hidden");

const heartButtons = document.querySelectorAll(".like-glyph");

heartButtons.forEach((heartButton) => {
  heartButton.addEventListener("click", (e) => {
    mimicServerCall()
      .then(() => {
        // When the "server" returns a success status:
        switch (heartButton.innerText) {
          case EMPTY_HEART:
            // Change the heart to a full heart
            heartButton.innerText = FULL_HEART;
            // Add the .activated-heart class to make the heart appear red
            heartButton.classList.add("activated-heart");
            break;
          case FULL_HEART:
            // Change the heart to an empty heart
            heartButton.innerText = EMPTY_HEART;
            // Remove the activated-hearted class
            heartButton.classList.remove("activated-heart");
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        // When the "server" returns a failure status:
        // Display the error modal by removing the .hidden class
        errorModal.classList.remove("hidden");

        // Display the server error message in the modal
        document.getElementById("modal-message").innerText = error;

        // Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
        setTimeout(() => {
          errorModal.classList.add("hidden");
        }, 3000);
      });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
