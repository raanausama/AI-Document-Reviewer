import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SlideInComponent = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // Trigger when 30% of the element is in view
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }} // Start slightly off to the left
      animate={inView ? { opacity: 1, x: 0 } : {}} // Slide in when in view
      transition={{ type: 'tween', duration: 0.6 }} // Smooth transition
    >
      {children}
    </motion.div>
  );
};

export default SlideInComponent;
