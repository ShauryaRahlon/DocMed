import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../Providers/Socket';
import '../Styling/Connect.css';
import { Link } from 'react-router-dom';

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
        <div className='connect-container'>
            <div className='icon-container'>
                <Link to='/'><img src="/public/Logo3.png" alt="Logo icon" /></Link>
            </div>
            <div>
                <div className='actual-container'>
                    {/*<div className='email-container'>
                    <label htmlFor="email">Email: </label>
                    <input className='connect-email' value={emailId} onChange={e => setemailId(e.target.value)} type='email' placeholder='emailId'></input>
                </div>
                <div className='room-container'>
                    <input className='room-code' value={roomId} onChange={e => setRoomId(e.target.value)} type='text' placeholder='Enter Room code'></input>
                </div>
                <div btn-container>
                    <button className='join-btn' onClick={handleJoinRoom}>Join</button>
                </div>
            </div> */}

                    <form className="form">
                        <div className="title">Welcome!</div>
                        <input type="email" placeholder="Email" name="email" className="input" value={emailId} onChange={e => setemailId(e.target.value)} />
                        <input type="text" placeholder="Room Code" name="password" className="input" value={roomId} onChange={e => setRoomId(e.target.value)} />
                        <button className="button-confirm" onClick={handleJoinRoom}>Join →</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Connect