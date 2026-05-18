import { cn } from '../utils/cn'

export const Container = ({ children, className, id }) => {
  return (
    <div id={id} className={cn('w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32', className)}>
      {children}
    </div>
  )
}
