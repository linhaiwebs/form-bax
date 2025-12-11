import { Gift } from 'lucide-react';

export default function CampaignBanner() {
  return (
    <div className="bg-gradient-to-r from-brand-red to-brand-red-dark py-3 px-4 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-white">
        <Gift className="w-5 h-5 animate-pulse flex-shrink-0" />
        <p className="text-sm font-bold text-center">
          今だけ! 完全無料キャンペーン実施中
        </p>
      </div>
    </div>
  );
}
