export default function BrandHeader() {
  return (
    <div className="bg-brand-red py-4 px-4">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <div className="bg-white w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0 shadow-sm">
          <div className="text-brand-red font-bold text-xl">株</div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-white font-bold text-lg">AI株式診断 システム</h1>
            <span className="bg-white text-brand-red px-2.5 py-0.5 rounded text-xs font-bold">NEW</span>
          </div>
          <p className="text-white text-xs mt-1 leading-relaxed">日本最強級AIで最適な投資選択を実現し、最適な投資戦略を導き出します</p>
        </div>
      </div>
    </div>
  );
}
