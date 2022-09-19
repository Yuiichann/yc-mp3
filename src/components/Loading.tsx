const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] cursor-wait">
      <div className="w-24 h-24 border-l-4 border-secondary rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
