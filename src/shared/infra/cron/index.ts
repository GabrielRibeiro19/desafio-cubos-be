import cron from "node-cron";
import { container } from "tsyringe";

import { SendMovieReleaseReminderJob } from "@modules/movies/jobs/SendMovieReleaseReminderJob";

export default function setupCronJobs(): void {
  // Executar todos os dias às 8h da manhã
  cron.schedule("0 8 * * *", async () => {
    console.log("[Cron] Verificando filmes com estreia hoje...");

    const sendMovieReleaseReminderJob = container.resolve(
      SendMovieReleaseReminderJob
    );

    await sendMovieReleaseReminderJob.execute();
  });

  console.log("🕒 Cron jobs configurados com sucesso!");
}
