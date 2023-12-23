// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const FriendRequests = ({ token, userId }) => {
//   const [requests, setRequests] = useState([]);
// const [isClick, setIsClick] =useState(false)
//   useEffect(() => {
//     const getFriendRequests = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/friend/request', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setRequests(response.data.incomingFriendRequests);
//       } catch (error) {
//         console.error('Error fetching friend requests:', error);
//       }
//     };

//     getFriendRequests();
//   }, [token]);

//   const handleConfirmClick = async (friendshipId,token,userId) => {
//     const action_user_id= userId
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       };
//       console.log(friendshipId , token, action_user_id);
//       await axios.put(`http://localhost:3001/friend/accept/${friendshipId}`, {}, config);
// console.log("the friend accepted successfully");
  
//     } catch (error) {
//       console.error("Error accepting friend request: ", error);
      
//     }
//   };
//   const handleRejectClick =async (friendshipId,token,userId) => {
//       const action_user_id= userId
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         };
//         console.log(friendshipId , token, action_user_id);
//         await axios.put(`http://localhost:3001/friend/reject/${friendshipId}`, {}, config);
      
//         console.log("friend rejected successfully");
       
//       } catch (error) {
//         console.error("Error rejecting friend request: ", error);
        
//       }
//   };

//   return (
//     <div>
//       {requests.map((request, index) => (
//         <div key={index}>
//           {request.username}
//           <button  onClick={() => handleConfirmClick(request.friendship_id,token,userId)}>Confirm</button>
//           <button  onClick={()=>handleRejectClick(request.friendship_id,token,userId)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FriendRequests;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendRequests = ({ token, userId }) => {
  const [requests, setRequests] = useState([]);
  const [processedItems, setProcessedItems] = useState([]); // State لتتبع العناصر المعالجة

  useEffect(() => {
    const getFriendRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/friend/request', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRequests(response.data.incomingFriendRequests);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    getFriendRequests();
  }, [token]);

  const handleConfirmClick = async (friendshipId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios.put(`http://localhost:3001/friend/accept/${friendshipId}`, {}, config);
      console.log("The friend request was accepted successfully");
      setProcessedItems([...processedItems, friendshipId]); // تحديث العناصر المعالجة
    } catch (error) {
      console.error("Error accepting friend request: ", error);
    }
  };

  const handleRejectClick = async (friendshipId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios.put(`http://localhost:3001/friend/reject/${friendshipId}`, {}, config);
      console.log("The friend request was rejected successfully");
      setProcessedItems([...processedItems, friendshipId]); // تحديث العناصر المعالجة
    } catch (error) {
      console.error("Error rejecting friend request: ", error);
    }
  };

  return (
    <div>
      {requests.map((request, index) => (
        <div key={index}>
          {request.username}
          <button 
            onClick={() => handleConfirmClick(request.friendship_id)}
            disabled={processedItems.includes(request.friendship_id)} // التحقق مما إذا كانت تم معالجة العنصر
          >
            Confirm
          </button>
          <button 
            onClick={() => handleRejectClick(request.friendship_id)}
            disabled={processedItems.includes(request.friendship_id)} // التحقق مما إذا كانت تم معالجة العنصر
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default FriendRequests;

