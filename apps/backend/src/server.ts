import express from "express"
import { errorHandling } from "./middlewares/error-handling"

const app = express()
const PORT = 3333

app.use(errorHandling)


app.listen(PORT, () =>{
  console.log("Servidor rodando na porta", PORT)
})

