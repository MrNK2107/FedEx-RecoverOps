import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Settings | FedEx DCA-OS',
  description: 'Application Settings',
};

export default function SettingsPage() {
  return (
    <div>
      <h1 className="font-headline text-3xl font-bold tracking-tight">Settings</h1>
      <p className="text-muted-foreground">This page is under construction.</p>
    </div>
  );
}
