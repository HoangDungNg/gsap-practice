import React, { ReactNode, ChangeEvent } from 'react';
import { gsap } from 'gsap';

const { useEffect, useLayoutEffect, useRef, useContext } = React;
import { SelectedContext, PassingContextProvider } from './PassingContext';

type BoxProps = {
  children: ReactNode;
  id: string;
};

const Box: React.FC<BoxProps> = (props) => {
  const ele = useRef<HTMLDivElement>(null);
  const { selected } = useContext(SelectedContext);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const ctx = gsap.context(() => {});

  useEffect(() => {
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    ctx.add(() => {
      gsap.to(ele.current, { x: selected === props.id ? 200 : 0 });
    });
  }, [props.id, ctx, selected]);

  return (
    <div className="box" ref={ele} style={{ marginTop: '10px' }}>
      {props.children}
    </div>
  );
};

const Boxes = () => {
  return (
    <div className="boxes">
      <Box id="1">Box 1</Box>
      <Box id="2">Box 2</Box>
      <Box id="3">Box 3</Box>
    </div>
  );
};

const Menu = () => {
  const { selected, setSelected } = useContext(SelectedContext);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };

  return (
    <div className="menu">
      <label>
        <input
          onChange={onChange}
          checked={selected === '1'}
          type="radio"
          value="1"
          name="selcted"
        />
        Box 1
      </label>
      <label>
        <input
          onChange={onChange}
          checked={selected === '2'}
          type="radio"
          value="2"
          name="selcted"
        />
        Box 2
      </label>
      <label>
        <input
          onChange={onChange}
          checked={selected === '3'}
          type="radio"
          value="3"
          name="selcted"
        />
        Box 3
      </label>
    </div>
  );
};

const PassingUsingContext: React.FC = () => {
  return (
    <div style={{ marginTop: '35px' }}>
      <PassingContextProvider>
        <Menu />
        <Boxes />
      </PassingContextProvider>
    </div>
  );
};

export default PassingUsingContext;
