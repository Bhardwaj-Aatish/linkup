interface ReactionComponentProps {
    Icon: any;
    label: string;
    onClick?: () => void;
}

const ReactionComponent = ({Icon, label, onClick}: ReactionComponentProps) => {
    return (
        <button className="reaction-item w-1/3  flex justify-center items-center gap-x-2 hover:bg-bg-secondary hover:cursor-pointer p-3 rounded-lg" onClick={onClick}>
            <Icon fontSize="inherit" className="text-text-secondary" />
            <span className="hidden md:flex text-text-secondary">{label}</span>
        </button>

    )
}


export default ReactionComponent;


