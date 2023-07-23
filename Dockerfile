# Base image
FROM node:18-alpine As build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Creates a "dist" folder with the production build
RUN npm run build

RUN npm ci --only=production && npm cache clean --force

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
