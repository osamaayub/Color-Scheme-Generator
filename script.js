
// Target Elements
const displayColorContainers = document.querySelectorAll('.color-display')
const displayHexColorContainers = document.querySelectorAll('.hex-display')
const colorInput = document.getElementById('color-input')
const colorSchemeInput = document.getElementById('color-scheme')
const getColorSchemeBtn = document.getElementById('get-color-scheme')

const copyMessage = document.querySelector('.message')

// Initialisations
let currentScheme
let currentColor

// Event Listeners
colorInput.addEventListener('change', () => currentColor = (colorInput.value).slice(1))

colorSchemeInput.addEventListener('change', () => currentScheme = colorSchemeInput.value)


/* Fetch color scheme
Base URL: https://www.thecolorapi.com/
Endpoints: /scheme
Query Strings Example: hex=0047AB&format=html&mode=analogic&count=6 */

getColorSchemeBtn.addEventListener('click', function () {
  fetch(`https://www.thecolorapi.com/scheme?hex=${currentColor}&mode=${currentScheme}&count=5`)
    .then(response => response.json())
    .then(data => {
      copyMessage.style.display = 'initial'
      for (let i = 0; i < 5; i++) {
        let currentSubColor = data.colors[i].hex.value

        displayColorContainers[i].style.backgroundColor = currentSubColor
        displayHexColorContainers[i].textContent = currentSubColor

        // Copy to clipboard feature

        displayColorContainers[i].addEventListener('click', function () {
          navigator.clipboard.writeText(currentSubColor).then(function () {
            copyMessage.textContent = `${currentSubColor} copied to clipboard`
          });
        })

        displayHexColorContainers[i].addEventListener('click', function () {
          navigator.clipboard.writeText(currentSubColor).then(function () {
            copyMessage.textContent = `${currentSubColor} copied to clipboard`
          });
        })
      }
    })
})
