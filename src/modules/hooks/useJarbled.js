import { useState, useEffect } from 'react';

function useJarbled(interval, length) {
  const [jarbled, setJarbled] = useState('');

  useEffect(() => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:"<>?`-=[],./';
    const generateRandomString = () => {
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    const intervalId = setInterval(() => {
      setJarbled(generateRandomString());
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, length]);

  return jarbled;
}

export default useJarbled;