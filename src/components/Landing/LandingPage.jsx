import { motion } from 'framer-motion'
import { MessageCircle, Sparkles, Users, Zap, ArrowRight } from 'lucide-react'
import LightPillar from '../LightPillar/LightPillar'

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="h-full w-full overflow-y-auto bg-slate-950">
      {/* Hero Section with Light Pillar */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Light Pillar Effect */}
        <div className="absolute inset-0 opacity-60">
          <LightPillar
            topColor="#a855f7"
            bottomColor="#ec4899"
            intensity={1.2}
            rotationSpeed={0.3}
            glowAmount={0.006}
            pillarWidth={4.0}
            pillarHeight={0.5}
            noiseIntensity={0.4}
            pillarRotation={0}
            interactive={false}
            mixBlendMode="screen"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.2 
              }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-primary mb-8 shadow-glow"
            >
              <MessageCircle className="w-10 h-10 text-white" />
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-50 via-primary-300 to-fuchsia-300 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-fuchsia-500 bg-clip-text text-transparent">
                ChatX
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              The next-generation social communication platform where 
              <span className="text-primary-400 font-semibold"> real-time messaging </span>
              meets 
              <span className="text-fuchsia-400 font-semibold"> social discovery</span>
            </p>

            {/* CTA Button */}
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 rounded-2xl bg-gradient-primary text-white text-lg font-bold
                       shadow-glow hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-3"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">10K+</div>
                <div className="text-sm text-slate-500 mt-1">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-fuchsia-400">50K+</div>
                <div className="text-sm text-slate-500 mt-1">Messages Sent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">24/7</div>
                <div className="text-sm text-slate-500 mt-1">Support</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-slate-600 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-50 to-slate-300 bg-clip-text text-transparent">
              Why Choose ChatX?
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Experience the perfect blend of communication and content discovery
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: 'Real-Time Messaging',
                description: 'Instant conversations with friends, family, and communities. Stay connected effortlessly.',
                color: 'from-primary-500 to-primary-600'
              },
              {
                icon: Sparkles,
                title: 'Social Feed',
                description: 'Discover and share moments with beautiful posts, stories, and engaging content.',
                color: 'from-fuchsia-500 to-pink-600'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Built with modern tech for blazing-fast performance and smooth interactions.',
                color: 'from-emerald-500 to-teal-600'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="card p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-12 relative overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-fuchsia-500/10"></div>
            
            <div className="relative z-10">
              <Users className="w-16 h-16 text-primary-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-50 to-slate-300 bg-clip-text text-transparent">
                Ready to Connect?
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                Join thousands of users already experiencing the future of social communication
              </p>
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-xl bg-gradient-primary text-white text-lg font-bold
                         shadow-glow hover:shadow-xl transition-all duration-300"
              >
                Get Started Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
          <p>© 2026 ChatX. Built with ❤️ for modern communication.</p>
          <p className="mt-2">Powered by React, Tailwind CSS, and Three.js</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
