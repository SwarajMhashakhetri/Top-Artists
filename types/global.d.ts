
export {};

declare global {
  interface Window {
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume: number;
      }) => any;
    };
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}
