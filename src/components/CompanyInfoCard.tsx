import { Building2, TrendingUp, Globe2 } from 'lucide-react';

export default function CompanyInfoCard() {
  return (
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1">
          <Building2 className="w-4 h-4 text-blue-700" />
          <h3 className="text-sm font-bold text-blue-900">
            Trusted Financial Partner
          </h3>
        </div>
        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
          100+ Years
        </span>
      </div>

      <p className="text-xs leading-relaxed text-gray-700 mb-3">
        Combining <span className="font-semibold text-gray-900">100 years of financial expertise with cutting-edge AI technology</span>. With <span className="font-semibold text-gray-900">67 locations nationwide and 2,788 employees</span>, we provide trusted investment support backed by proven results.
      </p>

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 rounded-md">
          <TrendingUp className="w-3 h-3 text-blue-700" />
          <span className="text-xs font-semibold text-blue-700">$500M Capital</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-100 rounded-md">
          <span className="text-xs font-bold text-green-700">A+ Rated</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-100 rounded-md">
          <Globe2 className="w-3 h-3 text-purple-700" />
          <span className="text-xs font-semibold text-purple-700">Global Offices</span>
        </div>
      </div>
    </div>
  );
}
