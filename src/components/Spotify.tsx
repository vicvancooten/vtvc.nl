import { useState, useEffect } from "react";

interface SpotifyType {
  is_playing: boolean;
  item: {
    name: string;
    external_urls: { spotify: string };
    album: { name: string; external_urls: { spotify: string } };
    artists: { name: string; external_urls: { spotify: string } }[];
  };
}

const Spotify = () => {
  const [spotifyInfo, setSpotifyInfo] = useState<SpotifyType>({
    is_playing: false,
    item: {
      name: "...",
      external_urls: { spotify: "https://vtvc.nl" },
      album: { name: "...", external_urls: { spotify: "https://vtvc.nl" } },
      artists: [{ name: "...", external_urls: { spotify: "https://vtvc.nl" } }],
    },
  });

  useEffect(() => {
    const getSpotifyInfo = async () => {
      const response = (await (
        await fetch("/api/spotify")
      ).json()) as unknown as SpotifyType;

      if (response.is_playing) setSpotifyInfo(response);

      // Refresh every 10 seconds if music is playing, every 30 seconds
      setTimeout(() => getSpotifyInfo(), response.is_playing ? 10000 : 30000);
    };

    getSpotifyInfo();
  }, []);

  return spotifyInfo.is_playing ? (
    <>
      <hr />
      <div className="spotify">
        <svg viewBox="0 0 24 24" className="icon">
          <path
            fill="currentColor"
            d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75C5.8,9.9 5.3,9.6 5.15,9.15C5,8.65 5.3,8.15 5.75,8C9.3,6.95 15.15,7.15 18.85,9.35C19.3,9.6 19.45,10.2 19.2,10.65C18.95,11 18.35,11.15 17.9,10.9M17.8,13.7C17.55,14.05 17.1,14.2 16.75,13.95C14.05,12.3 9.95,11.8 6.8,12.8C6.4,12.9 5.95,12.7 5.85,12.3C5.75,11.9 5.95,11.45 6.35,11.35C10,10.25 14.5,10.8 17.6,12.7C17.9,12.85 18.05,13.35 17.8,13.7M16.6,16.45C16.4,16.75 16.05,16.85 15.75,16.65C13.4,15.2 10.45,14.9 6.95,15.7C6.6,15.8 6.3,15.55 6.2,15.25C6.1,14.9 6.35,14.6 6.65,14.5C10.45,13.65 13.75,14 16.35,15.6C16.7,15.75 16.75,16.15 16.6,16.45M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          />
        </svg>
        <p>
          Currently listening to{" "}
          <a
            href={spotifyInfo.item.external_urls.spotify}
            target="_blank"
            rel="noreferrer"
          >
            {spotifyInfo.item.name}
          </a>{" "}
          by{" "}
          <a
            href={spotifyInfo.item.artists[0].external_urls.spotify}
            target="_blank"
            rel="noreferrer"
          >
            {spotifyInfo.item.artists[0].name}
          </a>{" "}
          from the album{" "}
          <a
            href={spotifyInfo.item.album.external_urls.spotify}
            target="_blank"
            rel="noreferrer"
          >
            {spotifyInfo.item.album.name}
          </a>
          .
        </p>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Spotify;
