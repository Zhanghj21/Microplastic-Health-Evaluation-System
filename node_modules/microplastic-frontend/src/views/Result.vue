<template>
  <div class="survey-page">
    <div class="page-header">
      <h2>微塑料摄入分析报告</h2>
    </div>

    <div class="result-content">
      <div class="result-section">
        <h3>总体评估</h3>
        <p class="result-summary">🎉 根据分析，以下是您的微塑料摄入情况：</p>
      </div>

      <!-- ECharts图表容器 -->
      <div id="microplasticsChart" class="chart-container"></div>

      <div class="category-results">
        <div class="category-item" v-for="(amount, category) in totalPlastics" :key="category">
          <h4>{{ getCategoryName(category) }}</h4>
          <p class="amount">{{ amount.toLocaleString() }} 个</p>
        </div>
      </div>

      <div class="total-result">
        <h3>总微塑料摄入量</h3>
        <p class="total-amount">{{ totalPlastics.total.toLocaleString() }} 个</p>
      </div>

      <div class="analysis-section">
        <h3>摄入分析</h3>
        <p>{{ analysisText }}</p>
      </div>

      <div class="result-tips">
        <h3>健康建议</h3>
        <ul>
          <li>建议增加使用过滤水，减少未处理水源的使用</li>
          <li>尽量减少使用一次性塑料制品</li>
          <li>选择天然材质的衣物和家居用品</li>
          <li>保持良好的室内通风</li>
          <li>减少外卖使用频率，选择环保餐具</li>
          <li>选择使用玻璃或不锈钢容器储存食物</li>
        </ul>
      </div>
    </div>

    <div class="navigation-buttons">
      <button class="prev-button" @click="previousPage">返回修改</button>
      <button class="restart-button" @click="restart">重新开始</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

export default {
  name: 'Result',
  setup() {
    const store = useStore()
    const router = useRouter()
    let chart = null

    const totalPlastics = computed(() => store.getters.totalPlastics)

    const categoryNames = {
      water: '环境水源',
      food: '食品',
      air: '空气吸入',
      clothing: '衣物与纺织品',
      livingArea: '生活区域',
      diet: '饮食习惯',
      total: '总计'
    }

    const getCategoryName = (category) => categoryNames[category] || category

    const analysisText = computed(() => {
      const sources = [
        { name: '环境水源', value: totalPlastics.value.water },
        { name: '食品', value: totalPlastics.value.food },
        { name: '空气吸入', value: totalPlastics.value.air },
        { name: '衣物与纺织品', value: totalPlastics.value.clothing },
        { name: '生活区域', value: totalPlastics.value.livingArea },
        { name: '饮食习惯', value: totalPlastics.value.diet }
      ].sort((a, b) => b.value - a.value)

      const top3 = sources.slice(0, 3)
      const total = totalPlastics.value.total

      return `根据分析，您的主要微塑料摄入来源为${top3.map(s => s.name).join('、')}。其中，${top3[0].name}占总摄入量的${Math.round(top3[0].value/total*100)}%，是最主要的来源。建议您重点关注这些方面，采取相应的防护措施。`
    })

    const initChart = () => {
      const chartDom = document.getElementById('microplasticsChart')
      if (!chartDom) return

      chart = echarts.init(chartDom)
      
      const sources = [
        { name: '环境水源', value: totalPlastics.value.water },
        { name: '食品', value: totalPlastics.value.food },
        { name: '空气吸入', value: totalPlastics.value.air },
        { name: '衣物与纺织品', value: totalPlastics.value.clothing },
        { name: '生活区域', value: totalPlastics.value.livingArea },
        { name: '饮食习惯', value: totalPlastics.value.diet }
      ].sort((a, b) => b.value - a.value)

      const top3 = sources.slice(0, 3)
      const others = sources.slice(3)
      const othersSum = others.reduce((sum, item) => sum + item.value, 0)

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          padding: 5,
          itemGap: 10,
          textStyle: {
            color: '#2C3E50'
          }
        },
        series: [
          {
            name: '微塑料摄入来源',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['60%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              formatter: '{b}\n{d}%'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            data: [
              ...top3,
              { name: '其他来源', value: othersSum }
            ]
          }
        ],
        color: ['#81D8D0', '#66ABA4', '#A7E8E2', '#D3F3F1']
      }

      chart.setOption(option)
    }

    onMounted(() => {
      initChart()
      window.addEventListener('resize', () => chart?.resize())
    })

    onUnmounted(() => {
      chart?.dispose()
      window.removeEventListener('resize', () => chart?.resize())
    })

    const previousPage = () => {
      router.push('/diet')
    }

    const restart = () => {
      store.commit('resetAllData')
      router.push('/water-source')
    }

    return {
      totalPlastics,
      getCategoryName,
      analysisText,
      previousPage,
      restart
    }
  }
}
</script>

<style scoped>
.survey-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.result-content {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.chart-container {
  width: 100%;
  height: 400px;
  margin: 20px 0;
}

.category-results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.category-item {
  background: rgba(129, 216, 208, 0.1);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.category-item h4 {
  color: var(--tiffany-dark);
  margin-bottom: 10px;
}

.amount {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
}

.total-result {
  text-align: center;
  margin: 30px 0;
  padding: 20px;
  background: var(--tiffany-dark);
  color: white;
  border-radius: 10px;
}

.total-amount {
  font-size: 2rem;
  font-weight: 600;
  margin-top: 10px;
}

.analysis-section {
  background: rgba(129, 216, 208, 0.1);
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
}

.result-tips {
  margin-top: 30px;
}

.result-tips ul {
  list-style-type: none;
  padding: 0;
  margin-top: 15px;
}

.result-tips li {
  padding: 10px 0;
  padding-left: 25px;
  position: relative;
}

.result-tips li::before {
  content: "•";
  color: var(--tiffany-blue);
  font-size: 1.5em;
  position: absolute;
  left: 0;
  top: 5px;
}

.navigation-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
  padding-bottom: 40px;
}

.prev-button,
.restart-button {
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  min-width: 120px;
}

.restart-button {
  background: var(--tiffany-blue);
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  font-size: var(--font-size-lg);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
}

.restart-button:hover {
  background: var(--tiffany-dark);
  transform: translateY(-2px);
}

.prev-button {
  background: white;
  border: 2px solid var(--tiffany-blue);
  color: var(--tiffany-blue);
}

@media (max-width: 768px) {
  .chart-container {
    height: 300px;
  }

  .category-results {
    grid-template-columns: 1fr;
  }

  .amount {
    font-size: 1.2rem;
  }

  .total-amount {
    font-size: 1.6rem;
  }
}
</style> 