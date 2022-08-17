document.onkeydown =function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    //for delete key
    if(charCode==46)
    {
        canvas.remove(canvas.getActiveObject()).requestRenderAll();
    }
    //for escape key
    else if(charCode==27)
    {
        canvas.discardActiveObject().requestRenderAll();
    }
    console.log("code:- "+charCode);
};