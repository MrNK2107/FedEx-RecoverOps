import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/icons/logo';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Logo className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-headline text-2xl font-bold text-primary">
            FedEx Recovery Ops
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access your dashboard.
          </p>
        </div>
        
        <LoginForm />

        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} FedEx Corporation. All rights reserved.
        </p>
      </div>
    </main>
  );
}
