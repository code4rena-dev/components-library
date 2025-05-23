import React, { useEffect, useState } from "react";
import {
  AuditStatus,
  MapAuditStatusToAuditPublicStage,
} from "./ContestStatus.types";
import { getRelativeDateTimeLongFormat } from "../../utils/time";

const getAuditStatusLabel = (status: AuditStatus | null) => {
  switch (status) {
    case AuditStatus.PreAudit:
      return "Starts";
    case AuditStatus.Active:
    case AuditStatus.LiveJudging:
      return "Ends";
    case AuditStatus.Awarding:
      return "Awarding";
    case AuditStatus.Judging:
      return "Judging";
    case AuditStatus.PJQA:
      return "Post-judging QA";
    case AuditStatus.Reporting:
      return "Report in progress";
    case AuditStatus.Review:
      return "Sponsor review";
    case AuditStatus.Triage:
      return "Triage";
    case AuditStatus.Restricted:
      return "Paused";
    case AuditStatus.JudgingComplete:
      return "Judging";
    case AuditStatus.Paused:
      return "Paused";
    case AuditStatus.Completed:
      return "Completed";
    case AuditStatus.LostDeal:
    case AuditStatus.Booking:
      return null;
    default:
      return null;
  }
};

const getAuditStatusColor = (status: AuditStatus | null) => {
  switch (status) {
    case AuditStatus.PreAudit:
      return "#FFFFFF";
    case AuditStatus.Active:
      return "#24c473"; // green-60
    case AuditStatus.Awarding:
    case AuditStatus.Judging:
    case AuditStatus.PJQA:
    case AuditStatus.Reporting:
    case AuditStatus.Review:
    case AuditStatus.Triage:
    case AuditStatus.JudgingComplete:
      return "#7549FF"; // blurple-60
    case AuditStatus.Restricted:
    case AuditStatus.Paused:
      return "#6B6680";
    case AuditStatus.LostDeal:
    case AuditStatus.Booking:
    case AuditStatus.Completed:
      return null;
    default:
      return null;
  }
};

const DotNoPaddingStrokeIcon = ({
  className,
  color = "var(--color__text-primary)",
  strokeColor = "var(--color__border-secondary)",
  width = 16,
  height = 16,
}: {
  className?: string;
  color?: string;
  strokeColor?: string;
  width?: number;
  height?: number;
}) => (
  <svg
    width={width}
    height={height}
    fill="none"
    className={className}
    viewBox="0 0 8 8"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x=".5"
      y=".5"
      width="7"
      height="7"
      rx="3.5"
      fill={color}
      stroke={strokeColor}
    />
  </svg>
);

export const AuditStatusSection = ({
  auditStatus,
  startTime,
  endTime,
}: {
  auditStatus: AuditStatus | null;
  startTime: string;
  endTime: string;
}) => {
  // Get comparison time for relative time calculation
  const [comparisonTime, setComparisonTime] = useState<Date | null>(null);
  useEffect(() => {
    if (auditStatus === AuditStatus.Active || auditStatus === AuditStatus.LiveJudging) {
      setComparisonTime(new Date(endTime));
    } else if (auditStatus === AuditStatus.PreAudit) {
      setComparisonTime(new Date(startTime));
    } else {
      setComparisonTime(null);
    }
  }, [auditStatus, startTime, endTime]);

  // Get interval seconds for updating the relative time calculation
  const [intervalSecs, setIntervalSecs] = useState<number>(1);
  useEffect(() => {
    if (!endTime) return;
    const endTimeDate = new Date(endTime);
    const now = new Date();
    const diffMs = endTimeDate.getTime() - now.getTime();
    const oneHourMs = 3600000;
    const halfHourSecs = 1800;
    if (diffMs > oneHourMs) {
      setIntervalSecs(halfHourSecs);
    } else {
      setIntervalSecs(1);
    }
  }, [endTime]);

  const [relativeDateTime, setRelativeDateTime] = useState<string | null>(null);
  useEffect(() => {
    if (!comparisonTime) return;
    const updateDateTime = () => {
      const newRelativeDateTime = getRelativeDateTimeLongFormat(comparisonTime);
      setRelativeDateTime(newRelativeDateTime); // Update relative date time string every interval
    };
    const intervalId = setInterval(updateDateTime, intervalSecs);
    updateDateTime();
    return () => clearInterval(intervalId);
  }, [comparisonTime, intervalSecs]);

  if (!auditStatus) return null;

  const publicStage = MapAuditStatusToAuditPublicStage[auditStatus];

  if (!publicStage) return null;

  const auditStatusLabel = getAuditStatusLabel(auditStatus);
  const iconColor = getAuditStatusColor(auditStatus);

  return (
    <div className="details">
      {iconColor && (
        <div className="audit-tile__status__icon">
          <DotNoPaddingStrokeIcon color={iconColor} strokeColor={iconColor} />
        </div>
      )}
      <div
        className="audit-tile__status__status"
        title={comparisonTime?.toString() || ""}
      >
        {auditStatusLabel} {relativeDateTime?.toLowerCase()}
      </div>
    </div>
  );
};
