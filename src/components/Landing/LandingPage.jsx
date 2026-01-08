import { motion } from 'framer-motion'
import { MessageCircle, Zap, Shield, Users, Sparkles, ArrowDown } from 'lucide-react'
import LightPillar from '../LightPillar/LightPillar'

const LandingPage = ({ onGetStarted }) => {
  const features = [
    {
      icon: MessageCircle,
      title: "Real-Time Messaging",
      description: "Instantly connect with friends and family through seamless, lightning-fast messaging."
    },
    {
      icon: Sparkles,
      title: "Social Feed",
      description: "Share your moments, discover content, and stay updated with your network."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your conversations are yours. End-to-end security keeps your data safe."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built with modern technology for instant delivery and smooth performance."
    }
  ]

  return (
    <div className="min-h-screen w-full bg-slate-950 overflow-y-auto">
      {/* Fixed Background Light Pillar Effect */}
      <div className="fixed inset-0 opacity-40 z-0">
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

      {/* Fixed gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/20 to-slate-950/80 z-0"></div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          {/* Platform Name */}
          <motion.h1 
            className="text-7xl sm:text-8xl md:text-9xl font-bold mb-8 text-white tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ChatX
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto"
          >
            Where conversations come alive. Connect, share, and discover in one seamless experience.
          </motion.p>

          {/* Get Started Button */}
          <motion.button
            onClick={onGetStarted}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-14 py-5 rounded-full bg-white text-slate-950 text-xl font-bold
                     hover:bg-slate-100 transition-all duration-300 shadow-lg"
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-slate-500"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why ChatX?
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Experience the next generation of social communication
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-8"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
              >
                10K+
              </motion.div>
              <p className="text-slate-500">Active Users</p>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
              >
                1M+
              </motion.div>
              <p className="text-slate-500">Messages Sent</p>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
              >
                99.9%
              </motion.div>
              <p className="text-slate-500">Uptime</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative z-10 py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Users className="w-16 h-16 text-primary-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Be part of something special. Connect with people who share your interests and build meaningful relationships.
          </p>
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-primary-500 to-fuchsia-500 text-white text-lg font-bold
                     hover:shadow-xl transition-all duration-300"
          >
            Join Now — It's Free
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-fuchsia-500 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ChatX</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 ChatX. Built with ❤️ for modern communication.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
