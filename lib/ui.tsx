import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
export const C = { bg: '#14112a', card: '#221d42', text: '#f3eefe', sub: '#b8acd9', gold: '#e8c66a' };
export const Disclaimer = () => <Text style={s.disc}>For reflection and entertainment only. Meanings are gentle suggestions, not predictions or advice.</Text>;
export const Search = (p: { value: string; onChange: (t: string) => void; placeholder: string }) =>
  <TextInput value={p.value} onChangeText={p.onChange} placeholder={p.placeholder} placeholderTextColor={C.sub} style={s.search} />;
export function Card(p: { title: string; tag?: string; text: string; fav: boolean; onFav: () => void }) {
  return <View style={s.card}>
    <View style={s.row}>
      <View style={{ flex: 1 }}>{p.tag ? <Text style={s.tag}>{p.tag}</Text> : null}<Text style={s.title}>{p.title}</Text></View>
      <Pressable onPress={p.onFav} hitSlop={10}><Text style={{ fontSize: 22, color: C.gold }}>{p.fav ? '★' : '☆'}</Text></Pressable>
    </View>
    <Text style={s.text}>{p.text}</Text>
  </View>;
}
export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg, padding: 16 },
  search: { backgroundColor: C.card, color: C.text, borderRadius: 12, padding: 12, fontSize: 16, marginBottom: 12 },
  card: { backgroundColor: C.card, borderRadius: 14, padding: 14, marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  tag: { color: C.gold, fontSize: 22, fontWeight: '700' },
  title: { color: C.text, fontSize: 17, fontWeight: '600' },
  text: { color: C.sub, fontSize: 15, lineHeight: 21 },
  disc: { color: C.sub, fontSize: 12, textAlign: 'center', marginVertical: 12, opacity: 0.8 },
  h: { color: C.gold, fontSize: 14, fontWeight: '700', marginTop: 8, marginBottom: 6 },
});
