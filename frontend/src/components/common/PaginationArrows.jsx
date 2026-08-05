import IconButton from "./IconButton.jsx";

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Prev/next circular arrow pair, used beside section headers for
 * horizontally-scrollable rows (mirrors the reference's nav arrows).
 *
 * @param {function} onPrev
 * @param {function} onNext
 * @param {boolean} prevDisabled
 * @param {boolean} nextDisabled
 */
const PaginationArrows = ({ onPrev, onNext, prevDisabled = false, nextDisabled = false }) => (
  <div className="pagination-arrows">
    <IconButton icon={<ChevronLeft />} label="Previous" onClick={onPrev} disabled={prevDisabled} />
    <IconButton icon={<ChevronRight />} label="Next" onClick={onNext} disabled={nextDisabled} />
  </div>
);

export default PaginationArrows;
