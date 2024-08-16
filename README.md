# Secret Santa Project

This project is a Node.js application using Express, Prisma, and PostgreSQL. The application allows users to organize and manage Secret Santa games. The database is managed using Prisma ORM, and a PostgreSQL database is set up using Docker Compose.

## Running the application

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/secret-santa.git
cd secret-santa
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and configure the environment variables required for the project.

```env
DATABASE_URL="postgresql://user:password@localhost:5432/secret_santa"
PORT=3000
```

### 4. Set Up PostgreSQL with Docker

```bash
docker-compose up -d
```

This will spin up a PostgreSQL instance in a Docker container.

### 5. Migrate the Database

Use Prisma to migrate the database schema:

```bash
npx prisma migrate dev
```

This command will apply the necessary migrations to your PostgreSQL database.

### 6. Run the Application

After setting up the database, you can start the application:

```bash
npm start
```

The application will be accessible at `http://localhost:3000`.

## Running Tests

This project uses Jest for testing. To run the tests, use the following command:

```bash
npm test
```

## Project Structure

- **/src**: Contains the source code.
  - **/modules**: Contains the core modules like controllers, services, repositories, and DTOs.
  - **/routes**: Defines the API routes.
  - **/utils**: Utility functions.
  - **/prisma**: Contains Prisma schema and migration files.
- **/test**: Contains the test files.
- **/config**: Configuration files for the project.
- **/coverage**: Code coverage reports.
