import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Tooltip } from '@mui/material';
import { CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import { useMediaQuery } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const keywords = ['given', 'when', 'then'];

function formatReplyWithKeywords(reply: string) {
  const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
  const parts = reply.split(regex);

  const formattedParts = parts.map((part, index) => {
    if (keywords.includes(part.toLowerCase())) {
      return (
        <strong key={index} style={{ textTransform: 'uppercase' }}>
          <br />
          {part.replace(/\*/g, '')}
        </strong>
      );
    } else {
      return <span key={index}>{part}</span>;
    }
  });

  return formattedParts;
}


function App() {
  const [reply, setReply] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 700px)");

  const handleClick = () => {
    if (input === '') {
      Swal.fire({
        icon: 'error',
        title: 'Missing requirement',
        text: 'Please enter a requirement in order to generate a User Story!',
      })
    } else {
      setIsLoading(true);
      fetch(`/api/${input}`)
        .then((response) => response.json())
        .then((data) => setReply(data.message))
        .catch((error) => console.error(error));
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(reply);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        {isMobile ? (
          <h1 className='text-xl font-bold flex justify-center py-20'>Welcome to User Story Generator!</h1>
        ) : (
          <h1 className='text-4xl font-bold flex justify-center py-20'>Welcome to User Story Generator!</h1>
        )}
        <div className='flex justify-center'>
          <TextField
            sx={{
              width: { sm: 300, md: 800, lg: 1500 },
              "& .MuiInputBase-root": {
                height: 65
              }
            }}
            id="standard-basic"
            label="Requirement"
            variant="filled"
            placeholder="Please enter your requirements here"
            onChange={onChangeInput}
          />
        </div>
        <div className='flex justify-center py-10'>
          <Button onClick={handleClick} variant="outlined">Generate User Story</Button>
        </div>
        <div className=' py-10 flex-col'>
          {reply === '' && isLoading ? (
            <div className='flex justify-center'>
              <CircularProgress />
            </div>
          ) : (
            reply !== '' && (
              <div className='flex justify-center'>
                <Tooltip title='Copy User Story'>
                  <IconButton onClick={onCopyClick}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )
          )}
          {isMobile ? (
            <div className='flex justify-center'>
              <p className=' w-[90%]'>{formatReplyWithKeywords(reply)}</p>
            </div>
          ) : (
            <div className='flex justify-center'>
              <p>{formatReplyWithKeywords(reply)}</p>
            </div>
          )}
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;