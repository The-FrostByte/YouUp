function BorderAnimatedContainer({ children }) {
  const borderBg =
    "[background:linear-gradient(45deg,#120d14,theme(colors.slate.900)_50%,#120d14)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.rose.400/.32)_80%,_theme(colors.fuchsia.400)_86%,_theme(colors.rose.300)_90%,_theme(colors.amber.200)_94%,_theme(colors.rose.400/.32))_border-box]";

  return (
    <div
      className={`
        shadow-[0_0_80px_rgba(244,114,182,0.15)] backdrop-blur-md
        w-full h-full
        ${borderBg}
        rounded-2xl
        border
        border-transparent
        animate-border
        flex
        overflow-hidden
      `}
    >
      {children}
    </div>
  );
}

export default BorderAnimatedContainer;