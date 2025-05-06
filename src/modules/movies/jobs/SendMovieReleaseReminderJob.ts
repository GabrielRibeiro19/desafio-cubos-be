import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IMoviesRepository } from "@modules/movies/repositories/IMoviesRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

import { MovieMap } from "../mapper/MovieMap";

@injectable()
class SendMovieReleaseReminderJob {
  constructor(
    @inject("MoviesRepository")
    private moviesRepository: IMoviesRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(): Promise<void> {
    const today = this.dateProvider.dateNow();
    const startOfDay = this.dateProvider.startOfDay(today);
    const endOfDay = this.dateProvider.endOfDay(today);

    const moviesToRelease = await this.moviesRepository.findByReleaseDate(
      startOfDay,
      endOfDay
    );

    const templatePath = resolve(
      __dirname,
      "..",
      "views",
      "emails",
      "movieReleaseReminder.hbs"
    );

    await Promise.all(
      moviesToRelease.map(async (movie) => {
        const user = await this.usersRepository.findById(movie.user_id);

        const movieToDTO = MovieMap.toDTO(movie);

        if (user && user.email) {
          const formattedDate = this.dateProvider.formatDate(
            movie.release_date,
            "DD/MM/YYYY"
          );

          const variables = {
            name: user.name,
            movieTitle: movieToDTO.title,
            movieOriginalTitle: movieToDTO.original_title,
            movieReleaseDate: formattedDate,
            movieOverview: movieToDTO.overview,
            movieTrailerUrl: movieToDTO.trailer_url,
            movieImageUrl: movieToDTO.image_url,
          };

          await this.mailProvider.sendMail(
            user.email,
            `Lembrete: "${movieToDTO.title}" estreia hoje!`,
            variables,
            templatePath
          );

          console.log(
            `Reminder email sent for movie: ${movieToDTO.title} to user: ${user.email}`
          );
        }
      })
    );
  }
}

export { SendMovieReleaseReminderJob };
