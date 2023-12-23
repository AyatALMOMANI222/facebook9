import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

import "./style.css";

const Messenger = ({ token, userId, username }) => {
  const socket = io.connect("http://localhost:3001");
  const params = useParams();
  const { user_id } = params;
  const [msgText, setMsgText] = useState("");
  const [allMsg, setAllMsg] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  // const [usernameto, setUsernameto] = useState("");

  const handleChange = (e) => {
    setMsgText(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .post(
        `http://localhost:3001/message`,
        { sender_id: userId, receiver_id: user_id, message_text: msgText },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        // console.log(response?.data);

        socket.emit("messageFromFrontend", { message_text: msgText});
      })
      .catch((error) => {
        // console.error("Error ", error);
      });
    setMsgText("");
  };

  const getMsg = () => {
    axios
      .get(`http://localhost:3001/message/${user_id}/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log({ response });

        // console.log(response.data.messages);
        setAllMsg(response.data.messages);
        // console.log("allmsg", allMsg);
        const messages = response.data.messages || [];
        const sentMessages = messages
          .filter((msg) => msg.sender_id == userId)
          .map((msg) => msg);
        const receivedMessages = messages
          .filter((msg) => msg.sender_id != userId)
          .map((msg) => msg);

        setSentMessages(sentMessages);
        setReceivedMessages(receivedMessages);

        // console.log("Sent Messages: ", sentMessages);
        // console.log("Received Messages: ", receivedMessages);
        // console.log(username);
      })
      .catch((error) => {
        console.error("Error ", error);
      });
  };

  useEffect(() => {
    socket.on("messageToFrontend", (data) => {
      setAllMsg((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [allMsg]);

  const getUserName = () => {
    axios
      .get(`http://localhost:3001/user/${user_id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsernameto(response.data.username);
        // console.log(response.data);
        // console.log(response.data.username);
      })
      .catch((error) => {
        console.error("Error ", error);
      });
  };

  useEffect(() => {
    getMsg();
  }, []);

  useEffect(() => {
    getUserName();
  }, [user_id]);

  return (
    <div>
      {allMsg.map((e) => {
        return (
          <div className="sender-receiver-container">
            <div>
              {e.sender_username}: {e.message_text}
            </div>
            {/* <div>{e.receiver_username}</div> */}
          </div>
        );
      })}
      <div>
        <input placeholder="Write message" onChange={(e) => handleChange(e)} />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default Messenger;
