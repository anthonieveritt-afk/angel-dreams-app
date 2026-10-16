import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { findNumber, numberDetail } from '@/data/detail';
import { Detail } from '@/lib/detail';
export default function N() {
  const { id } = useLocalSearchParams<{ id: string }>(); const a = findNumber(String(id));
  if (!a) return <Text>Not found</Text>;
  const d = numberDetail(a);
  return <Detail header={`Angel number ${a.n}`} favId={'a' + a.n} tag={a.n} title={a.title}
    sections={[['Overview', d.overview], ['Love & relationships', d.love], ['Career & money', d.career], ['Spiritual growth', d.spirit], ['What to do next', d.next]]}
    related={d.related.map(n => ({ label: n, href: `/number/${n}` }))} />;
}
