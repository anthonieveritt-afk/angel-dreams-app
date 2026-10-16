import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';
const KEY = 'favs';
let listeners: ((f: string[]) => void)[] = [];
let cache: string[] = [];
export function useFavs() {
  const [favs, setFavs] = useState<string[]>(cache);
  useEffect(() => {
    listeners.push(setFavs);
    AsyncStorage.getItem(KEY).then(v => { cache = v ? JSON.parse(v) : []; setFavs(cache); });
    return () => { listeners = listeners.filter(l => l !== setFavs); };
  }, []);
  const toggle = useCallback((id: string) => {
    cache = cache.includes(id) ? cache.filter(x => x !== id) : [...cache, id];
    AsyncStorage.setItem(KEY, JSON.stringify(cache));
    listeners.forEach(l => l(cache));
  }, []);
  return { favs, toggle };
}
