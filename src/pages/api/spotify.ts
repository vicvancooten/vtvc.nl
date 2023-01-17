import type { NextApiRequest, NextApiResponse } from "next";
import superagent from "superagent";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

async function getAccessToken(): Promise<string> {
  const { body } = await superagent
    .post("https://accounts.spotify.com/api/token")
    .set("Authorization", `Basic ${basic}`)
    .set("Content-Type", "application/x-www-form-urlencoded")
    .send({
      grant_type: "refresh_token",
      refresh_token,
    });

  const { access_token } = body;

  return access_token;
}

export async function getNowPlaying() {
  const access_token = await getAccessToken();

  const { body, statusCode } = await superagent
    .get("https://api.spotify.com/v1/me/player/currently-playing")
    .set("Authorization", `Bearer ${access_token}`);

  if (statusCode === 204 || statusCode > 400) {
    return {
      isPlaying: false,
    };
  }

  const item = body.item;

  if (!item || item.type === "episode") {
    return {
      isPlaying: false,
    };
  }

  const audioFeatures = await getAudioFeatures(item.id);

  return {
    album: {
      name: item.album.name,
      image: item.album.images[0].url,
      url: item.album.external_urls.spotify,
    },
    artists: (
      item.artists as { name: string; external_urls: { spotify: string } }[]
    ).map(({ name, external_urls: { spotify } }) => ({
      name,
      url: spotify,
    })),
    isPlaying: true,
    track: {
      name: item.name,
      url: item.external_urls.spotify,
      ...audioFeatures,
    },
  };
}

export const getAudioFeatures = async (id: string) => {
  const access_token = await getAccessToken();

  const response = await superagent
    .get(`https://api.spotify.com/v1/audio-features/${id}`)
    .set("Authorization", `Bearer ${access_token}`);

  const features = response.body;

  return {
    beatsPerSecond: features.tempo / 60,
    tempo: features.tempo,
    timeSignature: features.time_signature,
  };
};

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(await getNowPlaying());
};

export default handler;
