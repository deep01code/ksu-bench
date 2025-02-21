package sa.edu.ksubench.utilities;

/*import com.mustajal.micro.controller.FileController;
import com.mustajal.micro.exception.SMSException;
import com.mustajal.micro.repo.ActorRepository;*/
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;
/*import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.MediaType;*/

/*
import static org.jboss.resteasy.test.TestPortProvider.generateURL;
*/


public class SMS {
    private static final org.apache.logging.log4j.Logger LOGGER = LogManager.getLogger(SMS.class);



/*    public static void send(String to,String msg) throws Exception {
        Environment env= BeanUtil.getBean(Environment.class);

        if(!env.getProperty("spring.profiles.active").equals("prod")){
            // This URL is used for sending messages
            String myURI = "https://api.bulksms.com/v1/messages";

            // change these values to match your own account
            String myUsername = "username";
            String myPassword = "password";

            // the details of the message we want to send
            String myData = "{to: \""+to+"\", body: \""+msg+"\"}";

            // if your message does not contain unicode, the "encoding" is not required:
            // String myData = "{to: \"1111111\", body: \"Hello Mr. Smith!\"}";

            // build the request based on the supplied settings
            URL url = new URL(myURI);
            HttpURLConnection request = (HttpURLConnection) url.openConnection();
            request.setDoOutput(true);

            // supply the credentials
            String authStr = myUsername + ":" + myPassword;
            String authEncoded = Base64.getEncoder().encodeToString(authStr.getBytes());
            request.setRequestProperty("Authorization", "Basic changeITtoYourToken==");

            // we want to use HTTP POST
            request.setRequestMethod("POST");
            request.setRequestProperty( "Content-Type", "application/json");

            // write the data to the request
            OutputStreamWriter out = new OutputStreamWriter(request.getOutputStream());
            out.write(myData);
            out.close();

            // try ... catch to handle errors nicely
            try {
                // make the call to the API
                InputStream response = request.getInputStream();
                BufferedReader in = new BufferedReader(new InputStreamReader(response));
                String replyText;
                while ((replyText = in.readLine()) != null) {
                    System.out.println(replyText);
                }
                in.close();
            } catch (IOException ex) {
                // System.out.println("An error occurred:" + ex.getMessage());
                LOGGER.info(ex.toString());

                BufferedReader in = new BufferedReader(new InputStreamReader(request.getErrorStream()));
                // print the detail that comes with the error
                String replyText;
                while ((replyText = in.readLine()) != null) {
                    System.out.println(replyText);
                }
                in.close();
            }
            request.disconnect();
        }

    }

    public static void send2(String to,String msg){
        Environment env= BeanUtil.getBean(Environment.class);

        if(!env.getProperty("spring.profiles.active").equals("prod")) {
            try{
                MultivaluedMap<String, String> map = new MultivaluedHashMap<String, String>();
                map.add("AppSid","changeItToYourToken");
                map.add("Recipient",to.replace("+",""));
                map.add("Body",msg);
                Client client = ClientBuilder.newClient();
                Response response = client.target("https://api.unifonic.com/rest/Messages/Send")
                        .request(MediaType.APPLICATION_FORM_URLENCODED_TYPE)
                        .post(Entity.entity(map, MediaType.APPLICATION_FORM_URLENCODED_TYPE));

                String data = response.readEntity(String.class);
                LOGGER.info(data);
                //System.err.println(data);
            }catch (Exception e){
                LOGGER.info(e.toString());
            }
        }
        else {
            try {
                send(to,msg);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }*/
}
