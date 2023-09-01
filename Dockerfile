# build
FROM node:18-alpine3.18 AS builder
WORKDIR /express-server
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# run
FROM node:18-alpine3.18
WORKDIR /express-server
COPY --from=builder /express-server/dist ./dist
COPY --from=builder /express-server/static ./static
COPY --from=builder /express-server/package.json ./
COPY --from=builder /express-server/.env ./
RUN npm install --omit dev
CMD ["npm", "start"]
