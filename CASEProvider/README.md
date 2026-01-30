# CASE Provider v1.1

A complete implementation of the **Competencies and Academic Standards Exchange (CASE) Service v1.1** using Express.js and Prisma ORM.

This implementation follows the CASE v1.1 specification from 1EdTech:

- Specification URL: <https://purl.imsglobal.org/spec/case/v1p1>

## Overview

This service provides a REST API that implements the CASE v1.1 specification from 1EdTech. It enables the exchange of competency frameworks and academic standards data between service providers and consumers.

## Features

- ✅ PostgreSQL database with Prisma ORM
- ✅ TypeScript for type safety

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database (or Docker for containerized setup)
- yarn package manager
- Docker and Docker Compose (optional, for containerized setup)

## Installation

### Option 1: Docker Compose (Recommended)

The easiest way to run the application with all dependencies:

```bash
# Start both the application and database
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v
```

The application will be available at `http://localhost:3000`

### Option 2: Local Development

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Configure environment:

   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and update the `DATABASE_URL` with your PostgreSQL connection string:

   ```text
   DATABASE_URL="postgresql://caseuser:casepassword@localhost:5432/case_provider?schema=public"
   ```

4. Initialize Prisma:

   ```bash
   yarn prisma:generate
   ```

5. Run database migrations:

   ```bash
   yarn prisma:migrate
   ```

## Running the Application

### Development Mode

```bash
yarn dev
```

### Production Mode

```bash
yarn build
yarn start
```

The server will start on `http://localhost:3000` (or the PORT specified in your .env file).

## API Endpoints

#### Utilities

- `GET /` - Service information
- `GET /health` - Health check
- `GET /ims/case/v1p1/openapi.json` - OpenAPI specification

## Database Management

### Prisma Studio

View and edit your database using Prisma Studio:

```bash
yarn prisma:studio
```

### Create a Migration

After modifying the Prisma schema:

```bash
yarn prisma:migrate
```

## Project Structure

```sh
CASEProvider/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── index.ts               # Application entry point
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
├── package.json
├── tsconfig.json
└── README.md
```

## Data Models

The application implements the following CASE entities:

- **CFDocument**: Root entry point for competency frameworks
- **CFItem**: Containers for competency definitions
- **CFAssociation**: Relationships between documents and items
- **CFConcept**: Framework concepts
- **CFSubject**: Framework subjects
- **CFLicense**: License definitions
- **CFItemType**: Item type definitions
- **CFAssociationGrouping**: Association groupings
- **CFPackage**: Complete framework packages
- **CFRubric**: Rubric definitions
- **CFRubricCriterion**: Individual rubric criteria

## Development

This project uses:

- **TypeScript** for type safety
- **Express.js** for the web framework
- **Prisma** for database ORM
- **PostgreSQL** as the database
- **Docker** for containerization

## License

See the OpenAPI specification file for 1EdTech licensing information.
