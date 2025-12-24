import PostContainer from "./PostContainer";

const Feed = ({posts, onLikePost, onDeletePost}: any ) => {
    const postItems = posts?.map((item: any, index: any) => {
        console.log("working feed here", item)
        return (
            <PostContainer key={index} onLikePost={onLikePost} onDeletePost={onDeletePost} {...item}/>
        )
    })
    return (
        <div className="feed-container text-white flex flex-col">
            {postItems}
        </div>
    )
}

export default Feed;