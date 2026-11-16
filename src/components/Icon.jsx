/** Hand-drawn 1.25px line icons — consistent with the hairline language of the site. */
const paths = {
  arrow: <path d="M3 8h10M9 4l4 4-4 4" />,
  arrowUpRight: <path d="M5 11 11 5M6 5h5v5" />,
  arrowDown: <path d="M8 3v10M4 9l4 4 4-4" />,
  arrowUp: <path d="M8 13V3M4 7l4-4 4 4" />,
  chevronLeft: <path d="M10 3 5 8l5 5" />,
  chevronRight: <path d="m6 3 5 5-5 5" />,
  pause: <path d="M6 4v8M10 4v8" />,
  play: <path d="M5.5 3.8v8.4L12 8z" />,
  copy: (
    <>
      <rect x="5.5" y="5.5" width="7" height="7" rx="1.2" />
      <path d="M10.5 5.5V4.2c0-.7-.5-1.2-1.2-1.2H4.2C3.5 3 3 3.5 3 4.2v5.1c0 .7.5 1.2 1.2 1.2h1.3" />
    </>
  ),
  check: <path d="m3.5 8.5 3 3 6-7" />,
  mail: (
    <>
      <rect x="2.5" y="3.5" width="11" height="9" rx="1.5" />
      <path d="m3 4.5 5 4 5-4" />
    </>
  ),
  chat: <path d="M8 2.8c-2.9 0-5.2 2.2-5.2 4.9 0 1 .3 1.9.8 2.7L3 13.2l2.9-.7c.7.3 1.4.4 2.1.4 2.9 0 5.2-2.2 5.2-4.9S10.9 2.8 8 2.8z" />,
  close: <path d="m4 4 8 8M12 4l-8 8" />,
  plus: <path d="M8 3v10M3 8h10" />,
  spark: <path d="M8 1.5c.4 3.4 1.6 5.6 6.5 6.5-4.9.9-6.1 3.1-6.5 6.5-.4-3.4-1.6-5.6-6.5-6.5 4.9-.9 6.1-3.1 6.5-6.5z" />,
};

export default function Icon({ name, className, title, ...rest }) {
  const isFilled = name === 'spark' || name === 'play';
  return (
    <svg
      viewBox="0 0 16 16"
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  );
}
