import { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { router } from 'expo-router';
import { HAND_LIST, getNumber, isNum } from '@/data/angel';
import { Card, Search, Disclaimer, s } from '@/lib/ui';
import { useFavs } from '@/lib/fav';
export default function Angel() {
  const [q, setQ] = useState(''); const { favs, toggle } = useFavs();
  const day = getNumber(HAND_LIST[Math.floor(Date.now() / 86400000) % HAND_LIST.length]);
  const t = q.trim();
  let list: string[] = HAND_LIST;
  if (t) {
    const exact = isNum(t) ? [t] : [];
    const more = HAND_LIST.filter(n => n !== t && (/^\d+$/.test(t) ? n.includes(t) : getNumber(n).title.toLowerCase().includes(t.toLowerCase())));
    list = [...exact, ...more];
  }
  const items = list.map(getNumber);
  const card = (it: ReturnType<typeof getNumber>) => <Card tag={it.n} title={it.title} text={it.intro} fav={favs.includes('a' + it.n)} onFav={() => toggle('a' + it.n)} onPress={() => router.push(`/number/${it.n}`)} />;
  return <View style={s.screen}>
    <Search value={q} onChange={setQ} placeholder="Any number 0–9999, e.g. 444 or 7083" />
    <FlatList data={items} keyExtractor={a => a.n} initialNumToRender={12}
      ListHeaderComponent={!t ? <View><Text style={s.h}>Number of the day</Text>{card(day)}<Text style={s.h}>Popular numbers · search any number from 0 to 9999</Text></View> : undefined}
      ListEmptyComponent={<Text style={s.text}>Type up to four digits to look up any number.</Text>}
      renderItem={({ item }) => card(item)} ListFooterComponent={<Disclaimer />} />
  </View>;
}
