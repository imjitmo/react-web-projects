import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CommaFormatter } from '@/components/UiHooks/Formatter';
interface DashCardsProps {
  title: string;
  description: string;
  total: number;
}
const DashCards = ({ title, description, total }: DashCardsProps) => {
  return (
    <Card className="min-w-[300px] max-w-[300px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-xs italic">{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-right">
        <p className="font-bold text-blue-900">{CommaFormatter(total)}</p>
      </CardContent>
    </Card>
  );
};
export default DashCards;
