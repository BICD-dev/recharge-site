import Hero from '../components/Landing/Home/Hero'
import Work from '../components/Landing/Home/work'
import TimeLine from '../components/Landing/Home/timeline'
import Platform from '../components/Landing/Home/platform'
import Portfolio from '../components/Landing/Home/portfolio'
import Upgrade from '../components/Landing/Home/upgrade'
import Perks from '../components/Landing/Home/perks'
// import BrandLogo from '../components/Home/BrandLogo'
import GlobalReach from '../components/Landing/Home/GlobalReach'
import Faq from '../components/Landing/Home/Faq'


export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <GlobalReach/>
      <TimeLine />
      <Platform />
      <Portfolio />
      <Upgrade />
      <Perks />
      <Faq/>
    </main>
  )
}