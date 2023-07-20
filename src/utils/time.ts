import { addHours, format, formatDistance, isAfter, isBefore } from "date-fns";
import { ContestSchedule } from "../components/ContestTile/ContestTile.types";
import { Status } from "../components/ContestStatus/ContestStatus.types";

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
  if (isBefore(currentTime, botRaceEnd) && isAfter(currentTime, start)) {
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
  if (isAfter(currentTime, end)) {
    return {
      botRaceStatus: Status.ENDED,
      contestStatus: Status.ENDED,
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
    formattedBotRaceEnd: format(botRaceEnd, "d MMMM h:mm a"),
    formattedDuration: formatDistance(startDate, endDate),
  };
};

export { getDates };
