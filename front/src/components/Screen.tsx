interface ScreenProps {
  children: React.ReactNode;
}

const Screen: React.FC<ScreenProps> = ({ children }) => {
  return (<main className="shadow-lg w-full lg:w-5/6 flex flex-col m-auto p-5 ">
    {children}
  </main>);
};

export default Screen;