import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const [reply, setReply] = useState('');
  const [input, setInput] = useState('');

  const handleClick = () => {
    fetch(`http://localhost:3000/api/${input}`)
      .then((response) => response.json())
      .then((data) => setReply(data.message))
      .catch((error) => console.error(error));
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
   }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <h1 className=' text-4xl font-bold flex justify-center py-20'>Welcome to User Story Generator!</h1>
        <div className=' flex justify-center'>
          <TextField
            sx={{
              width: { sm: 250, md: 800, lg: 1500 },
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
        <div className=' flex justify-center py-10'>
          <Button onClick={handleClick} variant="outlined">Generate User Story</Button>
        </div>
        <div className=' flex justify-center py-10 text-center'>
          <p>{reply}</p>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
