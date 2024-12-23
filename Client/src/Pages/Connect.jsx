import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../Providers/Socket'
const Connect = () => {
    const { socket } = useSocket();
    const navigate = useNavigate();

    const [emailId, setemailId] = useState();
    const [roomId, setRoomId] = useState();

    const handleRoomJoined = useCallback(({ roomId }) => {
        navigate(`/connected/${roomId}`);
    }, [navigate]);

    useEffect(() => {
        socket.on('joined-room', handleRoomJoined);

        return () => {
            socket.off('joined-room', handleRoomJoined);
        }
    }, [socket, handleRoomJoined]);

    const handleJoinRoom = () => {
        socket.emit('join-room', { emailId: emailId, roomId: roomId });
    }

    return (
        <div>
            <div>
                <input value={emailId} onChange={e => setemailId(e.target.value)} type='email' placeholder='emailId'></input>
                <input value={roomId} onChange={e => setRoomId(e.target.value)} type='text' placeholder='Enter Room code'></input>
                <button onClick={handleJoinRoom}>Join</button>
            </div>
        </div>
    )
}

export default Connect