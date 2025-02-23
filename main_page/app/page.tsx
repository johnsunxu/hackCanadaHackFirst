"use client";
import React from "react";
import { Button } from '@mui/material';
import { Bell, Clock, Focus } from "lucide-react";
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bell className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">HackFirst</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#features" className="text-gray-600 hover:text-blue-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600">
                  How It Works
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="items-center align-center">
        {/* Hero */}
        <section className="bg-blue-50 py-20 flex justify-center items-center min-h-screen">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Stop Procrastinating, Start Achieving
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                HackFirst helps you stay on track with timely reminders and motivation boosts.
              </p>
              {/* <a
                href="C:\HackCanada\hackCanadaHackFirst\main_page\app\page.tsx"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Get Started Free
              </a> */}
              <Button
                // type="button"
                onClick={() => router.push("/goals")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Go to Dashboard              
              </Button>
            </div>
          </div>
        </section>


        {/* Features */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose HackFirst?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Bell className="h-12 w-12 text-blue-600" />}
                title="Smart Notifications"
                description="Receive personalized reminders based on your habits and schedule."
              />
              <FeatureCard
                icon={<Clock className="h-12 w-12 text-blue-600" />}
                title="Time Management"
                description="Track your productivity and see where you're spending your time."
              />
              <FeatureCard
                icon={<Focus className="h-12 w-12 text-blue-600" />}
                title="Focus Modes"
                description="Activate distraction-free modes to boost your concentration."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How HackFirst Works</h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
              <Step number={1} title="Set Your Goals" description="Define your tasks within the app." />
              <Step
                number={2}
                title="Customize Notifications"
                description="Choose to be reminded."
              />
              <Step
                number={3}
                title="Stay Focused"
                description="Receive timely alerts and stay on track with your goals."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Boost Your Productivity?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who have transformed their work habits with HackFirst.
            </p>
            <a
              href="#"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition duration-300"
            >
              Start Your Free Trial
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Bell className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">HackFirst</span>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} HackFirst. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Step: React.FC<{ number: number; title: string; description: string }> = ({
  number,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};


