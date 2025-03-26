import { Zap } from 'lucide-react';
import React from 'react';
import * as motion from 'motion/react-client';

function Response({ value }: { value: string }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className='ai-response'
    >
      <Zap size={24} />
      <motion.p
        key={value} // Re-trigger animation when value changes
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
}

export default Response;
