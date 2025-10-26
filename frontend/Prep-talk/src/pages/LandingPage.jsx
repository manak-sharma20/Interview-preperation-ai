import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Layouts/Header';
import Footer from '../components/Layouts/Footer';
import Button from '../components/Button';
import FeatureCard from '../components/cards/FeatureCard';
import { ChevronRight, MessageSquare, Target, TrendingUp, Users, Zap } from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Master Your
              <span className="text-primary block">Interview Skills</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Practice with AI-powered mock interviews, get personalized feedback,
              and boost your confidence for real job interviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signUp">
                <Button size="large" className="w-full sm:w-auto">
                  Start Free Trial
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="large" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose PrepTalk?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides everything you need to excel in your job interviews.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="w-6 h-6 text-primary" />}
              title="AI-Powered Conversations"
              description="Engage in realistic interview simulations with advanced AI that adapts to your responses."
            />
            <FeatureCard
              icon={<Target className="w-6 h-6 text-primary" />}
              title="Personalized Feedback"
              description="Receive detailed analysis of your performance with actionable improvement suggestions."
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6 text-primary" />}
              title="Progress Tracking"
              description="Monitor your improvement over time with comprehensive analytics and insights."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6 text-primary" />}
              title="Industry-Specific Prep"
              description="Prepare for interviews in various industries with tailored question sets and scenarios."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-primary" />}
              title="Instant Results"
              description="Get immediate feedback and scores after each practice session to track your progress."
            />
            <FeatureCard
              icon={<Target className="w-6 h-6 text-primary" />}
              title="Expert Tips"
              description="Access a library of proven interview strategies and tips from industry professionals."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-600">
                Create your account and tell us about your target role and industry.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Practice</h3>
              <p className="text-gray-600">
                Engage in AI-powered mock interviews tailored to your needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Improve</h3>
              <p className="text-gray-600">
                Review feedback and track your progress to ace real interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of professionals who have improved their interview skills with PrepTalk.
          </p>
          <Link to="/signUp">
            <Button size="large" className="bg-white text-primary hover:bg-gray-100">
              Start Your Journey Today
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
