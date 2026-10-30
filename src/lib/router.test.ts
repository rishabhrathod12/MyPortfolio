import { parseRoute, projectPath } from './router'

const slugs = ['travelmate-ai']

describe('parseRoute', () => {
  it('maps the root to home', () => {
    expect(parseRoute('/', slugs)).toEqual({ name: 'home' })
  })

  it('maps a known project path to the project, with or without a trailing slash', () => {
    expect(parseRoute('/projects/travelmate-ai', slugs)).toEqual({
      name: 'project',
      slug: 'travelmate-ai',
    })
    expect(parseRoute('/projects/travelmate-ai/', slugs)).toEqual({
      name: 'project',
      slug: 'travelmate-ai',
    })
  })

  it('treats unknown projects and other paths as not found', () => {
    expect(parseRoute('/projects/unknown', slugs)).toEqual({ name: 'not-found' })
    expect(parseRoute('/projects', slugs)).toEqual({ name: 'not-found' })
    expect(parseRoute('/projects/travelmate-ai/extra', slugs)).toEqual({ name: 'not-found' })
    expect(parseRoute('/blog', slugs)).toEqual({ name: 'not-found' })
  })

  it('builds project paths that parse back to the same project', () => {
    expect(parseRoute(projectPath('travelmate-ai'), slugs)).toEqual({
      name: 'project',
      slug: 'travelmate-ai',
    })
  })
})
