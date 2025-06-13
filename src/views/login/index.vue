<template>
  <div style="width: 100vw; height: 100vh; position: relative">
    <div ref="vantaRef" style="width: 100vw; height: 100vh; position: absolute"></div>
    <div class="form">
      <div class="title">欢迎</div>
      <div>
        <HaoziForm
          v-model:model-value="formData"
          :form-config="formConfig"
          :form-props="formProp"
        />
      </div>
      <div>
        <el-checkbox size="large" v-model="isRememberPassword" label="记住密码"></el-checkbox>
      </div>
      <el-button class="login-btn" size="large" type="primary" @click="handleLogin">登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { HaoziForm } from '@/components/advancedComponents'
import { useFormData } from '@/hooks/formData'
import type { FormProps } from 'element-plus'
import { AuthControllerLogin } from '@/api/auth/api'
import { useRouter } from 'vue-router'
import { useAppStorage } from '@/utils/storage'

const vantaRef = ref<HTMLElement | null>(null)
let vantaEffect: any = null

const formProp = ref<Partial<FormProps>>({
  labelPosition: 'top',
})

const { formData } = useFormData({
  username: '王浩林',
  password: '566363',
})

const formConfig = ref<IFormConfig[]>([
  {
    label: '用户名',
    prop: 'username',
    type: 'text',
    placeholder: '请输入用户名',
    widgetProps: {
      size: 'large',
    },
  },
  {
    label: '密码',
    prop: 'password',
    type: 'text',
    placeholder: '请输入密码',
    widgetProps: {
      type: 'password',
      size: 'large',
    },
  },
])

const router = useRouter()
const { state: accessToken } = useAppStorage('access_token')
const { state: userInfo } = useAppStorage('user_info')
async function handleLogin() {
  const res = await AuthControllerLogin(formData.value)
  if (res) {
    accessToken.value = res.accessToken
    userInfo.value = res.user
    router.push('/')
  }
}

const isRememberPassword = ref(false)

onMounted(() => {
  if (vantaRef.value) {
    vantaEffect = window.VANTA.DOTS({
      el: vantaRef.value,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,

      // Dots 专属参数
      color: 0x999999, // 点颜色
      color2: 0x16a085, // 线颜色
      backgroundColor: 0xeeeeee, // 背景色
      spacing: 25.0, // 点距
      showLines: false,
    })
  }
})

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy()
})
</script>

<style scope lang="scss">
.form {
  position: relative;
  width: 420px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  /* 背景磨砂效果 */
  backdrop-filter: blur(2px);
  padding: 30px;
  display: flex;
  flex-direction: column;

  .title {
    text-align: center;
    color: #333;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 40px;
  }

  .login-btn {
    margin-top: 20px;
  }
}
</style>
