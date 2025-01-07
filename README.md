# 🎮 Pixel Totsugeki

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

> *Paint your imagination, one pixel at a time! 🖌️*

## 🌟 About The Project

Pixel Totsugeki is a real-time collaborative pixel art platform where every pixel tells a story. Inspired by Reddit's r/place, this digital canvas brings together artists and strategists in an epic battle of creativity.

## ⚔️ Tech Arsenal

### 🛡️ Backend Fortress
```java
@Configuration
public class BackendArchitecture {
    
    @Bean
    public TechnicalStack infrastructure() {
        return TechnicalStack.builder()
            .runtime("JVM 17 (HotSpot)")
            .framework(Arrays.asList(
                "Spring Boot 3.2",
                "Spring Security 6.0",
                "Spring WebSocket",
                "Spring Data JPA"
            ))
            .security(SecurityConfig.builder()
                .authentication("OAuth2 with Google")
                .authorization("JWT + Bearer token")
                .websocketSecurity("STOMP + JWT")
                .build())
            .persistence(Arrays.asList(
                "PostgreSQL 16",
                "Hibernate ORM",
                "Flyway Migrations"
            ))
            .deployment(Arrays.asList(
                "Docker + Docker Compose",
                "Maven Build Tool",
                "GitHub Actions CI/CD"
            ))
            .build();
    }
}
```

### 🎭 Frontend Magic
```javascript
const stack = {
    framework: "React + Vite ⚡",
    realtime: "STOMP WebSocket 🔌",
    styling: "Tailwind CSS 💨",
    networking: "Axios 🌐"
};
```

## ⚡ Quick Deploy

### 🎯 Prerequisites
```bash
java 17
node.js
docker
postgresql
```

### 🚀 Launch Sequence
```bash
# Clone the masterpiece
git clone https://github.com/ThirdimpactDev/pixel-game.git

# Enter the arena
cd pixel-totsugeki

# Configure your .env
cat << EOF > .env
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
EOF

# Summon the database
docker-compose up -d

# Launch the backend
./mvnw spring-boot:run

# Deploy the frontend
cd frontend
npm install
npm run dev
```

## 🔧 Battle Stations (API)

### 🔐 Auth Routes
```http
GET /oauth2/authorization/google  # Initiate login
GET /token.grant                 # Get JWT
GET /oauth2/redirect             # OAuth2 callback
```

### 🎨 Pixel Operations
```http
GET /colors                # Available colors
GET /color/{colorId}       # Specific color
WS /app/game.sendPixel    # Place pixel
WS /app/game.subscribeGrid # Subscribe to updates
WS /topic/grid            # Receive updates
```

## ⚔️ Battle Flow

### 🔑 Authentication Protocol
1. User initiates Google OAuth2 login
2. Server generates JWT after authentication
3. Frontend stores JWT
4. WebSocket connections use JWT for auth

### 🎯 Pixel Deployment Strategy
1. Select grid coordinates
2. Choose color
3. Deploy pixel via WebSocket
4. Server validates
5. All clients receive update

## 🛡️ Security Measures
- OAuth2 + Google Authentication
- JWT Validation
- Protected WebSocket Routes
- CORS Shield
- Spring Security Fortress

*"In the pixelated realm, every coordinate tells a story, every color marks a victory."*

Made with ⚔️ by ThirdImpact
