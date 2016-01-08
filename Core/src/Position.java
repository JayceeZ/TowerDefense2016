/**
 * Created by alex on 24/12/15.
 */
public class Position {

    private double x;
    private double y;

    public Position(double x, double y){
        this.x = x;
        this.y = y;
    }

    public double distanceFrom(Position pos){
        return Math.sqrt(Math.pow(this.x-pos.getX(),2)+Math.pow(this.y-pos.getY(),2));
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }
}
