import Link from "next/link";

interface NavBarItemProps {
    className?: string;
    label: string;
    Icon: any;
    href: string;
}

const NavBarItem = ({ className, label, Icon , href}: NavBarItemProps) => {
    return (
        <Link className={className} href={href}>
            <Icon />
            <span className='hidden md:inline ml-5'>{label}</span>
        </Link>
    )
}

export default NavBarItem;