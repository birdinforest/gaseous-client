import { ReactNode } from 'react';

export type WithChildrenProps<T = undefined> = T extends undefined
  ? {
      children?: ReactNode;
    }
  : T & {
      children?: ReactNode;
    };

export type Game = {
  id: number;
  index: number;
  name: string;
  slug: string;
  totalRating?: number; // Optional because it's missing in the last game entry
  totalRatingCount?: number; // Optional for the same reason
  hasSavedGame: boolean;
  isFavourite: boolean;
  firstReleaseDate?: string; // Optional because it's missing in the last game entry
  cover?: {
    id: number;
  };
  ageRatings?: AgeRating[]; // Optional because it's missing in the last game entry
};

export type AgeRating = {
  category: AgeRatingCategory;
  checksum: string;
  contentDescriptions?: {
    ids: number[];
  };
  id: number;
  rating: string;
};

export type AgeRatingCategory = 'ESRB' | 'PEGI' | 'CLASS_IND';

export type Rom = {
  platformId: number;
  platform: string;
  emulator: {
    type: string;
    core: string;
    availableWebEmulators: Array<{
      emulatorType: string;
      availableWebEmulatorCores: Array<{
        core: string;
        alternateCoreName: string;
        default: boolean;
      }>;
    }>;
  };
  gameId: number;
  path: string;
  signatureSourceGameTitle: string;
  hasSaveStates: boolean;
  library: {
    id: number;
    name: string;
    path: string;
    defaultPlatformId: number;
    defaultPlatformName: string;
    isDefaultLibrary: boolean;
  };
  id: number;
  name: string;
  size: number;
  crc: string;
  md5: string;
  sha1: string;
  developmentStatus: string;
  attributes: Array<{ key: string; value: string }>;
  romType: string;
  romTypeMedia: string;
  mediaDetail: {}; // More specific type can be used if structure is known
  mediaLabel: string;
  signatureSource: string;
  score: number;
};

export type GameMeta = {
  ageRatings: IDList;
  aggregatedRating: number;
  aggregatedRatingCount: number;
  alternativeNames: IDList;
  artworks: IDList;
  bundles: IDList;
  category: string;
  checksum: string;
  collection: { id: number };
  collections: IDList;
  cover: { id: number };
  createdAt: string;
  externalGames: IDList;
  firstReleaseDate: string;
  gameEngines: IDList;
  gameModes: IDList;
  genres: IDList;
  id: number;
  involvedCompanies: IDList;
  keywords: IDList;
  languageSupports: IDList;
  multiplayerModes: IDList;
  name: string;
  platforms: IDList;
  playerPerspectives: IDList;
  rating: number;
  ratingCount: number;
  releaseDates: IDList;
  screenshots: IDList;
  similarGames: IDList;
  slug: string;
  storyline: string;
  summary: string;
  tags: Array<number>;
  themes: IDList;
  totalRating: number;
  totalRatingCount: number;
  updatedAt: string;
  url: string;
  videos: IDList;
  websites: IDList;
};

export type IDList = {
  ids: Array<number>;
};

export type GetGamesResponse = {
  count: number;
  games: Game[];
  alphaList: {
    [key: string]: number;
  };
};

export type GetRomsResponse = {
  gameRomItems: Rom[];
  count: number;
};
