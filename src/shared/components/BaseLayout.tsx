interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="flex-1 bg-white scrollbar-hidden overflow-hidden px-4 pt-[60px] pb-[40px] w-full max-w-[360px] mx-auto h-full overflow-y-auto">
      {children}
    </div>
  );
};

export default BaseLayout;
