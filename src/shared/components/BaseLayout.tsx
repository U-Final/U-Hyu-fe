interface BaseLayoutProps {
  children: React.ReactNode;
  isMap?: boolean;
}

const BaseLayout = ({ children, isMap = false }: BaseLayoutProps) => {
  return (
    <div
      className={
        isMap
          ? 'flex-1 bg-white w-full h-full min-w-0 desktop-padding'
          : 'flex-1 bg-white px-4 pt-[60px] pb-[50px] w-full h-full overflow-y-auto desktop-padding'
      }
    >
      {children}
    </div>
  );
};

export default BaseLayout;
