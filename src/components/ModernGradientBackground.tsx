export default function ModernGradientBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #0a1929 0%, #1e3a5f 50%, #4a7ba7 100%)'
        }}
      />
    </div>
  );
}
