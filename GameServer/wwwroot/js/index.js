document.addEventListener('DOMContentLoaded', function () {
    var playerNameInput = document.getElementById('playerName');
    if (playerNameInput) {
        playerNameInput.addEventListener('input', validateInput);
    }
});

function validateInput(event) {
    var inputElement = event.target;
    var allowedCharactersRegex = /^[a-zA-Z0-9_.\-,;]+$/;
    var enteredValue = inputElement.value;

    if (!allowedCharactersRegex.test(enteredValue)) {
        inputElement.value = enteredValue.slice(0, -1);
    }
}