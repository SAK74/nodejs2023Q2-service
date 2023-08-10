FROM node:18
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma

# setup for bad connection to avoid timeout!
RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

RUN npm ci
COPY . .
RUN npx prisma generate

EXPOSE ${PORT}
