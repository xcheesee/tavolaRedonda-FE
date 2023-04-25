FROM node:lts-alpine3.17
WORKDIR /app
COPY . .
RUN npm install
CMD npm run dev --open
EXPOSE 5173
#comando para rodar container fe: docker run -dp 5173:5173 --network=host tav-red-fe
