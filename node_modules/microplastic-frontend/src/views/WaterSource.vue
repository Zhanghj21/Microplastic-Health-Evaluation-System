<template>
  <div class="survey-page">
    <div class="page-header">
      <span class="page-number">1️⃣</span>
      <h2>环境水源</h2>
    </div>
    
    <div class="info-card">
      <h3>提示内容</h3>
      <p>请输入日常摄入的三种类型水源的摄入量，单位分别为立方米（m³）或升（L）：</p>
      <div class="info-list">
        <div class="info-item">
          <span class="dot"></span>
          <p><strong>标准水源水</strong>（如纯净水、净化水）：每立方米含 <strong>2,200</strong> 个微塑料</p>
        </div>
        <div class="info-item">
          <span class="dot"></span>
          <p><strong>未经处理的水</strong>（如山泉水、井水）：每升平均含 <strong>3,307.5</strong> 个微塑料</p>
        </div>
        <div class="info-item">
          <span class="dot"></span>
          <p><strong>处理后的水</strong>（如市政自来水）：每升平均含 <strong>465.5</strong> 个微塑料</p>
        </div>
      </div>
    </div>

    <div class="input-section">
      <div class="input-group">
        <label>标准水源水</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="waterData.purified"
            placeholder="如纯净水、净化水"
            @input="validateInput('purified')"
          />
          <span class="unit">m³</span>
        </div>
        <span class="error-message" v-if="errors.purified">{{ errors.purified }}</span>
      </div>

      <div class="input-group">
        <label>未经处理的水</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="waterData.untreated"
            placeholder="如山泉水、井水"
            @input="validateInput('untreated')"
          />
          <span class="unit">L</span>
        </div>
        <span class="error-message" v-if="errors.untreated">{{ errors.untreated }}</span>
      </div>

      <div class="input-group">
        <label>处理后的水</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="waterData.treated"
            placeholder="如市政自来水"
            @input="validateInput('treated')"
          />
          <span class="unit">L</span>
        </div>
        <span class="error-message" v-if="errors.treated">{{ errors.treated }}</span>
      </div>
    </div>

    <div class="navigation-buttons">
      <button class="next-button" @click="nextPage">下一页</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'

export default {
  name: 'WaterSource',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const waterData = reactive({
      purified: store.state.waterData.purified,
      untreated: store.state.waterData.untreated,
      treated: store.state.waterData.treated
    })

    const errors = reactive({
      purified: '',
      untreated: '',
      treated: ''
    })

    const validateInput = (field) => {
      const value = waterData[field]
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
      // 保存数据到 store
      store.commit('updateWaterData', waterData)
      // 跳转到下一页
      router.push('/food')
    }

    return {
      waterData,
      errors,
      validateInput,
      nextPage
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

.next-button {
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  min-width: 120px;
  background: var(--tiffany-blue);
  color: white;
}

.next-button:hover {
  background: var(--tiffany-dark);
  transform: translateY(-2px);
}

.input-section {
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.input-group {
  margin-bottom: 20px;
}

.input-group:last-child {
  margin-bottom: 0;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  width: 100%;
  padding: 12px 45px 12px 15px;
  border: 2px solid var(--tiffany-light);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: var(--tiffany-blue);
  box-shadow: 0 0 0 3px rgba(129, 216, 208, 0.2);
}

.unit {
  position: absolute;
  right: 15px;
  color: var(--text-secondary);
}

.error-message {
  color: var(--error-color);
  font-size: 0.9rem;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .survey-page {
    padding: 15px;
  }

  .page-header {
    margin-bottom: 20px;
  }

  .page-number {
    font-size: 1.8rem;
  }

  .input-section {
    padding: 20px;
  }

  .next-button {
    width: 100%;
  }
}
</style> 