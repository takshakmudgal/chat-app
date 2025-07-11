# Build stage
FROM oven/bun:1 AS build
WORKDIR /usr/src/app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage - serve with Bun
FROM oven/bun:1 AS production
WORKDIR /usr/src/app

# Copy built files
COPY --from=build /usr/src/app/dist ./dist

# Expose port 10000
EXPOSE 10000

# Create a simple server script
RUN echo 'const server = Bun.serve({ port: 10000, hostname: "0.0.0.0", fetch(req) { const url = new URL(req.url); let filePath = url.pathname; if (filePath === "/") filePath = "/index.html"; try { const file = Bun.file(`./dist${filePath}`); return new Response(file); } catch { const indexFile = Bun.file("./dist/index.html"); return new Response(indexFile); } } }); console.log(`Server running on http://0.0.0.0:10000`);' > server.js

# Start the server
CMD ["bun", "server.js"] 