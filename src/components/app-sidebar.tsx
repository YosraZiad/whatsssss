"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  IconApi,
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconLogin,
  IconSearch,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations();
  const locale = useLocale();

  const data = {
    user: {
      name: t("user.name"),
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: t("navMain.customers"),
        url: `/customers`,
        icon: IconListDetails,
      },
      {
        title: t("navMain.subscriptions"),
        url: `/subscriptions`,
        icon: IconChartBar,
      },
      {
        title: t("navMain.mobile-accounts"),
        url: "/mobile-accounts",
        icon: IconFolder,
      },
      {
        title: "اختبار API",
        url: "/api-test",
        icon: IconApi,
      },
    ],
    navSecondary: [
      {
        title: "الملف الشخصي",
        url: `/${locale}/profile`,
        icon: IconUser,
      },
      {
        title: "تسجيل الدخول",
        url: `/${locale}/login`,
        icon: IconLogin,
      },
      {
        title: t("navSecondary.settings"),
        url: "#",
        icon: IconSettings,
      },
      {
        title: t("navSecondary.getHelp"),
        url: "#",
        icon: IconHelp,
      },
      {
        title: t("navSecondary.search"),
        url: "#",
        icon: IconSearch,
      },
    ],
  };

  return (
    <Sidebar id="app-sidebar" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  {t("companyName")}
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
