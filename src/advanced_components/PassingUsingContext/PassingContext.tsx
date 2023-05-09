import { ReactNode, createContext, useState } from 'react';

type SelectedContextType = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

type ContextProviderType = {
  children: ReactNode;
};

export const SelectedContext = createContext<SelectedContextType>({
  selected: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelected: () => {},
});

export const PassingContextProvider = ({ children }: ContextProviderType) => {
  const [selected, setSelected] = useState('2');

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};
