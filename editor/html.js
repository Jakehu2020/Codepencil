let webout = document.querySelector(".webout");
let editor1 = document.querySelector(".e1");
let editor2 = document.querySelector(".e2");
let editor3 = document.querySelector(".e3");
let sizes = [112.17,112.17,112.17]

function sth(ele){
  return Number(String(ele.style.height).slice(0, -2))==0?144:Number(String(ele.style.height).slice(0, -2));
}

function onresize(e){
  console.log(336.51-sth(editor3))
  editor1.style.maxHeight = 336.51-sth(editor3);
  editor2.style.height = sth(editor2) + sizes[0] - sth(editor1) + "px";
  sizes[1] = sth(editor2);
  sizes[0] = sth(editor1);
};
new ResizeObserver(onresize).observe(editor1);