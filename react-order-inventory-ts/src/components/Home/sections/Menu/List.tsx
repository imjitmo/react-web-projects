import { useGetRandomMenu } from '@/hooks/use/useDishes';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { fadeIn } from '@/anim/variant';
import { motion } from 'framer-motion';

const List = () => {
  const { menuData, isLoading } = useGetRandomMenu();
  return (
    <>
      <div className="flex flex-col flex-wrap gap-4 items-center justify-center relative my-12 z-[5]">
        <motion.h1
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="uppercase my-8"
        >
          Our <span className="text-orange-300">Menu</span>
        </motion.h1>
        <div className="flex flex-col md:flex-row flex-wrap gap-8 items-center justify-center text-center">
          {isLoading && <p>Loading...</p>}
          {menuData?.map((item) => (
            <motion.div
              variants={fadeIn('down', 0.3)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: true, amount: 0.3 }}
              key={item.id}
            >
              <Card className="min-w-[12rem] max-w-[18rem] min-h-[28rem] max-h-[28rem] bg-transparent border-none shadow-none">
                <CardHeader>
                  <CardTitle>
                    <img
                      className="rounded-full border-8 border-solid border-green-500 object-cover size-52 m-auto"
                      src={item.dishImage}
                    />
                  </CardTitle>
                  <CardDescription className="text-xl font-semibold text-slate-950 line-clamp-2">
                    {item.dishName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-[7] text-sm">{item.dishDescription}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.p
          variants={fadeIn('down', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="uppercase my-4 text-center"
        >
          "A restaurant is a <span className="text-green-500 font-bold">fantasy</span>—a kind of living
          fantasy in which diners are the most <span className="text-orange-300 font-bold">important</span>{' '}
          members of the cast." - Warner LeRoy
        </motion.p>
      </div>
    </>
  );
};
export default List;
