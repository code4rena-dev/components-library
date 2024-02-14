import React, { useCallback, useEffect, useState } from 'react';
import clsx from "clsx";
import { BountyTileData, ContestSchedule, ContestTileData, ContestTileProps, ContestTileVariant } from "./ContestTile.types";
import { Status, TagSize, TagVariant } from '../types';
import { ContestStatus } from '../ContestStatus';
import { Countdown } from './ContestTile';
import { getDates } from '../../utils/time';
import { Tag } from '../Tag';
import { Icon } from '../Icon';
import wolfbotIcon from "../../../public/icons/wolfbot.svg";

export default function CompactTemplate({
  variant,
  htmlId,
  title,
  sponsorImage,
  sponsorUrl,
  contestData,
  bountyData
}: ContestTileProps) {
    const variantClasses = clsx({
      "compact--light": variant === ContestTileVariant.COMPACT_LIGHT,
      "compact--dark": variant === ContestTileVariant.COMPACT_DARK,
    });
    const isDarkTile = variant === ContestTileVariant.DARK || variant === ContestTileVariant.COMPACT_DARK;

    const tileClasses = clsx({
      c4contesttile: true,
      compact: true
    });
      
    return <div className={clsx("c4tilewrapper", variantClasses)}>
      <div id={htmlId ?? undefined} className={clsx(variantClasses, tileClasses)}>
        <div className="container--inner compact-content">
          {contestData && <IsContest
            isDarkTile={isDarkTile}
            title={title}
            contestData={contestData}
            sponsorUrl={sponsorUrl}
            sponsorImage={sponsorImage} />}
          {bountyData && <IsBounty
            isDarkTile={isDarkTile}
            title={title}
            bountyData={bountyData}
            sponsorUrl={sponsorUrl}
            sponsorImage={sponsorImage}
          />}
        </div>
      </div>
    </div>
}


const IsContest = ({title, isDarkTile = true, contestData, sponsorUrl, sponsorImage}: {
  title: string;
  isDarkTile: boolean;
  contestData: ContestTileData;
  sponsorUrl: string | undefined;
  sponsorImage: string | undefined;
}) => {
  const { startDate, endDate, amount, contestUrl, contestType, ecosystem, languages } = contestData;
  const [contestTimelineObject, setContestTimelineObject] = useState<ContestSchedule | undefined>();
  const [hasBotRace, setHasBotRace] = useState(contestData ? !!contestData.botFindingsRepo : false);
  let ecosystemLogoName: string = "";
  if (ecosystem && (ecosystem === "Polkadot" || ecosystem === "Ethereum")) {
    ecosystemLogoName = `logo-${ecosystem.toLowerCase()}`
  }

  const updateContestTileStatus = useCallback(() => {
    if (contestData) {
      const { updateContestStatus } = contestData;
      if (updateContestStatus) {
        updateContestStatus();
      }

      if (startDate && endDate) {
        const newTimelineObject = getDates(contestData.startDate, contestData.endDate);
        setContestTimelineObject(newTimelineObject);
      }
    }
  }, [contestData]);

  useEffect(() => {
    if (contestData && startDate && endDate) {
      const newTimelineObject = getDates(startDate, endDate);
      setContestTimelineObject(newTimelineObject);
    }
  }, [contestData])

  return (
    <div className="body--contest">
      <header>
        <div className="header--status">
          {contestData && contestTimelineObject && <span>
            <ContestStatus className={clsx('status', contestTimelineObject.contestStatus === Status.ENDED && 'ended')}
              status={contestTimelineObject.contestStatus} />
            {contestTimelineObject.contestStatus !== Status.ENDED && (
              <div className="timer">
                <Countdown
                  start={startDate}
                  end={endDate}
                  updateContestStatus={updateContestTileStatus}
                  text={contestTimelineObject.contestStatus === Status.UPCOMING ? 'Starts in ' : 'Ends in '}
                />
              </div>
            )}  
          </span>}
          <p className="type">
            {contestType === "Audit + mitigation review"
              ? "Audit"
              : contestType}
          </p>
        </div>
      </header>
      <div className="content--wrapper">
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
        <div className="content">
          <h2 className="title">
            <a
              href={contestUrl}
              onClick={(e) => e.stopPropagation()}
            >
              {title}
            </a>
          </h2>
        </div>
        <p className="amount">{amount}</p>
      </div>
      {((hasBotRace && contestTimelineObject && (contestTimelineObject.botRaceStatus === Status.UPCOMING ||
          contestTimelineObject.botRaceStatus === Status.LIVE)) || ecosystem || languages?.length > 0) && <div className="tags">
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
          iconLeft={ecosystemLogoName ? <Icon name={ecosystemLogoName} size="small" color="white" /> : undefined}
          size={TagSize.NARROW}
        />}
        {languages
          && languages.length > 0
          && languages.map((language) => <Tag
            variant={isDarkTile ? TagVariant.DEFAULT : TagVariant.WHITE_OUTLINE}
            label={language}
            size={TagSize.NARROW}
          />
        )}
      </div>}
    </div>
)}

const IsBounty = ({title, isDarkTile = true, bountyData, sponsorUrl, sponsorImage}: {
  title: string;
  isDarkTile: boolean;
  bountyData: BountyTileData;
  sponsorUrl: string | undefined;
  sponsorImage: string | undefined;
}) => {
  const { amount, bountyUrl, ecosystem, languages } = bountyData;
  let ecosystemLogoName: string = "";
  if (ecosystem && (ecosystem === "Polkadot" || ecosystem === "Ethereum")) {
    ecosystemLogoName = `logo-${ecosystem.toLowerCase()}`
  }

  return (
    <div className="body--bounty">
      <header>
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
        <h2 className="title">
          <a
            href={bountyUrl}
            onClick={(e) => e.stopPropagation()}
          >
            {title}
          </a>
        </h2>
        <p className="type">Bug Bounty</p>
      </header>
      <div className="content--wrapper">
        <strong>Max Bounty</strong>
        <p className="amount">{amount}</p>
      </div>
      {(ecosystem || languages?.length > 0) && <div className="tags">
        {bountyData.ecosystem && <Tag
          variant={isDarkTile ? TagVariant.DEFAULT : TagVariant.WHITE_OUTLINE}
          label={bountyData.ecosystem}
          iconLeft={ecosystemLogoName ? <Icon name={ecosystemLogoName} size="small" color="white" /> : undefined}
          size={TagSize.NARROW}
        />}
        {bountyData.languages
          && bountyData.languages.length > 0
          && bountyData.languages.map((language) => <Tag
          variant={isDarkTile ? TagVariant.DEFAULT : TagVariant.WHITE_OUTLINE}
          label={language}
          size={TagSize.NARROW} />
        )}
      </div>}
    </div>
)}