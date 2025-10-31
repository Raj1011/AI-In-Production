"use client"

import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
  <main className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-100 dark:from-purple-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12 bg-gradient-to-r from-purple-100 to-gray-50 dark:from-purple-900 dark:to-gray-800 rounded-xl shadow-sm px-6 py-4">
          <h1 className="text-2xl font-bold text-purple-700 dark:text-purple-300">
            MediNotes Pro
          </h1>
          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4">
                <Link 
                  href="/product" 
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Go to App
                </Link>
                <UserButton showName={true} />
              </div>
            </SignedIn>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative text-center py-16 flex flex-col items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <img src="/doctor-index-page.png" alt="Doctor with stethoscope" className="w-[420px] h-auto opacity-30 mix-blend-multiply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="relative z-10">
            <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent mb-6">
              Transform Your
              <br />
              Consultation Notes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              AI-powered assistant that generates professional summaries, action items, and patient communications from your consultation notes
            </p>
          </div>
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 z-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-purple-100 dark:border-purple-700 backdrop-blur-sm">
                <div className="text-3xl mb-4">📋</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Professional Summaries</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Generate comprehensive medical record summaries from your notes
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-green-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-purple-100 dark:border-purple-700 backdrop-blur-sm">
                <div className="text-3xl mb-4">✅</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Action Items</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Clear next steps and follow-up actions for every consultation
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-purple-100 dark:border-purple-700 backdrop-blur-sm">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Patient Emails</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Draft clear, patient-friendly email communications automatically
                </p>
              </div>
            </div>
          </div>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
                Start Free Trial
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/product">
              <button className="bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
                Open Consultation Assistant
              </button>
            </Link>
          </SignedIn>
        </div>

        {/* Trust Indicators */}
        <footer className="mt-16 text-center text-sm text-purple-700 dark:text-purple-300 bg-gradient-to-r from-purple-50 to-gray-100 dark:from-purple-900 dark:to-gray-800 py-4 rounded-xl shadow-sm">
          <p>HIPAA Compliant • Secure • Professional</p>
          <div className="mt-2">
            <Link href="/about" className="text-purple-600 dark:text-purple-400 underline hover:text-purple-800">About MediNotes Pro</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}