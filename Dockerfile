FROM gcr.io/kauri-197812/kauri-contract-abis:latest-dev

# RUN apt-get update && apt upgrade && \
#   apt install -y bash git openssh-client
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY esy.lock /usr/src/app/
RUN npm install -g yarn
RUN yarn
COPY . /usr/src/app
ENV GETH_BLOCKCHAIN=35.231.60.112:8545
ENV MONOLITH_EXTERNAL_API=api.dev.kauri.io
ENV MONOLITH_API=monolith.dev:8080
#next specific build
RUN yarn build
EXPOSE 3000
CMD "yarn" "start"
