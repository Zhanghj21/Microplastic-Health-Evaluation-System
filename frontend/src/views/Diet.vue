<template>
  <div class="survey-page">
    <div class="page-header">
      <span class="page-number">7️⃣</span>
      <h2>饮食习惯</h2>
    </div>
    
    <div class="info-card">
      <h3>提示内容</h3>
      <p>请输入您的饮食习惯相关信息：</p>
      <div class="info-list">
        <div class="info-item">
          <span class="dot"></span>
          <p>海鲜：每克含 <strong>0.8</strong> 个微塑料</p>
        </div>
        <div class="info-item">
          <span class="dot"></span>
          <p>啤酒：每升含 <strong>21</strong> 个微塑料</p>
        </div>
        <div class="info-item">
          <span class="dot"></span>
          <p>自来水：每升含 <strong>27.5</strong> 个微塑料</p>
        </div>
      </div>
    </div>

    <div class="input-section">
      <div class="input-group">
        <label>海鲜（克/月）</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="dietData.seafood"
            placeholder="每月食用海鲜量"
            @input="validateInput('seafood')"
          />
          <span class="unit">g</span>
        </div>
        <span class="error-message" v-if="errors.seafood">{{ errors.seafood }}</span>
      </div>

      <div class="input-group">
        <label>啤酒（升/月）</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="dietData.beer"
            placeholder="每月饮用啤酒量"
            @input="validateInput('beer')"
          />
          <span class="unit">L</span>
        </div>
        <span class="error-message" v-if="errors.beer">{{ errors.beer }}</span>
      </div>

      <div class="input-group">
        <label>自来水（升/月）</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="dietData.tapWater"
            placeholder="每月饮用自来水量"
            @input="validateInput('tapWater')"
          />
          <span class="unit">L</span>
        </div>
        <span class="error-message" v-if="errors.tapWater">{{ errors.tapWater }}</span>
      </div>
    </div>

    <div class="navigation-buttons">
      <button class="prev-button" @click="previousPage">上一页</button>
      <button class="analyze-button" @click="analyze">分析结果</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

export default {
  name: 'Diet',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const dietData = reactive({
      seafood: store.state.dietData.seafood,
      beer: store.state.dietData.beer,
      tapWater: store.state.dietData.tapWater
    })

    const errors = reactive({
      seafood: '',
      beer: '',
      tapWater: ''
    })

    const validateInput = (field) => {
      const value = dietData[field]
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

    const analyze = () => {
      store.commit('updateDietData', dietData)
      router.push('/result')
    }

    const previousPage = () => {
      store.commit('updateDietData', dietData)
      router.push('/living-area')
    }

    return {
      dietData,
      errors,
      validateInput,
      analyze,
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
.analyze-button {
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  min-width: 120px;
}

.analyze-button {
  background: var(--tiffany-blue);
  color: white;
}

.prev-button {
  background: white;
  border: 2px solid var(--tiffany-blue);
  color: var(--tiffany-blue);
}
</style> 
 