import { ScrollView, View, Text, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { C, s, Disclaimer } from './ui';
import { useFavs } from './fav';
export function Detail(p: { favId: string; tag?: string; title: string; sections: [string, string | string[]][]; related: { label: string; href: string }[]; header: string }) {
  const { favs, toggle } = useFavs(); const fav = favs.includes(p.favId);
  return <ScrollView style={s.screen} contentContainerStyle={{ paddingBottom: 40 }}>
    <Stack.Screen options={{ title: p.header, headerStyle: { backgroundColor: C.bg }, headerTintColor: C.text,
      headerLeft: () => <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace('/')} style={{ paddingHorizontal: 12 }}><Text style={{ color: C.gold, fontSize: 16 }}>‹ Back</Text></Pressable> }} />
    <View style={s.row}>
      <View style={{ flex: 1 }}>{p.tag ? <Text style={[s.tag, { fontSize: 40 }]}>{p.tag}</Text> : null}<Text style={[s.title, { fontSize: 22 }]}>{p.title}</Text></View>
      <Pressable onPress={() => toggle(p.favId)} hitSlop={10}><Text style={{ fontSize: 30, color: C.gold }}>{fav ? '★' : '☆'}</Text></Pressable>
    </View>
    {p.sections.map(([h, b]) => <View key={h} style={s.card}><Text style={s.h}>{h}</Text>
      {Array.isArray(b) ? b.map(x => <Text key={x} style={[s.text, { marginBottom: 6 }]}>• {x}</Text>) : <Text style={s.text}>{b}</Text>}</View>)}
    <Text style={s.h}>Related</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {p.related.map(r => <Pressable key={r.href} onPress={() => router.push(r.href as any)} style={{ backgroundColor: C.card, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14 }}><Text style={{ color: C.gold }}>{r.label}</Text></Pressable>)}
    </View>
    <Disclaimer />
  </ScrollView>;
}
