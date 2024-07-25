document.addEventListener("DOMContentLoaded",(e) => {
    async function evaluate(x) {
        console.log = function(){ console.error(Array.from(arguments).join(' ')) }
        (async () => {
            try {
                await eval(x);
            } catch(e) {
                console.error(e);
            }
        });
    }

    // (async() => {
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
        addToOutput("Initialized!\n")
    // });

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