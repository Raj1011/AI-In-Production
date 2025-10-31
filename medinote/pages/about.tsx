import Link from 'next/link';

export default function About() {
  return (
  <main className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-100 dark:from-purple-900 dark:to-gray-800 flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-purple-200 dark:border-purple-700 flex flex-col items-center">
        <img src="/doctor-about-page.png" alt="Doctor with stethoscope" className="w-[220px] h-auto mb-6 rounded-xl shadow-lg mix-blend-multiply opacity-90" />
        <h1 className="text-4xl font-bold text-purple-700 dark:text-purple-300 mb-6 text-center">About MediNotes Pro</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          MediNotes Pro is an AI-powered medical consultation assistant designed to help healthcare professionals quickly generate professional summaries, action items, and patient communications from their consultation notes.
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6">
          <li>HIPAA Compliant & Secure</li>
          <li>Streamlined for medical workflows</li>
          <li>Modern, intuitive design</li>
        </ul>
        <div className="text-center">
          <Link href="/product">
            <button className="bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg">
              Try Consultation Assistant
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
