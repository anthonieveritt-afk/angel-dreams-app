import { router } from 'expo-router';
import { slug } from '@/data/detail';
import { FlatList, View, Text } from 'react-native';
import { getNumber } from '@/data/angel';
import { DREAMS } from '@/data/dreams';
import { Card, Disclaimer, s } from '@/lib/ui';
import { useFavs } from '@/lib/fav';
export default function Favs() {
  const { favs, toggle } = useFavs();
  const items = [...favs.filter(f => f[0]==='a').map(f => getNumber(f.slice(1))).map(a => ({ id: 'a'+a.n, tag: a.n, title: a.title, text: a.intro })),
    ...DREAMS.filter(d => favs.includes('d'+d.t)).map(d => ({ id: 'd'+d.t, tag: undefined, title: d.t, text: d.text }))];
  return <View style={s.screen}><FlatList data={items} keyExtractor={i => i.id}
    ListEmptyComponent={<Text style={s.text}>Tap ☆ on any number or dream to save it here.</Text>}
    renderItem={({ item }) => <Card tag={item.tag} title={item.title} text={item.text} fav onFav={() => toggle(item.id)} onPress={() => router.push(item.id[0]==='a' ? `/number/${item.tag}` : `/dream/${slug(item.title)}`)} />}
    ListFooterComponent={<Disclaimer />} /></View>;
}
