# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run the application
RUN npm install -g serve

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Expose port 3000
EXPOSE 3000

# Set environment to listen on 0.0.0.0
ENV HOST=0.0.0.0
ENV PORT=3000

# Start the application
CMD ["serve", "-s", "build", "-l", "3000"]
