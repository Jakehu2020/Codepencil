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
        content.innerHTML+=`<hr>${s.replaceAll("<","&lt;").replaceAll(">","&gt;")}\n`;
        content.scrollTop = content.scrollHeight;
    }
    document.querySelector(".run").addEventListener("click", async (e) => {
        await evaluate(editor.innerText);
    })
    document.querySelector(".stop").addEventListener("click", async (e) => {
        throw "!!!";
    });
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
// (async ()=>{
//     let qs = document.querySelector;
//     const shadow = qs(".webout").attachShadow({ mode: "open" });
//     let content = document.querySelector('div');
//     shadow.appendChild(content)
//     function clean(s){ return s.replaceAll("<","&lt;").replaceAll(">","&gt;")}
//     console.log = (() => { addToOutput(clean(Array.from(arguments).join(' '))) });
//     console.warn = (() => { addToOutput("<span class='warn'>"+clean(Array.from(arguments))+"</span>") });
//     console.error = (() => { addToOutput("<span class='err'>"+clean(Array.from(arguments))+"</span>") });
//     alert = prompt = confirm = console.log; 
//     let qs = document.querySelector;
//     qs(".webout").attachShadow({ mode: "open" }).appendChild(document.createElement("div"));

//     function addToOutput(s) {
//         if(!s || s=="undefined"){ return; }
//         qs(".webout").shadowRoot.qs("div").innerHTML+=`${s}\n`;
//         qs(".webout").shadowRoot.qs("div").scrollTop = qs(".webout").shadowRoot.qs("div").scrollHeight;
//     }
//     qs(".run").addEventListener("click", async (e) => {
//         await evaluate(qs(".code").innerText);
//     });
//     qs(".stop").addEventListener("click", async(e) => {
//         throw "!!!!!!!!";
//     })
      
//     let props = ["constructor","implementation","URL","documentURI","compatMode","characterSet","charset","inputEncoding","contentType","doctype","documentElement","xmlEncoding","xmlVersion","xmlStandalone","domain","referrer","cookie","lastModified","readyState","title","dir","body","head","images","embeds","plugins","links","forms","scripts","currentScript","defaultView","designMode","onreadystatechange","anchors","applets","fgColor","linkColor","vlinkColor","alinkColor","bgColor","all","scrollingElement","onpointerlockchange","onpointerlockerror","hidden","visibilityState","wasDiscarded","prerendering","featurePolicy","webkitVisibilityState","webkitHidden","onbeforecopy","onbeforecut","onbeforepaste","onfreeze","onprerenderingchange","onresume","onsearch","onvisibilitychange","timeline","fullscreenEnabled","fullscreen","onfullscreenchange","onfullscreenerror","webkitIsFullScreen","webkitCurrentFullScreenElement","webkitFullscreenEnabled","webkitFullscreenElement","onwebkitfullscreenchange","onwebkitfullscreenerror","rootElement","pictureInPictureEnabled","onbeforexrselect","onabort","onbeforeinput","onbeforematch","onbeforetoggle","onblur","oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncontentvisibilityautostatechange","oncontextlost","oncontextmenu","oncontextrestored","oncuechange","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","onformdata","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onpause","onplay","onplaying","onprogress","onratechange","onreset","onresize","onscroll","onsecuritypolicyviolation","onseeked","onseeking","onselect","onslotchange","onstalled","onsubmit","onsuspend","ontimeupdate","ontoggle","onvolumechange","onwaiting","onwebkitanimationend","onwebkitanimationiteration","onwebkitanimationstart","onwebkittransitionend","onwheel","onauxclick","ongotpointercapture","onlostpointercapture","onpointerdown","onpointermove","onpointerrawupdate","onpointerup","onpointercancel","onpointerover","onpointerout","onpointerenter","onpointerleave","onselectstart","onselectionchange","onanimationend","onanimationiteration","onanimationstart","ontransitionrun","ontransitionstart","ontransitionend","ontransitioncancel","oncopy","oncut","onpaste","children","firstElementChild","lastElementChild","childElementCount","activeElement","styleSheets","pointerLockElement","fullscreenElement","adoptedStyleSheets","pictureInPictureElement","fonts","adoptNode","append","captureEvents","caretRangeFromPoint","clear","close","createAttribute","createAttributeNS","createCDATASection","createComment","createDocumentFragment","createElement","createElementNS","createEvent","createExpression","createNSResolver","createNodeIterator","createProcessingInstruction","createRange","createTextNode","createTreeWalker","elementFromPoint","elementsFromPoint","evaluate","execCommand","exitFullscreen","exitPictureInPicture","exitPointerLock","getAnimations","getElementById","getElementsByClassName","getElementsByName","getElementsByTagName","getElementsByTagNameNS","getSelection","hasFocus","hasStorageAccess","hasUnpartitionedCookieAccess","importNode","open","prepend","queryCommandEnabled","queryCommandIndeterm","queryCommandState","queryCommandSupported","queryCommandValue","querySelector","querySelectorAll","releaseEvents","replaceChildren","requestStorageAccess","requestStorageAccessFor","startViewTransition","webkitCancelFullScreen","webkitExitFullscreen","write","writeln","onscrollend","constructor","fragmentDirective","browsingTopics","hasPrivateToken","hasRedemptionRecord","nodeType","nodeName","baseURI","isConnected","ownerDocument","parentNode","parentElement","childNodes","firstChild","lastChild","previousSibling","nextSibling","nodeValue","textContent","ELEMENT_NODE","ATTRIBUTE_NODE","TEXT_NODE","CDATA_SECTION_NODE","ENTITY_REFERENCE_NODE","ENTITY_NODE","PROCESSING_INSTRUCTION_NODE","COMMENT_NODE","DOCUMENT_NODE","DOCUMENT_TYPE_NODE","DOCUMENT_FRAGMENT_NODE","NOTATION_NODE","DOCUMENT_POSITION_DISCONNECTED","DOCUMENT_POSITION_PRECEDING","DOCUMENT_POSITION_FOLLOWING","DOCUMENT_POSITION_CONTAINS","DOCUMENT_POSITION_CONTAINED_BY","DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC","appendChild","cloneNode","compareDocumentPosition","contains","getRootNode","hasChildNodes","insertBefore","isDefaultNamespace","isEqualNode","isSameNode","lookupNamespaceURI","lookupPrefix","normalize","removeChild","replaceChild","constructor","addEventListener","dispatchEvent","removeEventListener","constructor","constructor","__defineGetter__","__defineSetter__","hasOwnProperty","__lookupGetter__","__lookupSetter__","isPrototypeOf","propertyIsEnumerable","toString","valueOf","__proto__","toLocaleString"];
//     props.forEach(y => { try {
//         document[y] = undefined;
//     } catch(e){ delete document[y] }});
// })();