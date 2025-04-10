<template>
  <div class="survey-page">
    <div class="page-header">
      <span class="page-number">6️⃣</span>
      <h2>生活区域</h2>
    </div>
    
    <div class="info-card">
      <h3>提示内容</h3>
      <p>请选择您的主要生活区域类型：</p>
      <div class="info-list">
        <div class="info-item">
          <span class="dot"></span>
          <p>城市区域：每升空气含 <strong>850</strong> 个微塑料</p>
        </div>
        <div class="info-item">
          <span class="dot"></span>
          <p>郊区：每升空气含 <strong>400</strong> 个微塑料</p>
        </div>
        <div class="info-item">
          <span class="dot"></span>
          <p>沿海地区：每升空气含 <strong>550</strong> 个微塑料</p>
        </div>
      </div>
    </div>

    <div class="input-section">
      <div class="input-group">
        <label>生活区域类型</label>
        <div class="radio-group">
          <label class="radio-label">
            <input 
              type="radio" 
              v-model="livingAreaData.areaType" 
              value="city"
            >
            城市区域
          </label>
          <label class="radio-label">
            <input 
              type="radio" 
              v-model="livingAreaData.areaType" 
              value="suburb"
            >
            郊区
          </label>
          <label class="radio-label">
            <input 
              type="radio" 
              v-model="livingAreaData.areaType" 
              value="coastal"
            >
            沿海地区
          </label>
        </div>
      </div>

      <div class="input-group">
        <label>每日呼吸量（升）</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="livingAreaData.breathingVolume"
            placeholder="每日呼吸量"
            @input="validateInput('breathingVolume')"
          />
          <span class="unit">L</span>
        </div>
        <span class="error-message" v-if="errors.breathingVolume">{{ errors.breathingVolume }}</span>
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
  name: 'LivingArea',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const livingAreaData = reactive({
      areaType: store.state.livingAreaData.areaType,
      breathingVolume: store.state.livingAreaData.breathingVolume
    })

    const errors = reactive({
      breathingVolume: ''
    })

    const validateInput = (field) => {
      const value = livingAreaData[field]
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
      store.commit('updateLivingAreaData', livingAreaData)
      router.push('/diet')
    }

    const previousPage = () => {
      store.commit('updateLivingAreaData', livingAreaData)
      router.push('/clothing')
    }

    return {
      livingAreaData,
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

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.radio-label:hover {
  background-color: rgba(129, 216, 208, 0.1);
}

.radio-label input[type="radio"] {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
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