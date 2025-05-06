import { Connection, createConnection, getConnectionOptions } from "typeorm";

// interface IOptions {
//   host: string;
// }

// getConnectionOptions().then((options) => {
//   const newOptions = options as IOptions;
//   newOptions.host = "database_ignite"; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//   createConnection({
//     ...options,
//   });
// });

// CASO USE O DOCKER = export default async (host = "database_ignite"): Promise<Connection> => {
export default async (host = "localhost"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(defaultOptions);
  // return createConnection(
  //   Object.assign(defaultOptions, {
  //     host: process.env.NODE_ENV === "test" ? "localhost" : host,
  //     database:
  //       process.env.NODE_ENV === "test"
  //         ? "rentex_test"
  //         : defaultOptions.database,
  //   })
  // );
};
