export const ViewMode = {
  VISUALIZER: 'visualizer',
  DOCUMENT: 'document'
} as const

export type ViewMode =
  (typeof ViewMode)[keyof typeof ViewMode]