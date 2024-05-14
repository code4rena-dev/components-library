import React, { useState } from "react"
import { Icon } from "../Icon";
import "./Pagination.scss";

interface PaginationProps {
    id?: string;
    itemsCount: number;
    itemsPerPage: number;
    onPageSelect: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  id,
  itemsCount,
  itemsPerPage,
  onPageSelect
}) => {
    const [selectedPage, setSelectedPage] = useState(1);
    const pageCount = Math.ceil(itemsCount / itemsPerPage);

    return (
        <div id={id} className="c4pagination">
            <button
                type="button"
                className="c4pagination--btn"
                disabled={selectedPage === 1}
                onClick={() => {
                    const newSelected = selectedPage !== 1 ? selectedPage - 1 : 1; 
                    setSelectedPage(newSelected);
                    onPageSelect(newSelected);
                }}
            >
                <Icon name="chevron-left" size="small" color="white" />
                Previous
            </button>
            {new Array(pageCount).fill(0).map((_, idx) => (
                <button
                    type="button"
                    key={`page_btn_${idx + 1}`}
                    className={`c4pagination--btn ${idx + 1} ${
                        selectedPage === idx + 1 ? "selected" : undefined
                    }`}
                    onClick={() => {
                        setSelectedPage(idx + 1);
                        onPageSelect(idx + 1);
                    }}
                >
                    {idx + 1}
                </button>
            ))}
            <button
                type="button"
                className="c4pagination--btn"
                disabled={selectedPage === pageCount}
                onClick={() => {
                    const newSelected = selectedPage !== pageCount ? selectedPage + 1 : pageCount
                    setSelectedPage(newSelected);
                    onPageSelect(newSelected);
                }}
            >
                Next
                <Icon
                    name="chevron-right"
                    size="small"
                    color="white"
                />
            </button>
        </div>
    )
}