const HeartIcon = ({ filled = false }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden="true">
    <path
      d="M12 20.5s-7.5-4.6-10-9.3C.5 8 1.8 4.5 5 3.4c2.2-.8 4.5.1 6 2 1.5-1.9 3.8-2.8 6-2 3.2 1.1 4.5 4.6 3 7.8-2.5 4.7-10 9.3-10 9.3z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export default HeartIcon;
