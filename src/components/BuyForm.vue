<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }" class="form">

        <div class="row">
          <label>ФИО <i>*</i> </label>
          <Field v-model="form.fio" name="fio" type="text" :class="{ 'is-invalid': errors.fio }" />
          <div class="err">{{errors.fio}}</div>
        </div>
        <div class="row">
          <label>Желаемая дата доставки<i>*</i> </label>
          <Field v-model="form.date" name="date" type="date" :class="{ 'is-invalid': errors.date }" />
          <div class="err">{{errors.dob}}</div>
        </div>

        <div class="row">
          <label>Город<i>*</i> </label>
          <Field v-model="form.city" name="city" as="select" :class="{ 'is-invalid': errors.phone }" >
            <option value="Москва">Москва</option>
            <option value="Магадан">Магадан</option>
            <option value="Мурманск">Мурманск</option>
          </Field>
          <div class="err">{{errors.city}}</div>
        </div>
        <div class="row">
          <label>Email <i>*</i> </label>
          <Field v-model="form.email" name="email" type="text" :class="{ 'is-invalid': errors.email }" />
          <div class="err">{{errors.email}}</div>
        </div>
        <div class="buttons">
          <label>согласие на обработку <i>*</i> </label>
          <Field v-model="form.agree" name="isAgree" type="checkbox" :value="true" :class="{ 'is-invalid': errors.isAgree }" />
          <div class="err">{{errors.isAgree}}</div>
        </div>

      <div class="buttons">
        <v-btn type="submit">Отправить</v-btn>
        <v-btn type="reset">Сбросить</v-btn>
      </div>
    </Form>
  </div>
</template>

<script setup>
import {defineEmits, ref} from "vue";
import api from '@/services/api'

import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'

const emits = defineEmits(['success'])

const form = ref({})

const success = () => {
  emits('success')
}

function onSubmit(values) {
  api.post('https://httpbin.org/post', form)
    .then(() => {
      success()
    })
}

const schema = Yup.object().shape({
  fio: Yup.string()
      .required('обязательное поле ФИО')
      .matches(/([А-ЯЁ][а-яё]+[\-\s]?){3,}/, 'ФИО неправильного формата'),
  email: Yup.string()
      .required('обязательное поле email')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'email не соответствует шаблону'),
  city: Yup.string()
      .required('обязательное поле город'),
  date: Yup.string()
      .required('обязательное поле дата рождения')
      .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'формат даты не DD-MM-YYYY'),
  isAgree: Yup.boolean()
      .required('обязательное поле')
});


</script>

<style scoped lang="scss">
label {
  padding-right: 10px;
}
i {
  color: red;
}

.err {
  color: red;
}

.is-invalid {
  border: red;
}
.row {
  display: flex;
  flex-direction: column;
}
.buttons {
  display: flex;
  gap: 1rem;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  input, select {
    border-style: solid;
    max-width: 320px;
  }
}

</style>
