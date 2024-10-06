import { addHours, format, formatDistance, isAfter, isBefore, isEqual } from "date-fns";
import { BaseContestSchedule, ContestCohort, ContestSchedule } from "../lib/ContestTile/ContestTile.types";
import { AuditStatus, Status } from "../lib/ContestStatus/ContestStatus.types";
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
  if (isBefore(currentTime, botRaceEnd) && (isAfter(currentTime, start) || isEqual(currentTime, start))) {
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

  const currentCohort = cohorts.sort((a, b) => {
    if (a.resumeTime === null) return -1;
    return new Date(a.resumeTime).getTime() - (b.resumeTime ? new Date(b.resumeTime)?.getTime() : 0);
  }).find(cohort => {
    return cohort.pauseTime === null || new Date(cohort.pauseTime).getTime() > now;
  });

  return {
    pauseDate: currentCohort?.pauseTime ? new Date(currentCohort.pauseTime) : null,
    resumeDate: currentCohort?.resumeTime ? new Date(currentCohort.resumeTime) : null,
  }
};

const getContestSchedule = (
  contest: Pick<ContestTileData, "cohorts" | "endDate" | "startDate" | "status">
): ContestSchedule => {
  const schedule = getDates(contest.startDate, contest.endDate);
  const currentCohort = getCurrentCohortDates(contest.cohorts);

  return {
    ...schedule,
    pause: currentCohort.pauseDate && new Date(currentCohort.pauseDate),
    resume: currentCohort.resumeDate && new Date(currentCohort.resumeDate),
    status: contest.status,
  };
}

const getDates = (
  start: string,
  end: string
): BaseContestSchedule => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeZone = DateTime.local().toFormat("ZZZZ");

  const botRaceEnd = addHours(new Date(startDate), 1);
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
