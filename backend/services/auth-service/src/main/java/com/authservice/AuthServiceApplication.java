package com.authservice;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication
public class AuthServiceApplication {
    public static void main(String[] args) {
        // Load .env file from backend directory
        loadEnvFile();
        
        SpringApplication.run(AuthServiceApplication.class, args);
    }
    
    private static void loadEnvFile() {
        try {
            // Try multiple locations for .env file
            Path currentPath = Paths.get("").toAbsolutePath();
            File envFile = null;
            
            // Try 1: backend/.env (from services/auth-service)
            if (currentPath.toString().contains("services")) {
                Path backendPath = currentPath.getParent().getParent();
                envFile = backendPath.resolve(".env").toFile();
            }
            
            // Try 2: backend/.env (from backend directory)
            if (envFile == null || !envFile.exists()) {
                Path backendPath = currentPath;
                if (currentPath.getFileName().toString().equals("backend")) {
                    envFile = backendPath.resolve(".env").toFile();
                }
            }
            
            // Try 3: root/.env (from project root)
            if (envFile == null || !envFile.exists()) {
                Path rootPath = currentPath;
                while (rootPath != null && !rootPath.getFileName().toString().equals("backend")) {
                    rootPath = rootPath.getParent();
                }
                if (rootPath != null) {
                    envFile = rootPath.resolve(".env").toFile();
                }
            }
            
            if (envFile != null && envFile.exists()) {
                Dotenv dotenv = Dotenv.configure()
                        .directory(envFile.getParent())
                        .filename(".env")
                        .ignoreIfMissing()
                        .load();
                
                // Set system properties from .env file
                int loadedCount = 0;
                for (var entry : dotenv.entries()) {
                    String key = entry.getKey();
                    String value = entry.getValue();
                    if (value != null && !value.isEmpty() && !value.equals("your_mysql_password_here")) {
                        System.setProperty(key, value);
                        loadedCount++;
                        // Debug: show loaded variables (mask password)
                        if (key.contains("PASSWORD")) {
                            System.out.println("  Loaded: " + key + " = ***" + (value.length() > 0 ? "***" : ""));
                        } else {
                            System.out.println("  Loaded: " + key + " = " + value);
                        }
                    }
                }
                System.out.println("✓ Loaded .env file from: " + envFile.getAbsolutePath() + " (" + loadedCount + " variables)");
            } else {
                System.out.println("⚠ Warning: .env file not found. Using default values or system environment variables.");
                System.out.println("  Please create .env file in backend/ directory from env.example");
            }
        } catch (Exception e) {
            System.out.println("⚠ Warning: Could not load .env file: " + e.getMessage());
            System.out.println("  Using default values or system environment variables.");
        }
    }
}

