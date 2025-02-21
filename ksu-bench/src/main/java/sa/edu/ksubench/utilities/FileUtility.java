package sa.edu.ksubench.utilities;

import sa.edu.ksubench.model.core.Run;

import java.io.File;
import java.io.BufferedWriter;
 import java.io.FileWriter;
import java.io.IOException;

public class FileUtility {
    public static String saveToFile(StringBuilder output, String filename, String directory) {
        // Ensure the directory exists
        File dir = new File(directory);
        if (!dir.exists() && !dir.mkdirs()) {
            System.err.println("Failed to create directory: " + directory);
            return null;
        }

        // Create the file object
        File file = new File(dir, filename);

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            writer.write(output.toString());
            System.out.println("File saved: " + file.getAbsolutePath());
            return file.getAbsolutePath(); // Return the full file path
        } catch (IOException e) {
            System.err.println("Error saving file: " + e.getMessage());
            return null;
        }
    }

    public static String saveToFile(StringBuilder output, Run run) {
        // Ensure the directory exists
        String directory="/temp/".concat(run.getProject().getId().toString()).concat("/").concat(run.getId().toString());

        File dir = new File(directory);
        if (!dir.exists() && !dir.mkdirs()) {
            System.err.println("Failed to create directory: " + directory);
            return null;
        }

        // Create the file object
        File file = new File(dir, DateTimeUtility.getCurrentDateTime().concat(".txt"));

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            writer.write(output.toString());
            System.out.println("File saved: " + file.getAbsolutePath());
            return file.getAbsolutePath(); // Return the full file path
        } catch (IOException e) {
            System.err.println("Error saving file: " + e.getMessage());
            return null;
        }
    }

}
