<template>
  <div class="survey-page">
    <div class="page-header">
      <span class="page-number">4️⃣</span>
      <h2>日用品释放</h2>
    </div>
    
    <div class="info-card">
      <h3>提示内容</h3>
      <p>请输入以下使用频次：</p>
      <div class="info-list">
        <div class="info-item">
          <span class="dot"></span>
          <p><strong>塑料茶包饮用杯数</strong>：每杯释放 <strong>2,000</strong> 个微塑料</p>
        </div>
        <div class="info-item">
          <span class="dot"></span>
          <p><strong>塑料餐具使用次数</strong>：每次平均释放 <strong>125</strong> 个微塑料</p>
        </div>
      </div>
    </div>

    <div class="input-section">
      <div class="input-group">
        <label>塑料茶包饮用杯数</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="dailyItemsData.teaBags"
            placeholder="输入杯数"
            @input="validateInput('teaBags')"
          />
          <span class="unit">杯</span>
        </div>
        <span class="error-message" v-if="errors.teaBags">{{ errors.teaBags }}</span>
      </div>

      <div class="input-group">
        <label>塑料餐具使用次数</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="dailyItemsData.plasticUtensils"
            placeholder="输入次数"
            @input="validateInput('plasticUtensils')"
          />
          <span class="unit">次</span>
        </div>
        <span class="error-message" v-if="errors.plasticUtensils">{{ errors.plasticUtensils }}</span>
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
  name: 'DailyItems',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const dailyItemsData = reactive({
      teaBags: store.state.dailyItemsData.teaBags,
      plasticUtensils: store.state.dailyItemsData.plasticUtensils
    })

    const errors = reactive({
      teaBags: '',
      plasticUtensils: ''
    })

    const validateInput = (field) => {
      const value = dailyItemsData[field]
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
      store.commit('updateDailyItemsData', dailyItemsData)
      router.push('/clothing')
    }

    const previousPage = () => {
      store.commit('updateDailyItemsData', dailyItemsData)
      router.push('/air')
    }

    return {
      dailyItemsData,
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