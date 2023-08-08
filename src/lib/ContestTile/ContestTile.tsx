import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import wolfbotIcon from "../../../public/icons/wolfbot.svg";
import ellipsisIcon from "../../../public/icons/ellipsis.svg";
import { ContestStatus } from "../ContestStatus/ContestStatus";
import {
  ContestSchedule,
  ContestTileProps,
  ContestTileVariant,
  CountdownProps,
} from "./ContestTile.types";
import { getDates } from "../../utils/time";
import { Status } from "../ContestStatus/ContestStatus.types";
import {
  formatDistanceToNow,
  formatDistanceToNowStrict,
  isBefore,
} from "date-fns";
import { DropdownLink } from "../Dropdown/Dropdown.types";
import { Dropdown } from "../Dropdown/Dropdown";
import "./ContestTile.scss";

/**
 * Contest tile time tracker displayed right next to the contest status in the contest tile footer.
 *
 * @param start - Contest start date string value.
 * @param end - Contest end date string value.
 * @param text - Display text representing time until start of contest or remaining time before end of contest.
 * @param updateContestStatus - callback function to trigger any necessary updates based on timer changes.
 */
const Countdown = ({
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
    const newTimer = getDates(start, end);
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
        const newTimer = getDates(start, end);
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

/**
 * A stylized Code4rena contest tile for displaying information pertaining to upcoming, live, and finalized contests.
 * This component has 2 available variants.
 *
 * __Available variants:__
 * - `LIGHT`
 * - `DARK`
 *
 * @param htmlId - An html `id` for the contest tile's wrapping div.
 * @param variant - Style variant to be applied to rendered component.
 * @param codeAccess - String indicating required access for viewing contest.
 * @param isUserCertified - Boolean indicating certification status of logged in user. Required for viewing certain contests.
 * @param contestId - Unique numerical identifier for the current contest.
 * @param sponsorImage - Image url for contest's sponsor.
 * @param sponsorUrl - External url to the sponsor's page (Twitter, etc.).
 * @param contestUrl - Absolute url or relative path to the page of the current contest.
 * @param contestRepo - Absolute url to the contest's GitHub repository.
 * @param findingsRepo - Absolute url to the contest's findings.
 * @param title - Title for the current contest.
 * @param description - Description for the current contest.
 * @param amount - Reward pool for the current contest.
 * @param status - Active status of the current contest. @see {@link Status}.
 * @param startDate - Date string for the current contest's start date.
 * @param endDate - Date string for the current contest's end date.
 * @param updateContestStatus - Callback function to be triggered on contest time/status changes.
 */
export const ContestTile: React.FC<ContestTileProps> = ({
  htmlId,
  variant,
  codeAccess,
  isUserCertified,
  contestId,
  sponsorImage,
  sponsorUrl,
  contestUrl,
  contestRepo,
  findingsRepo,
  title,
  description,
  amount,
  startDate,
  endDate,
  updateContestStatus,
}) => {
  const [canViewContest, setCanViewContest] = useState(false);
  const [contestTimelineObject, setContestTimelineObject] =
    useState<ContestSchedule>(getDates(startDate, endDate));
  const [dropdownLinks, setDropdownLinks] = useState<DropdownLink[]>([]);
  const [hasBotRace, setHasBotRace] = useState(false);

  const wrapperStyling = clsx({
    c4contesttile: true,
    "tile--light": variant === ContestTileVariant.LIGHT,
    "tile--dark": variant === ContestTileVariant.DARK,
  });

  useEffect(() => {
    setHasBotRace(codeAccess === "public" && contestId !== 252);
  }, [codeAccess, contestId]);

  useEffect(() => {
    if (codeAccess === "public") {
      setCanViewContest(true);
    } else if (codeAccess === "certified" && isUserCertified) {
      setCanViewContest(true);
    } else {
      setCanViewContest(false);
    }
  }, [codeAccess, isUserCertified]);

  useEffect(() => {
    const links: DropdownLink[] = [];
    if (contestTimelineObject.contestStatus !== Status.LIVE) {
      setDropdownLinks(links);
      return;
    }
    if (contestRepo && canViewContest) {
      links.push({
        label: "View Repo",
        href: contestRepo,
        external: true,
        ariaLabel: "Go to audit competition repo (Opens in a new window)",
      });
    }
    if (hasBotRace && isBefore(new Date(), contestTimelineObject.botRaceEnd)) {
      links.push({
        label: "Submit Bot Race report",
        href: `${contestUrl}/submit/bot`,
      });
    }
    if (
      findingsRepo &&
      canViewContest &&
      (!hasBotRace || contestTimelineObject.botRaceStatus === Status.ENDED)
    ) {
      links.push({
        label: "Submit finding",
        href: `${contestUrl}/submit`,
      });
    }
    if (
      findingsRepo &&
      canViewContest &&
      (!hasBotRace || contestTimelineObject.botRaceStatus === Status.ENDED)
    ) {
      links.push({
        label: "Submit Analysis report",
        href: `${contestUrl}/submit/analysis`,
      });
    }
    setDropdownLinks(links);
  }, [
    hasBotRace,
    contestTimelineObject,
    canViewContest,
    findingsRepo,
    contestUrl,
    contestId,
    contestRepo,
  ]);

  useEffect(() => {
    const newTimelineObject = getDates(startDate, endDate);
    setContestTimelineObject(newTimelineObject);
  }, [startDate, endDate]);

  const updateContestTileStatus = useCallback(() => {
    if (updateContestStatus) {
      updateContestStatus();
    }
    const newTimelineObject = getDates(startDate, endDate);
    setContestTimelineObject(newTimelineObject);
  }, [startDate, endDate, updateContestStatus]);

  return (
    <div id={htmlId ?? undefined} className={wrapperStyling}>
      <div className="tile--body">
        <header>
          {sponsorUrl ? (
            <a
              href={sponsorUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="tile--body--logo"
            >
              <img
                alt="Sponsor logo"
                src={sponsorImage ?? "/"}
                width={88}
                height={88}
              />
            </a>
          ) : (
            <img
              alt="Sponsor logo"
              className="tile--body--logo"
              src={sponsorImage ?? "/"}
              width={88}
              height={88}
            />
          )}
          <div>
            <small className="tile--body--period">
              {contestTimelineObject.formattedStart} -{" "}
              {contestTimelineObject.formattedEnd}{" "}
              {contestTimelineObject.timeZone}
            </small>
            <h2 className="tile--body--title">
              <a href={`${contestUrl}#top`}>{title}</a>
            </h2>
            <p className="tile--body--description">
              {description}{" "}
              {hasBotRace &&
                (contestTimelineObject.botRaceStatus === Status.UPCOMING ||
                  contestTimelineObject.botRaceStatus === Status.LIVE) && (
                  <span className="tile--body--botracestatus">
                    <img
                      alt="Wolf bot"
                      src={wolfbotIcon}
                      height={16}
                      width={16}
                    />
                    {contestTimelineObject.botRaceStatus === Status.UPCOMING &&
                      "1st hour: Bot Race"}
                    {contestTimelineObject.botRaceStatus === Status.LIVE &&
                      "Bot Race live"}
                  </span>
                )}
            </p>
          </div>
        </header>
        <p className="tile--body--amount">{amount}</p>
      </div>
      <footer className="tile--footer">
        <div className="tile--footer--details">
          <ContestStatus
            className={`tile--footer--status ${clsx(
              contestTimelineObject.contestStatus === Status.ENDED && "ended"
            )}`}
            status={contestTimelineObject.contestStatus}
          />
          {contestTimelineObject.contestStatus !== Status.ENDED && (
            <p className="tile--footer--timer">
              <Countdown
                start={startDate}
                end={endDate}
                updateContestStatus={updateContestTileStatus}
                text={
                  contestTimelineObject.contestStatus === Status.UPCOMING
                    ? "Starts in "
                    : "Ends in "
                }
              />
            </p>
          )}
        </div>
        <div className="tile--footer--options">
          <a
            className="tile--footer--contestredirect"
            aria-label="View competition"
            href={`${contestUrl}#`}
          >
            {!findingsRepo || findingsRepo === "" ? "Preview" : "View"}{" "}
            competition
          </a>
          {dropdownLinks.length > 0 && (
            <Dropdown
              triggerButton={
                <img
                  src={ellipsisIcon}
                  alt="Options icon"
                  width={32}
                  height={32}
                />
              }
              wrapperClass="tile--footer--dropdown"
              triggerButtonClass="tile--footer--dropdown--trigger"
              triggerAriaLabel="See more contest options"
              hideDownArrow={true}
              openOnHover={true}
            >
              {dropdownLinks?.map((link) =>
                link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={
                      link.ariaLabel ?? `${link.label} (opens in new window)`
                    }
                    className="c4dropdown--button"
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    href={link.href}
                    aria-label={link.ariaLabel ?? link.label}
                    className="c4dropdown--button"
                  >
                    {link.label}
                  </a>
                )
              )}
            </Dropdown>
          )}
        </div>
      </footer>
    </div>
  );
};

ContestTile.defaultProps = {
  htmlId: "",
  /* @ts-ignore */
  variant: "DARK",
  sponsorImage: undefined,
  sponsorUrl: undefined,
};
