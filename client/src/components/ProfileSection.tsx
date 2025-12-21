import UserProfile from "./UserProfile";
import UserContent from "./UserContent";


const ProfileSection = () => {
    return (
        <div className="profile-containr w-full">
            <UserProfile />
            <UserContent />
        </div>
    )
}

export default ProfileSection;