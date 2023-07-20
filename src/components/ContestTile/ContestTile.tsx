import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import "./ContestTile.scss";
import ContestStatus from "../ContestStatus/ContestStatus";
import {
  ContestSchedule,
  ContestTileProps,
  ContestTileVariant,
  CountdownProps,
  DropdownLink,
  DropdownProps,
} from "./ContestTile.types";
import { getDates } from "../../utils/time";
import { Status } from "../ContestStatus/ContestStatus.types";
import { formatDistanceToNow, isBefore } from "date-fns";

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
  const [contestTimer, setContestTimer] = useState<ContestSchedule>();

  const getCountdownTarget = (schedule: ContestSchedule): Date => {
    if (schedule.contestStatus === Status.LIVE) {
      return schedule.end;
    }
    return schedule.start;
  };

  const countDown = useCallback(() => {
    const newTimer = getDates(start, end);
    const target = getCountdownTarget(newTimer);
    return formatDistanceToNow(target, { includeSeconds: true });
  }, [start, end]);

  const [formattedCountdown, setFormattedCountdown] = useState(countDown);

  useEffect(() => {
    const timer = setInterval(() => {
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

      setFormattedCountdown(
        formatDistanceToNow(target, { includeSeconds: true })
      );
    }, 10000); // only up to 10 sec precision
    return () => clearInterval(timer);
  }, [start, end, contestTimer, updateContestStatus]);

  return (
    <div className="countdown">
      {text && text}
      <span>{formattedCountdown}</span>
    </div>
  );
};

/**
 * Dropdown component to display additional options `onHover` of the button generated from the `triggerButton` prop.
 *
 * @param wrapperClass - Additional classes for the dropdown's wrapping div element.
 * @param triggerButtonClass - Additional classes for the dropdown's triggering button.
 * @param openOnHover - Boolean indicating whether or not hovering the trigger button will display the dropdown.
 * @param triggerButton - Children to be wrapped by a `button` element.
 * @param triggerAriaLabel - Accessibility label for the dropdown's trigger button.
 * @param hideDownArrow - Boolean indicating whether or not an arrow indicator should be displayed on the trigger button.
 * @param children - Children to be displayed inside the dropdown.
 */
const Dropdown = ({
  wrapperClass,
  triggerButtonClass,
  openOnHover,
  triggerButton,
  triggerAriaLabel,
  hideDownArrow,
  children,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={openOnHover ? () => setIsOpen(true) : undefined}
      onMouseLeave={openOnHover ? () => setIsOpen(false) : undefined}
      className={clsx("tile--footer--dropdown", wrapperClass && wrapperClass)}
    >
      <button
        aria-label={triggerAriaLabel ?? undefined}
        onClick={() => setIsOpen(!isOpen)}
        onTouchStart={() => setIsOpen(!isOpen)}
        className={clsx(
          "tile--footer--dropdown--trigger",
          triggerButtonClass && triggerButtonClass
        )}
      >
        {triggerButton}
        {!hideDownArrow && (
          <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            className={clsx("dropdown--icon", isOpen && "dropdown--open")}
          >
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
          </svg>
        )}
      </button>
      <div
        className={clsx(isOpen && "dropdown--open", "dropdown--listcontainer")}
      >
        <div className={"dropdown--list"}>{children}</div>
      </div>
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
const ContestTile: React.FC<ContestTileProps> = ({
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
  status,
  startDate,
  endDate,
  updateContestStatus,
}) => {
  const styling = clsx({
    c4contesttile: true,
    "tile--light": variant === ContestTileVariant.LIGHT,
    "tile--dark": variant === ContestTileVariant.DARK,
  });

  const footerOptionsStyling = clsx({
    "certified--visible": codeAccess === "certified" && isUserCertified,
    "certified--invisible": codeAccess === "certified" && !isUserCertified,
  });

  const [canViewContest, setCanViewContest] = useState(false);
  const [contestTimelineObject, setContestTimelineObject] =
    useState<ContestSchedule>(getDates(startDate, endDate));
  const [dropdownLinks, setDropdownLinks] = useState<DropdownLink[]>([]);
  const [hasBotRace, setHasBotRace] = useState(false);

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
    <div id={htmlId ?? undefined} className={styling}>
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
              {contestTimelineObject.formattedEnd}
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
                      src="/icons/wolfbot.svg"
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
          <ContestStatus className="tile--footer--status" status={status} />
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
        </div>
        <a
          className={`tile--footer--contestredirect ${footerOptionsStyling}`}
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
                src="/icons/ellipsis.svg"
                alt="More options"
                width={32}
                height={32}
              />
            }
            triggerAriaLabel="See more contest options"
            hideDownArrow={true}
            openOnHover={true}
          >
            {dropdownLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="dropdown--button"
                  aria-label={link.ariaLabel ?? undefined}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="dropdown--button"
                  aria-label={link.ariaLabel ?? undefined}
                >
                  {link.label}
                </a>
              )
            )}
          </Dropdown>
        )}
      </footer>
    </div>
  );
};

export default ContestTile;
