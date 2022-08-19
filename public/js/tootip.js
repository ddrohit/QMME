let tools = document.getElementsByClassName("Add-Tooltip")

const removealltooltips = ()=>{
    let alltooltips = document.getElementsByClassName("tooltip")
    for(let tooltip of alltooltips)
        tooltip.remove();
}

for(let tool of tools){
    let showtooltip = function(e){
        removealltooltips();
        let Data = e.target.getAttribute("tooltip-data"),
            posy = e.target.offsetTop,
            posx = e.target.offsetLeft,
            offsetx = parseInt(e.target.getAttribute("off-set-x")),
            offsety = parseInt(e.target.getAttribute("off-set-y"));
            if( offsetx+"" == "NaN" ) offsetx = 0;
            if( offsety+"" == "NaN" ) offsety = 0;
            let tiptext=document.createElement("span");
            tiptext.textContent = Data;
            tiptext.style.position="absolute";
            tiptext.style.left=posx+offsetx-10+"px";
            tiptext.style.top=posy+offsety+35+"px";
            tiptext.classList.add("tooltip");
            document.body.appendChild(tiptext);
            setTimeout(() => {
                hidetooltip();
            }, 1000);
    }
    let hidetooltip = function(){
        const alltooltips = document.getElementsByClassName("tooltip");
        if(alltooltips.length > 0)
            alltooltips[0].remove();
    }
    tool.addEventListener(
        "mouseenter" , showtooltip
    );
}
