import type { Metadata } from 'next'
import { ChapterBottomNav } from '@/components/ChapterNav'
import PageTransition from '@/components/PageTransition'
import ChapterHeader from '@/components/ChapterHeader'
import PageFooter from '@/components/PageFooter'
import Reveal from '@/components/Reveal'
import EventCard from '@/components/EventCard'
import { getChapter } from '@/lib/chapters'
import {
  TRADITIONAL_CEREMONY,
  WHITE_WEDDING,
  WEDDING_DATE_LABEL,
} from '@/lib/site'

const SLUG = '/details'
const chapter = getChapter(SLUG)

export const metadata: Metadata = {
  title: chapter.label,
  alternates: { canonical: SLUG },
}

// The reception itself (who's doing what, in order) has its own timeline on
// the Order of Service page, right after the church programme — this row is
// just the at-a-glance pointer, so the info isn't repeated three times over.
const TIMELINE = [
  {
    time: '8:00 AM',
    event: 'Traditional Marriage begins',
    note: 'Invited guests only',
  },
  {
    time: '1:00 PM',
    event: 'White Wedding ceremony',
    note: 'All Nations SDA Church',
  },
  {
    time: 'Immediately after',
    event: 'Cocktail Reception',
    note: 'All Nations SDA Church',
  },
]

export default function DetailsPage() {
  return (
    <div className='flex min-h-svh flex-col'>
      <PageTransition className='flex-1'>
        <ChapterHeader
          eyebrow={chapter.eyebrow}
          title='The Details'
          subtitle='Two ceremonies, one beautiful day. Everything you need to plan your journey with us.'
          meta={WEDDING_DATE_LABEL}
          tone={chapter.tone}
        />

        <div className='mx-auto max-w-content px-5 pb-24 pt-16 sm:px-8 sm:pt-24'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8'>
            <EventCard
              index='01'
              label={TRADITIONAL_CEREMONY.label}
              time={TRADITIONAL_CEREMONY.time}
              isoDateTime={TRADITIONAL_CEREMONY.isoDateTime}
              invitationOnly
              publicNote={TRADITIONAL_CEREMONY.publicNote}
            />
            <EventCard
              index='02'
              label={WHITE_WEDDING.label}
              time={WHITE_WEDDING.time}
              isoDateTime={WHITE_WEDDING.isoDateTime}
              venueName={WHITE_WEDDING.venueName}
              venueArea={WHITE_WEDDING.venueArea}
              mapUrl={WHITE_WEDDING.mapUrl}
              dressCode='Elegant, colourful wedding-guest attire'
            />
          </div>

          {/* At-a-glance timeline */}
          <Reveal className='mt-20 sm:mt-28'>
            <p className='text-[0.7rem] uppercase tracking-[0.25em] text-accent'>
              At A Glance
            </p>
            <h2 className='mt-3 font-display text-3xl text-ink sm:text-4xl'>
              The Timeline
            </h2>
            <div className='mt-8 divide-y divide-ink/10 border-y border-ink/10'>
              {TIMELINE.map((item) => (
                <div
                  key={item.event}
                  className='flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-8'
                >
                  <span className='shrink-0 font-display text-xl text-accent sm:w-32'>
                    {item.time}
                  </span>
                  <span className='text-ink'>{item.event}</span>
                  <span className='text-sm text-secondary sm:ml-auto'>
                    {item.note}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Travel info */}
          <Reveal className='mt-20 sm:mt-28'>
            <p className='text-[0.7rem] uppercase tracking-[0.25em] text-accent'>
              Travel Info
            </p>
            <h2 className='mt-3 font-display text-2xl text-ink sm:text-3xl'>
              Getting Around
            </h2>
            <ul className='mt-4 grid grid-cols-1 gap-x-10 gap-y-2 text-body leading-relaxed text-ink/70 sm:grid-cols-2'>
              <li>Both ceremonies are within the Adenta area of Accra.</li>
              <li>Ride-hailing apps (Bolt, Uber) run reliably in this area.</li>
              <li>Aim to arrive 30 minutes early — parking fills up fast.</li>
              <li>See the Directions chapter for maps to each venue.</li>
            </ul>
          </Reveal>
        </div>
      </PageTransition>

      <ChapterBottomNav slug={SLUG} />
      <PageFooter />
    </div>
  )
}
