
import Image from "next/image";
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactionComponent from "./ReactionComponent";
import EditIcon from '@mui/icons-material/Edit';
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import apiClient from "@/lib/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import MediaComponent from "./MediaComponent";
import { ClickAwayListener } from "@mui/material";
import { ConfirmModal } from "./ConfirmModal";

interface PostContainerProps {
    name: string;
    email: string;
    time: string;
    caption: string;
    avatarUrl: string;
    postImageUrl: string;
}

type PopoverMenuItem = {
    label: string;
    onClick: () => void;
    className?: string;
};

type PopoverMenuProps = {
    items: PopoverMenuItem[];
    onClose: any
};

const PopoverMenu = ({ items, onClose }: PopoverMenuProps) => {
    return (
        <ul className="text-base text-white">
            {items.map((item, index) => (
                <li
                    key={index}
                    onClick={() => { item.onClick(); onClose(); }}
                    className={`px-3 py-1 rounded-md cursor-pointer hover:bg-bg-primary ${item.className || ""}`}
                >
                    {item.label}
                </li>
            ))}
        </ul>
    );
}

const CommentComponent = ({ comments, profilePhotoOfCurrentUser, postId, onDeleteComment, onCreateComment }: any) => {
    const [commentValue, setCommentValue] = useState('');
    const commentsArray = comments;

    const handleDeleteComment = async (commentId: string) => {
        const response = await apiClient.delete(`/api/posts/delete_comment/${postId}/${commentId}`);
        onDeleteComment(postId, commentId);
        console.log("halla bol", response)
    }

    const singleComment = commentsArray.map((comment: any) => {
        console.log("super", comment);
        const author = comment.author.name;
        const email = comment.author.email;
        const profilePhoto = comment.author.profilePhoto || '/default.jpg';
        const createdAt = comment.createdAt;
        const caption = comment.text;
        return (
            <div key={comment?._id} className="other-user-comment-container flex flex-row mt-8">
                <div className="avatar flex-1">
                    <img src={profilePhoto} alt="" className="object-cover w-8 rounded-full aspect-square" />
                </div>
                <div className="other-info flex-10">
                    <div className="name-info mb-2">
                        <div className="flex ">
                            <div className="name-date-container items-start gap-x-3">
                                <span className="author-name font-bold text-sm">{author}</span>
                                <span className="text-text-teritary text-sm"> {createdAt}</span>
                            </div>
                            {/* add delete comment button here like we have in post */}
                        </div>
                        <div className="email-of-comment-user text-text-teritary text-sm">{email}</div>
                    </div>
                    <div className="comment-text text-sm">
                        {caption}
                    </div>
                    <div className="comment-actions flex gap-x-4 items-center">
                        <button
                            onClick={() => {}}
                            className="flex justify-center items-center text-sm gap-x-1 text-text-secondary py-1 hover:text-white group"
                        >
                            <span>1</span>
                            <ThumbUpIcon
                                fontSize="inherit"
                                className="text-inherit hover:cursor-pointer hover:scale-125"
                            />
                        </button>

                        <button className="flex jusitfy-center hover:cursor-pointer" onClick={() => handleDeleteComment(comment?._id)}>

                            <DeleteIcon fontSize="inherit" className="text-text-secondary hover:text-white transition hover:scale-125 hover:cusor-pointer" />
                        </button>
                    </div>

                </div>

            </div>
        )
    })

    const createComment = async (e: any) => {
        const url = `/api/posts/comment/${postId}` as string;
        const response = await apiClient.post(url, {
            text: commentValue
        });
        onCreateComment(response?.data?.comment);
        setCommentValue('');
    }

    const handleCreateComment = (e: any) => {
        if(e.key === 'Enter') {
            createComment(e);
        }
    }

    return (
        <div className="comment-container w-full border-t border-border py-4">
            <div className="post-container w-full flex flex-row justify-between">
                <div className="avatar flex-1 flex items-center">
                    <img className="w-8 aspect-square object-cover rounded-full" src={profilePhotoOfCurrentUser} alt="" />
                </div>
                <div className="comment-input flex-10 relative">
                    <input type="text" value={commentValue} onKeyDown={handleCreateComment} onChange={(e: any)=> setCommentValue(e.target.value)} className="w-full h-full rounded-full border-border border-2 outline-none px-4 py-2 focus:border-accent-primary" placeholder="Type your comment here" />
                    <button className="absolute right-3 py-2 hover:cursor-pointer outline-none focus:scale-125 " onClick={createComment}><SendIcon /></button>
                </div>
            </div>
            {singleComment}
        </div>
    )
};


