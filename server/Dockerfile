# Use official Bun image
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --production

# Copy source code
COPY server.ts ./

# Expose port (Render will bind to the PORT environment variable)
EXPOSE 10000

# Set default port
ENV BACKEND_PORT=10000

# Run the app
USER bun
CMD ["bun", "run", "server.ts"] 