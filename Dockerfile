FROM node:18
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm i
COPY  . .
ENV PORT={PORT}
# ENV PORT=4000
RUN npm run build
# RUN command

# FROM node:18 AS production
# COPY --from=development ./dist ./dist
EXPOSE 4000
CMD [ "node","dist/main" ]
