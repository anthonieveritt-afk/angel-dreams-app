import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { findDream, dreamDetail, slug } from '@/data/detail';
import { Detail } from '@/lib/detail';
export default function Dr() {
  const { id } = useLocalSearchParams<{ id: string }>(); const x = findDream(String(id));
  if (!x) return <Text>Not found</Text>;
  const d = dreamDetail(x);
  return <Detail header={`Dream: ${x.t}`} favId={'d' + x.t} title={x.t}
    sections={[['Overview', d.overview], ['Common variations', d.variations], ['Possible feelings & meanings', d.feelings], ['A question to reflect on', d.question]]}
    related={d.related.map(t => ({ label: t, href: `/dream/${slug(t)}` }))} />;
}
