import { cn } from '../utils/cn'

export const SectionTitle = ({ chapter, title, subtitle, className }) => {
  return (
    <div className={cn('mb-16 md:mb-24', className)}>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm tracking-[0.2em] text-muted">{chapter}</span>
        <div className="h-[1px] w-12 bg-border"></div>
      </div>
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight mb-6">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-lg max-w-xl leading-relaxed">
          / <br className="hidden md:block" /> {subtitle}
        </p>
      )}
    </div>
  )
}
