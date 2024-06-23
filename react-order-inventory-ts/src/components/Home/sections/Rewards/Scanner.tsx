import DialogTool from '@/components/DialogTool';
import { Button } from '@/components/ui/button';

import { fadeIn } from '@/anim/variant';
import { motion } from 'framer-motion';

import CodeScanner from '@/components/QRCode/CodeScanner';
import { useState } from 'react';
import { LuScanLine } from 'react-icons/lu';

const Scanner = () => {
  const [onOpen, setOnOpen] = useState(false);
  return (
    <>
      <motion.div
        variants={fadeIn('right', 0.3)}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: true, amount: 0.3 }}
        className=""
      >
        <Button
          className="flex flex-row gap-2 flex-wrap bg-green-500 items-center justify-center"
          onClick={() => setOnOpen((prev) => !prev)}
        >
          <LuScanLine className="size-[1.15rem]" /> Scan QR Code
        </Button>
      </motion.div>
      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header="Scan QR Code"
        description="Scan QR Code to check points"
        className="bg-slate-100 text-slate-950 w-auto h-auto z-[1000]"
      >
        <CodeScanner />
      </DialogTool>
    </>
  );
};
export default Scanner;
