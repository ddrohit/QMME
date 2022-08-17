class Algorithm{
    cw = 0
    ch = 0
    fabcanvas = null 
    constructor(canvaswidth,canvasheight,fabcanvas) {
       this.cw = canvaswidth;
       this.ch = canvasheight;
       this.fabcanvas = fabcanvas; 
    }

    
    //gets the canvas where the data is present.
    getboundaries(){
        let mycanvas = this.fabcanvas;
        let ch =this.ch, cw = this.cw;
        let point1 = {x:0,y:0}, point2 = {x:0,y:0}, point3 = {x:0,y:0}, point4 = {x:0,y:0};
        let image =[];
        var i,j;
        for( i=0 ;i < cw ; i++)
        {
            image.push([])
            for( j=0; j < ch ; j++ )
                image[i].push([0,0,0,0]);
        }
        let mycontent = mycanvas.getContext("2d");
        let Data = mycontent.getImageData(0,0,cw,ch), length =Data.data.length;
        console.log(Data)
        let x=0,y=0;
        for( i = 0 ; i < length ; i+=4 ){
    
            image[x][y][0]=Data.data[i];
            image[x][y][1]=Data.data[i+1];
            image[x][y][2]=Data.data[i+2],
            image[x][y][3]=Data.data[i+3];
            x++;
            if( x == cw ) { y++; x=0; }
    
        }
        //form left to right and top to bottom gets starting height;
        toptobottom:
        for( y = 0 ; y < ch ; y++){
            for( x = 0 ; x < cw ; x++ )
                if( image[x][y][3] != 0 ){
                 point1.y = y;
                 break toptobottom;
                }
        }
        //form top to bottom and left to right gets starting width;
        lefttoright:
        for( x = 0 ; x < cw ; x++ ){
            for( y = 0 ; y < ch ; y++ ){
                if( image[x][y][3] != 0 ){
                     point1.x = x;
                     break lefttoright;
                }
            }
        }
    
        righttoleft:
        for( y = ch-1 ; y >= 0 ; y--){
            for( x = 0 ; x < cw ; x++ )
                if( image[x][y][3] != 0 ){
                 point4.y = y;
                 break righttoleft;
                }
        }
    
        bottomtotop:
        for( x = cw-1 ; x >= 0 ; x-- ){
            for(y = ch-1 ; y >= 0  ; y-- ){
                if( image[x][y][3] != 0 ){
                     point4.x = x;
                     break bottomtotop;
                }
            }
        }
        var width = point4.x -point1.x,height = point4.y - point1.y;
        console.log({point1:point1,point4:point4,width:width,height:height})
        return ({point1:point1,point4:point4,width:width,height:height})
    }
    getlatestboundaries(){
        return ({point1:{x:300,y:250},point4:{x:400,y:350},width:100,height:100})
    }
    //get the nearest intersection
    getnearestjoint(){
        //Getting all the objecs in the canvas.
        let objs = this.fabcanvas.getObjects();
        let activeobj = this.fabcanvas.getActiveObject();
        objs.forEach(obj => {
            if(obj != activeobj)
            {

                if( obj.left + 10 > activeobj.left && obj.left - 10 < activeobj.left){
                    activeobj.left = obj.left;
                    console.log("left")
                }
                 console.log("left and right");
                 this.fabcanvas.renderAll(); 
            }
        });
    }
}