import Services from '@/components/Services';
import RateList from '@/components/RateList';
import WorkProcess from '@/components/WorkProcess';
import PaymentTerms from '@/components/PaymentTerms';
import { useLanguage } from '@/components/Layout';

export default function ServicesPage() {
  const { language } = useLanguage();

  return (
    <div className="pt-20">
      <Services language={language} />
      <RateList language={language} />
      <WorkProcess language={language} />
      <PaymentTerms language={language} />
    </div>
  );
}
