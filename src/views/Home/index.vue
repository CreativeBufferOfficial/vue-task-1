<template>
    <div v-if="!userValueSubmit">
      <Form
      :validation-schema="schema"
      v-slot="{ handleSubmit, errors }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <component
          :is="this.steps[this.currentStep]"
          :errors="errors"
          ></component>
          <div class="step-footer text-center mt-9">
              <button v-if="isIntro" type="button" @click="changeStep(1)" class="btn btn-dark">
                  Start
              </button>
              <div v-else-if="isStepForm">
                  <button type="button" @click="changeStep(0)" class="btn btn-dark">Back</button>
                  <button type="submit" class="btn btn-dark ml-1">Next</button>
              </div>
              <button v-else-if="isError"
              type="button"
              @click="changeStep(0)"
              class="btn btn-dark"
              >
                Ok :(
              </button>
          </div>
        </form>
      </Form>
    </div>
    <UserInfo v-else :userValue="userValue">
        <div class="text-center">
            <button @click="changeStep(1)" type="button" class="btn btn-dark">Back</button>
            <button @click="changeStep(0)" type="button"  class="btn btn-dark ml-1">Buy</button>
        </div>
    </UserInfo>
</template>
<script lang="ts">
import {
  computed, defineComponent, reactive, ref,
} from 'vue';
import * as Yup from 'yup';
import { Form } from 'vee-validate';
import FormIntro from '@/components/FormIntro.vue';
import HomeForm from '@/components/HomeForm.vue';
import AgeError from '@/components/AgeError.vue';
import globalMixins from '@/helpers/mixins/global';
import UserInfo from './UserInfo.vue';

interface IUserValues{
  name?:string;
  age?:number | 0;
  country?:string;
  package?:number | 1;
  premium?: number | 0;
}

export default defineComponent({
  name: 'homeView',
  mixins: [globalMixins],
  components: {
    FormIntro,
    Form,
    HomeForm,
    UserInfo,
    AgeError,
  },
  setup() {
    // variables
    const steps = reactive(['FormIntro', 'HomeForm', 'AgeError']);
    const currentStep = ref<number>(0);
    const userValueSubmit = ref<boolean>(false);
    const userValue = ref<IUserValues>({});

    // computed
    const isIntro = computed(() => currentStep.value === 0);
    const isStepForm = computed(() => currentStep.value === 1);
    const isError = computed(() => currentStep.value === 2);

    const schema = Yup.object().shape({
      name: Yup.string()
        .required(),
      age: Yup.number()
        .typeError('Must be a number')
        .required(),
      country: Yup.string()
        .required(),
      package: Yup.string()
        .required(),
    });

    const changeStep = (step:number):void => {
      currentStep.value = step;
      userValueSubmit.value = step === 2;
    };

    const onSubmit = (value:IUserValues) => {
      if (value?.age && value?.age > 100) {
        currentStep.value = 2;
      } else {
        const allValues = {
          ...value,
          premium:
            globalMixins.methods.getPreminum(value.age || 0, value.package || 1, value.country || ''),
        };
        userValue.value = allValues;
        userValueSubmit.value = true;
      }
    };

    return {
      steps,
      currentStep,
      isIntro,
      isStepForm,
      schema,
      onSubmit,
      changeStep,
      userValue,
      isError,
      userValueSubmit,
    };
  },
});
</script>
