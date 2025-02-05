import React, { Fragment, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import wolfbotIcon from "../../../public/icons/wolfbot.svg";
import { BaseContestSchedule, BountyTileData, ContestSchedule, ContestTileData, ContestTileProps, ContestTileVariant } from "./ContestTile.types";
import { DropdownLink, Status, TagSize, TagVariant } from "../types";
import { ContestStatus } from "../ContestStatus";
import { Countdown } from "./ContestTile";
import { getDates, getContestSchedule } from "../../utils/time";
import { isBefore } from "date-fns";
import { Dropdown } from "../Dropdown";
import { Icon } from "../Icon";
import { Tag } from "../Tag";
import { AuditStatusSection } from "../ContestStatus/AuditStatusSection";

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
    const isDarkTile = variant === ContestTileVariant.DARK || variant === ContestTileVariant.COMPACT_DARK
    const [hasBotRace, setHasBotRace] = useState(false);
    const [canViewContest, setCanViewContest] = useState(false);
    const [dropdownLinks, setDropdownLinks] = useState<DropdownLink[]>([]);
    const [contestTimelineObject, setContestTimelineObject] = useState<ContestSchedule | undefined>();
    const [bountyTimelineObject, setBountyTimelineObject] = useState<BaseContestSchedule | undefined>();

    const updateContestTileStatus = useCallback(() => {
      if (contestData) {
          const { updateContestStatus } = contestData;
          if (updateContestStatus) {
              updateContestStatus();
          }
          if (contestData.startDate) {
            const newTimelineObject = getContestSchedule(contestData);
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
        const newTimelineObject = getDates(
          bountyData.startDate,
          "2999-01-01T00:00:00Z"
        );
        setBountyTimelineObject(newTimelineObject);
      }

      if (contestData) {
        setHasBotRace(!!contestData.botFindingsRepo);
        if (contestData.startDate && contestData.endDate) {
          const newTimelineObject = getContestSchedule(
            contestData
          );
          setContestTimelineObject(newTimelineObject);
        }

        if (contestData.codeAccess === "public") {
          setCanViewContest(true);
        } else if (
          contestData.codeAccess === "certified" &&
          contestData.isUserCertified
        ) {
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
                      isDarkTile={isDarkTile}
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
                    isDarkTile={isDarkTile}
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
        <Icon name="more-horizontal" size="large" color="white" />
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
    isDarkTile = true,
    updateContestTileStatus,
    contestTimelineObject
}: {
    title: string;
    description: string;
    sponsorUrl?: string;
    sponsorImage?: string;
    hasBotRace: boolean;
    contestData: ContestTileData;
    isDarkTile: boolean;
    dropdownLinks: {
        label: string;
        href: string;
        external?: boolean;
        ariaLabel?: string;
    }[]
    updateContestTileStatus: () => void;
    contestTimelineObject: ContestSchedule | undefined;
}) {
  const {
    contestUrl,
    amount,
    findingsRepo,
    startDate,
    endDate,
    ecosystem,
    languages,
    status,
  } = contestData;
  let ecosystemLogoName: string = "";
  if (ecosystem) {
    switch (ecosystem) {
      case "Polkadot":
      case "Blast":
        ecosystemLogoName = `logo-${ecosystem.toLowerCase()}`;
        break;
      default:
        ecosystemLogoName = "";
        break;
    }
  }

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
                  <div className="description">
                      {description}{" "}
                      {((hasBotRace && contestTimelineObject && (contestTimelineObject.botRaceStatus === Status.UPCOMING ||
                          contestTimelineObject.botRaceStatus === Status.LIVE))
                          || ecosystem
                          || (languages && languages.length > 0)) && <div className="tags">
                        {hasBotRace && contestTimelineObject &&
                          (contestTimelineObject.botRaceStatus === Status.UPCOMING ||
                          contestTimelineObject.botRaceStatus === Status.LIVE) && (
                          <Tag
                            variant={isDarkTile ? TagVariant.DEFAULT : TagVariant.WHITE_OUTLINE}
                            label={contestTimelineObject.botRaceStatus === Status.LIVE ? "Bot Race live" : "1st hour: Bot Race"}
                            iconLeft={wolfbotIcon}
                            size={TagSize.NARROW}
                          />
                        )}
                        {ecosystem && <Tag
                          variant={isDarkTile ? TagVariant.DEFAULT : TagVariant.WHITE_OUTLINE}
                          label={ecosystem}
                          iconLeft={ecosystemLogoName ? <Icon name={ecosystemLogoName} size="medium" color="white" /> : undefined}
                          size={TagSize.NARROW}
                        />}
                        {languages
                          && languages.length > 0
                          && languages.map((language) => <Tag
                          key={language}
                          variant={isDarkTile ? TagVariant.DEFAULT : TagVariant.WHITE_OUTLINE}
                          label={language}
                          size={TagSize.NARROW} />
                        )}
                      </div>}
                  </div>
              </div>
          </header>
          {/* Reward pool amount */}
          <p className="amount">{amount}</p>
      </div>
      {/* Contest tile footer */}
      <footer className={clsx("footer--contest", contestTimelineObject && contestTimelineObject.contestStatus === Status.ENDED && "ended" )}>
        <AuditStatusSection 
          auditStatus={status}
          endTime={endDate}
          startTime={startDate}
        />
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
  isDarkTile = true,
  updateBountyTileStatus,
  bountyTimelineObject
}: {
  title: string;
  description: string;
  sponsorUrl?: string;
  sponsorImage?: string;
  bountyData: BountyTileData;
  isDarkTile: boolean;
  updateBountyTileStatus?: () => void;
  bountyTimelineObject?: BaseContestSchedule | undefined;
}) {
  const { bountyUrl, amount, startDate, ecosystem, languages } = bountyData;
  const endDate = "2999-01-01T00:00:00Z"
  let ecosystemLogoName: string = "";
  if (ecosystem) {
    switch (ecosystem) {
      case "Polkadot":
      case "Blast":
        ecosystemLogoName = `logo-${ecosystem.toLowerCase()}`;
        break;
      default:
        ecosystemLogoName = "";
        break;
    }
  }

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
              <div className="description">
                {description}
                {(ecosystem || (languages && languages.length > 0)) && <div className="tags">
                  {ecosystem && <Tag
                    variant={isDarkTile ? TagVariant.DEFAULT : TagVariant.WHITE_OUTLINE}
                    label={ecosystem}
                    iconLeft={ecosystemLogoName ? <Icon name={ecosystemLogoName} size="medium" color="white" /> : undefined}
                    size={TagSize.NARROW}
                  />}
                  {languages
                    && languages.length > 0
                    && languages.map((language) => <Tag
                    key={language}
                    variant={isDarkTile ? TagVariant.DEFAULT : TagVariant.WHITE_OUTLINE}
                    label={language}
                    size={TagSize.NARROW} />
                  )}
                </div>}
              </div>
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