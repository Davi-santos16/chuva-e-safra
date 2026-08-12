export const SectionHeading = ({ eyebrow, title, description, align = 'left' }: { eyebrow: string; title: string; description?: string; align?: 'left' | 'center' }) => (
  <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
    <p className='mb-3 text-sm font-bold uppercase tracking-[0.18em] text-interactive'>{eyebrow}</p>
    <h2 className='text-[clamp(1.9rem,4vw,3rem)] leading-tight tracking-[-0.025em]'>{title}</h2>
    {description ? <p className='mt-4 text-lg leading-relaxed text-muted-foreground'>{description}</p> : null}
  </div>
)
