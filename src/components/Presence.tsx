/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import {
  LanyardData,
  Activity,
  Spotify,
  Timestamps,
} from "react-use-lanyard/dist";
import Image from "next/image";

const Presence = ({ status }: { status: LanyardData }): JSX.Element => {
  const activity = status.activities.find(
    (activity) => activity.type == 0
  ) as Activity;

  console.log(activity);

  return (
    <div className="h-26 border-t border-[#1C1C1C]">
      <h5 className="m-2 my-3 text-[13px] font-medium text-white/80">
        {activity?.type === 0 ? "Doing Something" : "Listening to"}
      </h5>
      {activity?.type === 0 ? (
        <DiscordActivity activity={activity} />
      ) : (
        <SpotifyActivity spotify={status.spotify as Spotify} />
      )}
    </div>
  );
};

const DiscordActivity = ({ activity }: { activity: any }): JSX.Element => {
  // fix possible bug

  const [elapsed, setElapsed] = useState({
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // fix possible undefined
      const start = activity.timestamps.start;
      const now = new Date().getTime();
      const elapsed = {
        minutes: Math.floor((now - start) / 1000 / 60),
        seconds: Math.floor((now - start) / 1000) % 60,
      };
      setElapsed(elapsed);
    }, 1000);
    return () => clearInterval(interval);
  }, [activity.timestamps.start]);

  const addZero = (num: number) => {
    return num < 10 ? "0" + num : num;
  };

  const bigImage = activity.assets
    ? activity.assets.large_image.startsWith("mp:external")
      ? activity.assets.large_image.replace(
          /mp:external\/([^\/]*)\/(http[s])/g,
          "$2:/"
        )
      : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.webp`
    : "/images/unknown.png";

  const smallImage = activity.assets
    ? activity.assets.small_image.startsWith("mp:external")
      ? activity.assets.small_image.replace(
          /mp:external\/([^\/]*)\/(http[s])/g,
          "$2:/"
        )
      : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.webp`
    : "";

  const bigText = activity.name;
  const smallText = activity.details;
  const state = activity.state;
  // const time = `${addZero(elapsed.minutes)}:${addZero(elapsed.seconds)}`;

  return (
    <div className="flex items-center space-x-4 px-2">
      <div className="relative h-14 w-14">
        <Image
          src={bigImage}
          alt="Activity"
          width={56}
          height={56}
          className="h-full w-full rounded-md"
          draggable={false}
        />
        {smallImage && (
          <Image
            src={smallImage}
            alt="Activity"
            width={20}
            height={20}
            className="absolute -bottom-2 -right-2 rounded-full border border-t-2 border-[#060606]"
            draggable={false}
          />
        )}
      </div>
      <div>
        <h5 className="mb-1 text-sm font-medium">{bigText}</h5>
        <p className="text-xs text-white/80">{smallText}</p>
        <p className="text-xs text-white/80">{state}</p>
        {/* <p className="text-xs text-white/80">{time}</p> */}
      </div>
    </div>
  );
};

const SpotifyActivity = ({ spotify }: { spotify: Spotify }): JSX.Element => {
  const progressBar = document.getElementById("#progressbar");
  const [progress, setProgress] = useState({
    start: 0,
    end: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress({
        start: spotify.timestamps.start,
        end: new Date().getTime(),
      });
    }, 1000);
    if (spotify.timestamps.start === 0 && progressBar) {
      progressBar.style.width = "0%";
    }
    return () => clearInterval(interval);
  }, [progressBar, spotify.timestamps.start]);
  return (
    <div className="flex items-center space-x-4 px-2">
      <div className="relative h-16 w-16">
        <img
          src={spotify.album_art_url}
          alt="Activity"
          width={70}
          height={70}
          className="h-full w-full rounded-md"
          draggable={false}
        />
      </div>
      <div className="flex h-16 w-36 flex-col justify-between">
        <div className="flex flex-col gap-0.5">
          <h5 className="text-sm font-medium">{spotify.song}</h5>
          <p className="text-xs text-white/80">By {spotify.artist}</p>
        </div>
        <div className="h-2 w-full rounded-full bg-[#181919]/70">
          <div
            id="progressbar"
            className="h-1.5 w-6 rounded-full bg-white"
            style={{
              width: `${
                ((progress.end - progress.start) /
                  (spotify.timestamps.end - spotify.timestamps.start)) *
                100
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Presence;
