import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-gray-200 bg-white mt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Legal Disclosure Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-2">
            <div className="p-2 rounded-lg flex-shrink-0 bg-yellow-100">
              <Shield className="w-5 h-5 text-yellow-700" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-yellow-900 mb-2">
                Disclaimer (Important)
              </h3>
              <div className="space-y-2 text-sm leading-relaxed text-gray-700">
                <p>
                  The information on this site is based on publicly available historical data and statistical methods for illustrative purposes only. It is not intended as investment solicitation or advice. Past performance does not guarantee future results. Financial instruments trading involves risks including loss of principal.
                </p>
                <p>
                  Backtested results are theoretical values dependent on specific periods, conditions, and parameters, and may not account for transaction costs, slippage, taxes, or liquidity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 pt-4 text-center">
          <p className="text-xs sm:text-sm text-gray-600 font-medium mb-3">
            &copy; {currentYear} All rights reserved.
          </p>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <Link
              to="/privacy"
              className="text-brand-blue hover:text-brand-blue-dark transition-colors duration-200 hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/terms"
              className="text-brand-blue hover:text-brand-blue-dark transition-colors duration-200 hover:underline"
            >
              Terms of Service
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/contact"
              className="text-brand-blue hover:text-brand-blue-dark transition-colors duration-200 hover:underline"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
