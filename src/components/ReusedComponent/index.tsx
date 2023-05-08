import React, { useLayoutEffect, useRef } from 'react';
import ReusedComponent from './ReusedComponent';
import { gsap } from 'gsap';
import './styles.scss';

const CustomComponent: React.FC = () => {
  const reusedRootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-animate='rotate']", {
        rotation: 360,
        repeat: -1,
        repeatDelay: 1.5,
        yoyo: true,
      });

      gsap.to("[data-animate='move']", {
        x: 100,
        repeat: -1,
        repeatDelay: 1,
        yoyo: true,
      });
    }, reusedRootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="reused-root" ref={reusedRootRef}>
      <ReusedComponent className="rotate" anim="rotate">
        Box
      </ReusedComponent>
      <ReusedComponent className="move" anim="move">
        Box
      </ReusedComponent>
    </div>
  );
};

export default CustomComponent;
