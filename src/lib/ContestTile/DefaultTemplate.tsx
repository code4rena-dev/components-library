import React, { Fragment, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import wolfbotIcon from "../../../public/icons/wolfbot.svg";
import ellipsisIcon from "../../../public/icons/ellipsis.svg";
import { BountyTileData, ContestSchedule, ContestTileData, ContestTileProps, ContestTileVariant } from "./ContestTile.types";
import { DropdownLink, Status } from "../types";
import { ContestStatus } from "../ContestStatus";
import { Countdown } from "./ContestTile";
import { getDates } from "../../utils/time";
import { isBefore } from "date-fns";
import { Dropdown } from "../Dropdown";


export default function DefaultTemplate({
    variant,
    htmlId,
    title,
    description,
    sponsorImage,
    sponsorUrl,
    contestData,
    bountyData,
    hideDropdown,
}: ContestTileProps) {
    const variantClasses = clsx({
      "tile--light": variant === ContestTileVariant.LIGHT,
      "tile--dark": variant === ContestTileVariant.DARK,
    });
    const [hasBotRace, setHasBotRace] = useState(false);
    const [canViewContest, setCanViewContest] = useState(false);
    const [dropdownLinks, setDropdownLinks] = useState<DropdownLink[]>([]);
    const [contestTimelineObject, setContestTimelineObject] = useState<ContestSchedule | undefined>();
    const [bountyTimelineObject, setBountyTimelineObject] = useState<ContestSchedule | undefined>();

    const updateContestTileStatus = useCallback(() => {
      if (contestData) {
          const { updateContestStatus } = contestData;
          if (updateContestStatus) {
              updateContestStatus();
          }
          if (contestData.startDate) {
            const newTimelineObject = getDates(contestData.startDate, contestData.endDate);
            setContestTimelineObject(newTimelineObject);
          }
      }
    }, [contestData])

    const updateBountyTileStatus = useCallback(() => {
      if (bountyData) {
        const { updateBountyStatus } = bountyData;
        if (updateBountyStatus) {
          updateBountyStatus();
        }
        if (bountyData.startDate) {
          const newTimelineObject = getDates(bountyData.startDate, "2999-01-01T00:00:00Z");
          setBountyTimelineObject(newTimelineObject);
        }
      }
    }, [bountyData])

    useEffect(() => {
        if (bountyData && bountyData.startDate) {
          const newTimelineObject = getDates(bountyData.startDate, "2999-01-01T00:00:00Z");
          setBountyTimelineObject(newTimelineObject);
        }

        if (contestData) {
            setHasBotRace(contestData.codeAccess === "public");
            if (contestData.startDate && contestData.endDate) {
              const newTimelineObject = getDates(contestData.startDate, contestData.endDate);
              setContestTimelineObject(newTimelineObject);
            }

            if (contestData.codeAccess === "public") {
              setCanViewContest(true);
            } else if (contestData.codeAccess === "certified" && contestData.isUserCertified) {
              setCanViewContest(true);
            } else {
              setCanViewContest(false);
            }
        }
    }, [contestData])

    useEffect(() => {
      const links: DropdownLink[] = [];

      if (contestData && contestTimelineObject) {
        if (hideDropdown || contestTimelineObject.contestStatus !== Status.LIVE) {
          setDropdownLinks(links);
          return;
        }

        if (contestData?.contestRepo && canViewContest) {
          links.push({
            label: "View repo",
            href: contestData?.contestRepo,
            external: true,
            ariaLabel: "Go to audit competition repo (Opens in a new window)",
          });
        }
        if (hasBotRace && isBefore(new Date(), contestTimelineObject.botRaceEnd)) {
          links.push({
            label: "Submit bot race report",
            href: `${contestData?.contestUrl}/submit/bot`,
          });
        }
        if (
          contestData.findingsRepo &&
          canViewContest &&
          (!hasBotRace || contestTimelineObject.botRaceStatus === Status.ENDED)
        ) {
          links.push({
            label: "Submit finding",
            href: `${contestData?.contestUrl}/submit`,
          });
        }
        if (
          contestData.findingsRepo &&
          canViewContest &&
          (!hasBotRace || contestTimelineObject.botRaceStatus === Status.ENDED)
        ) {
          links.push({
            label: "Submit Analysis report",
            href: `${contestData?.contestUrl}/submit/analysis`,
          });
        }
        setDropdownLinks(links);
      }
    }, [
      contestData,
      hasBotRace,
      contestTimelineObject,
      canViewContest,
      hideDropdown,
    ]);

    return (
      <div className={clsx("c4tilewrapper", variantClasses)}>
          <div id={htmlId ?? undefined} className={clsx('c4contesttile', variantClasses)}>
              <div className="container--inner default-content">
                  {contestData && <IsContest
                      title={title}
                      description={description}
                      sponsorUrl={sponsorUrl}
                      sponsorImage={sponsorImage}
                      contestData={contestData}
                      hasBotRace={hasBotRace}
                      dropdownLinks={dropdownLinks}
                      contestTimelineObject={contestTimelineObject}
                      updateContestTileStatus={updateContestTileStatus}
                  />}
                  {bountyData && <IsBounty
                    title={title}
                    description={description}
                    sponsorUrl={sponsorUrl}
                    sponsorImage={sponsorImage}
                    bountyData={bountyData}
                    bountyTimelineObject={bountyTimelineObject}
                    updateBountyTileStatus={updateBountyTileStatus}
                  />}
              </div>
          </div>
      </div>
    )
}

function renderDropdown(links: {
  label: string;
  href: string;
  external?: boolean;
  ariaLabel?: string;
}[]) {
  return links.length > 0 && (
    <Dropdown
      triggerButton={
        <img
          src={ellipsisIcon}
          alt="Options icon"
          width={32}
          height={32}
        />
      }
      wrapperClass="c4contesttile--dropdown"
      triggerButtonClass="c4contesttile--dropdown--trigger"
      triggerAriaLabel="See more contest options"
      hideDownArrow={true}
      openOnHover={true}
    >
      {links?.map((link, index) =>
        link.external ? (
          <a
            key={`${link.label}-${index}`}
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
            key={`${link.label}-${index}`}
            href={link.href}
            aria-label={link.ariaLabel ?? link.label}
            className="c4dropdown--button"
          >
            {link.label}
          </a>
        )
      )}
    </Dropdown>
  )
}

function IsContest({
    title,
    description,
    sponsorUrl,
    sponsorImage,
    contestData,
    hasBotRace,
    dropdownLinks,
    updateContestTileStatus,
    contestTimelineObject
}: {
    title: string;
    description: string;
    sponsorUrl?: string;
    sponsorImage?: string;
    hasBotRace: boolean;
    contestData: ContestTileData;
    dropdownLinks: {
        label: string;
        href: string;
        external?: boolean;
        ariaLabel?: string;
    }[]
    updateContestTileStatus: () => void;
    contestTimelineObject: ContestSchedule | undefined;
}) {
  const { contestUrl, amount, findingsRepo, startDate, endDate } = contestData;

  return (
    <Fragment>
      <div className="body--contest">
          <header>
              {/* Sponsor Image */}
              {sponsorUrl ? (
                  <a
                    href={sponsorUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="logo"
                    onClick={(e) => e.stopPropagation()}
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
                    className="logo"
                    src={sponsorImage ?? "/"}
                    width={88}
                    height={88}
                  />
              )}
              <div className="content--wrapper">
                  {/* Contest availability period */}
                  <small className="period">
                  {contestTimelineObject && <Fragment>
                      {contestTimelineObject.formattedStart} -{" "}
                      {contestTimelineObject.formattedEnd}{" "}
                      {contestTimelineObject.timeZone}
                  </Fragment>}
                  </small>
                  {/* Contest title */}
                  <h2 className="title">
                    <a
                      href={contestUrl}
                      onClick={(e) => e.stopPropagation()}  
                    >
                      {title}
                    </a>
                  </h2>
                  {/* Contest description */}
                  <p className="description">
                     {description}{" "}
                     {hasBotRace && contestTimelineObject &&
                        (contestTimelineObject.botRaceStatus === Status.UPCOMING ||
                        contestTimelineObject.botRaceStatus === Status.LIVE) && (
                        <span className="bot-race-status">
                            <img
                              alt="Wolf bot"
                              src={wolfbotIcon}
                              height={16}
                              width={16}
                            />
                            {contestTimelineObject.botRaceStatus ===
                            Status.UPCOMING && "1st hour: Bot Race"}
                            {contestTimelineObject.botRaceStatus === Status.LIVE &&
                            "Bot Race live"}
                        </span>
                      )}
                  </p>
              </div>
          </header>
          {/* Reward pool amount */}
          <p className="amount">{amount}</p>
      </div>
      {/* Contest tile footer */}
      <footer className={clsx("footer--contest", contestTimelineObject && contestTimelineObject.contestStatus === Status.ENDED && "ended" )}>
        <div className="details">
          {contestTimelineObject && <ContestStatus
              className={`status ${clsx(
                contestTimelineObject.contestStatus === Status.ENDED && "ended"
              )}`}
              status={contestTimelineObject.contestStatus}
          />}
          {contestData && contestTimelineObject && contestTimelineObject.contestStatus !== Status.ENDED && (
              <div className="timer">
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
              </div>
          )}
        </div>
        <div className="options">
          <a
            className="contest-redirect"
            aria-label={"View " + title + " audit"}
            href={contestUrl}
            onClick={(e) => e.stopPropagation()}
          >
            {!findingsRepo || findingsRepo === "" ? "Preview" : "View"} audit
          </a>
          {renderDropdown(dropdownLinks)}
        </div>
      </footer>
    </Fragment>
  )
}

function IsBounty({
  title,
  description,
  sponsorUrl,
  sponsorImage,
  bountyData,
  updateBountyTileStatus,
  bountyTimelineObject
}: {
  title: string;
  description: string;
  sponsorUrl?: string;
  sponsorImage?: string;
  bountyData: BountyTileData;
  updateBountyTileStatus?: () => void;
  bountyTimelineObject?: ContestSchedule | undefined;
}) {
  const { bountyUrl, amount, startDate } = bountyData;
  const endDate = "2999-01-01T00:00:00Z"

    return (
      <Fragment>
        <div className="body--bounty">
          <header>
            {/* Sponsor Image */}
            {sponsorUrl ? (
                <a
                  href={sponsorUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="logo"
                  onClick={(e) => e.stopPropagation()}
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
                  className="logo"
                  src={sponsorImage ?? "/"}
                  width={88}
                  height={88}
                />
            )}
            <div className="content--wrapper">
                {/* Contest title */}
                <h2 className="title">
                  <a
                    href={bountyUrl}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {title}
                  </a>
                </h2>
                {/* Contest description */}
                <p className="description">
                  {description}
                </p>
            </div>
          </header>
          {/* Reward pool amount */}
          <div className="bounty-award">
            <p className="amount">{amount}</p>
            <p>Max award</p>
          </div>
        </div>
        {/* Contest tile footer */}
        <footer className={clsx("footer--bounty", bountyTimelineObject && bountyTimelineObject.contestStatus === Status.LIVE && "live")}>
          <div className="details">
              {bountyTimelineObject && <ContestStatus
                className={`status ${clsx(
                  bountyTimelineObject.contestStatus !== Status.UPCOMING && "bounty"
                )}`}
                status={bountyTimelineObject.contestStatus}
              />}
              {bountyData && bountyTimelineObject && bountyTimelineObject.contestStatus === Status.UPCOMING && (
                <div className="timer">
                  <Countdown
                      start={startDate}
                      end={endDate}
                      updateContestStatus={updateBountyTileStatus}
                      text="Starts in "
                  />
                </div>
              )}
          </div>
          <div className="options">
            <a
              className="contest-redirect"
              aria-label="View bounty"
              href={bountyUrl}
              onClick={(e) => e.stopPropagation()}
            >
              View details
            </a>
          </div>
        </footer>
      </Fragment>
    )
}