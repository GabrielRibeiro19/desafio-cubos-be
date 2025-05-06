import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendMovieReleaseReminderUseCase } from "./SendMovieReleaseReminderUseCase";

class SendMovieReleaseReminderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const sendMovieReleaseReminderUseCase = container.resolve(
      SendMovieReleaseReminderUseCase
    );

    await sendMovieReleaseReminderUseCase.execute(id);

    return response.status(204).send();
  }
}

export { SendMovieReleaseReminderController };
