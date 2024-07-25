document.querySelector(".down").addEventListener("click",() => {
    document.querySelector(".down").style.opacity = "0";
    document.querySelector(".down").style.cursor = "auto";
    
    scrollTo(0, 1000);
})