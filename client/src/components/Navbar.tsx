'use client'
import NavBarItem from './NavBarItem';
import Button from './Button';
import HomeIcon from '@mui/icons-material/Home';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const navDesktopItem = "md:flex md:items-center p-3 outline-none border border-transparent rounded-lg cursor-pointer md:hover:bg-bg-secondary focus:ring-2 focus:ring-accent-primary";
  const navDesktopContainer = "md:flex md:flex-col md:w-60 md:p-4 md:h-screen md:justify-between";
  const navMobileItems = "";
  const navMobileContainer = "w-screen fixed h-16 bottom-0 left-0 bg-bg-primary";


  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <nav className={`${navDesktopContainer} ${navMobileContainer} text-white border-t border-border md:flex-2 md:border-r z-100`}>
      <div className="flex flex-row justify-around md:flex md:flex-col md:gap-3">
        <div className={`hidden md:flex items-center p-3 text-3xl mb-3 font-extrabold`}> LinkUp </div>
        <NavBarItem  className={`${navDesktopItem} ${navMobileItems}`} href="/dashboard" Icon={HomeIcon} label="Home"/> 
        <NavBarItem  className={`${navDesktopItem} ${navMobileItems}`} href="/message" Icon={LocalPostOfficeIcon} label="Message"/> 
        <NavBarItem  className={`${navDesktopItem} ${navMobileItems}`} href="/profile" Icon={AccountBoxIcon} label="Profile"/> 
      </div>
      <Button className={`hidden md:flex text-red-500 px-3 py-3 justify-start hover:text-red-500 `} text='Logout' buttonType='tertiary' onClick={handleLogout}/>
    </nav>
  )
}

export default Navbar;
