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
    {"id": 2,"name":"Simple","height":1080,"width":1920,"enemyZones":[{"x1":0,"y1":200,"x2":800,"y2":400},{"x1":800,"y1":200,"x2":1000,"y2":800},{"x1":1000,"y1":600,"x2":1920,"y2":800}],"enemyStarts":[{"x1":0,"y1":200,"x2":20,"y2":400}],"enemyEnds":[{"x1":1900,"y1":600,"x2":1920,"y2":800}]}

];
