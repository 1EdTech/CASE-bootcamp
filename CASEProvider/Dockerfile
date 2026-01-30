FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code and prisma schema
COPY . .

# Generate Prisma Client
RUN yarn prisma:generate

# Build the application
RUN yarn build

# Production stage
FROM node:20-alpine

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install production dependencies only
RUN yarn install --production --frozen-lockfile

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma Client
RUN yarn prisma:generate

# Copy built application
COPY --from=0 /app/dist ./dist

# Expose port
EXPOSE 3000

# Start command that runs migrations then starts the app
CMD ["sh", "-c", "yarn prisma migrate deploy && node dist/index.js"]
