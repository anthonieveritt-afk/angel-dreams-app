import { useState } from 'react';
import { SectionList, View, Text } from 'react-native';
import { DREAMS } from '@/data/dreams';
import { Card, Search, Disclaimer, s } from '@/lib/ui';
import { useFavs } from '@/lib/fav';
export default function Dreams() {
  const [q, setQ] = useState(''); const { favs, toggle } = useFavs();
  const f = DREAMS.filter(d => !q || (d.t + ' ' + d.text).toLowerCase().includes(q.toLowerCase()));
  const sections = [...new Set(f.map(d => d.l))].map(l => ({ title: l, data: f.filter(d => d.l === l) }));
  return <View style={s.screen}>
    <Search value={q} onChange={setQ} placeholder="Search dreams, e.g. falling" />
    <SectionList sections={sections} keyExtractor={d => d.t}
      renderSectionHeader={({ section }) => <Text style={s.h}>{section.title}</Text>}
      renderItem={({ item }) => <Card title={item.t} text={item.text} fav={favs.includes('d'+item.t)} onFav={() => toggle('d'+item.t)} />}
      ListEmptyComponent={<Text style={s.text}>Nothing found yet.</Text>}
      ListFooterComponent={<Disclaimer />} stickySectionHeadersEnabled={false} />
  </View>;
}
