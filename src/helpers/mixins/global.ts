import COUNTRY from '@/constants/COUNTRY';
import PACKAGES from '@/constants/PACKAGES';

export default {
  methods: {
    getPreminum(age: number, currentPackage: number, country: string): number {
      const rate = COUNTRY?.find((item) => item.currency === country)?.rate;
      const packageMultiplier = PACKAGES?.find((item) => item.id === currentPackage)?.rate;
      return 10 * age * (packageMultiplier || 1) * (rate || 1);
    },
  },
};
