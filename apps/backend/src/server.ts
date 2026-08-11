import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors"
import { swaggerDocument } from "./docs/swagger";
import { routes } from "./routes/index";
import { errorHandling } from "./middlewares/error-handling";


const app = express();
const PORT = 3333;


app.use(cors())
app.use(express.json());


app.get("/docs.json", (_request, response) => {
  return response.json(swaggerDocument);
});
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customSiteTitle: "Chuva e Safra API | Documentação",
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  }),
);

app.use(routes);

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/docs`);
});
