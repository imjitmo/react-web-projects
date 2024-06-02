import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Sales = () => {
  return (
    <Card className="w-full lg:max-w-[500px] bg-slate-950 text-slate-50">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <p>Sales</p> <span>&#8369;</span>
        </CardTitle>
        <CardDescription>Sales this month</CardDescription>
      </CardHeader>
      <CardContent>
        <h2>32,575</h2>
        <CardDescription>+20% from last month</CardDescription>
      </CardContent>
    </Card>
  );
};
export default Sales;
