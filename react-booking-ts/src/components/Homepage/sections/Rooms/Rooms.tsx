import Loading from '@/components/Spinner/Loading';
import { useGetRandomRooms } from '@/hooks/use/useRooms';
import Cards from './Cards/Cards';

const Rooms = () => {
  const { randRooms, isPending } = useGetRandomRooms();
  return (
    <section
      id="rooms"
      className="min-h-screen h-auto flex flex-col content-center-safe items-center justify-center text-center dark:text-slate-50 gap-8 py-10 md:py-0"
    >
      <h3 className="text-3xl">Rooms and Rates</h3>
      {isPending && <Loading size={50} />}
      <div className="flex flex-row flex-wrap gap-8 justify-center items-center content-center-safe">
        {!isPending && randRooms && randRooms.map((rooms) => <Cards {...rooms} />)}
      </div>
    </section>
  );
};
export default Rooms;
