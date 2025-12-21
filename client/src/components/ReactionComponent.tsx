interface ReactionComponentProps {
    Icon: any;
    label: string;
    onClick?: () => void;
}

const ReactionComponent = ({Icon, label, onClick}: ReactionComponentProps) => {
    return (
        <button className="reaction-item w-1/3  flex justify-center gap-x-2 hover:bg-bg-secondary hover:cursor-pointer p-3 rounded-lg" onClick={onClick}>
            <Icon />
            <span className="hidden md:flex">{label}</span>
        </button>

    )
}


export default ReactionComponent;


