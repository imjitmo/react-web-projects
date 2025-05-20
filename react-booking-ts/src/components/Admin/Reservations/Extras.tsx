/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CurrencyFormatter } from '@/components/UiHooks/Formatter';
import Modal from '@/components/UiHooks/Modal';
import { useAddReservationExtras } from '@/hooks/use/useReservation';
import { Key, useState } from 'react';

interface ExtrasProps {
  id: any;
  onOpen: boolean;
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Extras = (props: ExtrasProps) => {
  return <ExtrasForm key={props.id} {...props} />;
};
export default Extras;

interface ExtrasFormProps {
  id: any;
  onOpen: boolean;
  setOnOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
  reserveId?: string;
  extrasName: string;
  extrasPrice: number;
  extrasQty: number;
}

function ExtrasForm(props: ExtrasFormProps) {
  const initialValue: FormData = {
    reserveId: props.id,
    extrasName: '',
    extrasPrice: 0,
    extrasQty: 0,
  };
  const [formData, setFormData] = useState<FormData>(initialValue);
  const [extrasData, setExtrasData] = useState<any>([]);
  const { createReservationExtras, isPending: isAdding } = useAddReservationExtras();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      reserveId: props.id,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    setExtrasData([...extrasData, formData]);
    handleReset();
  };
  const handleReset = () => {
    setFormData(initialValue);
  };
  const handleAddQuery = () => {
    createReservationExtras(extrasData, {
      onSuccess: () => {
        props.setOnOpen(false);
      },
      onError: (error) => {
        console.error('Error adding extras:', error);
      },
    });
  };

  return (
    <div>
      <Modal header={'Add Extras'} setOnOpen={props.setOnOpen} onOpen={props.onOpen}>
        <div className="flex flex-row justify-between gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-2">
              <label className="block text-gray-700 text-sm font-medium">Name</label>
              <input
                type="text"
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="extrasName"
                value={formData.extrasName}
                onChange={handleChange}
                placeholder="Extras' Name"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-gray-700 text-sm font-medium">Price</label>
              <input
                type="number"
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="extrasPrice"
                value={formData.extrasPrice}
                onChange={handleChange}
                placeholder="Extras' Price"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-gray-700 text-sm font-medium">Quantity</label>
              <input
                type="number"
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="extrasQty"
                value={formData.extrasQty}
                onChange={handleChange}
                placeholder="Extras' Quantity"
                required
              />
            </div>
            <div className="flex flex-row gap-2">
              <Button
                type="button"
                className="bg-red-500 text-slate-50 hover:bg-blue-950 hover:text-slate-50"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="bg-yellow-400 text-slate-950 hover:bg-blue-950 hover:text-slate-50"
              >
                Add Extras
              </Button>
            </div>
          </form>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-700">List</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {extrasData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No Extras added yet.
                    </TableCell>
                  </TableRow>
                )}
                {extrasData &&
                  extrasData.length > 0 &&
                  extrasData.map((extras: FormData, i: Key | null | undefined) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{extras.extrasName}</TableCell>
                      <TableCell>{CurrencyFormatter(extras.extrasPrice)}</TableCell>
                      <TableCell>{extras.extrasQty}</TableCell>
                      <TableCell className="text-right">
                        {CurrencyFormatter(extras.extrasPrice * extras.extrasQty)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <div className="flex gap-2 w-full items-end justify-end">
              <h4 className="text-md flex flex-row gap-2 text-right">
                Total:
                <span className="text-blue-950 font-medium">
                  {CurrencyFormatter(
                    extrasData.reduce(
                      (total: number, extras: { extrasPrice: number; extrasQty: number }) =>
                        total + extras.extrasPrice * extras.extrasQty,
                      0
                    )
                  )}
                </span>
              </h4>
            </div>
            <div className="flex flex-row gap-2 justify-end items-end">
              <Button
                type="button"
                className="bg-blue-900 text-slate-50 hover:bg-yellow-400 hover:text-slate-950"
                disabled={isAdding}
                onClick={handleAddQuery}
              >
                {isAdding ? <Loading size={20} /> : 'Save'}
              </Button>
              <Button
                type="button"
                className="bg-red-500 text-slate-50 hover:bg-blue-950 hover:text-slate-50"
                onClick={() => props.setOnOpen((prev) => !prev)}
                disabled={isAdding}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
