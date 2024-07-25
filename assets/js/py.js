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
  content.innerText += `${s}\n`
  content.scrollTop = content.scrollHeight
}

async function evaluatePython(x) {
  console.log("start")
  await pyodide.loadPackagesFromImports(x, addToOutput, addToOutput)
  console.log("start2")
  try {
    let result = await pyodide.runPythonAsync(x)
    console.log("start3")
    addToOutput(`${result}`)
  }
  catch (e) {
    addToOutput(`${e}`)
  }
}
// 
document.querySelector(".run", async (e) => {
 content.innerHTML+="<hr>";
 await evaluatePython(editor.innerText);
})