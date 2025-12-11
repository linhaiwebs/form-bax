export default function BrandHeader() {
  return (
    <div className="bg-blue-50 py-4 px-4">
      <div className="max-w-4xl mx-auto bg-blue-50 rounded-lg px-4 py-2">
        <div className="flex items-center gap-3">
          <img
            src="/assets/logo.png"
            alt="Okasan Securities"
            className="w-12 h-12 object-contain flex-shrink-0"
          />
          <div className="flex-1">
            <div className="relative inline-block">
              <div
                className="absolute inset-0 bg-pink-400 opacity-50 transform -skew-x-12"
                style={{
                  height: '50%',
                  top: '25%',
                  left: '-4px',
                  right: '-4px'
                }}
              />
              <h1 className="relative text-gray-900 font-bold text-3xl">AI株式診断システム</h1>
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-1.5 bg-blue-100 rounded px-2 py-1">
              <span className="text-gray-700 text-xs font-medium">日本市場特化</span>
              <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">NEW</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
