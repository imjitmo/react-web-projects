/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from '@/components/ui/card';
import { LuFacebook } from 'react-icons/lu';
import { PiRssSimpleBold } from 'react-icons/pi';
import { SlSocialGoogle, SlSocialLinkedin } from 'react-icons/sl';
const Cards = (props: any) => {
  return (
    <div>
      <Card className="min-w-[300px] max-w-[800px] h-auto bg-transparent border-none shadow-none">
        <CardContent className="flex flex-row justify-center gap-4">
          {/* image */}
          <div className="flex flex-0 md:flex-1 invisible md:visible">
            <img src={props.image} className="rounded-2xl w-72 h-auto object-cover hidden md:block" alt="" />
          </div>

          {/* description */}
          <div className="flex flex-col gap-6 flex-2 items-start justify-start my-auto">
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-3xl font-medium">{props.name}</h1>
              <p className="text-slate-400 uppercase">{props.role}</p>
            </div>
            <article className="text-justify">{props.description}</article>
            <div className="flex flex-row gap-2">
              <a
                href={props.links[0].facebook ? props.links[0].facebook : '#teams'}
                target={`${props.links[0].facebook ? '_blank' : ''}`}
                className={`p-1.5 rounded-lg ${
                  props.links[0].facebook === '' ? 'bg-slate-600' : 'bg-blue-600  hover:bg-blue-300'
                }`}
              >
                <LuFacebook className="size-8 text-slate-50" />
              </a>
              <a
                href={props.links[0].google ? props.links[0].google : '#teams'}
                target={`${props.links[0].google ? '_blank' : ''}`}
                className={`p-1.5 rounded-lg ${
                  props.links[0].google === '' ? 'bg-slate-600' : 'bg-rose-700  hover:bg-rose-400'
                }`}
              >
                <SlSocialGoogle className="size-8 text-slate-50" />
              </a>
              <a
                href={props.links[0].linkedin ? props.links[0].linkedin : '#teams'}
                target={`${props.links[0].linkedin ? '_blank' : ''}`}
                className={`p-1.5 rounded-lg ${
                  props.links[0].linkedin === '' ? 'bg-slate-600' : 'bg-blue-400  hover:bg-rose-200'
                }`}
              >
                <SlSocialLinkedin className="size-8 text-slate-50" />
              </a>
              <a
                href={props.links[0].rss ? props.links[0].rss : '#teams'}
                target={`${props.links[0].rss ? '_blank' : ''}`}
                className={`p-1.5 rounded-lg ${
                  props.links[0].rss === '' ? 'bg-slate-600' : 'bg-orange-500  hover:bg-orange-300'
                }`}
              >
                <PiRssSimpleBold className="size-8 text-slate-50" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Cards;
