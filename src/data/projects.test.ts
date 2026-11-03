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

  it('has what the main-page card needs, kept short', () => {
    for (const project of projects) {
      expect(project.shortDescription.length).toBeGreaterThan(20)
      expect(project.shortDescription.length).toBeLessThanOrEqual(220)
      expect(project.highlights.length).toBeGreaterThan(0)
      expect(project.highlights.length).toBeLessThanOrEqual(5)
      expect(project.coverAlt.length).toBeGreaterThan(10)
      expect(project.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  it('says on the card that the project is in development and on mock data', () => {
    expect(travelmate?.shortDescription).toMatch(/in active development/i)
    expect(travelmate?.shortDescription).toMatch(/mock data/i)
  })

  it('defines what every status means', () => {
    for (const status of ['implemented', 'prototype', 'planned'] as const) {
      expect(travelmate?.statusNotes[status].length).toBeGreaterThan(20)
    }
    expect(travelmate?.statusNotes.implemented).toMatch(/mock/i)
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

  describe('Apex Knowledge Assistant', () => {
    const apex = projects.find((project) => project.id === 'apex-knowledge-assistant')

    it('links to the real repository and has no invented demo link', () => {
      expect(apex?.repoUrl).toBe('https://github.com/rishabhrathod12/Chatbot_Apex_Industries')
      expect(apex?.demoUrl).toBeUndefined()
    })

    it('says the data is fictional and the demo is HTTP only, not production', () => {
      const prose = JSON.stringify(apex)
      expect(prose).toMatch(/fictional/i)
      expect(prose).toMatch(/HTTP, not HTTPS/)
      expect(apex?.deploymentNotes?.join(' ')).toMatch(/demo/i)
    })

    it('keeps HTTPS, backups and scaling as planned, not implemented', () => {
      for (const id of ['https', 'backups', 'scale']) {
        expect(apex?.features.find((feature) => feature.id === id)?.status).toBe('planned')
      }
    })

    it('has a captioned, described screenshot for every gallery entry, with unique files', () => {
      const shots = apex?.gallery?.flatMap((group) => group.shots) ?? []
      expect(shots).toHaveLength(16)
      expect(new Set(shots.map((shot) => shot.file)).size).toBe(shots.length)
      for (const shot of shots) {
        expect(shot.alt.length).toBeGreaterThan(30)
        expect(shot.caption.length).toBeGreaterThan(20)
      }
    })

    it('does not claim metrics, customers or certifications', () => {
      const prose = JSON.stringify(apex)
      expect(prose).not.toMatch(/testimonial|benchmark|\d+\s?%|production-ready|SOC ?2|ISO ?27001/i)
    })
  })

  describe('AdPilot AI', () => {
    const adpilot = projects.find((project) => project.id === 'adpilot-ai')

    it('is the first project and links to the real repository, with no invented demo', () => {
      expect(projects[0]?.id).toBe('adpilot-ai')
      expect(adpilot?.repoUrl).toBe('https://github.com/rishabhrathod12/AI-Ads-Autopilot')
      expect(adpilot?.demoUrl).toBeUndefined()
    })

    it('keeps unbuilt work out of the implemented status', () => {
      const status = (id: string) =>
        [
          ...(adpilot?.features ?? []),
          ...(adpilot?.agents?.items ?? []),
          ...(adpilot?.safety?.items ?? []),
          ...(adpilot?.integration?.items ?? []),
          ...(adpilot?.roadmap?.items ?? []),
        ].find((item) => item.id === id)?.status
      for (const id of ['bid-agent', 'budget-agent', 'strategy-agent', 'bid-budget', 'approval-center', 'safe-approval', 'm6']) {
        expect(status(id), id).toBe('planned')
      }
      for (const id of ['ads-api', 'int-amazon', 'safe-oauth', 'm9']) {
        expect(status(id), id).toBe('future')
      }
      expect(status('agent-graph')).toBe('prototype')
      expect(status('m5')).toBe('prototype')
    })

    it('says on the card that it is in development and on mock data', () => {
      expect(adpilot?.shortDescription).toMatch(/in active development/i)
      expect(adpilot?.shortDescription).toMatch(/mock data/i)
    })

    it('states the failed checks, mock data and that execution is off', () => {
      const prose = JSON.stringify(adpilot)
      expect(prose).toMatch(/MOCK/)
      expect(prose).toMatch(/AD_EXECUTION_ENABLED is false/)
      expect(adpilot?.limitations.join(' ')).toMatch(/0\.67 against 0\.85/)
      expect(adpilot?.limitations.join(' ')).toMatch(/No Amazon account or Amazon Ads API is connected/)
    })

    it('shows the built specialists as in progress, not complete', () => {
      expect(adpilot?.statusLabels?.prototype).toBe('In Progress')
      const built = adpilot?.agents?.items.filter((agent) => agent.status !== 'planned') ?? []
      expect(built.map((agent) => agent.id)).toEqual([
        'supervisor',
        'campaign-analysis',
        'keyword-intelligence',
        'performance-prediction',
        'ppc-reporting',
      ])
      for (const agent of built) expect(agent.status).toBe('prototype')
    })

    it('does not claim results, deployment or unused technology as built', () => {
      const prose = JSON.stringify(adpilot)
      expect(prose).not.toMatch(/\d+\s?%|production-ready|deployed|ROI|benchmark|testimonial/i)
      expect(adpilot?.stack.flatMap((group) => group.items).join(' ')).not.toMatch(
        /XGBoost|PyTorch|Transformers|Vercel|Railway|Render/i,
      )
    })

    it('defines every status it uses, including future', () => {
      expect(adpilot?.statusNotes.future?.length).toBeGreaterThan(20)
      expect(adpilot?.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })

  it('does not overclaim a live model or live data in prose', () => {
    const prose = JSON.stringify(travelmate)
    expect(prose).not.toMatch(/production[- ]ready|deployed|live (bookings?|prices)/i)
  })
})
