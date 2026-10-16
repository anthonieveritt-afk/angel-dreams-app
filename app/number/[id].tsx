import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { getNumber, isNum } from '@/data/angel';
import { Detail } from '@/lib/detail';
export default function N() {
  const { id } = useLocalSearchParams<{ id: string }>(); const n = String(id);
  if (!isNum(n)) return <Text>Not found</Text>;
  const a = getNumber(n);
  return <Detail header={`Angel number ${a.n}`} favId={'a' + a.n} tag={a.n} title={a.title}
    sections={[['In brief', a.intro], ...a.sections]} related={a.related.map(r => ({ label: r, href: `/number/${r}` }))} />;
}
