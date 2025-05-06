import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { MovieMap } from "@modules/movies/mapper/MovieMap";
import { IMoviesRepository } from "@modules/movies/repositories/IMoviesRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendMovieReleaseReminderUseCase {
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

  async execute(movie_id: string): Promise<void> {
    const movie = await this.moviesRepository.findById(movie_id);

    if (!movie) {
      throw new AppError("Filme não encontrado");
    }

    const movieToDTO = MovieMap.toDTO(movie);

    const user = await this.usersRepository.findById(movieToDTO.user_id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "movieReleaseReminder.hbs"
    );

    // Formatar a data para exibição
    const formattedDate = this.dateProvider.formatDate(
      movieToDTO.release_date,
      "DD/MM/YYYY"
    );

    // Variáveis para o template
    const variables = {
      name: user.name,
      movieTitle: movieToDTO.title,
      movieOriginalTitle: movieToDTO.original_title,
      movieReleaseDate: formattedDate,
      movieOverview: movieToDTO.overview,
      movieTrailerUrl: movieToDTO.trailer_url,
      movieImageUrl: movieToDTO.image_url,
    };

    // Enviar email
    await this.mailProvider.sendMail(
      user.email,
      `Lembrete: "${movieToDTO.title}" estreia hoje!`,
      variables,
      templatePath
    );
  }
}

export { SendMovieReleaseReminderUseCase };
