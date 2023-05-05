import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import './styles.scss';

const RotateElement: React.FC = () => {
  const myBox = useRef(null);

  useLayoutEffect(() => {
    gsap.to(myBox.current, {
      rotation: 360,
    });
  });

  return (
    <div ref={myBox} className="myRotate">
      <p>My Box</p>
    </div>
  );
};

export default RotateElement;
