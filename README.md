# Docker Full-Stack Authentication System

A robust, Dockerised authentication system built with **.NET 8, React, PostgreSQL, and Docker Compose**. This project demonstrates a complete secure identity flow: registration, login, JWT issuance, and protected profile retrieval.

---

## 📂 Project Structure
- **`/backend`**: .NET 8 Web API, Entity Framework Core, and xUnit Test Suites.
- **`/frontend`**: React 18 (Vite) + TypeScript and Styled Components.
- **`docker-compose.yml`**: Root orchestration for the API, Database, and Client.

---

## 🚀 Quick Start (Windows)

The easiest way to build, test, and run the entire stack is using the included **PowerShell CLI** from the root directory.

### Using the Build Script
Run the script with flags to customize your workflow:

| Flag | Short | Description |
| :--- | :--- | :--- |
| `-ut` | Runs backend Unit Tests |
| `-it` | Runs backend Integration Tests |
| `-docker` | `-up` | Builds & starts the full stack in Docker |
| `-stop` | `-down` | Stops and removes Docker containers |
| `-a` | Runs tests + Docker (Default) |

**Examples:**
```powershell
# Run the full pipeline (Tests + Docker)
.\build.ps1 -a

# Just run the test suites
.\build.ps1 -ut -it

# Stop the environment
.\build.ps1 -down
```

# Features & Assessment Highlights
- **JWT Authentication:** Secure token-based authorization for the "User Details" page.
- **Advanced Validation:** Frontend & Backend logic restricting registration to `@gmail.com` addresses.
- **Automated Testing:** Comprehensive Unit and Integration tests (`xUnit`).
- **Developer Tooling:** Custom PowerShell build script for rapid local development.
- **Docker Orchestration:** Multi-container setup ensuring the app runs identically in any environment.
- **Modern UX:** Inline notifications with smooth fade-in animations and automatic redirects.

# Tech Stack
## Frontend
- React (Vite) & TypeScript
- Axios for API communication
- Styled Components for dynamic UI states

## Backend
- .NET 8 Web API
- Entity Framework Core (Postgres Provider)
- xUnit & FluentAssertions for testing

## Infrastructure
- Docker & Docker Compose
- PostgreSQL 16

# How It Works
1. **Infrastructure:** Docker Compose spins up three services: a PostgreSQL database, the .NET Web API, and the React frontend.
2. **Authentication:** Upon successful login, the Backend issues a JWT (JSON Web Token). This token is stored on the client and sent in the Authorization header for all subsequent requests to protected endpoints.
3. **Security:** The "User Details" endpoint is protected by an `[Authorize]` attribute, ensuring only users with a valid token can view private profile information.
4. **Reliability:** The project includes a full test suite. Unit tests verify the core logic, while Integration tests verify the end-to-end API response flow including database persistence.