import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");
  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO users(id, name, email, password)
    values('${id}', 'admin', 'admin@admin.com.br', '${password}')
    `
  );

  await connection.close(); // Alterado: adicionado parênteses para chamar o método
}

create()
  .then(() => console.log("User admin created!"))
  .catch((error) => console.error("Error creating admin:", error))
  .finally(() => process.exit(0));
