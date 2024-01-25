<template>
  <div>
    <Form :validation-schema="schema" v-slot="{ errors }" class="form">

      <div class="row">
        <label>Название латиницей <i>*</i></label>
        <Field v-model="form.title" name="title" type="text" :class="{ 'is-invalid': errors.title }" />
        <div class="err">{{errors.title}}</div>
      </div>
      <div class="row">
        <label>Цена в $ <i>*</i> </label>
        <Field v-model="form.price" name="price" type="text" :class="{ 'is-invalid': errors.price }" />
        <div class="err">{{errors.price}}</div>
      </div>

      <div class="buttons">
        <v-btn @click="success()">Добавить</v-btn>
        <v-btn type="reset">Сбросить</v-btn>
        <v-btn @click="cancel">Отмена</v-btn>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { defineEmits, ref} from 'vue'
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'

const emits = defineEmits(['add', 'cancel'])

const form = ref({})

const success = () => {
  schema.validate(form.value)
      .then(() => {
        emits('add', form)
      })
      .catch((validationError) => {
        alert(validationError.errors)
      })
}

const cancel = () => {
  emits('cancel')
}

const schema = Yup.object().shape({
  title: Yup.string()
      .required('обязательное поле название')
      .min(5, 'минимум 5 символов')
      .max(50, 'максимум 50 символов')
      .matches(/^[A-Za-z0-9\s]{3,50}$/, 'Название неправильного формата'),
  price: Yup.number()
      .required('обязательное поле цена')
      .min(1, 'минимум 1 символ')
      .typeError('Цена должна быть числом')
      .positive('Цена должна быть положительным числом')
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
