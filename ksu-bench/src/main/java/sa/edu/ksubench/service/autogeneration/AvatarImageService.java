package sa.edu.ksubench.service.autogeneration;


 import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@Order(Ordered.LOWEST_PRECEDENCE)
public class AvatarImageService {


/*
    AvatarImageService(){
        Thread thread=new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(4000);
                    System.err.println("---- checkIfAvatarImageExist image -----");
                    checkIfAvatarImageExist();

                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        thread.start();
    }
*/

/*
    public void checkIfAvatarImageExist(){
        Environment env= BeanUtil.getBean(Environment.class);
        String fileDir=env.getProperty("file.upload-dir");

        File f = new File(fileDir+"/avatar.png");
        if(!f.exists()) {
            System.err.println("---- Copy Avatar Image -----");

            FileInputStream avatarInputStream = null;
            try {
               // avatarInputStream = new FileInputStream(new File(getClass().getResource("/avatar.png").getFile()));
                avatarInputStream = new FileInputStream(new File("/home/ubuntu/workspace/befit-phase2/micro-template/src/main/resources/avatar.png"));

                Files.copy(avatarInputStream, Paths.get(fileDir+"/avatar.png"), StandardCopyOption.REPLACE_EXISTING);
            } catch (Exception e) {

                e.printStackTrace();

            }
        }
        else {
            System.err.println("---- Avatar Image Exist  -----");

        }
    }
*/
}
