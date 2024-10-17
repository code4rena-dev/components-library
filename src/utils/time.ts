import {
  addHours,
  format,
  formatDistance,
  isAfter,
  isBefore,
  isEqual,
} from "date-fns";
import {
  BaseContestSchedule,
  ContestCohort,
  ContestSchedule,
} from "../lib/ContestTile/ContestTile.types";
import { Status } from "../lib/ContestStatus/ContestStatus.types";
import { ContestTileData } from "../lib/ContestTile/ContestTile.types";
import { DateTime } from "luxon";

function getContestStatuses(
  start: Date,
  end: Date,
  botRaceEnd: Date
): { botRaceStatus?: Status; contestStatus?: Status } {
  const currentTime = new Date();
  if (isBefore(currentTime, start)) {
    return {
      botRaceStatus: Status.UPCOMING,
      contestStatus: Status.UPCOMING,
    };
  }
  if (isAfter(currentTime, end)) {
    return {
      botRaceStatus: Status.ENDED,
      contestStatus: Status.ENDED,
    };
  }
  if (
    isBefore(currentTime, botRaceEnd) &&
    (isAfter(currentTime, start) || isEqual(currentTime, start))
  ) {
    return {
      botRaceStatus: Status.LIVE,
      contestStatus: Status.LIVE,
    };
  }

  if (isAfter(currentTime, botRaceEnd) && isBefore(currentTime, end)) {
    return {
      botRaceStatus: Status.ENDED,
      contestStatus: Status.LIVE,
    };
  }
  return {
    botRaceStatus: undefined,
    contestStatus: undefined,
  };
}

const getCurrentCohortDates = (cohorts: ContestCohort[]) => {
  const now = Date.now();

  const currentCohort = cohorts
    .sort((a, b) => {
      if (a.resumeTime === null) return -1;
      return (
        a.resumeTime.getTime() -
        (b.resumeTime ? b.resumeTime?.getTime() : 0)
      );
    })
    .find((cohort) => {
      return (
        cohort.pauseTime === null || cohort.pauseTime.getTime() > now
      );
    });

  return {
    pauseDate: currentCohort?.pauseTime
      ? currentCohort.pauseTime
      : null,
    resumeDate: currentCohort?.resumeTime
      ? currentCohort.resumeTime
      : null,
  };
};

const getContestSchedule = (
  contest: Pick<ContestTileData, "cohorts" | "endDate" | "startDate" | "status">
): ContestSchedule => {
  const schedule = getDates(contest.startDate, contest.endDate);
  const currentCohort = getCurrentCohortDates(contest.cohorts);

  return {
    ...schedule,
    pause: currentCohort.pauseDate && currentCohort.pauseDate,
    resume: currentCohort.resumeDate && currentCohort.resumeDate,
    status: contest.status,
  };
};

const getDates = (
  start: Date | string,
  end: Date | string
): BaseContestSchedule => {
  let startDate = start;
  let endDate = end;
  if (typeof startDate === "string") startDate = new Date(start);
  if (typeof endDate === "string") endDate = new Date(end);

  const timeZone = DateTime.local().toFormat("ZZZZ");

  const botRaceEnd = addHours(startDate, 1);
  const { contestStatus, botRaceStatus } = getContestStatuses(
    startDate,
    endDate,
    botRaceEnd
  );

  return {
    contestStatus,
    botRaceStatus,
    start: startDate,
    end: endDate,
    botRaceEnd,
    formattedEnd: format(endDate, "d MMM h:mm a"),
    formattedStart: format(startDate, "d MMM h:mm a"),
    timeZone: timeZone,
    formattedBotRaceEnd: format(botRaceEnd, "d MMM h:mm a"),
    formattedDuration: formatDistance(startDate, endDate),
  };
};

export { getDates, getContestSchedule, getCurrentCohortDates };
