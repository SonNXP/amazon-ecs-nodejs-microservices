// https://code.visualstudio.com/docs/nodejs/nodejs-tutorial
// Node package manager (npm) là một công cụ tạo và quản lý các thư viện lập trình Javascript cho Node.js.
// https://docs.npmjs.com/cli/v7/commands/npm-install
// npm install (in a package directory, no arguments) will install all modules listed as dependencies in package.json. 
// Install the dependencies in the local node_modules folder for this project ONLY. 
// For global use: -g OR --global installs the current package context (ie, the current working directory) as a global package.
// After install depenencies, to run: node server.js, and http://localhost:3000/api/users 
const app = require('koa')();
const router = require('koa-router')();
const db = require('./db.json');

// Log requests
app.use(function* (next) {
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

router.get('/api/users', function* (next) {
  this.body = db.users;
});

router.get('/api/users/:userId', function* (next) {
  const id = parseInt(this.params.userId);
  this.body = db.users.find((user) => user.id == id);
});

router.get('/api/threads', function* () {
  this.body = db.threads;
});

router.get('/api/threads/:threadId', function* () {
  const id = parseInt(this.params.threadId);
  this.body = db.threads.find((thread) => thread.id == id);
});

router.get('/api/posts/in-thread/:threadId', function* () {
  const id = parseInt(this.params.threadId);
  this.body = db.posts.filter((post) => post.thread == id);
});

router.get('/api/posts/by-user/:userId', function* () {
  const id = parseInt(this.params.userId);
  this.body = db.posts.filter((post) => post.user == id);
});

router.get('/api/', function* () {
  this.body = "API ready to receive requests";
});

router.get('/', function* () {
  this.body = "Ready to receive requests";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
