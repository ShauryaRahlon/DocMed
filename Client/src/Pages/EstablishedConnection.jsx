import React, { useEffect, useCallback, useState } from 'react'
import { useSocket } from '../Providers/Socket'
import { usePeer } from '../Providers/Peer';
import ReactPlayer from 'react-player'

const EstablishedConnection = () => {

    const { socket } = useSocket();
    const { peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream } = usePeer();

    const [myStream, setMyStream] = useState(null);
    const [remoteEmailId, setRemoteEmailId] = useState();

    const handleNewUserJoined = useCallback(async (data) => {
        const { emailId } = data;
        console.log('New user joined room', emailId);
        const offer = await createOffer();
        socket.emit('call-user', { emailId, offer });
        setRemoteEmailId(emailId);
    }, [createOffer, socket])

    const handleIncommingCall = useCallback(async (data) => {
        const { from, offer } = data;
        console.log('Incomming call from', from, offer);

        const answer = await createAnswer(offer);
        socket.emit('call-accepted', { emailId: from, answer });
        setRemoteEmailId(from);
    }, [createAnswer, socket]);

    const handleCallAccepted = useCallback(async (data) => {
        const { answer } = data;
        console.log('Call accepted', answer);
        await setRemoteAnswer(answer);
    }, [setRemoteAnswer]);

    const getUserMediaStream = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: true, 
            video: true 
        });
        setMyStream(stream);
    }, []);

    const handleNegotiation = useCallback(async () => {
        const localOffer = await peer.createOffer();
        socket.emit('call-user',{emailId: remoteEmailId, offer: localOffer})
    }, [peer, socket, remoteEmailId])

    useEffect(() => {
        socket.on('user-joined', handleNewUserJoined);
        socket.on('incoming-call', handleIncommingCall);
        socket.on('call-accepted', handleCallAccepted);


        return () => {
            socket.off('user-joined', handleNewUserJoined);
            socket.off('incoming-call', handleIncommingCall);
            socket.off('call-accepted', handleCallAccepted);
        }

    }, [socket, handleNewUserJoined, handleIncommingCall, handleCallAccepted]);

    useEffect(() => {
        peer.addEventListener('negotiationneeded', handleNegotiation)
        return () => {
            peer.removeEventListener('negotiationneeded', handleNegotiation)
        }
    }, [handleNegotiation]); 

    useEffect(() => {
        getUserMediaStream();
    }, [getUserMediaStream]);

    return (
        <div>EstablishedConnection
            <button onClick={e => sendStream(myStream)}>Send My video</button>
            <ReactPlayer url={myStream} controls={true} playing={true} width="50%" height="50%" />
            <ReactPlayer url={remoteStream} controls={true} playing={true} width="50%" height="50%" />
        </div>
    )
}

export default EstablishedConnection