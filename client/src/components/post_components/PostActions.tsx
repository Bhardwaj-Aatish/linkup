import Button from "../Button";
import { EmojiEmotions, Image} from '@mui/icons-material';

const PostActions = ({
  fileInputRef,
  handleImageUpload,
  postText,
  maxChars,
  handlePost
}: any) => {
  const charsRemaining = maxChars - postText.length;
  const isOverLimit = charsRemaining < 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <input
          type="file"
          name="photos"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          multiple
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-full hover:bg-bg-secondary hover:cursor-pointer"
        >
          <Image className="text-accent-primary" />
        </button>

        <button className="p-2 rounded-full hover:bg-bg-secondary hover:cursor-pointer">
          <EmojiEmotions className="text-accent-primary" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        {postText.length > 0 && (
          <span
            className={`text-xs font-semibold ${isOverLimit ? 'text-red-500' : 'text-text-teritary'}`}
          >
            {charsRemaining}
          </span>
        )}

        <div>
          <Button text="Post" onClick={handlePost} className='px-8 py-1 rounded-l-2xl rounded-r-2xl' />
        </div>
      </div>
    </div>
  );
};

export default PostActions;