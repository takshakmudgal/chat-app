# Use official Bun image
FROM oven/bun:1
WORKDIR /usr/src/app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Accept build-time environment variables
ARG BUN_PUBLIC_SERVER_URL
ENV BUN_PUBLIC_SERVER_URL=$BUN_PUBLIC_SERVER_URL
ENV PORT=10000

# Expose port 10000 (Render's port)
EXPOSE 10000

# Run the development server
CMD ["bun", "run", "dev"] 