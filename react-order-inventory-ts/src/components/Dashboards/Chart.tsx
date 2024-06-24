import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetCustomers } from '@/hooks/use/useCustomers';

const Chart = () => {
  const { customersData, isPending } = useGetCustomers();
  const customerListLimit = customersData?.slice(0, 10);
  return (
    <Card className="w-full lg:max-w-[54rem] bg-slate-950 text-slate-50">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <p>User Overview</p> <span>&#9776;</span>
        </CardTitle>
        <CardDescription>List of users and points</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent users and their points.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Customer ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Reward Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              customerListLimit?.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium uppercase">{`#${customer.id.slice(0, 6)}`}</TableCell>
                  <TableCell>
                    {customer.csFirstName} {customer.csLastName}
                  </TableCell>
                  <TableCell>{customer.csEmail}</TableCell>
                  <TableCell>{customer.csRewardPoints}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
export default Chart;
