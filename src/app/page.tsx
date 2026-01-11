import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Users, BrainCircuit, GitBranch, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/icons/logo';

export default function LandingPage() {
  const features = [
    {
      icon: GitBranch,
      title: 'Centralized Case Registry',
      description: 'Unify all overdue cases with strict lifecycle states, eliminating spreadsheets for complete visibility.',
    },
    {
      icon: BrainCircuit,
      title: 'ML-Based Prioritization',
      description: 'Leverage AI to score cases on urgency and recovery probability, ensuring your teams focus on what matters most.',
    },
    {
      icon: Users,
      title: 'Agentic Allocation Engine',
      description: 'Automatically assign cases to the best-suited DCA based on reputation, capacity, and risk, with full audit logs.',
    },
    {
      icon: ShieldCheck,
      title: 'SLA Monitoring & Governance',
      description: 'Proactively track SLA compliance with predictive breach risk alerts and ensure full accountability.',
    },
  ];

  const roles = [
    {
      title: 'For FedEx Admins',
      subtitle: 'Global Oversight & Control',
      description: 'Gain a unified, real-time view of your entire recovery portfolio. Monitor DCA performance, enforce SLAs, and audit AI-driven decisions from a central dashboard.',
      benefits: [
        'Global dashboards with real-time performance metrics.',
        'Immutable audit logs for every AI and human action.',
        'Predictive SLA monitoring to prevent breaches proactively.',
      ],
    },
    {
      title: 'For DCA Partners',
      subtitle: 'Streamlined & Focused Execution',
      description: 'Work on prioritized cases with clear, AI-recommended strategies. Manage your team\'s workload and track performance within a secure, isolated environment.',
      benefits: [
        'Role-based access ensures data is strictly firewalled.',
        'Receive intelligently assigned cases that match your strengths.',
        'Simple interface for agents to update status and progress.',
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo className="h-7 w-7 text-primary" />
            <span className="font-headline text-xl font-bold text-primary">FedEx</span>
            <span className="font-headline text-xl font-medium text-foreground/80">Recovery Ops</span>
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
           <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-10">
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-accent"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-accent to-purple-400"></div>
          </div>
          <div className="container text-center relative">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              The Future of Recovery Intelligence
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
              Centralize vendor governance and empower your recovery process with an AI-driven platform built for enterprise control and efficiency.
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
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">A Unified Platform for Control and Efficiency</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Recovery Ops replaces fragmented workflows with a single source of truth, empowering FedEx with unprecedented control and intelligence.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="text-center bg-background/50 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline pt-2 text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Role-Based Benefits Section */}
        {roles.map((role, index) => (
          <section key={index} className={`py-20 md:py-28 ${index === 0 ? 'bg-background' : 'bg-muted/40'}`}>
            <div className="container grid gap-16 md:grid-cols-2 items-center">
              <div className={index % 2 !== 0 ? 'md:order-last' : ''}>
                <span className="text-sm font-semibold text-primary">{role.title}</span>
                <h3 className="font-headline mt-2 text-3xl font-bold">{role.subtitle}</h3>
                <p className="mt-4 text-lg text-muted-foreground">
                  {role.description}
                </p>
                <ul className="mt-6 space-y-4">
                  {role.benefits.map((benefit, bIndex) => (
                     <li key={bIndex} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center p-8 bg-background/50 rounded-lg shadow-inner-lg">
                {/* Abstract UI representation */}
                <div className="w-full h-80 rounded-lg bg-muted border p-4 relative overflow-hidden">
                    <div className="flex items-center gap-2 pb-2 border-b">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="absolute inset-0 -z-10 opacity-10">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/50 rounded-full blur-2xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-accent/50 rounded-full blur-2xl animate-pulse delay-200"></div>
                    </div>
                    <div className="mt-4 space-y-3">
                        <div className="h-8 bg-background/70 rounded-md w-3/4"></div>
                        <div className="h-8 bg-background/70 rounded-md w-1/2"></div>
                        <div className="h-8 bg-background/70 rounded-md w-5/6"></div>
                    </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FedEx Recovery Ops. An internal platform for authorized personnel only.
        </div>
      </footer>
    </div>
  );
}
