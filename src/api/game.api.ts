import { httpApi } from '@app/api/http.api';
import { GameMeta, GetGamesResponse, GetRomsResponse } from '@app/types/generalTypes';

// export interface GetGameRequest {
//   queryParameters: {
//     pageNumber: number;
//     pageSize: number;
//   };
//   payload: any;
// }

export const gamesFilter = {
  Name: '',
  HasSavedGame: false,
  isFavourite: false,
  Platform: [],
  Genre: [],
  GameMode: [],
  PlayerPerspective: [],
  Theme: [],
  MinimumReleaseYear: -1,
  MaximumReleaseYear: -1,
  GameRating: {
    MinimumRating: -1,
    MinimumRatingCount: -1,
    MaximumRating: -1,
    MaximumRatingCount: -1,
    IncludeUnrated: false,
  },
  GameAgeRating: {
    AgeGroupings: [],
    IncludeUnrated: false,
  },
  Sorting: {
    SortBy: 'NameThe',
    SortAscending: true,
  },
};

export const getGames = async (filter: any, pageNumber: number, pageSize: number): Promise<GetGamesResponse> => {
  try {
    const { data } = await httpApi.post('Games', {
      ...gamesFilter,
      params: {
        pageNumber,
        pageSize,
      },
    });
    return data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message || 'An error occurred while getting games');
  }
};

export const getGameById = async (gameId: number): Promise<GameMeta> => {
  try {
    const { data } = await httpApi.get(`Games/${gameId}`);
    return data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message || 'An error occurred while getting game by Id.');
  }
};

export const getRoms = async (gameId: number, pageNumber: number, pageSize: number): Promise<GetRomsResponse> => {
  try {
    const { data } = await httpApi.get(`Games/${gameId}/roms`, {
      params: {
        pageNumber,
        pageSize,
      },
    });
    return data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message || 'An error occurred while getting ROMs');
  }
};
