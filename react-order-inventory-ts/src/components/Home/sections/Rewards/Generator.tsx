import { fadeIn } from '@/anim/variant';
import DialogTool from '@/components/DialogTool';
import CodeGenerator from '@/components/QRCode/CodeGenerator';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Generator = () => {
  const [onOpen, setOnOpen] = useState(false);
  return (
    <>
      <motion.div
        variants={fadeIn('left', 0.3)}
        initial="hidden"
        whileInView={'show'}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Button className="bg-orange-300" onClick={() => setOnOpen((prev) => !prev)}>
          Generate QR Code
        </Button>
      </motion.div>
      <DialogTool
        onOpen={onOpen}
        setOnOpen={setOnOpen}
        header="Generate QR Code"
        description="Generate QR Code for rewards"
        className="bg-slate-100 text-slate-950 w-auto h-auto"
      >
        <CodeGenerator />
      </DialogTool>
    </>
  );
};
export default Generator;
