import '@testing-library/jest-dom/vitest'

class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds: readonly number[] = []
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

globalThis.IntersectionObserver = IntersectionObserverStub

// jsdom does not implement scrolling; real scrolling is covered by the Playwright tests.
Element.prototype.scrollIntoView = () => {}
window.scrollTo = () => {}
