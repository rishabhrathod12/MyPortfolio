import { projects } from './projects'

const travelmate = projects.find((project) => project.id === 'travelmate-ai')

/** Features the repository itself lists as not built. They must never be marked implemented. */
const NOT_BUILT = ['live-model', 'live-data', 'auth']

describe('projects data', () => {
  it('includes TravelMate AI as the featured project', () => {
    expect(travelmate?.name).toBe('TravelMate AI')
  })

  it('links to the real repository over https', () => {
    expect(travelmate?.repoUrl).toBe('https://github.com/rishabhrathod12/TravelMate-AI')
  })

  it('has no demo link, because no public demo exists', () => {
    for (const project of projects) expect(project.demoUrl).toBeUndefined()
  })

  it('never marks unbuilt features as implemented', () => {
    for (const id of NOT_BUILT) {
      const feature = travelmate?.features.find((item) => item.id === id)
      expect(feature, `feature ${id} should exist`).toBeDefined()
      expect(feature?.status).toBe('planned')
    }
  })

  it('has unique feature and architecture ids', () => {
    for (const project of projects) {
      const featureIds = project.features.map((item) => item.id)
      const layerIds = project.architecture.map((item) => item.id)
      expect(new Set(featureIds).size).toBe(featureIds.length)
      expect(new Set(layerIds).size).toBe(layerIds.length)
    }
  })

  it('shows implemented, prototype and planned work separately', () => {
    const statuses = new Set(travelmate?.features.map((feature) => feature.status))
    expect(statuses).toEqual(new Set(['implemented', 'prototype', 'planned']))
  })

  it('states its limitations and a review date', () => {
    expect(travelmate?.limitations.length).toBeGreaterThan(0)
    expect(travelmate?.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('does not overclaim a live model or live data in prose', () => {
    const prose = JSON.stringify(travelmate)
    expect(prose).not.toMatch(/production[- ]ready|deployed|live (bookings?|prices)/i)
  })
})
