# CASE Provider v1.1

A complete implementation of the **Competencies and Academic Standards Exchange (CASE) Service v1.1** using Express.js and Prisma ORM.

This implementation follows the CASE v1.1 specification from 1EdTech:

- Specification URL: <https://purl.imsglobal.org/spec/case/v1p1>
- OpenAPI Definition: <https://purl.imsglobal.org/spec/case/v1p1/schema/openapi/imscasev1p1_openapi2_v1p0.json>

## Overview

This service provides a REST API that implements the CASE v1.1 specification from 1EdTech. It enables the exchange of competency frameworks and academic standards data between service providers and consumers.

## Features

- ✅ PostgreSQL database with Prisma ORM
- ✅ TypeScript for type safety
- ✅ Six manager endpoints:
  - **AssociationsManager**: Manage CFAssociations
  - **DefinitionsManager**: Manage CFConcepts, CFSubjects, CFLicenses, CFItemTypes, CFAssociationGroupings
  - **DocumentsManager**: Manage CFDocuments
  - **ItemsManager**: Manage CFItems
  - **PackagesManager**: Manage CFPackages
  - **RubricsManager**: Manage CFRubrics and CFRubricCriteria
- ✅ OpenAPI specification endpoint at `/ims/case/v1p1/openapi.json`

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

### Base Path

All CASE API endpoints are prefixed with: `/ims/case/v1p1`

### Available Endpoints

#### Associations Manager

- `GET /ims/case/v1p1/CFAssociations/{sourcedId}` - Get a specific association
- `GET /ims/case/v1p1/CFItemAssociations/{sourcedId}` - Get the associations of the given CFItem

#### Definitions Manager

- `GET /ims/case/v1p1/CFConcepts/{sourcedId}` - Get a concept
- `GET /ims/case/v1p1/CFSubjects/{sourcedId}` - Get a subject
- `GET /ims/case/v1p1/CFLicenses/{sourcedId}` - Get a license
- `GET /ims/case/v1p1/CFItemTypes/{sourcedId}` - Get an item type
- `GET /ims/case/v1p1/CFAssociationGroupings/{sourcedId}` - Get an association grouping

#### Documents Manager

- `GET /ims/case/v1p1/CFDocuments` - List all documents
- `GET /ims/case/v1p1/CFDocuments/{sourcedId}` - Get a specific document

#### Items Manager

- `GET /ims/case/v1p1/CFItems/{sourcedId}` - Get a specific item

#### Packages Manager

- `GET /ims/case/v1p1/CFPackages/{sourcedId}` - Get a package

#### Rubrics Manager

- `GET /ims/case/v1p1/CFRubrics/{sourcedId}` - Get a rubric

#### Utilities

- `GET /` - Service information
- `GET /health` - Health check
- `POST /upload` - Add Packages from a CSV file
- `POST /upload/items` - Add Items from a CSV file
- `POST /upload/associations` - Add Associations from a CSV file

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
│   ├── migrations/            # Database migrations
│   └── schema.prisma          # Database schema
├── public/
│   └── openapi-spec.json      # CASE v1.1 OpenAPI specification
├── src/
│   ├── index.ts               # Application entry point
│   ├── lib/
│   │   ├── errors.ts          # Error handling utilities
│   │   ├── prisma.ts          # Prisma client
│   │   └── validation.ts      # Validation utilities
│   ├── routes/
│       ├── associations.ts    # Associations endpoints
│       ├── definitions.ts     # Definitions endpoints
│       ├── documents.ts       # Documents endpoints
│       ├── items.ts           # Items endpoints
│       ├── packages.ts        # Packages endpoints
│       ├── rubrics.ts         # Rubrics endpoints
│       ├── spec.ts            # OpenAPI spec endpoint
│       └── upload.ts          # Upload endpoints
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
