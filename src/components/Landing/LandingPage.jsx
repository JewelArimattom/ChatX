import { motion } from 'framer-motion'
import LightPillar from '../LightPillar/LightPillar'

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950 fixed inset-0">
      {/* Background Light Pillar Effect */}
      <div className="absolute inset-0 opacity-40">
        <LightPillar
          topColor="#a855f7"
          bottomColor="#ec4899"
          intensity={1.0}
          rotationSpeed={0.2}
          glowAmount={0.004}
          pillarWidth={3.0}
          pillarHeight={0.4}
          noiseIntensity={0.3}
          pillarRotation={0}
          interactive={false}
          mixBlendMode="screen"
        />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/20 to-slate-950/80"></div>

      {/* Center Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          {/* Platform Name - White Theme */}
          <motion.h1 
            className="text-7xl sm:text-8xl md:text-9xl font-bold mb-16 text-white tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ChatX
          </motion.h1>

          {/* Get Started Button */}
          <motion.button
            onClick={onGetStarted}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-14 py-5 rounded-full bg-white text-slate-950 text-xl font-bold
                     hover:bg-slate-100 transition-all duration-300 shadow-lg"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default LandingPage
