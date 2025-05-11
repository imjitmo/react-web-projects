import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TimestampTzFormatter } from '@/components/UiHooks/Formatter';
import { Link } from 'react-router-dom';

interface ModuleCardsProps {
  id: string;
  moduleName: string;
  created_at: Date;
}
const ModuleCards = ({ id, moduleName, created_at }: ModuleCardsProps) => {
  return (
    <Link to={`/modules/view/${id}`}>
      <Card className="min-w-[200px] max-w-[200px]">
        <CardHeader>
          <CardTitle>{moduleName}</CardTitle>
          <CardDescription className="text-xs">Added: {TimestampTzFormatter(created_at)}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
export default ModuleCards;
