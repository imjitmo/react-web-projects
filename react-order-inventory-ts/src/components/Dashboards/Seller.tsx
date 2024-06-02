import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Seller = () => {
  return (
    <Card className="w-full lg:max-w-[500px] bg-slate-950 text-slate-50">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <p>Best Seller</p> <span>&#9734;</span>
        </CardTitle>
        <CardDescription>Best seller for this month</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="truncate">Pho with Hot Sauce</h2>
        <CardDescription>Beat Mi Goreng last onth</CardDescription>
      </CardContent>
    </Card>
  );
};
export default Seller;
