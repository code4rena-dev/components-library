import { addHours, format, formatDistance, isAfter, isBefore, isEqual } from "date-fns";
import { BaseContestSchedule, ContestCohort, ContestSchedule } from "../lib/ContestTile/ContestTile.types";
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

/** Get a relative date time string in long format
 * @note Mainly for use in countdown situations like the audit timers
 *
 * @examples "In 00:00:05" (5 seconds)
 * "In 00:05:00" (5 minutes)
 * "In 05:00:00" (5 hours)
 * "In 1 day" (1 day)
 * "In 5 days" (5 days)
 * "In about 1 month" (1 month)
 * "In about 5 months" (5 months)
 * "In about 1 year" (1 year)
 * "In about 5 years" (5 years)
 */
const getRelativeDateTimeLongFormat = (date: Date) => {
  let typedDate = date;
  if (typeof date === "string") typedDate = new Date(date);

  const now = new Date();
  // Get the absolute difference
  const diff = Math.abs(typedDate.getTime() - now.getTime());
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 30;
  const years = days / 365;

  if (seconds < 60) return `In 00:00:${Math.floor(seconds)}`;
  if (minutes < 60)
    return `In 00:${Math.floor(minutes)}:${Math.floor(seconds % 60)}`;
  if (hours < 24)
    return `In ${Math.floor(hours)}:${Math.floor(minutes % 60)}:${Math.floor(seconds % 60)}`;
  if (days < 2) return `In 1 day`;
  if (days < 30) return `In ${Math.floor(days)} days`;
  if (months < 2) return `In about 1 month`;
  if (months < 12) return `In about ${Math.floor(months)} months`;
  if (years < 2) return `In about 1 year`;
  return `In about ${Math.floor(years)} years`;
};

export { getDates, getContestSchedule, getCurrentCohortDates, getRelativeDateTimeLongFormat };
