# My Spring Boot Application

This is a Spring Boot application that uses Java 11 and Spring Boot version 2.7.18. Follow the instructions below to set up and run the application locally.

## Prerequisites

Make sure you have the following installed:

- Java 11 (or higher)
- [Maven](https://maven.apache.org/) (for building the project)

You can check if you have Java 11 and Maven installed by running the following commands:

```bash
java -version
mvn -v
```

## Troubleshooting
If you encounter issues with dependencies or the build process, try clearing the local Maven repository and rebuilding:
mvn clean install -U

If you face issues related to Java version, ensure that the project SDK in IntelliJ is set to Java 11.

## Running the Application with IntelliJ IDEA
If you prefer to run the application directly from IntelliJ IDEA, follow these steps:
Open the Project: Open your Spring Boot project in IntelliJ IDEA.

Ensure Java 11 is Configured:
In IntelliJ, go to File > Project Structure > Project.
Ensure the Project SDK is set to Java 11 (or a compatible version).
Run the Application:

Locate the Application class (the one with the @SpringBootApplication annotation).
Right-click on the file and select Run 'Application' (or use the play button in the top-right corner of IntelliJ).
Alternatively, you can create a Run Configuration:

Go to Run > Edit Configurations.
Click the "+" button and select Spring Boot.
Select the main class (annotated with @SpringBootApplication).
Click OK to save and run the configuration.

### Breakdown:
1. **Prerequisites**: Specifies the required versions of Java (11) and Maven.
2. **Running the Application**:
    - Explains how to run the app using Maven (`mvn spring-boot:run`).
    - Provides detailed instructions on how to run the app using IntelliJ IDEA.
3. **Building the Application**: Instructions for building the project into a JAR file for production use.
4. **Troubleshooting**: Offers solutions for common issues with dependencies and Java version conflicts.

This README provides comprehensive instructions for setting up and running your Spring Boot application both via the command line and IntelliJ IDEA.