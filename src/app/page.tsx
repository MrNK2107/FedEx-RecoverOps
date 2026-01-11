
'use client';

import Link from 'next/link';
import { ArrowRight, Bot, Building, CheckCircle, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/logo';
import React from 'react';

const features = [
  {
    icon: <Zap className="h-6 w-6 text-accent" />,
    title: 'ML-Based Prioritization',
    description: 'Leverage AI to score cases on urgency and recovery probability, focusing teams on what matters most.',
    bgColor: 'bg-primary/10',
  },
  {
    icon: <Bot className="h-6 w-6 text-accent" />,
    title: 'AI Strategy Engine',
    description: 'Generate optimal recovery strategies and talking points for agents, complete with AI-generated explanations.',
    bgColor: 'bg-primary/10',
  },
  {
    icon: <Building className="h-6 w-6 text-accent" />,
    title: 'Agentic Allocation',
    description: 'Automatically assign cases to the best-suited DCA based on reputation, capacity, and risk, with full audit logs.',
    bgColor: 'bg-primary/10',
  },
];

const partners = [
  { name: 'Global Recovery Systems' },
  { name: 'Atlas Collections' },
  { name: 'Apex Debt Management' },
  { name: 'Momentum Financial' },
  { name: 'Vertex Recovery' },
  { name: 'Quantum Solutions' },
];

function StrategyPreview() {
  const [thinking, setThinking] = React.useState(true);
  const [strategy, setStrategy] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setThinking(false);
      setStrategy('Aggressive Follow-up');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative rounded-lg border border-accent/20 bg-primary/10 p-6 backdrop-blur-sm">
        <h3 className="font-headline text-lg text-white">Live Strategy Generation</h3>
        <p className="text-sm text-gray-400 mb-4">Case ID: CASE-1024</p>
        <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
                <Bot className="h-8 w-8 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
                {thinking ? (
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">AI is analyzing...</span>
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm text-gray-400">Recommended Strategy:</p>
                        <p className="font-bold text-white truncate">{strategy}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#05011a] to-[#21155a] text-gray-200">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#05011a]/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo className="h-7 w-7 text-primary" />
            <span className="font-headline text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              FedEx
            </span>
            <span className="font-headline text-xl font-medium text-gray-400">
              Recovery Ops
            </span>
          </Link>
          <nav className="ml-auto flex items-center gap-4">
            <Button asChild>
              <Link href="/login">Access Platform <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse [animation-delay:2s]"></div>
          </div>
          <div className="container mx-auto text-center px-4 relative">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Intelligence-Driven Recovery.
            </h1>
            <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Enterprise-Grade Governance.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300 md:text-xl">
              FedEx Recovery Ops uses Agentic AI to automate collection agency allocation, enforce SLAs, and maximize recovery rates with explainable intelligence.
            </p>
            <div className="mt-10 flex justify-center">
              <Button size="lg" className="h-14 px-10 text-lg animate-pulse hover:animate-none" asChild>
                <Link href="/login">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5"/>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Bento Grid / Glassmorphism Dashboard Preview */}
        <section className="container mx-auto px-4 pb-20 md:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 rounded-xl border border-accent/20 bg-primary/10 p-8 backdrop-blur-sm shadow-2xl shadow-primary/10">
                    <h2 className="font-headline text-2xl text-white mb-2">Centralized Control Tower</h2>
                    <p className="text-gray-400 mb-6">A unified view of your entire recovery portfolio.</p>
                    <div className="w-full h-80 rounded-lg bg-black/30 border border-white/10 p-4 relative overflow-hidden">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <img src="https://picsum.photos/seed/fedex-admin-dashboard/1080/600" alt="Dashboard mock" className="absolute top-12 left-4 w-[calc(100%-2rem)] rounded-md opacity-70 border-2 border-primary/50" data-ai-hint="dashboard screen" />
                    </div>
                </div>
                <div className="space-y-8">
                    <StrategyPreview />
                     <div className="relative rounded-lg border border-accent/20 bg-primary/10 p-6 backdrop-blur-sm">
                        <h3 className="font-headline text-lg text-white">Role-Based Access</h3>
                        <p className="text-sm text-gray-400 mb-4">Strict data isolation for all users.</p>
                        <ul className="space-y-3">
                            {['FedEx Admin', 'DCA Admin', 'DCA Employee'].map(role => (
                                <li key={role} className="flex items-center gap-3 text-sm text-gray-300">
                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    <span>{role}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="rounded-xl border border-accent/20 bg-primary/10 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:bg-primary/20 hover:border-accent/40 hover:-translate-y-2">
                   <div className="mx-auto bg-primary/20 rounded-full h-14 w-14 flex items-center justify-center border border-accent/20 mb-4">
                      {feature.icon}
                    </div>
                  <h3 className="font-headline text-xl text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Partner Marquee */}
        <section className="py-20 md:py-28 relative overflow-hidden">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-white md:text-4xl">Trusted by Leading DCA Partners</h2>
            </div>
            <div className="w-full inline-flex flex-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                    {partners.map(p => <li className="text-xl font-medium text-gray-400" key={p.name}>{p.name}</li>)}
                </ul>
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                    {partners.map(p => <li className="text-xl font-medium text-gray-400" key={p.name}>{p.name}</li>)}
                </ul>
            </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="container mx-auto py-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} FedEx Recovery Ops. An internal platform for authorized personnel only.
        </div>
      </footer>
    </div>
  );
}

    