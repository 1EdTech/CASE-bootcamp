# CASE Bootcamp

This repository contains a complete implementation and testing suite for the **Competencies and Academic Standards Exchange (CASE) v1.1** specification from 1EdTech.

It is intended for learning purposes to gain experience of the **Competencies and Academic Standards Exchange (CASE) v1.1** specification

## Directory Structure

### CASEProvider

The main CASE v1.1 service implementation built with Express.js, TypeScript, and Prisma ORM.

**Purpose**: Provides a fully functional REST API that implements the CASE v1.1 specification, enabling the exchange of competency frameworks and academic standards data.

**Key Features**:

- Six manager endpoints (Associations, Definitions, Documents, Items, Packages, Rubrics)
- PostgreSQL database with Prisma ORM
- OpenAPI specification endpoint
- Docker Compose setup for easy deployment
- CSV file upload utilities for bulk data import

**Tech Stack**: Node.js, TypeScript, Express.js, Prisma, PostgreSQL, Docker

See [CASEProvider/README.md](./CASEProvider/README.md) for detailed documentation.

### client-test

Integration test suite for the CASE service using Postman/Newman.

**Purpose**: Automated API testing client that validates CASE service endpoints against the specification using Postman collections.

**Key Features**:

- Newman-based test execution
- HTML report generation with detailed test results
- Built-in Express server to view reports
- Docker support for containerized testing
- Configurable CASE service endpoint

**Tech Stack**: Node.js, Express, Newman, Docker

See [client-test/README.md](./client-test/README.md) for detailed documentation.

### assets

Visual documentation and diagrams for the CASE specification.

**Contents**:

- `case-diagram.png` - Overall CASE architecture diagram
- `core-classes.png` - Core CASE class structure
- `cfdocument.png` - CFDocument entity diagram
- `cfitem.png` - CFItem entity diagram
- `cfassociation.png` - CFAssociation entity diagram
- `cfpackage.png` - CFPackage entity diagram
- `definitions.png` - CASE definitions diagram
- `rubrics.png` - Rubrics structure diagram

These diagrams provide visual references for understanding the CASE data model and relationships between entities.

## Quick Start

1. **Start the CASE Provider**:

   ```bash
   cd CASEProvider
   docker-compose up -d
   ```

   The service will be available at `http://localhost:3000`

2. **Run Integration Tests**:

   ```bash
   cd client-test
   node app.js
   ```

   View test reports at `http://localhost:8081`

## Specification

This implementation follows the CASE v1.1 specification:

- **Specification URL**: <https://purl.imsglobal.org/spec/case/v1p1>
- **OpenAPI Definition**: <https://purl.imsglobal.org/spec/case/v1p1/schema/openapi/imscasev1p1_openapi2_v1p0.json>

