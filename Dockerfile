FROM ghcr.io/puppeteer/puppeteer:20.2.0
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/user/bin/google-chrom-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "node", "dist/app.js" ]
