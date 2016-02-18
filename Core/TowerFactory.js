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
    {"type": 1,"name":"Basique","price":50, "radius":50, "reloadtime" : 33, "firespeed": 15, "damage":50,"rangelength": 400,"rangeradius" : 0.3, "damagetype":"singleTarget", "damageradius":0 },
    {"type": 2,"name":"Améliorée","price":100, "radius":50, "reloadtime" : 15, "firespeed": 15, "damage":75,"rangelength": 600,"rangeradius" : 0.3, "damagetype":"singleTarget", "damageradius":0 }
];