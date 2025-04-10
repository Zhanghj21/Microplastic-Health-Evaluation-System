<template>
  <div class="survey-page">
    <div class="page-header">
      <span class="page-number">2️⃣</span>
      <h2>食品摄入</h2>
    </div>
    
    <div class="info-card">
      <h3>提示内容</h3>
      <p>请输入您每月摄入以下食品的数量：</p>
      <div class="info-list">
        <div class="info-item">
          <span class="dot"></span>
          <p>牛奶：每升含 <strong>40</strong> 个微塑料</p>
        </div>
        <div class="info-item">
          <span class="dot"></span>
          <p>外卖：每份含 <strong>68,000</strong> 个微塑料</p>
        </div>
        <!-- 其他食品项 -->
      </div>
    </div>

    <div class="input-section">
      <div class="input-group">
        <label>牛奶（升/月）</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="foodData.milk"
            placeholder="每月饮用牛奶量"
            @input="validateInput('milk')"
          />
          <span class="unit">L</span>
        </div>
        <span class="error-message" v-if="errors.milk">{{ errors.milk }}</span>
      </div>

      <div class="input-group">
        <label>外卖（份/月）</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="foodData.takeaway"
            placeholder="每月外卖份数"
            @input="validateInput('takeaway')"
          />
          <span class="unit">份</span>
        </div>
        <span class="error-message" v-if="errors.takeaway">{{ errors.takeaway }}</span>
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
  name: 'Food',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const foodData = reactive({
      milk: store.state.foodData.milk,
      takeaway: store.state.foodData.takeaway
    })

    const errors = reactive({
      milk: '',
      takeaway: ''
    })

    const validateInput = (field) => {
      const value = foodData[field]
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
      store.commit('updateFoodData', foodData)
      router.push('/air')
    }

    const previousPage = () => {
      store.commit('updateFoodData', foodData)
      router.push('/water-source')
    }

    return {
      foodData,
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