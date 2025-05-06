import { instanceToInstance } from "class-transformer";

import { IResponseMovieDTO } from "../dtos/IResponseMovieDTO";
import { Movie } from "../infra/typeorm/entities/Movie";

class MovieMap {
  static toDTO({
    id,
    budget,
    overview,
    title,
    release_date,
    user_id,
    original_title,
    popularity,
    revenue,
    status,
    trailer_url,
    votes,
    tagline,
    rating,
    duration,
    image,
    image_url,
    image_secondary_url,
    language,
    profit,
    image_secondary,
    created_at,
    genres,
    updated_at,
  }: Movie): IResponseMovieDTO {
    // Converter a URL do YouTube do formato de visualização para o formato de incorporação
    let embed_trailer_url = null;
    if (trailer_url) {
      // Detectar se é uma URL do YouTube
      const youtubeRegex =
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
      const match = trailer_url.match(youtubeRegex);

      if (match && match[1]) {
        // Extrair o ID do vídeo e construir a URL de incorporação
        const videoId = match[1];
        embed_trailer_url = `https://www.youtube.com/embed/${videoId}`;
      } else {
        // Se não for uma URL do YouTube reconhecível, usar a URL original
        embed_trailer_url = trailer_url;
      }
    }

    // Formatar duração para exibição (exemplo: "1h 30min")
    let formattedDuration = "";
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (hours > 0) {
      formattedDuration += `${hours}h`;
    }

    if (minutes > 0) {
      formattedDuration += `${formattedDuration ? " " : ""}${minutes}min`;
    }

    const movie = instanceToInstance({
      id,
      budget,
      title,
      release_date,
      user_id,
      original_title,
      popularity,
      revenue,
      overview,
      tagline,
      status,
      trailer_url,
      embed_trailer_url,
      votes,
      rating,
      duration,
      formattedDuration,
      image,
      genres,
      image_url,
      image_secondary_url,
      language,
      profit,
      image_secondary,
      created_at,
      updated_at,
    });

    return movie;
  }
}

export { MovieMap };
