import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Shield, Scale, BookOpen } from 'lucide-react';

const risks = [
  {
    icon: AlertTriangle,
    title: 'High Volatility Risk',
    desc: 'Meme coins are extremely volatile. The price of $DRICK can rise or fall dramatically in short periods. You could lose some or all of your investment.',
  },
  {
    icon: Shield,
    title: 'No Financial Advice',
    desc: 'Nothing on this website constitutes financial advice. This is a meme coin created for entertainment purposes. Always do your own research (DYOR).',
  },
  {
    icon: Scale,
    title: 'Regulatory Uncertainty',
    desc: 'Cryptocurrency regulations vary by jurisdiction and are subject to change. Ensure compliance with your local laws before purchasing.',
  },
  {
    icon: BookOpen,
    title: 'No Intrinsic Value',
    desc: '$DRICK has no intrinsic value, no utility, and no expectation of financial return. It is a meme token for entertainment and community engagement only.',
  },
];

export default function RiskDisclaimer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-24 overflow-hidden border-t border-drick-surface-light">
      {/* Background */}
      <div className="absolute inset-0 bg-drick-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-400/10 border border-orange-400/20 mb-6 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-sm font-medium text-orange-400">Important Notice</span>
          </div>
          <h2
            className={`font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-4 transition-all duration-700 delay-100 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Risk Disclaimer & Legal Notice
          </h2>
        </div>

        {/* Risk Cards */}
        <div
          className={`grid sm:grid-cols-2 gap-4 mb-10 transition-all duration-1000 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {risks.map((risk) => (
            <div
              key={risk.title}
              className="p-5 rounded-2xl bg-drick-surface/50 border border-drick-surface-light hover:border-orange-400/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-400/10 flex items-center justify-center flex-shrink-0">
                  <risk.icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-sm mb-2">{risk.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{risk.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Disclaimer Text */}
        <div
          className={`p-6 rounded-2xl glass-card border-drick-surface-light transition-all duration-1000 delay-400 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="font-display font-semibold text-white mb-4">Full Disclaimer</h3>
          <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
            <p>
              <strong className="text-slate-300">Not Financial Advice:</strong> The information provided on this website 
              does not constitute investment advice, financial advice, trading advice, or any other sort of advice. 
              You should not treat any of the website&apos;s content as such. Do conduct your own due diligence and 
              consult your financial advisor before making any investment decisions.
            </p>
            <p>
              <strong className="text-slate-300">No Guarantees:</strong> There are no guarantees that the value of 
              $DRICK tokens will increase. Cryptocurrency may be unregulated in your jurisdiction. The value of 
              cryptocurrencies may go down as well as up. Profits may be subject to capital gains or other taxes 
              applicable in your jurisdiction.
            </p>
            <p>
              <strong className="text-slate-300">Meme Coin Nature:</strong> $DRICK is a meme coin with no intrinsic 
              value or expectation of financial return. There is no formal team, no roadmap utility commitments, 
              and the token is for entertainment purposes only. The community drives the project.
            </p>
            <p>
              <strong className="text-slate-300">Third-Party Platforms:</strong> This project is not affiliated with, 
              endorsed by, or sponsored by Adult Swim, Cartoon Network, Warner Bros., or the creators of Rick and Morty. 
              Rick and Morty are trademarks of their respective owners. $DRICK is a parody/fan tribute project.
            </p>
            <p>
              <strong className="text-slate-300">Smart Contract Risk:</strong> Despite the contract being renounced 
              and liquidity burned, all blockchain transactions carry inherent risks including but not limited to 
              smart contract vulnerabilities, blockchain network failures, and wallet security risks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
