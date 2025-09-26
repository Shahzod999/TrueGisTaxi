# Build stage for client
FROM node:18-alpine AS client-build

WORKDIR /app/client

# Copy package files and install dependencies (including devDependencies for build)
COPY client/package*.json ./
RUN npm ci

# Copy client source code and build
COPY client/ ./
RUN npm run build

# Production stage for server
FROM node:18-alpine AS server

WORKDIR /app

# Copy server package files and install production dependencies
COPY server/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy server source code
COPY server/ ./

# Copy built client files from build stage
COPY --from=client-build /app/client/dist ./client/dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Create uploads directory and set permissions
RUN mkdir -p uploads && chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
