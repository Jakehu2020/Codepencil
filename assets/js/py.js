let webout = document.querySelector(".webout");
const editor = document.querySelector(".code");

let shadow = webout.attachShadow({ mode: "open" });
let content = document.createElement("div");
shadow.appendChild(content);
function run() {
//   
}
function stop() {
  
}
//
(async () => {
  console.log("1");
  content.innerText = 'Initializing...\n'

  window.pyodide = await loadPyodide({stdout: addToOutput, stderr: addToOutput})
  
        content.innerText += 'Ready!\n' 
})()


function addToOutput(s) {
  if(!s || s=="undefined"){ return; }
  content.innerHTML+=`<hr>${s.replaceAll("<","&lt;").replaceAll(">","&gt;")}\n`;
  content.scrollTop = content.scrollHeight;
}

async function evaluatePython(x) {
  await pyodide.loadPackagesFromImports(x, addToOutput, addToOutput)
  try {
    let result = await pyodide.runPythonAsync(x)
    addToOutput(`${result}`)
  }
  catch (e) {
    addToOutput(`${e}`)
  }
}
// 
document.querySelector(".run").addEventListener("click", async (e) => {
  await evaluatePython(editor.innerText);
})

// ^.*?(apple|banana|cherry).*?((?!\1)(?1)).*?$

editor.addEventListener('input', (e) => {
  const caretPosition = saveCaretPosition(editor);
  let text = editor.innerText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  text = text.replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="py-string">$1</span>');
  text = text.replace(/\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g, '<span class="py-keyword">$1</span>');
  text = text.replace(/\b(\d+)\b/g, '<span class="py-number">$1</span>');
  text = text.replace(/#(.*)$/g, '<span class="py-comment">#$1</span>');
  editor.innerHTML = text;
  restoreCaretPosition(editor, caretPosition);
});