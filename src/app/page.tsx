import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Users, BrainCircuit, GitBranch, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/icons/logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg">Recovery Ops</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4">
            <Button asChild>
              <Link href="/login">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20"
          >
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 "></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300"></div>
          </div>
          <div className="container text-center relative">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Intelligent Recovery. <br /> Absolute Governance.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              The internal platform for transforming FedEx's debt collection with AI-powered vendor governance, case prioritization, and real-time oversight.
            </p>
            <div className="mt-8 flex justify-center">
              <Button size="lg" asChild>
                <Link href="/login">Access Your Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Core Capabilities Section */}
        <section className="py-20 md:py-28 bg-muted/40">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-headline text-3xl font-bold tracking-tight">A Unified Platform for Control and Efficiency</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Recovery Ops replaces fragmented workflows with a single source of truth, empowering FedEx with unprecedented control and intelligence.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="text-center bg-background/50">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center">
                      <GitBranch className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline pt-2">
                    Centralized Case Registry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Unify all overdue cases with strict lifecycle states, eliminating spreadsheets and fragmented tracking for complete visibility.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center bg-background/50">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline pt-2">
                    AI-Powered Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Leverage AI to score cases, recommend optimal recovery strategies, and generate human-readable explanations for every decision.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center bg-background/50">
                <CardHeader>
                   <div className="mx-auto bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline pt-2">
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
        <section className="py-20 md:py-28 bg-background">
          <div className="container grid gap-16 md:grid-cols-2 items-center">
            <div>
              <span className="text-sm font-semibold text-primary">FOR FEDEX ADMINS</span>
              <h3 className="font-headline mt-2 text-3xl font-bold">Total Oversight and Control</h3>
              <p className="mt-4 text-lg text-muted-foreground">
                Gain a unified, real-time view of your entire recovery portfolio. Monitor DCA performance, enforce SLAs, and audit AI-driven decisions from a central dashboard.
              </p>
              <ul className="mt-6 space-y-4 text-muted-foreground">
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
             <div className="bg-muted/40 p-8 rounded-lg">
                <div className="bg-background rounded-lg shadow-lg p-2 border">
                    <div className="flex items-center gap-2 p-2 border-b">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="p-4">
                        <h4 className="font-bold font-headline">DCA Performance</h4>
                        <div className="h-40 bg-primary/10 rounded-md mt-4 flex items-center justify-center">
                            <p className="text-sm text-primary/50">Chart Placeholder</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-muted/40">
          <div className="container grid gap-16 md:grid-cols-2 items-center">
             <div className="bg-background p-8 rounded-lg order-last md:order-first">
                 <div className="flex items-center justify-center bg-muted/40 p-4 rounded-lg">
                     <Users className="h-16 w-16 text-primary/30" />
                     <div className="ml-4 flex-1 space-y-2">
                        <div className="h-4 bg-primary/10 rounded"></div>
                        <div className="h-4 bg-primary/10 rounded w-5/6"></div>
                     </div>
                 </div>
                 <div className="flex items-center justify-center bg-muted/40 p-4 rounded-lg mt-4">
                     <ShieldCheck className="h-16 w-16 text-primary/30" />
                     <div className="ml-4 flex-1 space-y-2">
                        <div className="h-4 bg-primary/10 rounded"></div>
                        <div className="h-4 bg-primary/10 rounded w-5/6"></div>
                     </div>
                 </div>
            </div>
            <div>
              <span className="text-sm font-semibold text-primary">FOR DCA PARTNERS</span>
              <h3 className="font-headline mt-2 text-3xl font-bold">Streamlined and Focused Execution</h3>
              <p className="mt-4 text-lg text-muted-foreground">
                Work on prioritized cases with clear, AI-recommended strategies. Manage your team's workload and track performance within a secure, isolated environment.
              </p>
              <ul className="mt-6 space-y-4 text-muted-foreground">
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

      <footer className="border-t bg-muted/40">
        <div className="container py-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FedEx Recovery Ops. An internal platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
