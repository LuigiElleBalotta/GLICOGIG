/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYSIS_PATH?: string
  readonly VITE_ANALYSIS_PREMIUM?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
