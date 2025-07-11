# Build stage
FROM oven/bun:1 AS build
WORKDIR /usr/src/app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Accept build-time environment variables
ARG BUN_PUBLIC_SERVER_URL
ENV BUN_PUBLIC_SERVER_URL=$BUN_PUBLIC_SERVER_URL

# Build the application
RUN bun run build

# Production stage - serve with nginx
FROM nginx:alpine AS production

# Copy built assets from build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 