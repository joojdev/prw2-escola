import app from "./app";
import { PORT } from "./config/env";
import { seed } from "./config/seed";

seed();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
