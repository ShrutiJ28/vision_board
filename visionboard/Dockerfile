# Use Java 21 base image
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Build the project with Maven wrapper
RUN ./mvnw clean package -DskipTests

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Run the Spring Boot app
CMD ["java", "-jar", "target/visionboard-0.0.1-SNAPSHOT.jar"]


