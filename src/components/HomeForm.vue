<template>
  <h2>Tell us about yourself</h2>

  <div class="form-input">
    <div class="form-field">
      <span class="form-field__label">Name</span>
      <Field
        type="text"
        class="custom-input"
        name="name"
        aria-label="Name"
        placeho
        aria-placeholder="ds"
      />
      <ErrorMessage class="input-error-msg text-red-400" name="name" />
    </div>
     <div class="form-field">
      <span class="form-field__label">Age</span>
      <Field
        type="text"
        class="custom-input"
        name="age"
      />
      <ErrorMessage class="input-error-msg text-red-400" name="age" />
    </div>
     <div class="form-field">
      <span class="form-field__label">Where do you live</span>
        <Field
          class="custom-input"
          name="country"
          as="select"
        >
          <option v-for="country in countries"
          :key="country.currency"
          :value="country.currency">
          {{country.name}}
          </option>
        </Field>
        <ErrorMessage class="input-error-msg text-red-400" name="country" />
      </div>

     <div class="form-field">
      <Field
        v-for="item of packages" :key="item.id"
        v-slot="{ field, handleChange }"
        name="package"
        >
        <label class="block" for="item.name">
            <input
            type="radio"
            name="package"
            v-bind="field"
            :value="item.id"
            @change="(e) => handleChange(item.id)"
            >
            {{item.name}}
        </label>
      </Field>
      <ErrorMessage class="input-error-msg text-red-400" name="package" />
     </div>
  </div>
</template>

<script lang='ts'>
import {
  ref,
} from 'vue';
import { Field, ErrorMessage } from 'vee-validate';
import COUNTRIES from '@/constants/COUNTRY';
import PACKAGES from '@/constants/PACKAGES';
import { Countries } from '@/helpers/@types/country.d';
import { IPackage } from '@/helpers/interface/IPackage';

export default {
  name: 'FormOne',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    errors: {
      type: Object,
    },
  },
  setup() {
    const countries = ref<Countries>(COUNTRIES);
    const packages = ref<IPackage[]>(PACKAGES);
    return { countries, packages };
  },
};
</script>
