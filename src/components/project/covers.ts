import adpilotCover from '@/assets/projects/adpilot-ai.svg'
import apexCover from '@/assets/projects/apex-knowledge-assistant.jpg'
import supportxCover from '@/assets/projects/supportx-ai.svg'
import lessonCover from '@/assets/projects/self-evaluating-lesson-generator.svg'
import travelmateCover from '@/assets/projects/travelmate-ai.jpg'

/** Cover image for each project, keyed by project id. Kept out of the data files so they stay plain content. */
export const projectCovers: Record<string, string> = {
  'adpilot-ai': adpilotCover,
  'travelmate-ai': travelmateCover,
  'apex-knowledge-assistant': apexCover,
  'supportx-ai': supportxCover,
  'self-evaluating-lesson-generator': lessonCover,
}

/** Gallery screenshots, keyed by project id and then by `ProjectScreenshot.file`. */
const screenshotModules = import.meta.glob<string>('../../assets/projects/*/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
})

export function screenshotUrl(projectId: string, file: string): string | undefined {
  return screenshotModules[`../../assets/projects/${projectId}/${file}.jpg`]
}
