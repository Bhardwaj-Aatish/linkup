import { followerModel } from "../models/follower.js";
import { userModel } from "../models/user.js";

export const followUser = async (req: any, res: any) => {
    try {
        const follower = req.userId;
        const following = req.params.following_id;
        
        if (follower == following) {
            return res.status(400).json({message: "You can't follow yourself"})
        }

        const followedBefore = await followerModel.findOne({follower, following});
        if (followedBefore) {
            return res.status(409).json({message: "Already following"})
        }

        const userFollower = await userModel.findById(follower);
        const userFollowing = await userModel.findById(following);

        if(!userFollower || !userFollowing) {
            return res.status(400).json({message: "Any one or both user don't exist"})
        }
        
        const response = await followerModel.create({follower, following})
        userFollower.followingCount+=1;
        userFollowing.followerCount+=1;
        await Promise.all([userFollower.save(), userFollowing.save()]);
        res.status(200).send({message: 'Successfull', response});

    } catch (error) {
        res.status(500).json({message: 'Error while following', error})
    }
}


export const unfollowUser  = async (req: any, res: any) => {
    try {
        const follower = req.userId;
        const following= req.params.following_id;

        if(follower == following) {
            return res.status(400).json({message: "You can't unfollow yourself"});
        }

        const userFollower = await userModel.findById(follower);
        const userFollowing = await userModel.findById(following);

        if(!userFollower || !userFollowing) {
            return res.status(400).json({message: "Any one or both user don't exist"})
        }

        const response = await followerModel.deleteOne({follower, following});
        userFollower.followingCount-=1;
        userFollowing.followerCount-=1;
        await Promise.all([userFollower.save(), userFollowing.save()]);
        res.status(200).json({message: "Succussfully unfollowed", response});
    } catch (error) {
        res.status(500).json("Error while unfollowing", error)
    }
}