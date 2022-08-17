var tools = document.getElementsByClassName("Add-Tooltip")

for(var i = 0 ; i < tools.length ; i++){
    let showtooltip = function(e){
        let Data = e.target.getAttribute("tooltip-data"),
            posy = e.target.offsetTop,
            posx = e.target.offsetLeft,
            offsetx = parseInt(e.target.getAttribute("off-set-x")),
            offsety = parseInt(e.target.getAttribute("off-set-y"));
            if( offsetx+"" == "NaN" ) offsetx = 0;
            if( offsety+"" == "NaN" ) offsety = 0;
            //console.log("got offset as"+offsetx);
            var tiptext=document.createElement("span");
            tiptext.textContent = Data;
            tiptext.style.position="absolute";
            tiptext.style.left=posx+offsetx-10+"px";
            tiptext.style.top=posy+offsety+35+"px";
            tiptext.classList.add("tooltip");
            document.body.appendChild(tiptext);
    }
    let hidetooltip = function(e){
        console.log(e.target.getAttribute("tooltip"));
        document.getElementsByClassName("tooltip")[0].remove();
    }
    tools[i].addEventListener(
        "mouseenter" , showtooltip
    );
    tools[i].addEventListener(
        "mouseleave" , hidetooltip
    );
}
