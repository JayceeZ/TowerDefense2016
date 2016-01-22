/**
 * Created by alex on 22/01/16.
 */

module.exports = function(type){

    var i;
    for(i = 0; i < data.length; i++)
        if(data[i].type === type)
            return data[i];
    return null;

};

var data = [
    {"type": 1,"name":"basique", "radius":30, "reloadtime" : 200, "firespeed": 33, "damage":50, "damagetype":"singleTarget", "damageradius":0 }

];