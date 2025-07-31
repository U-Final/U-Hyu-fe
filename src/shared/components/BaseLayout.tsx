interface BaseLayoutProps {
  children: React.ReactNode;
  isMap?: boolean;
}

const BaseLayout = ({ children, isMap = false }: BaseLayoutProps) => {
  return (
    <div
      className={
        isMap
          ? 'flex-1 bg-white w-full h-full min-w-0'
          : 'flex-1 bg-white px-4 pt-[60px] pb-[50px] w-full h-full overflow-y-auto'
      }
    >
      {children}
    </div>
  );
};

export default BaseLayout;
