
"use client";

import * as React from 'react';
import Link from "next/link";
import Image from 'next/image';
import {
  Bell,
  Home,
  Briefcase,
  BarChart3,
  Settings,
  Search,
  PanelLeft,
  LogOut,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/icons/logo";
import { getUser } from "@/lib/data";
import type { User } from '@/lib/definitions';
import { Badge } from "../ui/badge";
import { RunAllocationDialog } from "./cases/run-allocation-dialog";

export function DashboardHeader() {
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
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
            <div className="w-full flex-1">
                <div className="h-8 w-48 bg-muted rounded-md animate-pulse" />
            </div>
            <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
        </header>
    );
  }

  const roleDisplay: Record<typeof user.role, string> = {
    fedex_admin: 'FedEx Admin',
    dca_admin: 'DCA Admin',
    dca_employee: 'DCA Employee',
  }

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Overview", roles: ['fedex_admin', 'dca_admin', 'dca_employee'] },
    { href: "/dashboard/dcas", icon: Briefcase, label: "DCAs", roles: ['fedex_admin'] },
    { href: "/dashboard/dcas", icon: Briefcase, label: "Agency", roles: ['dca_admin'] },
    { href: "/dashboard/team", icon: Users, label: "Team", roles: ['dca_admin'] },
    { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics", roles: ['fedex_admin'] },
    { href: "/dashboard/settings", icon: Settings, label: "Settings", roles: ['fedex_admin', 'dca_admin', 'dca_employee'] },
  ];

  const filteredNavItems = navItems.filter(item => {
    return item.roles.includes(user.role);
  });

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <Logo className="h-6 w-6 text-primary" />
              <span className="sr-only">Recovery Ops</span>
            </Link>
             {filteredNavItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        <div className="flex items-center gap-4">
            <form className="flex-1">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Search cases, DCAs..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                    />
                </div>
            </form>
            {user.role === 'fedex_admin' && <RunAllocationDialog />}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Image src={user.avatarUrl} alt={user.name} width={40} height={40} className="rounded-full" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            Role: <Badge variant="outline">{roleDisplay[user.role]}</Badge>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
             <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
             </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
