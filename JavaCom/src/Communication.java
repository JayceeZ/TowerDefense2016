
import java.net.MalformedURLException;

import org.json.JSONObject;

import io.socket.IOAcknowledge;
import io.socket.IOCallback;
import io.socket.SocketIO;
import io.socket.SocketIOException;

public class Communication {
	
	private static SocketIO socket;
	private static String url;
	
	public Communication(String url){
		this.url = url;
	}
	
	public void initialize() {
		try {
			socket = new SocketIO(url);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		socket.connect(this.ioCallback);
	}
	
	public void sendContent(String event, Object content){
		socket.emit(event, content);
	}
	
	public boolean isConnected(){
		return socket.isConnected();
	}
	
	final IOCallback ioCallback = new IOCallback() {

		@Override
		public void on(String arg0, IOAcknowledge arg1, Object... arg2) {
			System.out.println("Message serveur : "+arg0);
		}

		@Override
		public void onConnect() {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void onDisconnect() {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void onError(SocketIOException arg0) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void onMessage(String arg0, IOAcknowledge arg1) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void onMessage(JSONObject arg0, IOAcknowledge arg1) {
			// TODO Auto-generated method stub
			
		}
		
	};

}
