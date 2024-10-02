const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h1 className="text-left text-purpleTitles font-bold text-2xl md:text-3xl lg:text-4xl dark:text-white">
      {children}
    </h1>
  );
};

export default Title;