<!--
 * @fileName:
 * @Date: 2023-04-21 16:43:16
 * @Author: manYao.zhu
-->

# Form 表单的相关问题及操作

## form 表单添加(自定义)校验规则

###### html 部分

```html
<el-form
  v-if="state.activeIdx === 1"
  label-width="140px"
  ref="applyRef"
  :model="state.form"
  :rules="state.rules"
>
  <el-form-item label="真实姓名：" prop="realName" required>
    <el-input
      class="m_page_form_value"
      placeholder="限10字"
      :readonly="true"
      clearable
      v-model="state.form.realName"
    ></el-input>
  </el-form-item>
</el-form>
```

###### ts 部分

```ts
const state = reactive<any>({
  form: {
    realName: '',
  },
  rules: {
    realName: [
      { required: true, message: '不能为空', trigger: 'blur' },
      // 自定义校验规则
      {
        validator: (rule: any, value: any) => !value,
        message: '不能为空',
        trigger: 'blur',
      },
      // 自定义校验规则以及回调
      {
        validator: (rule: any, value: any, callback: any) => {
          if (!value) {
            return callback('不能为空！')
          }
          if (value.length > 3) {
            return callback('长度不能大于3')
          }
        },
        trigger: 'blur', // 这里可定义，可不定义。 若不定义， 默认时change
      },
    ],
  },
})
```

## 全局调用校验

###### ts 部分

```ts
const formRef = ref<any>(null)

formRef.value.validate((valid: any) => {
  if (valid) {
    console.log('校验成功')
  }
})
```

## 全局重置

###### ts 部分

```ts
const formRef = ref<any>(null)
formRef.value.resetFields()
```

## 某个自定义的表单组件需要控制单一的校验

###### html 部分

```html
<el-form
  v-if="state.activeIdx === 1"
  label-width="140px"
  ref="applyRef"
  :model="state.form"
  :rules="state.rules"
>
  <el-form-item label="真实姓名：" prop="realName" required>
    <el-input
      class="m_page_form_value"
      placeholder="限10字"
      :readonly="true"
      clearable
      v-model="state.form.realName"
      @change="formChange('realName')"
    ></el-input>
  </el-form-item>
</el-form>
```

###### ts 部分

```ts
const formRef = ref<any>(null)

const events = {
  formChange(type: string) {
    formRef.value.validateField(type)
  },
}
```
