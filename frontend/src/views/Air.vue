<template>
  <div class="survey-page">
    <div class="page-header">
      <span class="page-number">3️⃣</span>
      <h2>空气吸入</h2>
    </div>
    
    <div class="info-card">
      <h3>提示内容</h3>
      <p>请输入您的体重，我们将根据体重计算您的呼吸量：</p>
      <div class="info-list">
        <div class="info-item">
          <span class="dot"></span>
          <p>每千克体重每天呼吸量约为 <strong>12.5</strong> 升</p>
        </div>
        <div class="info-item">
          <span class="dot"></span>
          <p>每升空气中含有 <strong>393</strong> 个微塑料</p>
        </div>
      </div>
    </div>

    <div class="input-section">
      <div class="input-group">
        <label>体重（千克）</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="airData.weight"
            placeholder="请输入您的体重"
            @input="validateInput('weight')"
          />
          <span class="unit">kg</span>
        </div>
        <span class="error-message" v-if="errors.weight">{{ errors.weight }}</span>
      </div>
    </div>

    <div class="navigation-buttons">
      <button class="prev-button" @click="previousPage">上一页</button>
      <button class="next-button" @click="nextPage">下一页</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

export default {
  name: 'Air',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const airData = reactive({
      weight: store.state.airData.weight
    })

    const errors = reactive({
      weight: ''
    })

    const validateInput = (field) => {
      const value = airData[field]
      if (value === '') {
        errors[field] = ''
        return
      }
      
      const num = parseFloat(value)
      if (isNaN(num) || num < 0) {
        errors[field] = '请输入大于等于0的数字'
        return
      }
      
      errors[field] = ''
    }

    const nextPage = () => {
      store.commit('updateAirData', airData)
      router.push('/daily-items')
    }

    const previousPage = () => {
      store.commit('updateAirData', airData)
      router.push('/food')
    }

    return {
      airData,
      errors,
      validateInput,
      nextPage,
      previousPage
    }
  }
}
</script>

<style scoped>
.survey-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-number {
  font-size: 2.2rem;
  color: var(--tiffany-dark);
  margin-right: 15px;
}

.navigation-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
}

.prev-button,
.next-button {
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  min-width: 120px;
}

.next-button {
  background: var(--tiffany-blue);
  color: white;
}

.prev-button {
  background: white;
  border: 2px solid var(--tiffany-blue);
  color: var(--tiffany-blue);
}
</style> 