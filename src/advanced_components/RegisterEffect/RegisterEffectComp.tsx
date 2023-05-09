import React, {
  forwardRef,
  ReactNode,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { gsap } from 'gsap';
import { CustomWiggle } from 'gsap/CustomWiggle';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase, CustomWiggle);

CustomWiggle.create('myWiggle', {
  wiggles: 8,
  type: 'uniform',
});

gsap.registerEffect({
  name: 'pulse',
  effect(targets: any) {
    return gsap.fromTo(
      targets,
      {
        scale: 1,
      },
      {
        scale: 1.5,
        repeat: 1,
        ease: 'bounce',
        yoyoEase: 'power3',
      }
    );
  },
});

gsap.registerEffect({
  name: 'spin',
  effect(targets: any) {
    return gsap.to(targets, {
      rotation: (i, el) =>
        gsap.utils.snap(360, Number(gsap.getProperty(el, 'rotation')) + 360),
    });
  },
});

gsap.registerEffect({
  name: 'shake',
  effect(targets: any) {
    return gsap.fromTo(
      targets,
      {
        x: 0,
      },
      {
        x: 10,
        ease: 'myWiggle',
      }
    );
  },
});

type RegisterEffectComp = {
  children: ReactNode;
  effect: string;
  targetRef: React.MutableRefObject<unknown>;
  vars?: gsap.TweenVars;
};

const RegisterEffectComp = forwardRef<unknown, RegisterEffectComp>(
  (props, ref) => {
    const animation = useRef();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const ctx = gsap.context(() => {});

    useEffect(() => {
      return () => ctx.revert();
    }, []);

    useLayoutEffect(() => {
      if (gsap.effects[props.effect]) {
        ctx.add(() => {
          animation.current = gsap.effects[props.effect](
            props.targetRef.current,
            props.vars
          );
        });
      }
    }, [ctx, props.effect, props.targetRef, props.vars]);

    useEffect(() => {
      if (typeof ref === 'function') {
        ref(animation.current);
      } else if (ref) {
        ref.current = animation.current;
      }
    }, [ref]);

    return <div>{props.children}</div>;
  }
);

type BoxProps = {
  children: ReactNode;
};

const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return (
    <div className="box" ref={ref}>
      {props.children}
    </div>
  );
});

const wrap = gsap.utils.wrap(['pulse', 'spin', 'shake']);

const RegisterEffectSample: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const count = useRef(0);
  const [effect, setEffect] = useState('');

  const toggle = () => {
    setEffect(wrap(count.current++));
  };

  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <p>Effect: {effect}</p>
      <RegisterEffectComp targetRef={boxRef} effect={effect}>
        <Box ref={boxRef}>Box</Box>
      </RegisterEffectComp>
    </div>
  );
};

export default RegisterEffectSample;
