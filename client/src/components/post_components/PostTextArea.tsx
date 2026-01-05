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

  export default PostTextArea;