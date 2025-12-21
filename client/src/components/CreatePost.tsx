import React, { useState, useRef, ChangeEvent } from 'react';
import { EmojiEmotions, Image, Close, ChevronLeft, ChevronRight } from '@mui/icons-material';
import Button from './Button';
import apiClient from '@/lib/axiosInstance';

const PostTextArea = ({ postText, setPostText, textAreaRef, maxChar }: any) => {
  const handlePostText = (event: any) => {
    setPostText(event.target.value);

    const el = textAreaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      value={postText}
      onChange={handlePostText}
      placeholder="What's happening?"
      className="w-full border-none outline-none text-white resize-none"
      rows={1}
    />
  );
};

const ImagePreviewList = ({
  images,
  removeImage,
  scroll,
  scrollPosition,
  scrollContainerRef
}: any) => {
  const showScrollButtons = images.length > 2;
  if (images.length === 0) return null;

  return (
    <div className="mt-3 relative">
      {showScrollButtons && scrollPosition > 0 && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-1"
        >
          <ChevronLeft fontSize="small" />
        </button>
      )}

      <div ref={scrollContainerRef} className="flex gap-3 overflow-hidden">
        {images.map((image: any) => (
          <div
            key={image.id}
            className="relative "
            style={{ minWidth: images.length === 1 ? '80%' : '40%' }}
          >
            <img src={image.url} alt="preview" className="w-full object-cover rounded-xl" />
            <button
              onClick={() => removeImage(image.id)}
              className="absolute top-2 right-2 bg-bg-primary/60 text-white rounded-full p-2 flex cursor-pointer hover:bg-bg-primary/80"
            >
              <Close fontSize="small" />
            </button>
          </div>
        ))}
      </div>

      {showScrollButtons && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-1"
        >
          <ChevronRight fontSize="small" />
        </button>
      )}
    </div>
  );
};

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

        <div onClick={handlePost}>
          <Button text="Post" className='px-8 py-1 rounded-l-2xl rounded-r-2xl' />
        </div>
      </div>
    </div>
  );
};

const CreatePost = ({onCreatePost}: any) => {
  const [postText, setPostText] = useState<string>('');
  const [images, setImages] = useState<any[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const maxChars = 280;

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file,
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    setScrollPosition(0);
  };

  const savePost = async (postText: string, images: Array<string>) => {
    const response = await apiClient.post('/api/posts/create', 
      {
        caption: postText,
        mediaUrl: images
      }
    )
    onCreatePost(response?.data?.post)
  }

  const handlePost = () => {
    if (postText.trim() || images.length > 0) {
      savePost(postText, images)
      setPostText('');
      setImages([]);
      setScrollPosition(0);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <div className="create-post-container px-4 my-2 w-full">
      <div className="flex gap-4 justify-center items-center max-h-[80vh] overflow-y-auto">
        <div className="w-10 h-10 flex self-start">
          <img src="default.jpg" alt="" className='w-full h-full object-contain rounded-full'/>
        </div>

        <div className="create-post-content-container flex flex-col w-full">
          <PostTextArea
            postText={postText}
            setPostText={setPostText}
            textAreaRef={textAreaRef}
            maxChars={maxChars}
          />

          <ImagePreviewList
            images={images}
            removeImage={removeImage}
            scroll={scroll}
            scrollPosition={scrollPosition}
            scrollContainerRef={scrollContainerRef}
          />
        </div>
      </div>

      <div className="border-t mt-3 mb-2 border-border"></div>

      <PostActions
        fileInputRef={fileInputRef}
        handleImageUpload={handleImageUpload}
        postText={postText}
        maxChars={maxChars}
        handlePost={handlePost}

      />
    </div>
  );
};

export default CreatePost;
