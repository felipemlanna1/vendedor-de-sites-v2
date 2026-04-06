import { useTranslation } from 'react-i18next'
import Locations from '../components/sections/Locations'

export default function LocationsPage() {
  const { t } = useTranslation()

  return (
    <>
      <div className="pt-28 pb-8 bg-[var(--color-secondary)]">
        <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16">
          <h1 className="font-[var(--font-display)] text-4xl md:text-6xl font-bold text-white tracking-tighter mb-3">
            {t('locations.title')}
          </h1>
          <p className="text-white/60 text-lg max-w-[50ch]">
            {t('locations.subtitle')}
          </p>
        </div>
      </div>
      <Locations />
    </>
  )
}
