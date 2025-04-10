<template>
  <div class="survey-page">
    <div class="page-header">
      <span class="page-number">5️⃣</span>
      <h2>衣物与纺织品</h2>
    </div>
    
    <div class="info-card">
      <h3>提示内容</h3>
      <p>请输入您的衣物和家居纺织品使用情况：</p>
      <div class="info-list">
        <div class="info-item">
          <span class="dot"></span>
          <p>聚酯纤维衣物：每件每天释放 <strong>2,250</strong> 个微塑料</p>
        </div>
        <div class="info-item">
          <span class="dot"></span>
          <p>棉质衣物：每件每天释放 <strong>400</strong> 个微塑料</p>
        </div>
        <div class="info-item">
          <span class="dot"></span>
          <p>地毯：每平方米每天释放 <strong>12.5</strong> 个微塑料</p>
        </div>
      </div>
    </div>

    <div class="input-section">
      <div class="input-group">
        <label>聚酯纤维衣物（件）</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="clothingData.polyester"
            placeholder="聚酯纤维衣物数量"
            @input="validateInput('polyester')"
          />
          <span class="unit">件</span>
        </div>
        <span class="error-message" v-if="errors.polyester">{{ errors.polyester }}</span>
      </div>

      <div class="input-group">
        <label>棉质衣物（件）</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="clothingData.cotton"
            placeholder="棉质衣物数量"
            @input="validateInput('cotton')"
          />
          <span class="unit">件</span>
        </div>
        <span class="error-message" v-if="errors.cotton">{{ errors.cotton }}</span>
      </div>

      <div class="input-group">
        <label>地毯面积（平方米）</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="clothingData.carpetArea"
            placeholder="家中地毯总面积"
            @input="validateInput('carpetArea')"
          />
          <span class="unit">m²</span>
        </div>
        <span class="error-message" v-if="errors.carpetArea">{{ errors.carpetArea }}</span>
      </div>

      <div class="input-group">
        <label>地毯使用天数（天/月）</label>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="clothingData.carpetDays"
            placeholder="每月使用天数"
            @input="validateInput('carpetDays')"
          />
          <span class="unit">天</span>
        </div>
        <span class="error-message" v-if="errors.carpetDays">{{ errors.carpetDays }}</span>
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
  name: 'Clothing',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const clothingData = reactive({
      polyester: store.state.clothingData.polyester,
      cotton: store.state.clothingData.cotton,
      carpetArea: store.state.clothingData.carpetArea,
      carpetDays: store.state.clothingData.carpetDays
    })

    const errors = reactive({
      polyester: '',
      cotton: '',
      carpetArea: '',
      carpetDays: ''
    })

    const validateInput = (field) => {
      const value = clothingData[field]
      if (value === '') {
        errors[field] = ''
        return
      }
      
      const num = parseFloat(value)
      if (isNaN(num) || num < 0) {
        errors[field] = '请输入大于等于0的数字'
        return
      }
      
      if (field === 'carpetDays' && num > 31) {
        errors[field] = '每月最多31天'
        return
      }
      
      errors[field] = ''
    }

    const nextPage = () => {
      store.commit('updateClothingData', clothingData)
      router.push('/living-area')
    }

    const previousPage = () => {
      store.commit('updateClothingData', clothingData)
      router.push('/daily-items')
    }

    return {
      clothingData,
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