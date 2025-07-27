import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import SignOutButton from '@/app/_components/SignOutButton';
import Link from 'next/link';

const navLinks = [
  {
    name: 'Home',
    href: '/account',
    icon: <HomeIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Reservations',
    href: '/account/reservations',
    icon: <CalendarDaysIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Guest profile',
    href: '/account/profile',
    icon: <UserIcon className='h-5 w-5 text-primary-600' />,
  },
];

function SideNavigation() {
  return (
    <nav className='border-r border-primary-900 h-full flex flex-col'>
      {/* Navigation links */}
      <div className='flex-1'>
        <ul className='flex flex-col gap-1 text-lg'>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`py-2 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200`}
                href={link.href}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Sign-out button with reduced height */}
      <div className='border-t border-primary-900'>
        <SignOutButton className="py-1 px-5 w-full text-left" />
      </div>
    </nav>
  );
}
export default SideNavigation;
