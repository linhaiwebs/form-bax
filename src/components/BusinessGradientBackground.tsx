export default function BusinessGradientBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #60A5FA 0%, #4ADE80 50%, #6EE7B7 100%)',
        }}
      />

      <div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-3xl opacity-30 animate-gentle-float"
        style={{
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.8), transparent)',
          animationDelay: '0s',
          animationDuration: '8s',
        }}
      />

      <div
        className="absolute top-[40%] right-[-15%] w-[700px] h-[700px] rounded-full blur-3xl opacity-25 animate-gentle-float"
        style={{
          background: 'radial-gradient(circle, rgba(110, 231, 183, 0.7), transparent)',
          animationDelay: '2s',
          animationDuration: '10s',
        }}
      />

      <div
        className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full blur-3xl opacity-20 animate-gentle-float"
        style={{
          background: 'radial-gradient(circle, rgba(74, 222, 128, 0.6), transparent)',
          animationDelay: '4s',
          animationDuration: '12s',
        }}
      />

      <div
        className="absolute top-[10%] right-[25%] w-[400px] h-[400px] rounded-full blur-3xl opacity-15 animate-gentle-float"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.5), transparent)',
          animationDelay: '1s',
          animationDuration: '9s',
        }}
      />

      <div
        className="absolute bottom-[30%] right-[10%] w-[550px] h-[550px] rounded-full blur-3xl opacity-18 animate-gentle-float"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.6), transparent)',
          animationDelay: '3s',
          animationDuration: '11s',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 20%, transparent 80%, rgba(255, 255, 255, 0.1) 100%)',
        }}
      />

      <div className="absolute top-[15%] left-[10%] w-32 h-32 border-2 border-white/10 rounded-full" />
      <div className="absolute top-[60%] left-[70%] w-24 h-24 border-2 border-white/10 rounded-full" />
      <div className="absolute bottom-[20%] right-[15%] w-40 h-40 border-2 border-white/10 rounded-full" />
      <div className="absolute top-[35%] right-[40%] w-20 h-20 border-2 border-white/10 rounded-full" />
    </div>
  );
}
