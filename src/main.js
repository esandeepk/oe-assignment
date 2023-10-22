function estimateCode() {
    // Reset the analysis result values to zero
    document.getElementById('codeLines').textContent = '0';
    document.getElementById('commentLines').textContent = '0';
    document.getElementById('totalLines').textContent = '0';
    document.getElementById('emptyLines').textContent = '0';
  
    const fileInput = document.getElementById('fileInput');
    const languageSelect = document.getElementById('languageSelect');
  
    const selectedLanguage = languageSelect.value;
    const file = fileInput.files[0];
  
    // Check if a file has been selected
    if (!file) {
      // Display the "Please select a file" message in red
      const errorMessage = document.getElementById('errorMessage');
      errorMessage.style.color = 'red';
      errorMessage.textContent = 'Please select a file';
      errorMessage.style.display = 'block';
  
      // Automatically hide the error message after 5 seconds
      setTimeout(function () {
        errorMessage.style.display = 'none';
      }, 5000); // 5 seconds in milliseconds
      return;
    }
  
    // Hide any previous error messages
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'none';
  
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const fileContent = event.target.result;
  
      let analysisResult;
  
      switch (selectedLanguage) {
        case 'javascript':
          analysisResult = estimateJavaScriptCode(fileContent);
          break;
  
        default:
          // Display an error message in red next to the "Estimate Code" button
          errorMessage.style.color = 'red';
          errorMessage.textContent = 'Language is not supported yet.';
          errorMessage.style.display = 'block';
  
          // Automatically hide the error message after 10 seconds
          setTimeout(function () {
            errorMessage.style.display = 'none';
          }, 10000); // 10 seconds in milliseconds
          return;
      }
  
      document.getElementById('codeLines').textContent = analysisResult.codeLines;
      document.getElementById('commentLines').textContent = analysisResult.commentLines;
      document.getElementById('totalLines').textContent = analysisResult.totalLines;
      document.getElementById('emptyLines').textContent = analysisResult.emptyLines;
    };
  
    reader.readAsText(file);
  }
  
  
  
  function estimateJavaScriptCode(codeContent) {
    const lines = codeContent.split('\n');
    let codeLines = 0;
    let commentLines = 0;
    let totalLines = lines.length;
    let emptyLines = 0;
  
    let inMultiLineComment = false;
  
    lines.forEach((line) => {
      const trimmedLine = line.trim();
  
      if (trimmedLine === '') {
        emptyLines++;
      } else if (inMultiLineComment) {
        commentLines++;
        if (trimmedLine.endsWith('*/')) {
          inMultiLineComment = false;
        }
      } else if (trimmedLine.startsWith('/*')) {
        commentLines++;
        inMultiLineComment = !trimmedLine.endsWith('*/');
      } else if (trimmedLine.startsWith('//')) {
        commentLines++;
      } else {
        codeLines++;
      }
    });
  
    return {
      codeLines,
      commentLines,
      totalLines,
      emptyLines,
    };
  }
  
  
  // Expose the estimateJavaScriptCode function for testing
  module.exports = { estimateJavaScriptCode };