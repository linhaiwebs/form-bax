import { Gift } from 'lucide-react';

export default function CampaignBanner() {
  return (
    <div className="bg-gradient-to-r from-brand-red to-brand-red-dark py-2 px-2 shadow-sm rounded">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-1.5 text-white">
        <Gift className="w-3.5 h-3.5 animate-pulse flex-shrink-0" />
        <p className="text-[10px] font-bold text-center">
          今だけ! 完全無料キャンペーン実施中
        </p>
      </div>
    </div>
  );
}
