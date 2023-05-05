import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './styles.scss';

type mouseEventProps = typeof MouseEvent extends (props: infer P) => any
  ? P
  : never;

const onEnter = ({ currentTarget }: mouseEventProps) => {
  gsap.to(currentTarget, { backgroundColor: 'red', scale: 1.2 });
};

const onLeave = ({ currentTarget }: mouseEventProps) => {
  gsap.to(currentTarget, { backgroundColor: 'green', scale: 1 });
};

const HoverBox: React.FC = () => {
  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave} className="hoverbox">
      HoverBox
    </div>
  );
};

export default HoverBox;
