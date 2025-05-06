import { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

// import { ISettingsRepository } from "@modules/settings/repositories/ISettingsRepository";

import { IMailProvider } from "../IMailProvider";

@injectable()
class NodemailerProvider implements IMailProvider {
  private client: Transporter;
  // constructor(
  //   @inject("SettingsRepository")
  //   private settingsRepository: ISettingsRepository
  // ) {}

  async sendMail(
    to: string,
    subject: string,
    variables: unknown,
    path: string
  ): Promise<void> {
    // const settings = await this.settingsRepository.getOne();
    // const transporter = nodemailer.createTransport({
    //   host: settings.email_server,
    //   port: Number(settings.email_port),
    //   secure: settings.email_ssl,
    //   auth: {
    //     user: settings.email,
    //     pass: settings.email_password,
    //   },
    //   tls: { rejectUnauthorized: false },
    // });
    // this.client = transporter;
    // const templateFileContent = fs.readFileSync(path).toString("utf-8");
    // const templateParse = handlebars.compile(templateFileContent);
    // const templateHtml = templateParse(variables);
    // await this.client.sendMail({
    //   to,
    //   from: settings.email,
    //   subject,
    //   html: templateHtml,
    // });
  }
}

export { NodemailerProvider };
