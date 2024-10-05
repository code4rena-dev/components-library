import React, { useCallback, useEffect, useState } from "react";
import {
  ContestSchedule,
  ContestTileProps,
  ContestTileVariant,
  CountdownProps,
} from "./ContestTile.types";
import { getDates } from "../../utils/time";
import { Status } from "../ContestStatus/ContestStatus.types";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import "./ContestTile.scss";
import CompactTemplate from "./CompactTemplate";
import DefaultTemplate from "./DefaultTemplate";

/**
 * Contest tile time tracker displayed right next to the contest status in the contest tile footer.
 *
 * @param start - Contest start date string value.
 * @param end - Contest end date string value.
 * @param text - Display text representing time until start of contest or remaining time before end of contest.
 * @param updateContestStatus - callback function to trigger any necessary updates based on timer changes.
 */
export const Countdown = ({
  start,
  end,
  text,
  updateContestStatus,
}: CountdownProps) => {
  const secondsInDay = 86400;
  const [lessThan24h, setLessThan24h] = useState(false);
  const [contestTimer, setContestTimer] = useState<ContestSchedule>();

  const getCountdownTarget = (schedule: ContestSchedule): Date => {
    if (schedule.contestStatus === Status.LIVE) {
      return schedule.end;
    }
    return schedule.start;
  };

  /**
   * Formats the remaining time to display in Hours:Minutes:Seconds whenever there is less than a day remaining for a contest.
   *
   * @param secondsText - Text string returned from formatDistanceToNowStrict method from date-fns with the unit option set to seconds.
   *
   * @returns a formatted date string.
   */
  function formatSeconds(secondsText: string) {
    let secsToNum = Number(secondsText.split(" ")[0]);
    const hours = Math.floor(secsToNum / 3600);
    secsToNum %= 3600;
    const minutes = Math.floor(secsToNum / 60);
    secsToNum %= 60;

    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${secsToNum < 10 ? `0${secsToNum}` : secsToNum}`;
  }

  const countDown = useCallback(() => {
    const newTimer = getDates(start, end, []);
    const target = getCountdownTarget(newTimer);
    // Get total number of seconds remaining
    const totalSeconds = formatDistanceToNowStrict(target, {
      unit: "second",
    }).split(" ")[0];
    if (Number(totalSeconds) > secondsInDay) {
      return formatDistanceToNow(target, { includeSeconds: true });
    } else {
      setLessThan24h(true);
      return formatSeconds(
        formatDistanceToNowStrict(target, { unit: "second" })
      );
    }
  }, [start, end]);

  const [formattedCountdown, setFormattedCountdown] = useState(countDown);

  useEffect(() => {
    const timer = setInterval(
      () => {
        const newTimer = getDates(start, end, []);
        if (
          contestTimer &&
          (contestTimer.contestStatus !== newTimer.contestStatus ||
            contestTimer.botRaceStatus !== newTimer.botRaceStatus)
        ) {
          setContestTimer(newTimer);
          if (updateContestStatus) {
            updateContestStatus();
          }
        }
        if (newTimer.contestStatus === Status.ENDED) {
          clearInterval(timer);
          return;
        }
        const target = getCountdownTarget(newTimer);
        // Get total number of seconds remaining
        const totalSeconds = formatDistanceToNowStrict(target, {
          unit: "second",
        }).split(" ")[0];
        // If more than 24 hours are remaining, show days remaining
        if (Number(totalSeconds) > secondsInDay) {
          setFormattedCountdown(
            formatDistanceToNow(target, { includeSeconds: true })
          );
        } else {
          // If less than 24 hours are remaining, update countdown every second
          setLessThan24h(true);
          setFormattedCountdown(
            formatSeconds(formatDistanceToNowStrict(target, { unit: "second" }))
          );
        }
      },
      lessThan24h ? 1000 : 10000
    ); // 10 second precision if more than 1 day remaining, else 1 second precision`
    return () => clearInterval(timer);
  }, [lessThan24h, start, end, contestTimer, updateContestStatus]);

  return (
    <div className="countdown">
      {text && text}
      <span>{formattedCountdown}</span>
    </div>
  );
};

export const ContestCountdown = ({
  schedule,
  updateContestStatus
}: {
  schedule: ContestSchedule,
  updateContestStatus: CountdownProps["updateContestStatus"]
}) => {
  let text = "Ends in ";
  let start = schedule.start.toISOString();
  let end = schedule.end.toISOString();
  if (schedule.contestStatus === Status.UPCOMING) {
    text = "Starts in ";
  } else if (schedule.contestStatus === Status.LIVE) {
    if (schedule.resume && +schedule.resume >= Date.now()) {
      text = "Cohort resumes in ";
      start = schedule.resume.toISOString();
    } else if (schedule.pause && +schedule.pause >= Date.now()) {
      text = "Cohort pauses in ";
      end = schedule.pause.toISOString();
    }
  }
  return Countdown({
    start,
    end,
    text,
    updateContestStatus,
  });
};

/**
 * A stylized Code4rena contest tile for displaying information pertaining to upcoming, live, and finalized contests.
 * This component has 4 available variants.
 *
 * __Available variants:__
 * - `LIGHT`
 * - `DARK`
 * - `COMPACT_LIGHT`
 * - `COMPACT_DARK`
 *
 * @param htmlId - An html `id` for the contest tile's wrapping div.
 * @param variant - Style variant to be applied to rendered component.
 * @param contestData - Information required for rendering a contest tile. For bug bounty tiles see `bountyData` prop.
 * @param bountyData - Information required for rendering a bounty tile. For contest tiles see `contestData` prop.
 * @param sponsorImage - Image url for contest's sponsor.
 * @param sponsorUrl - External url to the sponsor's page (Twitter, etc.).
 * @param title - Title for the current contest.
 * @param description - Description for the current contest.
 */
export const ContestTile = ({
  htmlId = "",
  variant = ContestTileVariant.DARK,
  contestData,
  bountyData,
  sponsorImage = undefined,
  sponsorUrl = undefined,
  title,
  description,
  hideDropdown = false,
}: ContestTileProps) => {
  const isDefault =
    variant === ContestTileVariant.DARK || variant === ContestTileVariant.LIGHT;

  useEffect(() => {
    // Loads polyfill to support container queries in older browsers.
    const loadContainerQueryPolyfill = () => {
      const supportsContainerQueries =
        "container" in document.documentElement.style;
      if (!supportsContainerQueries) {
        // @ts-ignore
        import("container-query-polyfill");
      }
    };

    loadContainerQueryPolyfill();
  }, []);

  return isDefault ? (
    <DefaultTemplate
      variant={variant}
      htmlId={htmlId}
      title={title}
      description={description}
      sponsorImage={sponsorImage}
      sponsorUrl={sponsorUrl}
      contestData={contestData}
      bountyData={bountyData}
      hideDropdown={hideDropdown}
    />
  ) : (
    <CompactTemplate
      variant={variant}
      htmlId={htmlId}
      title={title}
      description={description}
      sponsorImage={sponsorImage}
      sponsorUrl={sponsorUrl}
      contestData={contestData}
      bountyData={bountyData}
    />
  );
};
