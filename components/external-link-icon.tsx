interface ExternalLinkIconProps {
  color?: string
  className?: string
  size?: number
}

export default function ExternalLinkIcon({ color = "#EF3F35", className = "", size = 16 }: ExternalLinkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.0195 16.0003H0V1.98047H8.2593V3.50437H1.52386V14.4764H12.4956V7.71687H14.0195V16.0003Z"
        fill={color}
      />
      <path
        d="M10.2402 0V0.761948V1.5239H11.0022H13.446L12.2467 2.76846L4.70422 10.5957L5.80155 11.6532L13.3244 3.84632L14.4766 2.65082V4.99838V5.76033H15.2385H16.0004V0H10.2402Z"
        fill={color}
      />
    </svg>
  )
}
