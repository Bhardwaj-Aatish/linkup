import Button from "./Button";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";
import { Api, FilePresent } from "@mui/icons-material";
import { FormRenderer, FormSchema } from "./FormRenderer";
import apiClient from "@/lib/axiosInstance";

type userInfoType = {
    _id: string,
    name: string,
    email: string,
    profilePhoto: string,
    coverPhoto: string,
    bio: string,
    location: string,
    followerCount: number,
    followingCount: number,
    createdAt: string,
    updatedAt: string
}

type userProfileType = {
    userInfo: userInfoType,
    onEditProfile: any,
}

type ProfileForm = {
    name: string,
    email: string,
    bio: string,
    location: string,
    coverPhoto: string,
    profilePhoto: string
}
const profileSchema = {
    name: {
        label: "Name",
        type: "text",
        placeholder: "Your name"
    },
    email: {
        label: "Email",
        type: "email",
        placeholder: "you@example.com"
    },
    bio: {
        label: "Bio",
        type: "text",
        placeholder: "Tell something about yourself"
    },
    location: {
        label: "Location", 
        type: "text",
        placeholder: "Enter location"
    },
    coverPhoto: {
        label: "Cover Photo Url",
        type: "text",
        placeholder: "Enter url of coverPhoto"
    },
    profilePhoto : {
        label: "Profle photo url",
        type: "text",
        placeholder: "Enter url of profilePhoto"
    }

} satisfies FormSchema<keyof ProfileForm> 

const UserProfile = ({ userInfo, onEditProfile }: userProfileType) => {
    const profilePhotoUrl = userInfo?.profilePhoto && userInfo?.profilePhoto.length > 0 ? userInfo.profilePhoto : 'default.jpg';
    const coverPhotoUrl = userInfo?.profilePhoto && userInfo?.profilePhoto.length > 0 ? userInfo.coverPhoto : 'post1.webp';
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const [form, setForm] = useState<ProfileForm>(({
        name: "",
        email: "",
        bio: "",
        location: "",
        coverPhoto: "",
        profilePhoto: "",
    }))

    const handleSave = async () => {
        console.log("working here handle save", form)
        const response = await apiClient.patch('/api/users/me', form)
        if(response.status === 201) {
            console.log("working here handle save 2", response)
            onEditProfile(response?.data?.userInfo)
        }
        // make the api call
        // make save the changes in the userData, need to change the profile page
        setIsEditProfileModalOpen(false)
    }

    const openEditModal = () => {
        setForm({
            name: userInfo.name,
            email: userInfo.email,
            bio: userInfo.bio,
            location: userInfo.location,
            coverPhoto: userInfo.coverPhoto,
            profilePhoto: userInfo.profilePhoto
        })
        setIsEditProfileModalOpen(true)
    }


    return (
        <div className="user-profile-container w-full">
            <div className="w-full aspect-3/1 border-white relative">
                <img src={coverPhotoUrl} alt="aatish sorry" className="w-full h-full object-cover bg-bg-secondary" />
                <div className="absolute bottom-0 translate-y-1/2 p-4">
                    <img src={profilePhotoUrl} alt="" className="w-25 sm:w-30 md:w-35 object-cover rounded-full" />
                </div>
            </div>

            <div className="avatar-container flex justify-end items-center p-4 relative ">
                <Button text="Edit Profile" buttonType="secondary" className="px-3 py-1 rounded-r-2xl rounded-l-2xl" onClick={openEditModal} />
            </div>

            <ConfirmModal
                open={isEditProfileModalOpen}
                title="Edit profile"
                confirmText="Save"

                onConfirm={handleSave}
                onClose={() => setIsEditProfileModalOpen(false)}
            > <FormRenderer
                schema={profileSchema}
                values={form}
                onChange={(key, value) => 
                    setForm((prev: any) => ({ ...prev, [key]: value}))
                }

            ></FormRenderer>
            </ConfirmModal>


            <div className="profile-info p-4">
                <div className="profile-name font-bold text-xl/6">
                    {userInfo?.name}
                </div>
                <div className="username text-text-teritary text-sm/5 ">{userInfo?.email}</div>
                <div className="info py-3">{userInfo?.bio}</div>
                <div className="flex others-info gap-x-4 text-text-teritary text-sm">
                    <div className="Location gap-x-1 flex items-center">
                        <LocationOnIcon />
                        <span>{userInfo?.location}</span>
                    </div>
                    <div className="joined gap-x-1 flex items-center">
                        <CalendarMonthIcon />
                        <span>{userInfo?.createdAt}</span>
                    </div>
                </div>
                <div className="flex followers-following gap-x-2 -left-2 relative mt-2">
                    <Button text={`${userInfo?.followerCount} Followers`} buttonType="tertiary" />
                    <Button text={`${userInfo?.followingCount} Following`} buttonType="tertiary" />
                </div>

            </div>


        </div>
    )
}

export default UserProfile;