import { cn } from '../utils/cn'

export const Container = ({ children, className, id }) => {
  return (
    <div id={id} className={cn('w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24', className)}>
      {children}
    </div>
  )
}
