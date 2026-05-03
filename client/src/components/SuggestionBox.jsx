import Button from "./Button";
import Image from "next/image";
import SuggestionItem from "./SuggestionItem";

const SuggestionBox = () => {
    return (
        <div className="suggestion-box-container flex flex-col border border-border rounded-2xl">
            <div className="suggestion-box-title text-xl p-3 font-extrabold">Who to follow</div>
            <div className="suggestion-box-item-container flex flex-col">
                <SuggestionItem imageUrl="/default.jpg" name="Aatish" email="abc@gmail.com" />
                <SuggestionItem imageUrl="/default.jpg" name="Aatish" email="abc@gmail.com" />
                <SuggestionItem imageUrl="/default.jpg" name="Aatish" email="abc@gmail.com" />
            </div>
            <Button text="Show more" buttonType="tertiary" className="flex w-full hover:bg-bg-secondary px-4 py-4 rounded-b-2xl rounded-t-none"/>
        </div>
    )
}
export default SuggestionBox;