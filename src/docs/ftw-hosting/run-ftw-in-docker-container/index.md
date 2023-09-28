---
title: How to run Sharetribe Web Template in a Docker container
slug: run-template-with-docker
updated: 2023-02-20
category: template-hosting
ingress:
  This guide describes how to set up a Docker container running the
  Sharetribe Web Template.
published: true
---

Depending on your deployment infrastructure, you may want to run your
Sharetribe Web Template based marketplace application in a Docker
container. This article features a sample Dockerfile you can use to
create your Docker image.

<info>

To learn more about Docker and its key concepts, check out
[Docker documentation](https://docs.docker.com/) or watch a
[Docker introduction video](https://youtu.be/pTFZFxd4hOI). This guide
assumes you have Docker installed and running on your development
machine.

</info>

To run your template app with Docker, you will need to

- add your Dockerfile
- build the Docker image, and
- run the Docker container.

## Add your Dockerfile

For creating a Docker image of your template application, you will need
to add a Dockerfile. Add a file titled _Dockerfile_ with no file
extension to the root of your template folder, on the same level as your
_package.json_ file. Copy the following contents, paste them to the
newly created _Dockerfile_ and save.

```
FROM node:16
WORKDIR /home/node/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
ENV PORT=4000
ENV NODE_ENV=production
EXPOSE 4000
RUN yarn run build
USER node
CMD ["yarn", "start"]
```

In addition, you need to add a _.dockerignore_ file in the same root
folder. Copy the following contents, paste them to the newly created
._dockerignore_ file, and save.

```
# Ignore node_modules because they get installed in the Dockerfile.
node_modules
```

## Build your Docker image and run the Docker container

To build your Docker image, open your command line and navigate to the
root of your template folder. Run the following command – be careful to
include the final `.` , as it indicates that the Dockerfile is in the
current directory.

```shell
$ docker build -t sharetribe-docker .
```

The build step can take a while. After the build step completes, you can
start a container using the image you created.

```shell
$ docker run -dp 4000:4000 sharetribe-docker
```

You can now visit _http://localhost:4000_ on your local machine to see
that the container is running your application.
