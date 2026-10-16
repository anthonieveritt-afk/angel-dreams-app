import { router } from 'expo-router';
import { slug } from '@/data/detail';
import { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ANGEL } from '@/data/angel';
import { Card, Search, Disclaimer, s } from '@/lib/ui';
import { useFavs } from '@/lib/fav';
export default function Angel() {
  const [q, setQ] = useState(''); const { favs, toggle } = useFavs();
  const day = ANGEL[Math.floor(Date.now() / 86400000) % ANGEL.length];
  const list = ANGEL.filter(a => !q || a.n.includes(q.trim()) || a.title.toLowerCase().includes(q.toLowerCase()));
  return <View style={s.screen}>
    <Search value={q} onChange={setQ} placeholder="Search a number, e.g. 444" />
    <FlatList data={list} keyExtractor={a => a.n}
      ListHeaderComponent={!q ? <View><Text style={s.h}>Number of the day</Text><Card tag={day.n} title={day.title} text={day.text} fav={favs.includes('a'+day.n)} onFav={() => toggle('a'+day.n)} onPress={() => router.push(`/number/${day.n}`)} /><Text style={s.h}>All numbers</Text></View> : undefined}
      ListEmptyComponent={<Text style={s.text}>No meaning yet for that number. Try a repeating pattern like 111.</Text>}
      renderItem={({ item }) => <Card tag={item.n} title={item.title} text={item.text} fav={favs.includes('a'+item.n)} onFav={() => toggle('a'+item.n)} onPress={() => router.push(`/number/${item.n}`)} />}
      ListFooterComponent={<Disclaimer />} />
  </View>;
}
