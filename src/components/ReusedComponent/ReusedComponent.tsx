import React, { ReactNode } from 'react';

interface IReusedComponent {
  children: ReactNode;
  className: string;
  anim: string;
}

const ReusedComponent: React.FC<IReusedComponent> = (props) => {
  return (
    <div className={`box ${props.className}`} data-animate={props.anim}>
      {props.children}
    </div>
  );
};

export default ReusedComponent;
