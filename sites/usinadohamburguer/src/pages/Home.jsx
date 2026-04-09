import { Helmet } from 'react-helmet-async'
import Hero from '../components/sections/Hero'
import ImpactCounter from '../components/sections/ImpactCounter'
import MenuHighlights from '../components/sections/MenuHighlights'
import SocialProof from '../components/sections/SocialProof'
import HistoryPreview from '../components/sections/HistoryPreview'
import CtaFinal from '../components/sections/CtaFinal'
import FaqSchema from '../components/seo/FaqSchema'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Usina do Hamburguer | Hamburgueria Artesanal com Proposito - Florianopolis</title>
        <meta name="description" content="Hamburgueria artesanal em Florianopolis desde 2015. Black angus, opcoes veganas, Pet Burguer. A cada hamburguer vendido, R$1 e doado para causas socioambientais." />
      </Helmet>
      <FaqSchema />
      <Hero />
      <ImpactCounter />
      <MenuHighlights />
      <SocialProof />
      <HistoryPreview />
      <CtaFinal />
    </>
  )
}
