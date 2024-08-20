interface ScreenProps {
  children: React.ReactNode;
}

const Screen: React.FC<ScreenProps> = ({ children }) => {
  return (<main className="w-full flex flex-col bg-lightBG">
    {children}
  </main>);
};

export default Screen;