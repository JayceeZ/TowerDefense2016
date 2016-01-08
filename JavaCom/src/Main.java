
public class Main {
	
	public static String URL = "http://192.168.1.18:8080";

	public static void main(String[] args) {

		Communication com = new Communication(URL);
		com.initialize();
		com.sendContent("log","ZBRA");
	}

}
