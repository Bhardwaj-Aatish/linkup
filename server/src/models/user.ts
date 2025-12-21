import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePhoto: {type:String, default: ""},
    coverPhoto: {type: String, default: ""},
    bio: {type: String, default: ""},
    location: {type: String, default: ""},
    followerCount: {type: Number, default: 0},
    followingCount: {type: Number, default: 0}
}, { timestamps: true })

const userModel = mongoose.model('user', userSchema)

export {userModel}



// // =======================================
// // LinkUp MVP - Example Data Structure
// // =======================================

// // ==========================
// // 1️⃣ Users Collection
// // Stores user basic info and profile details
// // ==========================
// const users = [
//     {
//       _id: "user123",
//       username: "aatish",
//       email: "aatish@example.com",
//       passwordHash: "...",              // hashed password
//       profilePhoto: "https://cdn/...jpg",
//       bio: "Love coding and coffee",
//       location: "Gurgaon",
//       createdAt: "2025-11-08T08:00:00Z",
//       updatedAt: "2025-11-08T08:00:00Z"
//     },
//     {
//       _id: "user456",
//       username: "rohan",
//       email: "rohan@example.com",
//       passwordHash: "...",
//       profilePhoto: "https://cdn/...jpg",
//       bio: "",
//       location: "Delhi",
//       createdAt: "2025-11-07T10:00:00Z",
//       updatedAt: "2025-11-07T10:00:00Z"
//     }
//   ];
  
//   // ==========================
//   // 2️⃣ Posts Collection
//   // Stores posts with multiple media and captions
//   // ==========================
//   const posts = [
//     {
//       _id: "post123",
//       author: "user123",                         // reference to user
//       caption: "My new trip photo",
//       media: [
//         "https://cdn/photo1.jpg",
//         "https://cdn/photo2.jpg"
//       ],
//       createdAt: "2025-11-08T08:30:00Z",
//       updatedAt: "2025-11-08T08:30:00Z"
//     },
//     {
//       _id: "post456",
//       author: "user456",
//       caption: "Sunset vibes",
//       media: ["https://cdn/photo3.jpg"],
//       createdAt: "2025-11-07T12:00:00Z",
//       updatedAt: "2025-11-07T12:00:00Z"
//     }
//   ];
  
//   // ==========================
//   // 3️⃣ Comments Collection
//   // Stores comments on posts
//   // ==========================
//   const comments = [
//     {
//       _id: "comment123",
//       postId: "post123",         // reference to post
//       author: "user456",         // reference to user
//       text: "Nice photo!",
//       createdAt: "2025-11-08T08:45:00Z"
//     },
//     {
//       _id: "comment456",
//       postId: "post123",
//       author: "user123",
//       text: "Thanks!",
//       createdAt: "2025-11-08T08:50:00Z"
//     }
//   ];
  
//   // ==========================
//   // Example export (optional)
//   // ==========================
//   export { users, posts, comments };