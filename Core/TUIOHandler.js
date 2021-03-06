/**
 * Created by alex on 21/01/16.
 */

module.exports = function(game){
    this.markers = [];
    this.game = game;

    this.startRefresh = function(){
        var i;
        for(i = 0; i < this.markers.length;i++)
            this.markers[i].status = "unknown";
    };

    this.clear = function(){
        this.markers = [];
    };

    this.handleMarker = function(marker){
        var found = false;
        var i;
        for(i = 0; i < this.markers.length; i++){
            if(marker.id === this.markers[i].marker.id){
                if(marker.x !== this.markers[i].marker.x || marker.y !== this.markers[i].marker.y || marker.angle !== this.markers[i].marker.angle){
                    this.markers[i].marker.x = marker.x;
                    this.markers[i].marker.y = marker.y;
                    this.markers[i].marker.angle = marker.angle;
                    this.markers[i].marker.positionOk = game.checkPlacement(this.markers[i].marker);
                    this.markers[i].status = "update";
                }
                else this.markers[i].status = "nochange";
                found = true;
                break;
            }
        }
        if(found === false){
            marker.playerId = this.game.getPlayerIdFromMarker(marker.id);
            if(this.game.creating === true || marker.playerId !== null) {
                marker.positionOk = this.game.checkPlacement(marker);
                this.markers.push({"status": "update", "marker": marker});
            }
        }
    };

    this.removeMarker= function(id){
        var i;
        for(i = 0; i < this.markers.length; i++)
            if(this.markers[i].marker.id === id){
                this.markers.splice(i,1);
                break;
            }
    };

    this.getUpdates = function(){
        var updates = [];
        var i;
        for(i = 0; i < this.markers.length; i++)
            if(this.markers[i].status === "update")
                updates.push(this.markers[i].marker);
        return updates;
    };

    this.getRemoves = function(){
        var removes = [];
        var l = this.markers.length;
        var i;
        for(i = 0; i < l; i++)
            if(this.markers[i].status === "unknown"){
                removes.push(this.markers[i].marker.id);
                this.markers.splice(i,1);
                i--;
                l--;
            }
        return removes;
    };

    this.getMarkerFromIdPlayer = function(id){
        var i;
        for(i = 0; i < this.markers.length; i++)
            if(this.markers[i].marker.playerId === id)
                return this.markers[i].marker;
        return null;
    };

    this.getMarkerFromId = function(id){
        var i;
        for(i = 0; i < this.markers.length; i++)
            if(this.markers[i].marker.id === id)
                return this.markers[i].marker;
        return null;
    };
};