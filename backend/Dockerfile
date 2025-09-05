FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Environment variables
ENV DATABASE_URL=postgresql://neondb_owner:npg_6KSXutsMW0dD@ep-muddy-silence-adrbf7fo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
ENV ACCESS_TOKEN_SECRET=webbytes@123
ENV REFRESH_TOKEN_SECRET=webbytes@456
ENV PORT=8000

EXPOSE 8000

CMD ["npm", "start"]

# you can also make a image an can container the application don't the env's here they are 
# assigned in the docker file purposefully it is not best practice but   
