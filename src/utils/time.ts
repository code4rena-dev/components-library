import { addHours, format, formatDistance, isAfter, isBefore } from "date-fns";
import { ContestSchedule } from "../lib/ContestTile/ContestTile.types";
import { Status } from "../lib/ContestStatus/ContestStatus.types";
import { DateTime } from "luxon";

function getContestStatuses(
  start: Date,
  end: Date,
  botRaceEnd: Date
): { botRaceStatus?: Status; contestStatus?: Status } {
  const currentTime = new Date();
  if (isBefore(currentTime, start)) {
    return {
      botRaceStatus: "UPCOMING",
      contestStatus: "UPCOMING",
    };
  }
  if (isBefore(currentTime, botRaceEnd) && isAfter(currentTime, start)) {
    return {
      botRaceStatus: "LIVE",
      contestStatus: "LIVE",
    };
  }

  if (isAfter(currentTime, botRaceEnd) && isBefore(currentTime, end)) {
    return {
      botRaceStatus: "ENDED",
      contestStatus: "LIVE",
    };
  }
  if (isAfter(currentTime, end)) {
    return {
      botRaceStatus: "ENDED",
      contestStatus: "ENDED",
    };
  }
  return {
    botRaceStatus: undefined,
    contestStatus: undefined,
  };
}

const getDates = (start: string, end: string): ContestSchedule => {
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
    formattedBotRaceEnd: format(botRaceEnd, "d MMMM h:mm a"),
    formattedDuration: formatDistance(startDate, endDate),
  };
};

export { getDates };
