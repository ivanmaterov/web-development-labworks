import { useState, useEffect, VFC } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useAppSelector } from '../../redux/store';
import { selectToken } from '../../redux/auth/selectors';
import { useRouter } from 'next/router';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Controller, useForm } from "react-hook-form";


const ChatPage: VFC = ({}) => {
  const router = useRouter();

  const token = useAppSelector(selectToken);
  const [socketUrl, setSocketUrl] = useState(`ws://0.0.0.0:8000/ws/chat/?token=${token}`);
  const [messageHistory, setMessageHistory] = useState<any[]>([]);
  const { handleSubmit, reset, control } = useForm();

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        sendJsonMessage({
          pk: 1,
          action: "join_room",
          request_id: new Date().getTime(),
        })
        sendJsonMessage({
          pk: 1,
          action: "retrieve",
          request_id: new Date().getTime(),
        })
        sendJsonMessage({
          pk: 1,
          action: "subscribe_to_messages_in_room",
          request_id: new Date().getTime(),
        })
        sendJsonMessage({
          pk: 1,
          action: "subscribe_instance",
          request_id: new Date().getTime(),
        })
      },
      onClose: () => {
        console.log('Connection was broken unexpectedly.')
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        switch (data.action) {
            case "retrieve":
              setMessageHistory(prevHistory => [...data.data.messages.map(message => message.text)])
              break;
            case "create":
              setMessageHistory(prevHistory => [...prevHistory, data.data.text])
              break;
            default:
              break;
        }
        console.log(messageHistory)
      }
    });

  useEffect(() => {
    if (token === null) {
      router.push('/')
    }
  }, [router, token])


  const onSubmit = (data: any) => sendJsonMessage({
    message: data,
    action: "create_message",
    request_id: new Date().getTime(),
  })

  return (
    <Box sx={{ padding: '2% 15%', height: '100%', width: '100%' }}>
      { messageHistory.map(message => <Typography>{message}</Typography>)}
      <Controller
        name={"textValue"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            onChange={onChange}
            value={value}
          />
        )}
      />
      <Button variant='contained' color='secondary' onClick={handleSubmit(onSubmit)}>Send</Button>
    </Box> 
  )
}

export default ChatPage;
