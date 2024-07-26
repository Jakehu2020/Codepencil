document.addEventListener("DOMContentLoaded",(e) => {

    (async() => {
        let webout = document.querySelector(".webout");
        const editor = document.querySelector(".code");

        let shadow = webout.attachShadow({ mode: "open" });
        let content = document.createElement("div");
        shadow.appendChild(content);

        function addToOutput(s) {
        if(!s || s=="undefined"){ return; }
            content.innerHTML+=`<hr>${s}\n`;
            content.scrollTop = content.scrollHeight;
        }
        document.querySelector(".run").addEventListener("click", async (e) => {
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
            let text = editor.innerText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            text = text.replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="js-string">$1</span>');
            text = text.replace(/\b(const|let|var|function|if|else|for|while|return|true|false|null|undefined)\b/, '<span class="js-keyword">$1</span>');
            text = text.replace(/\b(\d+)\b/g, '<span class="js-number">$1</span>');
            text = text.replace(/(\/\/.*?$|\/\*[\s\S]*?\*\/)/gm, '<span class="js-comment">$1</span>');
        
            editor.innerHTML = text;
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