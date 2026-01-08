import { motion } from 'framer-motion'

export function OrbBackground(): JSX.Element {
  const orbVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 0.8, 0.7]
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none blur-[80px] opacity-70">
      <motion.div
        className="absolute rounded-full w-[40vmax] h-[40vmax] -top-[10%] -right-[5%]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(207, 29, 30, 0.9) 0%, rgba(207, 29, 30, 0.4) 50%, transparent 70%)',
          mixBlendMode: 'hard-light'
        }}
        animate={orbVariants.animate}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full w-[32vmax] h-[32vmax] top-[50%] right-[10%]"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(230, 57, 70, 0.8) 0%, rgba(230, 57, 70, 0.3) 50%, transparent 70%)',
          mixBlendMode: 'screen'
        }}
        animate={orbVariants.animate}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute rounded-full w-[24vmax] h-[24vmax] bottom-[10%] right-[30%]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(180, 20, 20, 0.7) 0%, rgba(180, 20, 20, 0.2) 50%, transparent 70%)',
          mixBlendMode: 'overlay'
        }}
        animate={orbVariants.animate}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute rounded-full w-[20vmax] h-[20vmax] top-[30%] left-[40%]"
        style={{
          background: 'radial-gradient(circle at 40% 60%, rgba(255, 100, 100, 0.6) 0%, rgba(255, 100, 100, 0.2) 50%, transparent 70%)',
          mixBlendMode: 'color-dodge'
        }}
        animate={orbVariants.animate}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        className="absolute rounded-full w-[12vmax] h-[12vmax] top-[20%] right-[25%]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
          mixBlendMode: 'overlay'
        }}
        animate={orbVariants.animate}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  )
}
