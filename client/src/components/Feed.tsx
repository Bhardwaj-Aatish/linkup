import PostContainer from "./PostContainer";

const Feed = ({posts, onLikePost, onDeletePost, onDeleteComment, onCreateComment}: any ) => {
    const postItems = posts?.map((item: any) => {
        return (
            <PostContainer key={item._id} onLikePost={onLikePost} onDeletePost={onDeletePost} onDeleteComment={onDeleteComment} onCreateComment={onCreateComment} {...item}/>
        )
    })
    return (
        <div className="feed-container text-white flex flex-col">
            {postItems}
        </div>
    )
}

export default Feed;