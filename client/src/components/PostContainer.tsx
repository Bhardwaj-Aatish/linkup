
import Image from "next/image";
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactionComponent from "./ReactionComponent";
import { useEffect } from "react";
import apiClient from "@/lib/axiosInstance";
import { useAuth } from "@/context/AuthContext";

interface PostContainerProps {
    name: string;
    email: string;
    time: string;
    caption: string;
    avatarUrl: string;
    postImageUrl: string;
}

const PostContainer = ({ author, createdAt, caption, mediaUrl, like, comments, _id, onLikePost, onDeletePost }: any) => {
    const { user } = useAuth()
    const avatarUrl = author?.profilePhoto || '/default.jpg'

    const likePost = async () => {
        try {
            const like_url = `/api/posts/like_post/${_id}`
            const unlike_Url = `/api/posts/unlike_post/${_id}`
            const url = like.includes?.(user?.id) ? unlike_Url : like_url
            const response = await apiClient.patch(url);
            if (response.status === 201) {
                onLikePost(_id)
            }
        } catch (error) {
            console.error("Failed", error)
        }
    }

    const deletePost = async () => {
        try {
            const response = await apiClient.delete(`/api/posts/delete_post/${_id}`)
            if(response.status === 204) {
                onDeletePost(_id);
                //call dashboard function 
            }
        } catch (error) {
            console.error("Failed in deleting the post", error)
        }
    }

    return (
        <div className="post-container flex gap-x-2 p-4 border-y border-border">
            <div className="avatar-border basis-10 mr-2 flex-none">
                <Image
                    src={avatarUrl}
                    width={40}
                    height={40}
                    className="object-cover border rounded-full border-border"
                    alt="/default.jpg"
                />
            </div>
            <div className="post-message flex-1 flex-col">
                <div className="author-info flex flex-col">
                    <div className="flex items-start gap-x-3">
                        <span className="author-name font-bold">{author?.name}</span>
                        <span className="text-text-teritary">{createdAt}</span>
                    </div>
                    <span className="text-text-teritary text-xs">{author?.email}</span>
                </div>
                <div className="py-2">{caption}</div>
                {mediaUrl.length > 0 && (
                    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[400px] mt-2 flex">
                        <Image
                            src={mediaUrl[0]}
                            fill={true}
                            className="border rounded-lg object-cover"
                            alt="post"
                        />
                    </div>
                )}

                <div className="post-reaction flex justify-around items-center p-2">
                    <ReactionComponent Icon={ThumbUpIcon} label={like?.length} onClick={likePost} />
                    <ReactionComponent Icon={CommentIcon} label={comments?.length} />
                    <ReactionComponent Icon={DeleteIcon} label="Delete" onClick={deletePost}/>
                </div>
            </div>

        </div>
    )
}

export default PostContainer;