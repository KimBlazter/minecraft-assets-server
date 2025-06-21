ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

# Install corepack and pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Scan assets
RUN pnpm generate

EXPOSE 8000

CMD ["pnpm", "serve"]
