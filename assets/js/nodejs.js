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

async function eval(x) {
    delete document;
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