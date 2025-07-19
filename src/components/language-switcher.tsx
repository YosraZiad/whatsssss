'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('LanguageSwitcher');

  const changeLocale = (newLocale: string) => {
    // هذا التعبير العادي يزيل اللغة الحالية من المسار
    // ويستبدلها باللغة الجديدة للحفاظ على نفس الصفحة
    const newPath = pathname.replace(/^\/(en|ar)/, '');
    router.push(`/${newLocale}${newPath}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLocale('en')} disabled={locale === 'en'}>
          {t('english')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale('ar')} disabled={locale === 'ar'}>
          {t('arabic')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
