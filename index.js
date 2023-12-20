const http = require("http");
const fs = require("fs");
const path = require("path");
const app = require("./app");

// HTTP SERVER Listening
const http_server = http.createServer(app);
http_server.listen(process.env.PORT || 3000, () => {
  console.log("Server HTTP started on PORT : ", process.env.PORT || 3000);
});


