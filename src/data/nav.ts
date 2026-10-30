import type { NavItem } from '@/types'

/** Order matches the page: identity, skills, projects, introduction, focus, experience, education, contact. */
export const navItems: readonly NavItem[] = [
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'focus', label: 'Focus' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
