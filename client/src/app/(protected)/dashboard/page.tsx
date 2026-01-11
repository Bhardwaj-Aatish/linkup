"use client"
import Navbar from '@/components/Navbar'
import SideBar from '@/components/Sidebar';
import Feed from '@/components/Feed';
import CreatePost from '@/components/CreatePost';
import { useEffect, useState } from 'react';
import apiClient from '@/lib/axiosInstance';
import { useAuth } from '@/context/AuthContext';
import { CommentsDisabled } from '@mui/icons-material';

const Dashboard = () => {
  const {user} = useAuth();
  const [posts, setPosts] = useState<any>([]);

    useEffect(() =>  {
      const fetchPost = async () => {
        const posts = await apiClient.get('/api/posts/all');
        setPosts(posts.data.posts)
      }
      fetchPost()
    }, []);

    const handleCreatePost = (post: any) => {
      setPosts((prevPosts: any) => [post, ...prevPosts])
    }

    const handleCreateComment = (comment: any) => {
      setPosts((prevPosts: any) => {
        const updatedPost = posts.map((post: any) => {
          if(post._id !== comment.postId) return post;
          
          return {
            ...post,
            comments: [
              comment,
              ...post.comments,
            ]
          }
        });
        return updatedPost;
      })
      console.log("halla bol handle createcomment", comment);

    }

    const printPost = (postId: string) => {
      posts.map((post: any) => {
        if(post._id === postId) {
          console.log("working like on this post", post)
        }
      })
    }

    const handleLikePost = (postId: string) => {
      setPosts((prevPosts: any) => {
        const updatedPost = prevPosts.map((post: any) => {

          if(post._id !== postId) return post;

          if(post.like.includes(user?.id)) return {
            ...post,
            like: post.like.filter((id: string) => id!== user?.id)
          };
          
          return {
            ...post, 
            like: [...post.like, user?.id]
          }
        })
        return updatedPost;
        }
      )
    }

    const handleDeletePost = (postId: string) => {
      setPosts((prevPosts: any) => {
        const updatedPost = prevPosts.filter((post: any) => {
          if(post._id !== postId) return post;
        })
        return updatedPost
      })
    }
    
    const handleDeleteComment = (postId: string, commentId: string) => {
      console.log("handle delete comment")
      setPosts((prevPosts: any) => {
        const updatedPost = prevPosts.map((post: any) => {
          if(post._id !== postId) return post;

          return {
            ...post,
            comments: post.comments.filter((comment: any) => commentId !== comment?._id)
          }
        })
        return updatedPost;
      })
    }



    return (
        <div className="flex w-screen h-100% justify-center items-center">
            <div className="flex lg:flex-2 bg-bg-primary">
                <Navbar />
            </div>
            <div className="middle-section border lg:flex-4 border-border text-white">
                <CreatePost onCreatePost={handleCreatePost}/>
                <Feed posts={posts} onCreateComment={handleCreateComment} onLikePost={handleLikePost} onDeletePost={handleDeletePost} onDeleteComment={handleDeleteComment} />
            </div>
            <div className="side-bar lg:flex-3">
                <SideBar />
            </div>
        </div>
    )
}

export default Dashboard;

