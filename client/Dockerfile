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

# Expose port 3000 (default for dev server)
EXPOSE 3000

# Run the development server
CMD ["bun", "run", "dev", "--host", "0.0.0.0", "--port", "3000"] 