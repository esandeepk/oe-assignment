const { assert } = require('chai');
const { estimateJavaScriptCode } = require('../src/main'); // Import the estimateJavaScriptCode function

describe('estimateCodeContent function', function () {
  it('should correctly estimate the sample JavaScript code content', function () {
    const sampleCode = `// some function code
            /** comment line 1
            comment line 2
            comment line 3
            **/

            function foo(a, b) {
                let c = a + b; // not a comment
                return c;
            }`;

    const analysisResult = estimateJavaScriptCode(sampleCode);

    assert.strictEqual(analysisResult.codeLines, 4);
    assert.strictEqual(analysisResult.commentLines, 5);
    assert.strictEqual(analysisResult.totalLines, 10);
    assert.strictEqual(analysisResult.emptyLines, 1);
  });
});
