import express from "express";
import ViteExpress from "vite-express";
import { handleGet } from "./controller";
import endpoints from "./util/endpoints";

const app = express();
app.use(express.json())

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
