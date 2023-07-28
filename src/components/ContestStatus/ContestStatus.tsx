import clsx from "clsx";
import React from "react";
import { ContestStatusProps, Status } from "./ContestStatus.types";
import "./ContestStatus.scss";

/**
 * A simple Code4rena component for displaying one of three available contest statuses:
 *
 * - `UPCOMING`: Indicates a contest will be starting in the near future
 * - `LIVE`: Indicates that a contest is currently live
 * - `ENDED`: Indicates that a previously live contest has ended
 *
 * @param status - Status indicator for the current contest. Enum of type {@link Status}.
 * @param className - String of custom classes to extend the default styling of the component.
 * @param id - HTML element identifier.
 */
const ContestStatus: React.FC<ContestStatusProps> = ({
  status,
  className,
  id,
}) => {
  const styling = clsx({
    statusindicator: true,
    upcoming: status === Status.UPCOMING,
    live: status === Status.LIVE,
    ended: status === Status.ENDED,
  });

  return (
    status && (
      <div id={id ?? undefined} className={`c4conteststatus ${className}`}>
        <div className={`${styling}`} />
        {status === Status.UPCOMING && "Soon"}
        {status === Status.LIVE && "Live"}
        {status === Status.ENDED && "Ended"}
        {!status && "-"}
      </div>
    )
  );
};

ContestStatus.defaultProps = {
  className: "",
  id: "",
};

export default ContestStatus;
