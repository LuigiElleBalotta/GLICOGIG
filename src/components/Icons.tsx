import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function SvgIcon({ children, className = 'size-5', ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children}
    </svg>
  )
}

export function LogoMark({ className = 'size-11' }: Pick<IconProps, 'className'>) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="glicogig-ring" x1="5" y1="8" x2="47" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0ab3c" /><stop offset="0.36" stopColor="#82b857" /><stop offset="0.68" stopColor="#2f9e83" /><stop offset="1" stopColor="#0272a3" />
        </linearGradient>
      </defs>
      <circle cx="26" cy="26" r="22" fill="#fbf8f1" stroke="url(#glicogig-ring)" strokeWidth="5" />
      <path d="M34 18.4a12 12 0 1 0 1.4 13.7" stroke="#023c69" strokeWidth="4.2" />
      <path d="M23 27h4l2-4 3 8 2-4h5" stroke="#023c69" strokeWidth="2.5" />
    </svg>
  )
}

export const CameraIcon = (props: IconProps) => <SvgIcon {...props}><path d="M14.5 5 13 3h-2L9.5 5H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3h-3.5Z" /><circle cx="12" cy="12" r="4" /></SvgIcon>
export const ImageIcon = (props: IconProps) => <SvgIcon {...props}><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="8.5" cy="9" r="1.5" /><path d="m4 17 4.5-4.5 3 3 2-2 6.5 5" /></SvgIcon>
export const LockIcon = (props: IconProps) => <SvgIcon {...props}><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></SvgIcon>
export const EyeIcon = (props: IconProps) => <SvgIcon {...props}><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></SvgIcon>
export const EyeOffIcon = (props: IconProps) => <SvgIcon {...props}><path d="m3 3 18 18M10.6 6.1A9 9 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-2.1 2.8M6.1 6.1C3.8 7.7 2.5 12 2.5 12s3.5 6 9.5 6a9 9 0 0 0 3-.5" /><path d="M10.2 10.2a2.5 2.5 0 0 0 3.6 3.6" /></SvgIcon>
export const SparklesIcon = (props: IconProps) => <SvgIcon {...props}><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" /><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14ZM5 14l.6 1.4L7 16l-1.4.6L5 18l-.6-1.4L3 16l1.4-.6L5 14Z" /></SvgIcon>
export const ShieldIcon = (props: IconProps) => <SvgIcon {...props}><path d="M12 3 5 6v5c0 4.7 2.8 8 7 10 4.2-2 7-5.3 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-5" /></SvgIcon>
export const TrashIcon = (props: IconProps) => <SvgIcon {...props}><path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6" /></SvgIcon>
export const RefreshIcon = (props: IconProps) => <SvgIcon {...props}><path d="M20 7v5h-5" /><path d="M19 12a7 7 0 1 0-2 5" /></SvgIcon>
export const UtensilsIcon = (props: IconProps) => <SvgIcon {...props}><path d="M7 3v7m-3-7v5a3 3 0 0 0 6 0V3M7 11v10M17 3c-2 2-3 5-3 8h4V3h-1Zm1 8v10" /></SvgIcon>
