const connection = require("../models/db");

const addFriend = (req, res) => {
  const { friend_id } = req.body;
  const user_id = req.token.user_id;
  // تنفيذ استعلام SQL لإضافة صديق جديد إلى جدول الأصدقاء
  const sql = `INSERT INTO friends (user_id, friend_id) VALUES (?, ?)`;
  connection.query(sql, [user_id, friend_id], (err, result) => {
    if (err) {
      console.error("Error adding friend:", err);
      return res.status(500).json({ message: "Failed to add friend" , error:err });
    }
    console.log("Friend added successfully");
    res.status(201).json({ message: "Friend added successfully" });
  });
};

const acceptFriendRequest = (req, res) => {
  const friendshipId = req.params.friendship_id;
  const action_user_id = req.token.user_id;
  // const action_date = new Date();

  const sql = `
      UPDATE friends 
      SET status = 'accepted', action_user_id = ?
      WHERE friendship_id = ? AND status = 'pending'
    `;

  connection.query(sql, [action_user_id, friendshipId], (err, result) => {
    if (err) {
      console.error("Error accepting friend request:", err);
      return res
        .status(500)
        .json({ message: "Failed to accept friend request" });
    }
    if (result.changedRows === 0) {
      console.log(action_user_id);
      return res
        .status(404)
        .json({ message: "Friend request not found or already accepted" });
    }
    console.log("Friend request accepted successfully");
    res.status(200).json({ message: "Friend request accepted successfully" });
  });
};

const rejectFriendRequest = (req, res) => {
  const friendshipId = req.params.friendship_id;
  const action_user_id = req.token.user_id;

  const sql = `
      UPDATE friends 
      SET status = 'rejected', action_user_id = ?
      WHERE friendship_id = ? AND status = 'pending'
    `;

  connection.query(sql, [action_user_id, friendshipId], (err, result) => {
    if (err) {
      console.error("Error rejecting friend request:", err);
      return res
        .status(500)
        .json({ message: "Failed to reject friend request" });
    }
    if (result.changedRows === 0) {
      return res
        .status(404)
        .json({ message: "Friend request not found or already rejected" });
    }
    console.log("Friend request rejected successfully");
    res.status(200).json({ message: "Friend request rejected successfully" });
  });
};

const getFriendsList = (req, res) => {
  const user_id = req.token.user_id;

  const sql = `
    SELECT u.username, u.user_id ,u.profile_picture
    FROM friends f
    INNER JOIN users u ON (f.friend_id = u.user_id OR f.user_id = u.user_id)
    WHERE (f.user_id = ? OR f.friend_id = ?) AND f.status = 'accepted' AND u.user_id != ?
  `;

  connection.query(sql, [user_id, user_id, user_id], (err, results) => {
    if (err) {
      console.error("Error getting friends list:", err);
      return res.status(500).json({ message: "Failed to get friends list" });
    }
    res.status(200).json({ friendsList: results });
  });
};




const getFriendRequests = (req, res) => {
  const friend_id = req.token.user_id;

  const sql = `
    SELECT u.username, u.user_id, f.friendship_id
    FROM friends f
    INNER JOIN users u ON f.user_id = u.user_id
    WHERE f.friend_id = ? AND f.status = 'pending' AND f.user_id <> ?
  `;

  connection.query(sql, [friend_id, friend_id], (err, results) => {
    if (err) {
      console.error("Error getting incoming friend requests:", err);
      return res
        .status(500)
        .json({ message: "Failed to get incoming friend requests" });
    }
    res.status(200).json({ incomingFriendRequests: results });
  });
};


const removeFriend = (req, res) => {
  const { friendship_id } = req.params;
  const user_id = req.token.user_id; // يتم استخدام user_id من التوكن

  const sql = `
      DELETE FROM friends
      WHERE friendship_id = ? AND (user_id = ? OR friend_id = ?)
    `;

  connection.query(sql, [friendship_id, user_id, user_id], (err, result) => {
    if (err) {
      console.error("Error removing friend:", err);
      return res.status(500).json({ message: "Failed to remove friend" });
    }
    res.status(200).json({ message: "Friend removed successfully" });
  });
};

module.exports = {
  addFriend,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendsList,
  getFriendRequests,
  removeFriend,
};
