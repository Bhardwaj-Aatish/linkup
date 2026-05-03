import { useState } from "react";
import PostContainer from "./PostContainer";
import Feed from "./Feed";

const UserContent = ({allPosts, likedPost, mediaUrls}: any) => {
    const [contentType, setContentType] = useState("Posts");

    const MediaComponent = () => {
        return(
            <div>Media comming soon..</div>
        )
    }

    const UserContentSection = () => {
        if(contentType === 'Posts') 
            return <Feed posts={allPosts}/>
        if (contentType === 'Like') {
            return <Feed posts={likedPost} />
        }
        return <MediaComponent />
    }

    const ContentSection = ({text}: any) => {
        const handleSectionChange = () => {
            setContentType(text);
        }
        return(
            <button className="flex-1 text-center p-4 hover:bg-bg-secondary hover:cursor-pointer" onClick={handleSectionChange}>{text}</button>

        )
    }
    return(
        <div className="content-container w-full">
            <div className="content-links w-full flex">
                <ContentSection text="Posts"/>
                <ContentSection text="Like" />
                <ContentSection text="Media" />
            </div>
            <UserContentSection />
        </div>
    )
}

export default UserContent;