"use client"

import { useState, FormEvent } from 'react';
import { useAuth } from '@clerk/nextjs';
import DatePicker from 'react-datepicker';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Protect, PricingTable, UserButton } from '@clerk/nextjs';

function ConsultationForm() {
    const { getToken, signOut } = useAuth();

    // Form state
    const [patientName, setPatientName] = useState('');
    const [visitDate, setVisitDate] = useState<Date | null>(new Date());
    const [notes, setNotes] = useState('');

    // Streaming state
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setOutput('');
        setLoading(true);


            // Session management: get token from localStorage or Clerk
            let jwt = localStorage.getItem('clerk_jwt');
            let expiry = localStorage.getItem('clerk_jwt_expiry');
            const now = Date.now();
            if (!jwt || !expiry || now > parseInt(expiry)) {
                jwt = await getToken();
                if (!jwt) {
                    setOutput('Authentication required');
                    setLoading(false);
                    return;
                }
                // Set expiry for 2 hours from now
                const newExpiry = (now + 2 * 60 * 60 * 1000).toString();
                localStorage.setItem('clerk_jwt', jwt);
                localStorage.setItem('clerk_jwt_expiry', newExpiry);
                expiry = newExpiry;
            }
            // If expired, sign out
            if (now > parseInt(expiry)) {
                localStorage.removeItem('clerk_jwt');
                localStorage.removeItem('clerk_jwt_expiry');
                signOut();
                setOutput('Session expired. Please sign in again.');
                setLoading(false);
                return;
            }

        const controller = new AbortController();
        let buffer = '';

        await fetchEventSource('/api', {
            signal: controller.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                patient_name: patientName,
                date_of_visit: visitDate?.toISOString().slice(0, 10),
                notes,
            }),
            onmessage(ev) {
                buffer += ev.data;
                setOutput(buffer);
            },
            onclose() { 
                setLoading(false); 
            },
            onerror(err) {
                console.error('SSE error:', err);
                controller.abort();
                setLoading(false);
            },
        });
    }

    return (
        <div className={`container mx-auto px-4 py-12 ${output ? 'max-w-5xl' : 'max-w-3xl'}`}> 
            <h1 className="text-4xl font-extrabold text-purple-700 dark:text-purple-300 mb-8 text-center tracking-tight drop-shadow-lg">
                Consultation Notes
            </h1>
            {output ? (
                <div className="flex flex-row gap-8 justify-center items-start">
                    <form 
                        onSubmit={handleSubmit} 
                        className="space-y-6 bg-gradient-to-br from-white via-purple-50 to-purple-100 dark:from-gray-900 dark:via-purple-900 dark:to-purple-800 rounded-2xl shadow-2xl p-8 w-2/5 min-w-[320px] border border-purple-200 dark:border-purple-700"
                    >
                        <div className="space-y-2">
                            <label htmlFor="patient" className="block text-base font-semibold text-purple-700 dark:text-purple-300">
                                Patient Name
                            </label>
                            <input
                                id="patient"
                                type="text"
                                required
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                className="w-full px-4 py-2 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-purple-950 dark:text-white bg-purple-50"
                                placeholder="Enter patient's full name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="date" className="block text-base font-semibold text-purple-700 dark:text-purple-300">
                                Date of Visit
                            </label>
                            <DatePicker
                                id="date"
                                selected={visitDate}
                                onChange={(d: Date | null) => setVisitDate(d)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select date"
                                required
                                className="w-full px-4 py-2 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-purple-950 dark:text-white bg-purple-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="notes" className="block text-base font-semibold text-purple-700 dark:text-purple-300">
                                Consultation Notes
                            </label>
                            <textarea
                                id="notes"
                                required
                                rows={8}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full px-4 py-2 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-purple-950 dark:text-white bg-purple-50"
                                placeholder="Enter detailed consultation notes..."
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 disabled:bg-purple-400 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                        >
                            {loading ? 'Generating Summary...' : 'Generate Summary'}
                        </button>
                    </form>
                    <section className="bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 dark:from-purple-950 dark:via-purple-900 dark:to-purple-800 rounded-2xl shadow-2xl p-8 w-3/5 min-w-[320px] border border-purple-200 dark:border-purple-700 flex flex-col gap-4">
                        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-4">Summary & Drafted Email</h2>
                        <div className="markdown-content prose prose-purple dark:prose-invert max-w-none text-lg">
                            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                                {output}
                            </ReactMarkdown>
                        </div>
                    </section>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-br from-white via-purple-50 to-purple-100 dark:from-gray-900 dark:via-purple-900 dark:to-purple-800 rounded-2xl shadow-2xl p-8 border border-purple-200 dark:border-purple-700">
                    <div className="space-y-2">
                        <label htmlFor="patient" className="block text-base font-semibold text-purple-700 dark:text-purple-300">
                            Patient Name
                        </label>
                        <input
                            id="patient"
                            type="text"
                            required
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            className="w-full px-4 py-2 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-purple-950 dark:text-white bg-purple-50"
                            placeholder="Enter patient's full name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="date" className="block text-base font-semibold text-purple-700 dark:text-purple-300">
                            Date of Visit
                        </label>
                        <DatePicker
                            id="date"
                            selected={visitDate}
                            onChange={(d: Date | null) => setVisitDate(d)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select date"
                            required
                            className="w-full px-4 py-2 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-purple-950 dark:text-white bg-purple-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="notes" className="block text-base font-semibold text-purple-700 dark:text-purple-300">
                            Consultation Notes
                        </label>
                        <textarea
                            id="notes"
                            required
                            rows={8}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full px-4 py-2 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-purple-950 dark:text-white bg-purple-50"
                            placeholder="Enter detailed consultation notes..."
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 disabled:bg-purple-400 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                    >
                        {loading ? 'Generating Summary...' : 'Generate Summary'}
                    </button>
                </form>
            )}
        </div>
    );
}

import Link from 'next/link';

export default function Product() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-100 dark:from-purple-900 dark:to-gray-800 flex flex-col">
            {/* Header */}
            <header className="w-full py-6 px-4 bg-gradient-to-r from-purple-100 to-gray-50 dark:from-purple-900 dark:to-gray-800 rounded-b-xl shadow-lg flex justify-between items-center">
                <Link href="/">
                    <span className="text-2xl font-bold text-purple-700 dark:text-purple-300 tracking-wide hover:underline">MediNotes Pro</span>
                </Link>
                <nav className="flex gap-6 items-center">
                    <Link href="/about" className="text-purple-700 dark:text-purple-300 hover:underline text-lg">About</Link>
                    <UserButton showName={true} />
                </nav>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center py-8 px-2">
                <Protect
                    plan="premium_subscription"
                    fallback={
                        <div className="container mx-auto px-4 py-12">
                            <header className="text-center mb-12">
                                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent mb-4">
                                    Healthcare Professional Plan
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                                    Streamline your patient consultations with AI-powered summaries
                                </p>
                            </header>
                            <div className="max-w-4xl mx-auto">
                                <PricingTable />
                            </div>
                        </div>
                    }
                >
                    <ConsultationForm />
                </Protect>
            </div>

            {/* Footer */}
            <footer className="w-full py-4 px-4 bg-gradient-to-r from-purple-50 to-gray-100 dark:from-purple-900 dark:to-gray-800 text-center text-purple-700 dark:text-purple-300 text-sm rounded-t-xl shadow-inner">
                <span>MediNotes Pro &copy; {new Date().getFullYear()} &mdash; HIPAA Compliant • Secure • Professional</span>
            </footer>
        </main>
    );
}