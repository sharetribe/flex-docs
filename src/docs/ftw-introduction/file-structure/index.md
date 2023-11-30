---
title: File and directory structure
slug: file-and-directory-structure
updated: 2023-12-01
category: template-introduction
ingress: How code is organised in the template
published: true
---

## How Code in the Web Template is Organized

All front-end or client side code is located in the src directory and
all server side code is located under the server directory. You will
also see a public, scripts and patches folder which include utility code
and static assets used elsewhere in the codebase.

```bash
web-template
├── CHANGELOG.md
├── CHANGELOG_LEGACY.md
├── LICENSE
├── README.md
├── build
├── ext
├── node_modules
├── package.json
├── patches
├── public
├── scripts
├── server
├── src
└── yarn.lock
```

### src directory

```bash
src
├── analytics
├── app.js
├── app.node.test.js
├── app.test.js
├── assets
├── components
├── config
├── containers
├── context
├── ducks
├── examples.js
├── index.js
├── reducers.js
├── routing
├── store.js
├── styles
├── transactions
├── translations
└── util
```

The bulk of the functional code is split between the containers and
components directories. We have all presentational components located in
a directory called “components”. These components are presentational in
the sense that they don’t make any API calls, they’re modular and they
are used in multiple containers throughout the application.

Containers, on the other hand, are components that aren’t modular. They
usually represent a specific page in the marketplace application.
Containers are connected to the Redux store, and are responsible for
updating and dispatching actions to Redux state. Within the container
directory you will also find a .duck.js file which contains the logic of
how the container interacts with the Redux store.

See here for an example of how to create a new container:
https://www.sharetribe.com/docs/template/how-to-add-static-pages/

## Server

The template contains a small Node.js server, which is used for
server-side rendering and making API calls via a secure context. All
server side code is located in the /server directory. Keep in mind that
when running the web-template locally, the command `yarn run dev` will
run the server and the client application in different ports. The client
will run in port :3000 and the server in :3500. When running the
`yarn run dev-server` command, the server will run in the same port as
the client :4000. This is to enable hot-module reloading when using the
`yarn run dev-server` command.

```bash
server
├── api
├── api-util
├── apiRouter.js
├── apiServer.js
├── auth.js
├── csp.js
├── dataLoader.js
├── env.js
├── importer.js
├── index.js
├── log.js
├── renderer.js
├── resources
└── wellKnownRouter.js
```

### Simple example: create a new server-side endpoint

Create a new file under server > api and name it my-new-endpoint.js

```js
module.exports = (req, res) => {
  console.log(req.body);
  res.status(200).json({ test: 'data' });
};
```

In apiRouter.js:

```js
import const myNewEndpoint = require('./api/my-new-endpoint');

// And define a new endpoint:
router.get('/my-new-endpoint', transitionPrivileged);
```

Define a new get helper in api.js

```js
const get = (path, body, options = {}) => {
  const requestOptions = {
    ...options,
    method: methods.GET,
  };

  return request(path, requestOptions);
};
```

Add the following in api.js in client:

```js
export const myNewEndpoint = body => {
  return get('/api/my-new-endpoint', body);
};
```

Start your server using `yarn run dev` and you can now call it via a
CURL call:

```bash
curl -i -X GET  http://localhost:3500/api/my-new-endpoint
```

And it’ll return:

```bash
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
Access-Control-Allow-Credentials: true
Content-Type: application/json; charset=utf-8
Content-Length: 15
ETag: W/"f-qRT4fqjUp2+H1CuYeqacbJItQk0"
Date: Thu, 30 Nov 2023 19:11:47 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"test":"data"}
```
