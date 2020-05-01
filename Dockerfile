FROM node:13.6.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
COPY . /app
RUN npm install --silent         
RUN npm run build
# start app
CMD ["npm", "run", "start"]
