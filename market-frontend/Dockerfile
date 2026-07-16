FROM oven/bun:alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN bun install

COPY . .
RUN bun run build

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 7000

CMD ["nginx", "-g", "daemon off;"]