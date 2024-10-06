import { describe, expect, test } from "@jest/globals";
import { addHours, format } from "date-fns";
import { DateTime } from "luxon";
import { getContestSchedule, getCurrentCohortDates } from "./time";
import { AuditStatus, ContestCohort, Status } from "../types";

describe("utils/time", () => {
  describe("getCurrentCohortDates", () => {
    test("gets the correct, current cohort", () => {
      // First cohort
      let cohorts:ContestCohort[] = [{
        name: "cohort-1",
        resumeTime: null,
        pauseTime: new Date(Date.now() + 1000).toISOString(),
      }, {
        name: "cohort-2",
        resumeTime: new Date(Date.now() + 2000).toISOString(),
        pauseTime: new Date(Date.now() + 3000).toISOString(),
      }, {
        name: "cohort-3",
        resumeTime: new Date(Date.now() + 4000).toISOString(),
        pauseTime: null,
      }];
      let dates = getCurrentCohortDates(cohorts);

      expect(dates).toStrictEqual({
        resumeDate: null,
        pauseDate: new Date(cohorts[0].pauseTime!),
      });

      // Upcoming 2nd cohort
      cohorts = [{
        name: "cohort-1",
        resumeTime: null,
        pauseTime: new Date(Date.now() - 2000).toISOString(),
      }, {
        name: "cohort-2",
        resumeTime: new Date(Date.now() + 1000).toISOString(),
        pauseTime: new Date(Date.now() + 2000).toISOString(),
      }, {
        name: "cohort-3",
        resumeTime: new Date(Date.now() + 3000).toISOString(),
        pauseTime: null,
      }];
      dates = getCurrentCohortDates(cohorts);

      expect(dates).toStrictEqual({
        resumeDate: new Date(cohorts[1].resumeTime!),
        pauseDate: new Date(cohorts[1].pauseTime!),
      });

      // Active 2nd cohort
      cohorts = [{
        name: "cohort-1",
        resumeTime: null,
        pauseTime: new Date(Date.now() - 2000).toISOString(),
      }, {
        name: "cohort-2",
        resumeTime: new Date(Date.now() - 1000).toISOString(),
        pauseTime: new Date(Date.now() + 2000).toISOString(),
      }, {
        name: "cohort-3",
        resumeTime: new Date(Date.now() + 3000).toISOString(),
        pauseTime: null,
      }];
      dates = getCurrentCohortDates(cohorts);

      expect(dates).toStrictEqual({
        resumeDate: new Date(cohorts[1].resumeTime!),
        pauseDate: new Date(cohorts[1].pauseTime!)
      });

      // Upcoming 3rd
      cohorts = [{
        name: "cohort-1",
        resumeTime: null,
        pauseTime: new Date(Date.now() - 4000).toISOString(),
      }, {
        name: "cohort-2",
        resumeTime: new Date(Date.now() - 3000).toISOString(),
        pauseTime: new Date(Date.now() - 1000).toISOString(),
      }, {
        name: "cohort-3",
        resumeTime: new Date(Date.now() + 1000).toISOString(),
        pauseTime: null,
      }];
      dates = getCurrentCohortDates(cohorts);

      expect(dates).toStrictEqual({
        resumeDate: new Date(cohorts[2].resumeTime!),
        pauseDate: null,
      });

      // Active 3rd
      cohorts = [{
        name: "cohort-1",
        resumeTime: null,
        pauseTime: new Date(Date.now() - 4000).toISOString(),
      }, {
        name: "cohort-2",
        resumeTime: new Date(Date.now() - 3000).toISOString(),
        pauseTime: new Date(Date.now() - 2000).toISOString(),
      }, {
        name: "cohort-3",
        resumeTime: new Date(Date.now() - 1000).toISOString(),
        pauseTime: null,
      }];
      dates = getCurrentCohortDates(cohorts);

      expect(dates).toStrictEqual({
        resumeDate: new Date(cohorts[2].resumeTime!),
        pauseDate: null,
      });
    });
  });
  describe("getDates", () => {
    test("gets the correct dates for an upcoming audit", () => {
      const cohorts = [{
        name: "cohort-1",
        resumeTime: null,
        pauseTime: new Date(Date.now() + 2000).toISOString(),
      }, {
        name: "cohort-2",
        resumeTime: new Date(Date.now() + 3000).toISOString(),
        pauseTime: new Date(Date.now() + 4000).toISOString(),
      }, {
        name: "cohort-3",
        resumeTime: new Date(Date.now() + 5000).toISOString(),
        pauseTime: null,
      }];
      const start = new Date(Date.now() + 1000);
      const end = new Date(Date.now() + 6000);

      const dates = getContestSchedule({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        cohorts,
        status: AuditStatus.PreAudit
      });
      const expectedBotRaceEnd = addHours(start, 1);
      expect(dates).toStrictEqual({
        botRaceEnd: expectedBotRaceEnd,
        botRaceStatus: Status.UPCOMING,
        contestStatus: Status.UPCOMING,
        end: end,
        formattedBotRaceEnd: format(expectedBotRaceEnd, "d MMM h:mm a"),
        formattedDuration: "less than a minute",
        formattedEnd: format(end, "d MMM h:mm a"),
        formattedStart: format(start, "d MMM h:mm a"),
        pause: new Date(cohorts[0].pauseTime!),
        resume: null,
        start: start,
        status: AuditStatus.PreAudit,
        timeZone: DateTime.local().toFormat("ZZZZ")
      });
    });
    test("gets the correct dates for an audit with no cohorts", () => {
      const cohorts:ContestCohort[] = [];
      const start = new Date(Date.now() + 1000);
      const end = new Date(Date.now() + 6000);

      const dates = getContestSchedule({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        cohorts,
        status: AuditStatus.PreAudit
      });
      const expectedBotRaceEnd = addHours(start, 1);
      expect(dates).toStrictEqual({
        botRaceEnd: expectedBotRaceEnd,
        botRaceStatus: Status.UPCOMING,
        contestStatus: Status.UPCOMING,
        end: end,
        formattedBotRaceEnd: format(expectedBotRaceEnd, "d MMM h:mm a"),
        formattedDuration: "less than a minute",
        formattedEnd: format(end, "d MMM h:mm a"),
        formattedStart: format(start, "d MMM h:mm a"),
        pause: null,
        resume: null,
        start: start,
        status: AuditStatus.PreAudit,
        timeZone: DateTime.local().toFormat("ZZZZ")
      });
    });
    test("gets the correct dates for a live audit in cohort 1", () => {
      const cohorts = [{
        name: "cohort-1",
        resumeTime: null,
        pauseTime: new Date(Date.now() + 1000).toISOString(),
      }, {
        name: "cohort-2",
        resumeTime: new Date(Date.now() + 2000).toISOString(),
        pauseTime: new Date(Date.now() + 3000).toISOString(),
      }, {
        name: "cohort-3",
        resumeTime: new Date(Date.now() + 4000).toISOString(),
        pauseTime: null,
      }];
      const start = new Date(Date.now());
      const end = new Date(Date.now() + 5000);

      const dates = getContestSchedule({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        cohorts,
        status: AuditStatus.Active
      });
      const expectedBotRaceEnd = addHours(start, 1);
      expect(dates).toStrictEqual({
        botRaceEnd: expectedBotRaceEnd,
        botRaceStatus: Status.LIVE,
        contestStatus: Status.LIVE,
        end: end,
        formattedBotRaceEnd: format(expectedBotRaceEnd, "d MMM h:mm a"),
        formattedDuration: "less than a minute",
        formattedEnd: format(end, "d MMM h:mm a"),
        formattedStart: format(start, "d MMM h:mm a"),
        pause: new Date(cohorts[0].pauseTime!),
        resume: null,
        start: start,
        status: AuditStatus.Active,
        timeZone: DateTime.local().toFormat("ZZZZ")
      });
    });
    test("gets the correct dates for a live audit inbetween cohort 1 and 2", () => {
      const cohorts = [{
        name: "cohort-1",
        resumeTime: null,
        pauseTime: new Date(Date.now() - 1000).toISOString(),
      }, {
        name: "cohort-2",
        resumeTime: new Date(Date.now() + 1000).toISOString(),
        pauseTime: new Date(Date.now() + 2000).toISOString(),
      }, {
        name: "cohort-3",
        resumeTime: new Date(Date.now() + 3000).toISOString(),
        pauseTime: null,
      }];
      const start = new Date(Date.now() - 2000);
      const end = new Date(Date.now() + 4000);

      const dates = getContestSchedule({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        cohorts,
        status: AuditStatus.Paused
      });
      const expectedBotRaceEnd = addHours(start, 1);
      expect(dates).toStrictEqual({
        botRaceEnd: expectedBotRaceEnd,
        botRaceStatus: Status.LIVE,
        contestStatus: Status.LIVE,
        end: end,
        formattedBotRaceEnd: format(expectedBotRaceEnd, "d MMM h:mm a"),
        formattedDuration: "less than a minute",
        formattedEnd: format(end, "d MMM h:mm a"),
        formattedStart: format(start, "d MMM h:mm a"),
        pause: new Date(cohorts[1].pauseTime!),
        resume: new Date(cohorts[1].resumeTime!),
        start: start,
        status: AuditStatus.Paused,
        timeZone: DateTime.local().toFormat("ZZZZ")
      });
    });

    test("gets the correct dates for a live audit in cohort 2", () => {
      const cohorts = [{
        name: "cohort-1",
        resumeTime: null,
        pauseTime: new Date(Date.now() - 2000).toISOString(),
      }, {
        name: "cohort-2",
        resumeTime: new Date(Date.now() - 1000).toISOString(),
        pauseTime: new Date(Date.now() + 1000).toISOString(),
      }, {
        name: "cohort-3",
        resumeTime: new Date(Date.now() + 2000).toISOString(),
        pauseTime: null,
      }];
      const start = new Date(Date.now() - 3000);
      const end = new Date(Date.now() + 3000);

      const dates = getContestSchedule({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        cohorts,
        status: AuditStatus.Active
      });
      const expectedBotRaceEnd = addHours(start, 1);
      expect(dates).toStrictEqual({
        botRaceEnd: expectedBotRaceEnd,
        botRaceStatus: Status.LIVE,
        contestStatus: Status.LIVE,
        end: end,
        formattedBotRaceEnd: format(expectedBotRaceEnd, "d MMM h:mm a"),
        formattedDuration: "less than a minute",
        formattedEnd: format(end, "d MMM h:mm a"),
        formattedStart: format(start, "d MMM h:mm a"),
        pause: new Date(cohorts[1].pauseTime!),
        resume: new Date(cohorts[1].resumeTime!),
        start: start,
        status: AuditStatus.Active,
        timeZone: DateTime.local().toFormat("ZZZZ")
      });
    });

    test("gets the correct dates for a live audit in cohort 3", () => {
      const cohorts = [{
        name: "cohort-1",
        resumeTime: null,
        pauseTime: new Date(Date.now() - 4000).toISOString(),
      }, {
        name: "cohort-2",
        resumeTime: new Date(Date.now() - 3000).toISOString(),
        pauseTime: new Date(Date.now() - 2000).toISOString(),
      }, {
        name: "cohort-3",
        resumeTime: new Date(Date.now() - 1000).toISOString(),
        pauseTime: null,
      }];
      const start = new Date(Date.now() - 5000);
      const end = new Date(Date.now() + 1000);

      const dates = getContestSchedule({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        cohorts,
        status: AuditStatus.Active
      });
      const expectedBotRaceEnd = addHours(start, 1);
      expect(dates).toStrictEqual({
        botRaceEnd: expectedBotRaceEnd,
        botRaceStatus: Status.LIVE,
        contestStatus: Status.LIVE,
        end: end,
        formattedBotRaceEnd: format(expectedBotRaceEnd, "d MMM h:mm a"),
        formattedDuration: "less than a minute",
        formattedEnd: format(end, "d MMM h:mm a"),
        formattedStart: format(start, "d MMM h:mm a"),
        pause: null,
        resume: new Date(cohorts[2].resumeTime!),
        start: start,
        status: AuditStatus.Active,
        timeZone: DateTime.local().toFormat("ZZZZ")
      });
    });

    test("gets the correct dates for a finished contest", () => {
      const cohorts = [{
        name: "cohort-1",
        resumeTime: null,
        pauseTime: new Date(Date.now() - 5000).toISOString(),
      }, {
        name: "cohort-2",
        resumeTime: new Date(Date.now() - 4000).toISOString(),
        pauseTime: new Date(Date.now() - 3000).toISOString(),
      }, {
        name: "cohort-3",
        resumeTime: new Date(Date.now() - 2000).toISOString(),
        pauseTime: null,
      }];
      const start = new Date(Date.now() - 6000);
      const end = new Date(Date.now() - 1000);

      const dates = getContestSchedule({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        cohorts,
        status: AuditStatus.Review
      });
      const expectedBotRaceEnd = addHours(start, 1);
      expect(dates).toStrictEqual({
        botRaceEnd: expectedBotRaceEnd,
        botRaceStatus: Status.ENDED,
        contestStatus: Status.ENDED,
        end: end,
        formattedBotRaceEnd: format(expectedBotRaceEnd, "d MMM h:mm a"),
        formattedDuration: "less than a minute",
        formattedEnd: format(end, "d MMM h:mm a"),
        formattedStart: format(start, "d MMM h:mm a"),
        pause: null,
        resume: new Date(cohorts[2].resumeTime!),
        start: start,
        status: AuditStatus.Review,
        timeZone: DateTime.local().toFormat("ZZZZ")
      });
    });
  });
});