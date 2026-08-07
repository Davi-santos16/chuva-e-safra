import express from "express"
import { routes } from "./routes/index";
import { errorHandling } from "./middlewares/error-handling"

const app = express()
const PORT = 3333

app.use(express.json());
/* RECEBER DADOS VIA FORM URLENCODED */
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.use(errorHandling)


app.listen(PORT, () =>{
  console.log("Servidor rodando na porta", PORT)
})