const PostContainer = ({ author, createdAt, caption, mediaUrl, like, comments, _id, onDeleteComment, onCreateComment, onLikePost, onDeletePost }: any) => {
    const { user } = useAuth()
    const [deletePostWarning, setDeletePostWarning] = useState(false);
    const [isEditPostPopoverOpen, setIsEditPostPopoverOpen] = useState(false);
    const anchorRef = useRef(null);
    const avatarUrl = author?.profilePhoto ?? '/default.jpg'
    const [showComment, setShowComment] = useState(false);


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
            if (response.status === 204) {
                onDeletePost(_id);
                //call dashboard function 
            }
        } catch (error) {
            console.error("Failed in deleting the post", error)
        }
    }

    const onEdit = () => {
        console.log("working handle edit");
    }

    const onDelete = () => {
        setDeletePostWarning(true);
    }

    const onReport = () => {

    }

    return (
        <div className="post-container flex gap-x-2 p-4 pb-0 border-y border-border">
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
                    <div className="temp-box flex justify-between">
                        <div className="flex items-start gap-x-3">
                            <span className="author-name font-bold">{author?.name}</span>
                            <span className="text-text-teritary">{createdAt}</span>
                        </div>
                        <button onClick={() => setIsEditPostPopoverOpen((open) => !open)} ref={anchorRef} className="hover:scale-125">
                            <MoreVertIcon className="hover:cursor-pointer text-white" fontSize="inherit" />
                        </button>

                        <Popper open={isEditPostPopoverOpen} anchorEl={anchorRef.current} placement="bottom" className="z-50">
                            <ClickAwayListener onClickAway={() => setIsEditPostPopoverOpen(false)}>
                                <div className="min-w-[120px] bg-bg-secondary border border-border rounded-lg shadow-lg py-1">
                                    <PopoverMenu
                                        onClose={() => setIsEditPostPopoverOpen(false)}
                                        items={[
                                            // { label: "Edit", onClick: onEdit }, to do in future 
                                            { label: "Delete", onClick: onDelete, className: "text-red-400" },
                                            { label: "Report", onClick: onReport }
                                        ]}
                                    />
                                </div>
                            </ClickAwayListener>
                        </Popper>

                        {deletePostWarning && <ConfirmModal open={deletePostWarning} title={"Deleting a Post?"} onConfirm={() => { deletePost(); setDeletePostWarning(false); }} onClose={() => setDeletePostWarning(false)} description="Are you sure to delete this post?" />}

                    </div>
                    <span className="text-text-teritary text-xs">{author?.email}</span>
                </div>
                <div className="py-2">{caption}</div>
                <MediaComponent media={mediaUrl} height={400} />

                <div className="post-reaction flex justify-around items-center mt-4">
                    <ReactionComponent Icon={ThumbUpIcon} label={like?.length} onClick={likePost} />
                    <ReactionComponent Icon={CommentIcon} label={comments?.length} onClick={() => setShowComment((show: boolean) => !show)} />
                    <ReactionComponent Icon={ViewWeekIcon} label="1" onClick={() => { }} />
                </div>

                {showComment && <CommentComponent comments={comments} profilePhotoOfCurrentUser={avatarUrl} postId={_id} onDeleteComment={onDeleteComment} onCreateComment={onCreateComment}/>}
            </div>
        </div>
    )
}

export default PostContainer;