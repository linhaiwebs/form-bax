export default function BrandHeader() {
  return (
    <div className="bg-blue-50 py-4 px-4">
      <div className="max-w-4xl mx-auto bg-blue-50 rounded-lg py-2">
        <div className="text-center">
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
            <h1 className="relative text-gray-900 font-bold text-3xl">AI Stock Analysis System</h1>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-1.5">
            <span className="text-gray-700 text-xs font-medium bg-blue-100 rounded px-2 py-1">US Market Focused</span>
            <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">NEW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
