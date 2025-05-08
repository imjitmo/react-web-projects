import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface CardProps {
  title: string;
  description: string | '';
  children: React.ReactNode;
  footer: React.ReactNode | null;
}

const CardHook = ({ title, description, children, footer }: CardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};

export default CardHook;
