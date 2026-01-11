
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Bell, Home, Briefcase, BarChart3, Settings } from "lucide-react";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getUser } from "@/lib/data";
import type { User } from "@/lib/definitions";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Overview", roles: ['fedex_admin', 'dca_admin', 'dca_employee'] },
  { href: "/dashboard/dcas", icon: Briefcase, label: "DCAs", roles: ['fedex_admin'] },
  { href: "/dashboard/dcas", icon: Briefcase, label: "Agency", roles: ['dca_admin'] },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics", roles: ['fedex_admin'] },
  { href: "/dashboard/settings", icon: Settings, label: "Settings", roles: ['fedex_admin', 'dca_admin', 'dca_employee'] },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    async function fetchUser() {
        const userData = await getUser();
        setUser(userData);
    }
    fetchUser();
  }, [])

  if (!user) {
    return (
        <div className="hidden border-r bg-background md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    {/* Skeleton for header */}
                </div>
                <div className="flex-1 p-4 space-y-4">
                    <div className="h-8 bg-muted rounded-md animate-pulse" />
                    <div className="h-8 bg-muted rounded-md animate-pulse" />
                    <div className="h-8 bg-muted rounded-md animate-pulse" />
                </div>
            </div>
        </div>
    )
  }

  const filteredNavItems = navItems.filter(item => {
    return item.roles.includes(user.role);
  });

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg">Recovery Ops</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {filteredNavItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  (pathname === href || (href !== "/dashboard" && pathname.startsWith(href))) && "bg-muted text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>
                Contact support for any issues with the platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
