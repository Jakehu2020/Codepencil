let webout = document.querySelector(".webout");
let editor1 = document.querySelector(".e1");
let editor2 = document.querySelector(".e2");
let editor3 = document.querySelector(".e3");
let sizes = [171, 171, 171]

function sth(ele) {
    return Number(String(ele.style.height).slice(0, -2)) == 0 ? 110 : Number(String(ele.style.height).slice(0, -2));
}
function setAll(n) {
    // window["editor"+(n+1)] = sizes[n] + "px";
    [editor1.style.height, editor2.style.height, editor3.style.height] = sizes.map(x => x + "px");
}
setAll();
function onresize(n) {
    if (n == 1) {
        return () => {
            editor1.style.maxHeight = 513 - sizes[2] - 29 + "px";
            // sizes[1] = (sth(editor2) + sizes[1] - sth(editor1));
            sizes[1] = 513 - sth(editor1) - sizes[2];
            sizes[0] = sth(editor1);
            setAll();
        }
    } else if (n == 2) {
        return () => {
            editor2.style.maxHeight = 513 - sizes[0] - 29 + "px";
            // editor3.style.maxHeight = 330-sth(editor1)-sth(editor2)+"px";
            // editor3.style.height = (sth(editor3) + sizes[1] - sth(editor2) - sth(editor1)) + "px";
            sizes[2] = 513 - sth(editor2) - sizes[0];
            sizes[1] = sth(editor2);
            setAll();
        }
    }
};
new ResizeObserver(onresize(1)).observe(editor1);
new ResizeObserver(onresize(2)).observe(editor2);

// Let us summon the Shadow DOM!
let shadow = webout.attachShadow({ mode: "open" });
let content;
function run() {
    stop();
    content = document.createElement("div");
    content.innerHTML = document.querySelector(".html .code").innerText;

    // const css = document.createElement("style");
    // css.innerText = document.querySelector(".css .code");
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(document.querySelector(".css .code").innerText);

    const js = document.createElement("script");
    js.innerText = document.querySelector(".js .code").innerText.replaceAll("document.body", "shadow").replaceAll("document", "shadow");
    js.onerror = (e) => {
        console.log(e);
    }

    shadow.appendChild(content);
    shadow.adoptedStyleSheets = [sheet];
    shadow.appendChild(js);
}
function stop() {
    if (content) {
        content.remove();
    }
}
document.querySelector(".run").addEventListener("click", run);
document.querySelector(".stop").addEventListener("click", stop);

function applySyntaxHighlighting(text) {
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Escape HTML

    // Replace tags
    text = text.replace(/(&lt;\/?[\w\s="'-]+&gt;)/g, (match) => {
        // Replace attributes and values within the tag
        match = match.replace(/("[^"]*")/, '<span class="value">$1</span>');
        match = match.replace(/(\b[a-zA-Z-]+\b)(=)/, '<span class="attribute">$1</span>$2');
        return '<span class="tag">' + match + '</span>';
    });

    return text;
}

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

editor1.addEventListener('input', (e) => {
    const editor = e.target;
    const caretPosition = saveCaretPosition(editor);
    const content = editor.innerText;
    editor.innerHTML = applySyntaxHighlighting(content);
    restoreCaretPosition(editor, caretPosition);
});

function applyCssSyntaxHighlighting(text) {
    // Escape HTML
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    text = text.replace(/([^{\s][^{]*)(?=\s*\{)/g, '<span class="css-selector">$1</span>');
    text = text.replace(/([a-zA-Z-]+)(\s*:)/g, '<span class="css-property">$1</span>$2');
    text = text.replace(/:\s*([^;]*)(;|$)/g, ': <span class="css-value">$1</span>$2');

    return text;
}
function applyJsSyntaxHighlighting(text) {
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    text = text.replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="js-string">$1</span>');
    text = text.replace(/\b(const|let|var|function|if|else|for|while|return|true|false|null|undefined)\b/, '<span class="js-keyword">$1</span>');
    text = text.replace(/\b(\d+)\b/g, '<span class="js-number">$1</span>');
    text = text.replace(/(\/\/.*?$|\/\*[\s\S]*?\*\/)/gm, '<span class="js-comment">$1</span>');

    return text;
}

function highlightCssEditorContent(editor) {
    let pos = saveCaretPosition(editor);
    editor.innerHTML = applyCssSyntaxHighlighting(editor.innerText);
    restoreCaretPosition(editor, pos);
}

function highlightJsEditorContent(editor) {
    const caretPosition = saveCaretPosition(editor);
    const content = editor.innerText;
    editor.innerHTML = applyJsSyntaxHighlighting(content);
    restoreCaretPosition(editor, caretPosition);
}

editor2.addEventListener('input', () => {
    highlightCssEditorContent(editor2);
});

editor3.addEventListener('input', () => {
    highlightJsEditorContent(editor3);
});