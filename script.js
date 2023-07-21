const editor = document.getElementById('editor');
const fontSelect = document.getElementById('fontSelect');
const fontSizeInput = document.getElementById('fontSizeInput');

function execCommand(command, value = null) {
  if (command === 'fontSize' || command === 'fontName') {
    document.execCommand('styleWithCSS', false, true); // Enable applying styles with CSS
    document.execCommand(command, false, value);
    document.execCommand('styleWithCSS', false, false); // Disable applying styles with CSS
  } else {
    document.execCommand(command, false, value);
  }
}

// Add event listeners to editor for handling text changes
editor.addEventListener('input', handleEditorInput);

function handleEditorInput() {
  // You can perform additional actions here, like saving the content to a database or handling real-time collaboration.
}

// Additional function to update the font select dropdown to match the current selection
editor.addEventListener('input', updateFontSelect);

function updateFontSelect() {
  const selectedFont = document.queryCommandValue('fontName');
  fontSelect.value = selectedFont;
}

// Additional function to update the font size input to match the current selection
editor.addEventListener('input', updateFontSizeInput);

function updateFontSizeInput() {
  const selectedFontSize = document.queryCommandValue('fontSize');
  fontSizeInput.value = selectedFontSize;
}

// Add event listener for handling hotkeys
document.addEventListener('keydown', handleHotkeys);

function handleHotkeys(event) {
  if (event.ctrlKey || event.metaKey) {
    switch (event.key.toLowerCase()) {
      case 'b':
        execCommand('bold');
        break;
      case 'i':
        execCommand('italic');
        break;
      case 'u':
        execCommand('underline');
        break;
      case 'z':
        execCommand('undo');
        break;
      case 'y':
        execCommand('redo');
        break;
      case 'arrowup':
      case 'arrowdown':
        event.preventDefault(); // Prevent scrolling
        break;
      case ',':
        execCommand('fontSize', parseInt(fontSizeInput.value) - 1);
        break;
      case '.':
        execCommand('fontSize', parseInt(fontSizeInput.value) + 1);
        break;
      case 'l':
        if (event.shiftKey) execCommand('justifyLeft');
        break;
      case 'r':
        if (event.shiftKey) execCommand('justifyRight');
        break;
      case 'e':
        if (event.shiftKey) execCommand('justifyCenter');
        break;
      default:
        break;
    }
  }
}
