import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { SkipLink } from '@/components/layout/SkipLink'
import { projects } from '@/data/projects'
import { parseRoute, usePathname, wasLastNavigationPush } from '@/lib/router'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { Education } from '@/sections/Education'
import { Experience } from '@/sections/Experience'
import { Focus } from '@/sections/Focus'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'

function HomePage() {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Focus />
      <Experience />
      <Education />
      <Contact />
    </>
  )
}

/** After an in-app navigation, jump to the `#section` in the URL or to the top. Back/forward are left to the browser. */
function useScrollAfterNavigation(pathname: string) {
  const previous = useRef(pathname)
  useEffect(() => {
    if (previous.current === pathname) return
    previous.current = pathname
    if (!wasLastNavigationPush()) return
    const id = window.location.hash.slice(1)
    const target = id ? document.getElementById(id) : null
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
}

export default function App() {
  const pathname = usePathname()
  const route = parseRoute(pathname)
  useScrollAfterNavigation(pathname)

  const project = route.name === 'project' ? projects.find((item) => item.id === route.slug) : undefined

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <SkipLink />
        <Navbar isHome={route.name === 'home'} />
        <main id="main">
          {route.name === 'home' && <HomePage />}
          {project && <ProjectDetailPage project={project} />}
          {route.name === 'not-found' && <NotFoundPage />}
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
