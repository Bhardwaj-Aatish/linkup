import Image from "next/image";
import Button from "./Button";

interface SuggestionItemProps {
    imageUrl: string,
    name: string,
    email: string,
}

const SuggestionItem = ({ imageUrl, name, email }: SuggestionItemProps) => {
    return (
        <div className="suggestion-box-content flex flex-row justify-between items-center p-4 h-18 hover:bg-bg-secondary hover:cursor-pointer">
            <div className="suggestions gap-x-2 flex flex-row text-base">
                <Image
                    src={imageUrl}
                    width={40}
                    height={40}
                    className="object-cover border rounded-full border-border"
                    alt="avatar"
                />
                <div className="suggestion-info">
                    <div className="suggestions-name font-bold hover:underline">{name}</div>
                    <div className="suggestion-email text-sm text-text-teritary">{email}</div>
                </div>
            </div>
            <Button text="follow" className="rounded-t-full rounded-b-full w-20 h-8 flex justify-center items-center" type="button" />
        </div>
    )
}

export default SuggestionItem;