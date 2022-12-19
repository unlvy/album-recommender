export interface Album {
  id: string;
  name: string;
  artist: string;
  year: number;
  genres: string[];
  numTracks: number;
  length: string;
  imageUrl: string;
  averageRating?: number;
  userRating?: number;
  userRated: boolean;
  tempUserRating?: number;
}