function analyzeCode() {
    const fileInput = document.getElementById('fileInput');
    const codeLinesSpan = document.getElementById('codeLines');
    const commentLinesSpan = document.getElementById('commentLines');
    const totalLinesSpan = document.getElementById('totalLines');
    const emptyLinesSpan = document.getElementById('emptyLines');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const fileContent = event.target.result;
        const lines = fileContent.split('\n');

        let codeLines = 0;
        let commentLines = 0;
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

        totalLinesSpan.textContent = lines.length;
        emptyLinesSpan.textContent = emptyLines;
        codeLinesSpan.textContent = codeLines;
        commentLinesSpan.textContent = commentLines;
    };

    reader.readAsText(file);
}
