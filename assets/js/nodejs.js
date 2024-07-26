document.addEventListener("DOMContentLoaded",(e) => {

    (async() => {
        function saveCaretPosition(context) {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(context);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            return preCaretRange.toString().length;
        }
        
        function restoreCaretPosition(context, pos) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.setStart(context, 0);
            range.collapse(true);
        
            let nodeStack = [context], node, charCount = 0, foundStart = false, stop = false;
        
            while (!stop && (node = nodeStack.pop())) {
                if (node.nodeType === 3) {
                    const nextCharCount = charCount + node.length;
                    if (!foundStart && pos <= nextCharCount) {
                        range.setStart(node, pos - charCount);
                        range.setEnd(node, pos - charCount);
                        stop = true;
                    }
                    charCount = nextCharCount;
                } else {
                    let i = node.childNodes.length;
                    while (i--) {
                        nodeStack.push(node.childNodes[i]);
                    }
                }
            }
        
            selection.removeAllRanges();
            selection.addRange(range);
        }

        let webout = document.querySelector(".webout");
        const editor = document.querySelector(".code");

        let shadow = webout.attachShadow({ mode: "open" });
        let content = document.createElement("div");
        shadow.appendChild(content);

        function addToOutput(s) {
        if(!s || s=="undefined"){ return; }
            content.scrollTop = content.scrollHeight;
        }
        document.querySelector(".run").addEventListener("click", async (e) => {
            content.innerHTML+=`<hr>${s}\n`;
            await evaluate(editor.innerText);
        })
        document.querySelector(".stop").addEventListener("click", async (e) => {
            throw "!!!";
        });
        function clean(s){ return s.replaceAll("<","&lt;").replaceAll(">","&gt;") }
        console.log = (function(){ addToOutput(clean(Array.from(arguments).join(' '))) });
        console.warn = (function(){ addToOutput("<span class='warn'>"+clean(Array.from(arguments))+"</span>") });
        console.error = (function(){ addToOutput("<span class='err'>"+clean(Array.from(arguments))+"</span>") });
        alert = prompt = confirm = console.log; 
        addToOutput("Initialized!\n");

        editor.addEventListener('input', (e) => {
            const caretPosition = saveCaretPosition(editor);
            let text = editor.innerText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            text = text.replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="js-string">$1</span>');
            text = text.replace(/\b(const|let|var|function|if|else|for|while|return|true|false|null|undefined)\b/g, '<span class="js-keyword">$1</span>');
            text = text.replace(/\b(\d+)\b/g, '<span class="js-number">$1</span>');
            text = text.replace(/(\/\/.*?$|\/\*[\s\S]*?\*\/)/gm, '<span class="js-comment">$1</span>');
            editor.innerHTML = text;
            restoreCaretPosition(editor, caretPosition);
        });
    })();

    async function evaluate(x) {
        await (async () => {
            try {
                await eval(x);
            } catch(e) {
                console.error(e);
            }
        })();
    }
});