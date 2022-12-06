<template>
  <div class="text-center mb-10" id="userInfo">
    <h2>Summary</h2>
    <p class="mt-8">Name: {{values.name}}</p>
    <p >Age: {{values.age}}</p>
    <p >Where do you live: {{userCountry.name}}</p>
    <p >Package: {{userPackage.name}}</p>
    <p >Premium: {{values.premium}}{{userCountry.currency}}</p>
  </div>
  <slot></slot>
</template>
<script lang='ts'>
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from 'vue';
import COUNTRIES from '@/constants/COUNTRY';
import PACKAGES from '@/constants/PACKAGES';
import { Countries } from '@/helpers/@types/country.d';
import { IPackage } from '@/helpers/interface/IPackage';

interface IUserValues{
  name:string;
  age:number;
  country:string;
  package:number;
  premium: number;
}

export default defineComponent({
  name: 'userInfo',
  props: {
    userValue: {
      type: Object as PropType<IUserValues>,
      required: true,
    },
  },
  setup(props) {
    const values = ref<IUserValues>(props.userValue);
    const countries = ref<Countries>(COUNTRIES);
    const packages = ref<IPackage[]>(PACKAGES);

    const userCountry = computed(() => countries.value
    && countries.value.find((item) => item.currency === values.value.country));
    const userPackage = computed(() => packages.value
    && packages.value.find((item) => item.id === values.value.package));
    // const isError = computed(() => currentStep.value === 2);

    const changeStep = () => { console.log('yee'); };

    return {
      countries, values, userCountry, userPackage, changeStep,
    };
  },
});
</script>
