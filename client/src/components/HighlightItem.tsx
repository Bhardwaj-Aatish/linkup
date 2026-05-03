interface HighlightItemProps {
    heading: string,
    time: string,
}
const HighlightItem = ({ heading, time }: HighlightItemProps) => {
    return (
        <div className="flex flex-col justify-center highlight-item-content h-22 py-4 hover:bg-bg-secondary hover:cursor-pointer overflow-hidden">
            <div className="highlight-item-heading px-3 text-md font-bold hover:underline">{heading}</div>
            <div>
                <span className="highlight-time px-3 text-text-teritary text-sm">{time}</span>
            </div>
        </div>
    )
}

export default HighlightItem;