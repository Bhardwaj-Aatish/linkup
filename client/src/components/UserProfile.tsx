import Button from "./Button";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useEffect, useRef, useState } from "react";
import { ConfirmModal } from "./ConfirmModal";
import EditIcon from '@mui/icons-material/Edit';
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
    location: string
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
    }
} satisfies FormSchema<keyof ProfileForm> 

const UserProfile = ({ userInfo, onEditProfile }: userProfileType) => {
    const [localCoverPhotoUrl, setLocalCoverPhotoUrl] = useState<any>(null); 
    const [localProfilePhotoUrl, setLocalProfilePhotoUrl] = useState<any> (null);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const [form, setForm] = useState<ProfileForm>(({
        name: "",
        email: "",
        bio: "",
        location: "",
    }))
    const coverPhotoFileRef = useRef<HTMLInputElement | null > (null);
    const profilePhotoFileRef = useRef<HTMLInputElement | null > (null);

    const coverPhotoUrl = localCoverPhotoUrl ?? userInfo?.coverPhoto ?? null;
    const profilePhotoUrl =localProfilePhotoUrl ??  userInfo?.profilePhoto;


    const handleSave = async () => {
        const response = await apiClient.patch('/api/users/me', form)
        if(response.status === 201) {
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
            location: userInfo.location
        })
        setIsEditProfileModalOpen(true)
    }

    const modifyProfile = async (formData: any) => {
        const response = await apiClient.patch('/api/users/me', formData);
        if(response.status === 201) {
            onEditProfile(response?.data?.userInfo);
        }
    }

    const handleCoverPhotoUpdate = (e : any) => {
        if(e.target.files.length > 0) {
            const url = URL.createObjectURL(e.target.files[0]);
            setLocalCoverPhotoUrl(url);
            const formData = new FormData();
            formData.append("coverPhoto", e.target.files[0]);
            modifyProfile(formData);
            
        }
    }

    const handleProfilePhotoUpdate = (e: any) => {
        if(e.target.files.length > 0) {
            const url = URL.createObjectURL(e.target.files[0]);
            setLocalProfilePhotoUrl(url)
            const formData = new FormData();
            formData.append("profilePhoto", e.target.files[0]); 
            modifyProfile(formData);
        }
    }

    useEffect(() => {
        return() => {
            if(localCoverPhotoUrl) {
                URL.revokeObjectURL(localCoverPhotoUrl)
            }
            if(localProfilePhotoUrl) {
                URL.revokeObjectURL(localProfilePhotoUrl)
            }
        }
    }, [localCoverPhotoUrl, localProfilePhotoUrl])


    return (
        <div className="user-profile-container w-full">
            <div className="w-full aspect-3/1 border-white relative bg-bg-secondary">
                <button onClick={() => coverPhotoFileRef?.current?.click()} className="absolute p-2 rounded-full top-0 right-0 translate-y-1/8 -translate-x-1/8 bg-black/50  hover:cursor-pointer hover:bg-black">
                  <EditIcon/>
                  <input type="file" accept="image/*" className="hidden" ref={coverPhotoFileRef} onChange={handleCoverPhotoUpdate}/>
                </button>
                {coverPhotoUrl?.length>0 &&  <img src={coverPhotoUrl} alt="aatish sorry" className="w-full h-full object-cover bg-bg-secondary" />}
                <div className="absolute w-25 sm:w-30 md:w-35 bottom-0 overflow-hidden aspect-square translate-y-1/2 translate-x-1/10 hover:cursor-pointer rounded-full bg-bg-secondary" >
                    <input type="file" accept="image/*" className="hidden" ref={profilePhotoFileRef} onChange={handleProfilePhotoUpdate}/>
                    {profilePhotoUrl?.length > 0 && <img src={profilePhotoUrl} alt="" className="w-full h-full rounded-full object-cover" tabIndex={0} onClick={() => profilePhotoFileRef?.current?.click()}/>}
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