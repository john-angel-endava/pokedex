'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './search-input.module.css';
import Input from '@mui/material/Input';

type Props = {
    placeholder?: string;
    onDebouncedChange: (value: string) => void;
    delay?: number;
};

const colorTextDark='#FFFFFF';  
const colorTextLight= '#000000';
const debounceDelay = 300;

export default function SearchInput({ placeholder = 'Search by name…', onDebouncedChange}: Props) {
  const [raw, setRaw] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = useCallback((text: string) => {
    setRaw(text);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onDebouncedChange(text.trim().toLowerCase());
    }, debounceDelay);
  }, [onDebouncedChange]); 

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);
 
  return (
    <Input
      className={styles.search}
      placeholder={placeholder}
      value={raw}
      onChange={(e) => handleInputChange(e.target.value)}
      sx={{
        "@media (prefers-color-scheme: light)": {
          color: colorTextLight,
        },
        "@media (prefers-color-scheme: dark)": {
          color: colorTextDark,
        },        
      }}
      fullWidth         
    />
  );
}