interface BaseLayoutProps {
  children: React.ReactNode;
  isMap?: boolean;
}

const BaseLayout = ({ children, isMap = false }: BaseLayoutProps) => {
  return (
    <div
      className={
        isMap
          ? 'flex-1 bg-white scrollbar-hidden overflow-hidden w-full h-full min-w-0'
          : 'flex-1 bg-white scrollbar-hidden overflow-hidden px-4 pt-[60px] pb-[40px] w-full h-full overflow-y-auto'
      }
    >
      {children}
    </div>
  );
};

export default BaseLayout;
