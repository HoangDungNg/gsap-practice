import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './styles.scss';

const GsapContextEle: React.FC = () => {
  const gsapContext = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.box', { rotation: 360 });
      gsap.to('.circle', { rotation: 360 });
    }, gsapContext);

    return () => ctx.revert(); // cleaning up animations
  }, []);

  return (
    <>
      <div ref={gsapContext} className="gsap-context">
        <div className="circle">Circle</div>
        <div className="box">Box</div>
      </div>
    </>
  );
};

export default GsapContextEle;
