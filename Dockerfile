FROM node:19.3-slim as builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY *.ts ./
COPY *.js ./
COPY *.json ./
COPY src/ ./src/
COPY public/ ./public/
RUN yarn build

FROM node:19.3-slim as runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY package.json ./
COPY --from=builder /app/yarn.lock ./
COPY public/ ./public/
EXPOSE 3000
CMD ["yarn", "start"]