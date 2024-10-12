export interface Artist {
  id: string;
  name: string;
  uri: string;
  imageUrl: string;
}

export type Track = {
  id: string;
  name: string;
  artist: string;
  album: string;
  imageUrl: string;
  uri: string;
};

