import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, BrainCircuit, GitBranch } from 'lucide-react';
import { Logo } from '@/components/icons/logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg">Recovery Nexus</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-primary/5">
           <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20"
          >
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 "></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300"></div>
          </div>
          <div className="container text-center">
            <div className="bg-primary/10 text-primary font-semibold inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm mb-4 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Enterprise-Grade Vendor Governance
            </div>
            <h1 className="font-headline text-4xl font-bold tracking-tighter md:text-6xl">
              Intelligent Recovery. <br /> Absolute Governance.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              FedEx Recovery Nexus transforms debt collection by replacing manual processes with an AI-powered platform for managing Debt Collection Agencies (DCAs).
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/login">Request a Demo</Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Core Capabilities Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight">Core Capabilities</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A unified platform for control, efficiency, and intelligence.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="text-primary" />
                    Centralized Case Registry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Unify all overdue cases into a single source of truth with strict lifecycle states, eliminating spreadsheets and fragmented tracking.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="text-primary" />
                    AI-Powered Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Leverage AI to score and prioritize cases, recommend optimal recovery strategies, and generate human-readable explanations for every decision.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-primary" />
                    Agentic Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Automatically assign cases to the best-suited DCA based on reputation, capacity, and risk, with full audit logs for compliance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Role-Based Benefits Section */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container grid gap-16 md:grid-cols-2 items-center">
            <div>
              <span className="text-sm font-semibold text-primary">FOR FEDEX ADMINS</span>
              <h3 className="font-headline mt-2 text-3xl font-bold">Total Oversight and Control</h3>
              <p className="mt-4 text-lg text-muted-foreground">
                Gain a unified, real-time view of your entire recovery portfolio. Monitor DCA performance, enforce SLAs, and audit AI-driven decisions from a central dashboard.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Global dashboards with real-time performance metrics.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Immutable audit logs for every AI and human action.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Predictive SLA monitoring to prevent breaches proactively.</span>
                </li>
              </ul>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-md border">
              <img src="https://picsum.photos/seed/dashboard/600/400" alt="FedEx Admin Dashboard" className="rounded-lg" data-ai-hint="dashboard screen" />
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-background">
          <div className="container grid gap-16 md:grid-cols-2 items-center">
             <div className="bg-white p-6 rounded-lg shadow-md border order-last md:order-first">
              <img src="https://picsum.photos/seed/dca/600/400" alt="DCA Admin Dashboard" className="rounded-lg" data-ai-hint="interface analytics" />
            </div>
            <div>
              <span className="text-sm font-semibold text-primary">FOR DCA PARTNERS</span>
              <h3 className="font-headline mt-2 text-3xl font-bold">Streamlined and Focused Execution</h3>
              <p className="mt-4 text-lg text-muted-foreground">
                Work on prioritized cases with clear, AI-recommended strategies. Manage your team's workload and track performance within a secure, isolated environment.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Role-based access ensures data is strictly firewalled.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Receive intelligently assigned cases that match your strengths.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Simple interface for agents to update status and progress.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FedEx Recovery Nexus. A conceptual platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
