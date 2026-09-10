import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function SvgIcon({ children, className = 'size-5', ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children}
    </svg>
  )
}

export const HomeIcon = (props: IconProps) => <SvgIcon {...props}><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></SvgIcon>
export const SearchIcon = (props: IconProps) => <SvgIcon {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></SvgIcon>
export const CameraIcon = (props: IconProps) => <SvgIcon {...props}><path d="M14.5 5 13 3h-2L9.5 5H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3h-3.5Z" /><circle cx="12" cy="12" r="4" /></SvgIcon>
export const ChefHatIcon = (props: IconProps) => <SvgIcon {...props}><path d="M6 13a4 4 0 0 1 1-7.9A5 5 0 0 1 17 6a3.5 3.5 0 0 1 1 6.9V20H6v-7Z" /><path d="M6 16h12" /></SvgIcon>
export const DiaryIcon = (props: IconProps) => <SvgIcon {...props}><path d="M6 3h12a2 2 0 0 1 2 2v16H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M8 3v18M11 8h6M11 12h6M11 16h4" /></SvgIcon>
export const BookOpenIcon = (props: IconProps) => <SvgIcon {...props}><path d="M3 5.5A3.5 3.5 0 0 1 6.5 2H11v18H6.5A3.5 3.5 0 0 0 3 23V5.5ZM21 5.5A3.5 3.5 0 0 0 17.5 2H13v18h4.5A3.5 3.5 0 0 1 21 23V5.5Z" /></SvgIcon>
export const ImageIcon = (props: IconProps) => <SvgIcon {...props}><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="8.5" cy="9" r="1.5" /><path d="m4 17 4.5-4.5 3 3 2-2 6.5 5" /></SvgIcon>
export const LockIcon = (props: IconProps) => <SvgIcon {...props}><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></SvgIcon>
export const EyeIcon = (props: IconProps) => <SvgIcon {...props}><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></SvgIcon>
export const EyeOffIcon = (props: IconProps) => <SvgIcon {...props}><path d="m3 3 18 18M10.6 6.1A9 9 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-2.1 2.8M6.1 6.1C3.8 7.7 2.5 12 2.5 12s3.5 6 9.5 6a9 9 0 0 0 3-.5" /><path d="M10.2 10.2a2.5 2.5 0 0 0 3.6 3.6" /></SvgIcon>
export const SparklesIcon = (props: IconProps) => <SvgIcon {...props}><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" /><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14ZM5 14l.6 1.4L7 16l-1.4.6L5 18l-.6-1.4L3 16l1.4-.6L5 14Z" /></SvgIcon>
export const ShieldIcon = (props: IconProps) => <SvgIcon {...props}><path d="M12 3 5 6v5c0 4.7 2.8 8 7 10 4.2-2 7-5.3 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-5" /></SvgIcon>
export const TrashIcon = (props: IconProps) => <SvgIcon {...props}><path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6" /></SvgIcon>
export const RefreshIcon = (props: IconProps) => <SvgIcon {...props}><path d="M20 7v5h-5" /><path d="M19 12a7 7 0 1 0-2 5" /></SvgIcon>
export const UtensilsIcon = (props: IconProps) => <SvgIcon {...props}><path d="M7 3v7m-3-7v5a3 3 0 0 0 6 0V3M7 11v10M17 3c-2 2-3 5-3 8h4V3h-1Zm1 8v10" /></SvgIcon>
export const PlusIcon = (props: IconProps) => <SvgIcon {...props}><path d="M12 5v14M5 12h14" /></SvgIcon>
export const CloseIcon = (props: IconProps) => <SvgIcon {...props}><path d="m5 5 14 14M19 5 5 19" /></SvgIcon>
export const ChevronRightIcon = (props: IconProps) => <SvgIcon {...props}><path d="m9 5 7 7-7 7" /></SvgIcon>
export const ChevronDownIcon = (props: IconProps) => <SvgIcon {...props}><path d="m5 9 7 7 7-7" /></SvgIcon>
export const ShareIcon = (props: IconProps) => <SvgIcon {...props}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.7 10.7 6.6-4.4M8.7 13.3l6.6 4.4" /></SvgIcon>
export const SaveIcon = (props: IconProps) => <SvgIcon {...props}><path d="M5 3h12l2 2v16H5V3Z" /><path d="M8 3v6h8V3M8 21v-7h8v7" /></SvgIcon>
export const BarcodeIcon = (props: IconProps) => <SvgIcon {...props}><path d="M4 5v14M7 5v14M10 5v14M14 5v14M17 5v14M20 5v14" /><path d="M8 5v14M16 5v14" strokeWidth=".7" /></SvgIcon>
export const ScanIcon = (props: IconProps) => <SvgIcon {...props}><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M7 12h10" /></SvgIcon>
export const ClockIcon = (props: IconProps) => <SvgIcon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></SvgIcon>
export const FlameIcon = (props: IconProps) => <SvgIcon {...props}><path d="M12 22c4 0 7-3 7-7 0-5-4-8-7-13-1 4-3 6-5 8-1.4 1.4-2 3-2 5 0 4 3 7 7 7Z" /><path d="M9.5 18c0-2 1.5-3.5 2.5-5.5 1 2 2.5 3.5 2.5 5.5" /></SvgIcon>
export const ActivityIcon = (props: IconProps) => <SvgIcon {...props}><path d="M3 12h4l2-7 4 14 2-7h6" /></SvgIcon>
export const TrophyIcon = (props: IconProps) => <SvgIcon {...props}><path d="M8 4h8v4a4 4 0 0 1-8 0V4ZM12 12v5M8 21h8M9 17h6" /><path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4" /></SvgIcon>
export const CheckIcon = (props: IconProps) => <SvgIcon {...props}><path d="m4 12 5 5L20 6" /></SvgIcon>
export const AlertIcon = (props: IconProps) => <SvgIcon {...props}><path d="M12 3 2.5 20h19L12 3Z" /><path d="M12 9v4M12 17h.01" /></SvgIcon>
export const CalendarIcon = (props: IconProps) => <SvgIcon {...props}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></SvgIcon>
export const EditIcon = (props: IconProps) => <SvgIcon {...props}><path d="m4 20 4-.8L19 8.2 15.8 5 4.8 16 4 20ZM14 6.8 17.2 10" /></SvgIcon>
export const ExternalLinkIcon = (props: IconProps) => <SvgIcon {...props}><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" /></SvgIcon>
export const LayersIcon = (props: IconProps) => <SvgIcon {...props}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></SvgIcon>
