"use client"
import Navbar from "@/components/Navbar";
import SideBar from "@/components/Sidebar"
import UserProfile from "@/components/UserProfile";
import UserContent from "@/components/UserContent";
import { useEffect, useState } from "react";
import apiClient from "@/lib/axiosInstance";

type userData = {
    allUserPosts: any;
    likedPosts: any;
    mediaUrls: any;
    userInfo: any;
}

const Profile = () => {
    const [userData, setUserData] = useState<userData>();

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await apiClient.get('/api/users/me')
            setUserData(response.data);
            console.log("working profile", response.data)
        }
        fetchUserData();
    }, [])

    const handleEditProfile = (userInfo: any) => {
        setUserData((prevUserData: any) => {
            return {
                ...prevUserData,
                userInfo
            }
        })
    }



    return (
        <div className="flex w-screen h-100% justify-center items-center">
            <div className="flex lg:flex-2 bg-bg-primary">
                <Navbar />
            </div>
            <div className="middle-section border flex-1 lg:flex-4 border-border text-white">
                <div className="profile-containr w-full">
                    <UserProfile userInfo={userData?.userInfo} onEditProfile={handleEditProfile}/>
                    <UserContent allPosts={userData?.allUserPosts} likedPost={userData?.likedPosts} mediaUrls={userData?.mediaUrls} />
                </div>
            </div>
            <div className="side-bar lg:flex-3">
                <SideBar />
            </div>
        </div>
    )
}

export default Profile;