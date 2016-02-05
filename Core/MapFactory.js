/**
 * Created by alex on 29/01/16.
 */

module.exports = function(id){

    var i;
    for(i = 0; i < data.length; i++)
        if(data[i].id === id)
            return data[i];
    return null;

};

var data = [
    {"id": 1,"name":"Simple","height":1080,"width":1920,"enemyZones":[{"x1":0,"y1":300,"x2":1920,"y2":700}],"enemyStarts":[{"x1":0,"y1":300,"x2":20,"y2":700}],"enemyEnds":[{"x1":1900,"y1":300,"x2":1920,"y2":700}]},
    {"id": 2,"name":"Simple","height":1080,"width":1920,"enemyZones":[{"x1":0,"y1":210,"x2":820,"y2":400},{"x1":820,"y1":210,"x2":1050,"y2":900},{"x1":1050,"y1":730,"x2":1920,"y2":900}],"enemyStarts":[{"x1":0,"y1":210,"x2":20,"y2":400}],"enemyEnds":[{"x1":1900,"y1":730,"x2":1920,"y2":900}]}

];
