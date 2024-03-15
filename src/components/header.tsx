import { MoreMenu, PageMenu, SortMenu } from '@/components/menus';
import { MaterialIcons } from './icons';

export function Header() {
  return (
    <header className='flex h-12 flex-row items-center justify-between border-b border-b-slate-300 bg-white px-4 dark:border-b-slate-800 dark:bg-black'>
      <SortMenu>
        <MaterialIcons name='sort-ascending' size={24} />
      </SortMenu>

      <PageMenu />

      <MoreMenu>
        <MaterialIcons name='information-variant' size={24} />
      </MoreMenu>
    </header>
  );
}
