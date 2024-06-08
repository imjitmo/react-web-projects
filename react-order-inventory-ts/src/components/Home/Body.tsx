import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Body = () => {
  return (
    <main className="w-full min-h-screen bg-slate-200 text-slate-950">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <img src="/felicitas_logo.jpg" alt="felicitas_logo" />
          </CarouselItem>
          <CarouselItem>...</CarouselItem>
          <CarouselItem>...</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
};
export default Body;
