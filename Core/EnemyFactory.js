/**
 * Created by alex on 28/01/16.
 */

module.exports = function(type){

    var i;
    for(i = 0; i < data.length; i++)
        if(data[i].type === type)
            return data[i];
    return null;

};

var data = [
    {"type": 1,"hp":100,"gain":25, "damage":1, "vitesse" : 5}

];