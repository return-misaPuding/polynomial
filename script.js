setTimeout(function(){rd = document.getElementById("rden");},1500)
function reduceButton(obj) {
    rfrac = reduceFraction(document.getElementById("inputTerm").value);
    document.getElementById("rnumer").innerText = rfrac["fnumer"];
    if (rfrac["fden"] && rfrac["fden"] != "") {
        rd.style.display = "inline";
        rd.innerText = rfrac["fden"];
    } else {rd.style.display = "none"}
}
function computeButton() {
    srcdef = document.getElementById("inputDefs").value;
    vars = srcdef.split(",");
    defsObj = {}
    for (i=0; i < vars.length; i++) {
        bleh = vars[i].split("=");
        defsObj[bleh[0]] = bleh[1];
    }
    console.log(defsObj);
    rfrac = reduceFraction(document.getElementById("inputTerm").value);
    res = compute(rfrac,defsObj);
    rd.style.display = "none"
    document.getElementById("rnumer").innerText = res
}