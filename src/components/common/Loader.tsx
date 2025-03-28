const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.5)",
        width: "100%",
        height: "100%",
        paddingTop: "30px",
        paddingBottom: "30px",
      }}
    >
      <div
        style={{
          width: "75px",
          height: "75px",
          border: "10px solid #fc8437",
          borderTop: "10px solid transparent",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
};

export default Loader;
