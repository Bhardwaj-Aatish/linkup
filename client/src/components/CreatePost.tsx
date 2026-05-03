import React, { useState, useRef, ChangeEvent } from 'react';
import apiClient from '@/lib/axiosInstance';
import PostTextArea from './post_components/PostTextArea';
import ImagePreviewList from './post_components/ImagePreviewList';
import PostActions from './post_components/PostActions';

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

  const savePost = async (postText: string, images: any) => {
    const formData = new FormData();
    images.filter((image: any) => image?.file).forEach((img: any) => {
      formData.append('fileData', img.file);
    })
    formData.append('caption', postText);
    const response = await apiClient.post('/api/posts/create', formData)
    onCreatePost(response?.data?.post)
  }

  const handlePost = () => {
    console.log("working here aatish", images)
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
