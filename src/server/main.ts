import express from "express";
import ViteExpress from "vite-express";
import { handleGet } from "./controller";
import endpoints from "./util/endpoints";// @ts-ignore
import cron from 'node-cron'
import db from "./util/database";
import seed from "./util/seed";
import fs from 'fs'

const app = express();
app.use(express.json())

const resetDatabase = () => {
  fs.readFile('./util/seed.js', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading seed file:', err);
      return;
    }

    fs.writeFile('./util/database.js', data, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to database file:', err);
        return;
      }

      console.log('Database has been reset to initial state.');
    });
  });
};

cron.schedule('0 6 * * *', resetDatabase);

endpoints.forEach((endpoint) => {
  switch (endpoint.method.toUpperCase()) {
    case 'GET':
        app.get(endpoint.url, endpoint.handler);
        break;
    case 'POST':
        app.post(endpoint.url, endpoint.handler);
        break;
    case 'PUT':
        app.put(endpoint.url, endpoint.handler);
        break;
    case 'DELETE':
        app.delete(endpoint.url, endpoint.handler);
        break;
    default:
        console.log(`Invalid method ${endpoint.method} for endpoint ${endpoint.url}`);
}
})

app.get('/endpoints', (req, res) => res.json(endpoints))

ViteExpress.listen(app, 4000, () =>
  console.log("Server is listening on port 3000...")
);
