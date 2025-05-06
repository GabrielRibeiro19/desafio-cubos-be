import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
// import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { NodemailerProvider } from "./implementations/NodemailerProvider";
// import { SESMailProvider } from "./implementations/SESMailProvider";

// const mailProvider = {
//   etherial: container.resolve(EtherealMailProvider),
//   ses: container.resolve(SESMailProvider),
// };

// container.registerInstance<IMailProvider>(
//   "MailProvider",
//   mailProvider[process.env.MAIL_PROVIDER]
// );

container.registerInstance<IMailProvider>(
  "MailProvider",
  container.resolve(NodemailerProvider)
);
