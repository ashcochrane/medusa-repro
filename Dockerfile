# Builder stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build


# Final stage
FROM node:22-slim AS final

# Set the working directory for the final image
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app .

# Set the working directory to `.medusa/server`
WORKDIR /app/.medusa/server

# Install only production dependencies
RUN yarn install --production


# Set production environment
ENV NODE_ENV="production"

# Expose the application port
EXPOSE 9000

# Set the entrypoint to the script
CMD ["yarn", "start"]
