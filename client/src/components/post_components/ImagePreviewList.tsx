import {Close, ChevronLeft, ChevronRight } from '@mui/icons-material';

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

export default ImagePreviewList;