import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Notification = ({ token }) => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate(); // استخدام useNavigate للانتقال بين الصفحات

  const getAllNotifications = () => {
    axios.get('http://localhost:3001/not', { headers: { authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log('Fetched notifications:', response.data.notifications);
        setNotifications(response.data.notifications);
      })
      .catch((error) => {
        console.error('Failed to fetch notifications:', error);
      });
  };
  

  useEffect(() => {
    getAllNotifications();
  }, []);

  const handleNotificationClick = (itemId) => {
    navigate(`/post/one/${itemId}`); 
  };

  return (
    <div>
      {notifications.map((notification) => (
        <div onClick={() => handleNotificationClick(notification.item_id)}>
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
