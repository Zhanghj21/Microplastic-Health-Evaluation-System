<template>
  <div class="survey-container">
    <!-- 导航进度条 -->
    <div class="progress-bar">
      <div class="progress" :style="{ width: (currentPage / 7 * 100) + '%' }"></div>
      <div class="page-indicator">{{ currentPage }}/7</div>
    </div>

    <!-- 第一页：环境水源 -->
    <div v-if="currentPage === 1" class="survey-page">
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
              @input="validateInput('waterData', 'purified')"
            />
            <span class="unit">m³</span>
          </div>
          <span class="error-message" v-if="errors.waterData.purified">{{ errors.waterData.purified }}</span>
        </div>

        <div class="input-group">
          <label>未经处理的水</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="waterData.untreated"
              placeholder="如山泉水、井水"
              @input="validateInput('waterData', 'untreated')"
            />
            <span class="unit">L</span>
          </div>
          <span class="error-message" v-if="errors.waterData.untreated">{{ errors.waterData.untreated }}</span>
        </div>

        <div class="input-group">
          <label>处理后的水</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="waterData.treated"
              placeholder="如市政自来水"
              @input="validateInput('waterData', 'treated')"
            />
            <span class="unit">L</span>
          </div>
          <span class="error-message" v-if="errors.waterData.treated">{{ errors.waterData.treated }}</span>
        </div>
      </div>

      <div class="navigation-buttons">
        <button class="next-button" @click="nextPage" :disabled="!isPageValid">下一页</button>
      </div>
    </div>

    <!-- 第二页：食品 -->
    <div v-if="currentPage === 2" class="survey-page">
      <div class="page-header">
        <span class="page-number">2️⃣</span>
        <h2>食品</h2>
      </div>

      <div class="info-card">
        <h3>提示内容</h3>
        <p>请输入日常摄入以下食品的量，单位包括升（L）、千克（kg）或克（g）：</p>
        <div class="info-list">
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>牛奶/软饮料</strong>：每升含 <strong>40</strong> 个微塑料</p>
          </div>
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>外卖容器内食物</strong>：每升平均含 <strong>68,000</strong> 个微塑料</p>
          </div>
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>蜂蜜</strong>：每千克含 <strong>166</strong> 个微塑料</p>
          </div>
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>糖</strong>：每千克含 <strong>217</strong> 个微塑料</p>
          </div>
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>食盐（海盐）</strong>：每千克平均含 <strong>615.5</strong> 个微塑料</p>
          </div>
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>生米</strong>：每100克含 <strong>712</strong> 个微塑料</p>
          </div>
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>速熟米（即食类）</strong>：每100克含 <strong>2,560</strong> 个微塑料</p>
          </div>
        </div>
      </div>

      <div class="input-section">
        <div class="input-group">
          <label>牛奶/软饮料</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="foodData.milk"
              placeholder="输入数量"
              @input="validateInput('foodData', 'milk')"
            />
            <span class="unit">L</span>
          </div>
        </div>

        <div class="input-group">
          <label>外卖容器内食物</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="foodData.takeaway"
              placeholder="输入数量"
              @input="validateInput('foodData', 'takeaway')"
            />
            <span class="unit">L</span>
          </div>
        </div>

        <div class="input-group">
          <label>蜂蜜</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="foodData.honey"
              placeholder="输入数量"
              @input="validateInput('foodData', 'honey')"
            />
            <span class="unit">kg</span>
          </div>
        </div>

        <div class="input-group">
          <label>糖</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="foodData.sugar"
              placeholder="输入数量"
              @input="validateInput('foodData', 'sugar')"
            />
            <span class="unit">kg</span>
          </div>
        </div>

        <div class="input-group">
          <label>食盐（海盐）</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="foodData.salt"
              placeholder="输入数量"
              @input="validateInput('foodData', 'salt')"
            />
            <span class="unit">kg</span>
          </div>
        </div>

        <div class="input-group">
          <label>生米</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="foodData.rice"
              placeholder="输入数量"
              @input="validateInput('foodData', 'rice')"
            />
            <span class="unit">g</span>
          </div>
        </div>

        <div class="input-group">
          <label>速熟米</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="foodData.instantRice"
              placeholder="输入数量"
              @input="validateInput('foodData', 'instantRice')"
            />
            <span class="unit">g</span>
          </div>
        </div>
      </div>

      <div class="navigation-buttons">
        <button class="prev-button" @click="previousPage">上一页</button>
        <button class="next-button" @click="nextPage" :disabled="!isPageValid">下一页</button>
      </div>
    </div>

    <!-- 第三页：空气吸入 -->
    <div v-if="currentPage === 3" class="survey-page">
      <div class="page-header">
        <span class="page-number">3️⃣</span>
        <h2>暴露途径（空气吸入）</h2>
      </div>

      <div class="info-card">
        <h3>提示内容</h3>
        <p>请输入你的体重（kg）。系统将根据体重计算每日呼吸量。</p>
        <div class="calculation-info">
          <p>计算方式：</p>
          <p>呼吸量（m³）= 体重 × (10~15) ÷ 1000</p>
          <p>总摄入量 = 呼吸量（m³）× <strong>393</strong></p>
        </div>
      </div>

      <div class="input-section">
        <div class="input-group">
          <label>体重</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="airData.weight"
              placeholder="输入体重"
              @input="validateInput('airData', 'weight')"
            />
            <span class="unit">kg</span>
          </div>
          <span class="error-message" v-if="errors.airData.weight">{{ errors.airData.weight }}</span>
        </div>
      </div>

      <div class="navigation-buttons">
        <button class="prev-button" @click="previousPage">上一页</button>
        <button class="next-button" @click="nextPage" :disabled="!isPageValid">下一页</button>
      </div>
    </div>

    <!-- 第四页：衣物与纺织品 -->
    <div v-if="currentPage === 4" class="survey-page">
      <div class="page-header">
        <span class="page-number">4️⃣</span>
        <h2>衣物与纺织品释放</h2>
      </div>

      <div class="info-card">
        <h3>提示内容</h3>
        <p>请输入以下数据：</p>
        <div class="info-list">
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>涤纶衣物</strong>：每次洗涤释放 <strong>2,250</strong> 个微塑料</p>
          </div>
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>棉质衣物</strong>：每次洗涤释放约 <strong>400</strong> 个微塑料</p>
          </div>
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>合成地毯</strong>：每平米每天平均释放 <strong>12.5</strong> 个微塑料</p>
          </div>
        </div>
      </div>

      <div class="input-section">
        <div class="input-group">
          <label>涤纶衣物洗涤次数</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="clothingData.polyester"
              placeholder="输入洗涤次数"
              @input="validateInput('clothingData', 'polyester')"
            />
            <span class="unit">次</span>
          </div>
        </div>

        <div class="input-group">
          <label>棉质衣物洗涤次数</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="clothingData.cotton"
              placeholder="输入洗涤次数"
              @input="validateInput('clothingData', 'cotton')"
            />
            <span class="unit">次</span>
          </div>
        </div>

        <div class="input-group">
          <label>合成地毯面积</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="clothingData.carpetArea"
              placeholder="输入面积"
              @input="validateInput('clothingData', 'carpetArea')"
            />
            <span class="unit">m²</span>
          </div>
        </div>

        <div class="input-group">
          <label>地毯踩踏天数</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="clothingData.carpetDays"
              placeholder="输入天数"
              @input="validateInput('clothingData', 'carpetDays')"
            />
            <span class="unit">天</span>
          </div>
        </div>
      </div>

      <div class="navigation-buttons">
        <button class="prev-button" @click="previousPage">上一页</button>
        <button class="next-button" @click="nextPage" :disabled="!isPageValid">下一页</button>
      </div>
    </div>

    <!-- 第五页：生活区域 -->
    <div v-if="currentPage === 5" class="survey-page">
      <div class="page-header">
        <span class="page-number">5️⃣</span>
        <h2>生活区域污染水平</h2>
      </div>

      <div class="info-card">
        <h3>提示内容</h3>
        <p>请选择居住区域类型，并输入每日呼吸量（m³）：</p>
        <div class="info-list">
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>城市中心</strong>：空气中微塑料平均浓度为 <strong>850</strong> 个/m³</p>
          </div>
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>郊区</strong>：浓度为 <strong>400</strong> 个/m³</p>
          </div>
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>沿海地区</strong>：浓度为 <strong>550</strong> 个/m³</p>
          </div>
        </div>
      </div>

      <div class="input-section">
        <div class="area-selector">
          <button 
            v-for="(label, type) in { city: '城市中心', suburb: '郊区', coastal: '沿海地区' }"
            :key="type"
            :class="{ active: livingAreaData.areaType === type }"
            @click="livingAreaData.areaType = type"
            class="option-button">
            {{ label }}
          </button>
        </div>

        <div class="input-group">
          <label>每日呼吸量</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="livingAreaData.breathingVolume"
              placeholder="输入呼吸量"
              @input="validateInput('livingAreaData', 'breathingVolume')"
            />
            <span class="unit">m³</span>
          </div>
        </div>
      </div>

      <div class="navigation-buttons">
        <button class="prev-button" @click="previousPage">上一页</button>
        <button class="next-button" @click="nextPage" :disabled="!isPageValid">下一页</button>
      </div>
    </div>

    <!-- 第六页：饮食习惯 -->
    <div v-if="currentPage === 6" class="survey-page">
      <div class="page-header">
        <span class="page-number">6️⃣</span>
        <h2>饮食习惯补充</h2>
      </div>

      <div class="info-card">
        <h3>提示内容</h3>
        <p>请输入下列食品或饮品的摄入量：</p>
        <div class="info-list">
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>海鲜</strong>：每克含 <strong>0.8</strong> 个微塑料</p>
          </div>
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>啤酒</strong>：每升平均含 <strong>21</strong> 个微塑料</p>
          </div>
          <div class="info-item">
            <span class="dot"></span>
            <p><strong>自来水</strong>：每升平均含 <strong>27.5</strong> 个微塑料</p>
          </div>
        </div>
      </div>

      <div class="input-section">
        <div class="input-group">
          <label>海鲜摄入量</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="dietData.seafood"
              placeholder="输入克数"
              @input="validateInput('dietData', 'seafood')"
            />
            <span class="unit">g</span>
          </div>
        </div>

        <div class="input-group">
          <label>啤酒摄入量</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="dietData.beer"
              placeholder="输入升数"
              @input="validateInput('dietData', 'beer')"
            />
            <span class="unit">L</span>
          </div>
        </div>

        <div class="input-group">
          <label>自来水摄入量</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="dietData.tapWater"
              placeholder="输入升数"
              @input="validateInput('dietData', 'tapWater')"
            />
            <span class="unit">L</span>
          </div>
        </div>
      </div>

      <div class="navigation-buttons">
        <button class="prev-button" @click="previousPage">上一页</button>
        <button class="analyze-button" @click="showResults">查看分析结果</button>
      </div>
    </div>

    <!-- 第七页：日用品释放 -->
    <div v-if="currentPage === 7" class="survey-page">
      <div class="page-header">
        <span class="page-number">7️⃣</span>
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
              @input="validateInput('dailyItemsData', 'teaBags')"
            />
            <span class="unit">杯</span>
          </div>
        </div>

        <div class="input-group">
          <label>塑料餐具使用次数</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="dailyItemsData.plasticUtensils"
              placeholder="输入次数"
              @input="validateInput('dailyItemsData', 'plasticUtensils')"
            />
            <span class="unit">次</span>
          </div>
        </div>
      </div>

      <div class="navigation-buttons">
        <button class="prev-button" @click="previousPage">上一页</button>
        <button class="analyze-button" @click="showResults">查看分析结果</button>
      </div>
    </div>

    <!-- 结果页 -->
    <div v-if="currentPage === 8" class="survey-page">
      <div class="page-header">
        <h2>微塑料摄入分析报告</h2>
      </div>

      <div class="result-content">
        <div class="result-section">
          <h3>总体评估</h3>
          <p class="result-summary">🎉 根据分析，以下是您的微塑料摄入情况：</p>
        </div>

        <!-- 添加ECharts图表容器 -->
        <div id="microplasticsChart" class="chart-container"></div>

        <div class="category-results">
          <div class="category-item">
            <h4>1️⃣ 环境水源</h4>
            <p class="amount">{{ totalPlastics.water.toLocaleString() }} 个</p>
          </div>
          <div class="category-item">
            <h4>2️⃣ 食品</h4>
            <p class="amount">{{ totalPlastics.food.toLocaleString() }} 个</p>
          </div>
          <div class="category-item">
            <h4>3️⃣ 空气吸入</h4>
            <p class="amount">{{ totalPlastics.air.toLocaleString() }} 个</p>
          </div>
          <div class="category-item">
            <h4>4️⃣ 衣物与纺织品</h4>
            <p class="amount">{{ totalPlastics.clothing.toLocaleString() }} 个</p>
          </div>
          <div class="category-item">
            <h4>5️⃣ 生活区域</h4>
            <p class="amount">{{ totalPlastics.livingArea.toLocaleString() }} 个</p>
          </div>
          <div class="category-item">
            <h4>6️⃣ 饮食习惯</h4>
            <p class="amount">{{ totalPlastics.diet.toLocaleString() }} 个</p>
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
          </ul>
        </div>
      </div>

      <div class="navigation-buttons">
        <button class="prev-button" @click="previousPage">返回修改</button>
        <button class="restart-button" @click="restart">重新测试</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Survey',
  data() {
    return {
      currentPage: 1,
      // 第一页：环境水源
      waterData: {
        purified: '',
        untreated: '',
        treated: ''
      },
      // 第二页：食品
      foodData: {
        milk: '',
        takeaway: '',
        honey: '',
        sugar: '',
        salt: '',
        rice: '',
        instantRice: ''
      },
      // 第三页：空气吸入
      airData: {
        weight: ''
      },
      // 第四页：衣物与纺织品
      clothingData: {
        polyester: '',
        cotton: '',
        carpetArea: '',
        carpetDays: ''
      },
      // 第五页：生活区域
      livingAreaData: {
        areaType: '', // 'city', 'suburb', 'coastal'
        breathingVolume: ''
      },
      // 第六页：饮食习惯
      dietData: {
        seafood: '',
        beer: '',
        tapWater: ''
      },
      // 第七页：日用品
      dailyItemsData: {
        teaBags: '',
        plasticUtensils: ''
      },
      // 错误信息
      errors: {
        waterData: {},
        foodData: {},
        airData: {},
        clothingData: {},
        livingAreaData: {},
        dietData: {},
        dailyItemsData: {}
      },
      // 计算系数
      rates: {
        water: {
          purified: 2200,
          untreated: 3307.5,
          treated: 465.5
        },
        food: {
          milk: 40,
          takeaway: 68000,
          honey: 166,
          sugar: 217,
          salt: 615.5,
          rice: 712,
          instantRice: 2560
        },
        air: 393,
        clothing: {
          polyester: 2250,
          cotton: 400,
          carpet: 12.5
        },
        area: {
          city: 850,
          suburb: 400,
          coastal: 550
        },
        diet: {
          seafood: 0.8,
          beer: 21,
          tapWater: 27.5
        },
        dailyItems: {
          teaBags: 2000,
          plasticUtensils: 125
        }
      },
      chart: null
    }
  },
  computed: {
    // 各页面验证
    isPageValid() {
      switch(this.currentPage) {
        case 1:
          return true;
        case 2:
          return true;
        case 3:
          return true;
        case 4:
          return true;
        case 5:
          return this.livingAreaData.areaType !== '';
        case 6:
          return true;
        case 7:
          return true;
        case 8:
          return true;
        default:
          return true;
      }
    },
    // 计算各类摄入量
    totalPlastics() {
      return {
        water: this.calculateWaterPlastics(),
        food: this.calculateFoodPlastics(),
        air: this.calculateAirPlastics(),
        clothing: this.calculateClothingPlastics(),
        livingArea: this.calculateLivingAreaPlastics(),
        diet: this.calculateDietPlastics(),
        dailyItems: this.calculateDailyItemsPlastics(),
        total: this.calculateTotalPlastics()
      }
    },
    analysisText() {
      const sources = [
        { name: '环境水源', value: this.totalPlastics.water },
        { name: '食品', value: this.totalPlastics.food },
        { name: '空气吸入', value: this.totalPlastics.air },
        { name: '衣物与纺织品', value: this.totalPlastics.clothing },
        { name: '生活区域', value: this.totalPlastics.livingArea },
        { name: '饮食习惯', value: this.totalPlastics.diet }
      ].sort((a, b) => b.value - a.value);

      const top3 = sources.slice(0, 3);
      const total = this.totalPlastics.total;

      return `根据分析，您的主要微塑料摄入来源为${top3.map(s => s.name).join('、')}。其中，${top3[0].name}占总摄入量的${Math.round(top3[0].value/total*100)}%，是最主要的来源。建议您重点关注这些方面，采取相应的防护措施。`;
    }
  },
  methods: {
    validateInput(dataType, field) {
      const value = this[dataType][field];
      if (value === '') {
        this.errors[dataType][field] = '';
        return;
      }
      
      const num = parseFloat(value);
      if (isNaN(num) || num < 0) {
        this.errors[dataType][field] = '请输入大于等于0的数字';
        return;
      }
      
      this.errors[dataType][field] = '';
    },
    nextPage() {
      if (this.isPageValid) {
        this.currentPage += 1;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    calculateWaterPlastics() {
      const { purified, untreated, treated } = this.waterData;
      return Math.round(
        parseFloat(purified || 0) * this.rates.water.purified +
        parseFloat(untreated || 0) * this.rates.water.untreated +
        parseFloat(treated || 0) * this.rates.water.treated
      );
    },
    calculateFoodPlastics() {
      const d = this.foodData;
      return Math.round(
        parseFloat(d.milk || 0) * this.rates.food.milk +
        parseFloat(d.takeaway || 0) * this.rates.food.takeaway +
        parseFloat(d.honey || 0) * this.rates.food.honey +
        parseFloat(d.sugar || 0) * this.rates.food.sugar +
        parseFloat(d.salt || 0) * this.rates.food.salt +
        (parseFloat(d.rice || 0) / 100) * this.rates.food.rice +
        (parseFloat(d.instantRice || 0) / 100) * this.rates.food.instantRice
      );
    },
    calculateAirPlastics() {
      const weight = parseFloat(this.airData.weight || 0);
      const breathingVolume = weight * 12.5 / 1000; // 平均值使用12.5
      return Math.round(breathingVolume * this.rates.air);
    },
    calculateClothingPlastics() {
      const d = this.clothingData;
      return Math.round(
        parseFloat(d.polyester || 0) * this.rates.clothing.polyester +
        parseFloat(d.cotton || 0) * this.rates.clothing.cotton +
        parseFloat(d.carpetArea || 0) * parseFloat(d.carpetDays || 0) * this.rates.clothing.carpet
      );
    },
    calculateLivingAreaPlastics() {
      const d = this.livingAreaData;
      const volume = parseFloat(d.breathingVolume || 0);
      const rate = this.rates.area[d.areaType] || 0;
      return Math.round(volume * rate);
    },
    calculateDietPlastics() {
      const d = this.dietData;
      return Math.round(
        parseFloat(d.seafood || 0) * this.rates.diet.seafood +
        parseFloat(d.beer || 0) * this.rates.diet.beer +
        parseFloat(d.tapWater || 0) * this.rates.diet.tapWater
      );
    },
    calculateDailyItemsPlastics() {
      const d = this.dailyItemsData;
      return Math.round(
        parseFloat(d.teaBags || 0) * this.rates.dailyItems.teaBags +
        parseFloat(d.plasticUtensils || 0) * this.rates.dailyItems.plasticUtensils
      );
    },
    calculateTotalPlastics() {
      return this.calculateWaterPlastics() +
             this.calculateFoodPlastics() +
             this.calculateAirPlastics() +
             this.calculateClothingPlastics() +
             this.calculateLivingAreaPlastics() +
             this.calculateDietPlastics() +
             this.calculateDailyItemsPlastics();
    },
    showResults() {
      this.currentPage = 8;
      this.$nextTick(() => {
        this.initChart();
      });
    },
    initChart() {
      const chartDom = document.getElementById('microplasticsChart');
      if (!chartDom) return;

      this.chart = echarts.init(chartDom);
      
      const sources = [
        { name: '环境水源', value: this.totalPlastics.water },
        { name: '食品', value: this.totalPlastics.food },
        { name: '空气吸入', value: this.totalPlastics.air },
        { name: '衣物与纺织品', value: this.totalPlastics.clothing },
        { name: '生活区域', value: this.totalPlastics.livingArea },
        { name: '饮食习惯', value: this.totalPlastics.diet }
      ].sort((a, b) => b.value - a.value);

      const top3 = sources.slice(0, 3);
      const others = sources.slice(3);
      const othersSum = others.reduce((sum, item) => sum + item.value, 0);

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '微塑料摄入来源',
            type: 'pie',
            radius: ['40%', '70%'],
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
        ]
      };

      this.chart.setOption(option);
    },
    restart() {
      this.currentPage = 1;
      // 重置所有数据
      this.waterData = { purified: '', untreated: '', treated: '' };
      this.foodData = { milk: '', takeaway: '', honey: '', sugar: '', salt: '', rice: '', instantRice: '' };
      this.airData = { weight: '' };
      this.clothingData = { polyester: '', cotton: '', carpetArea: '', carpetDays: '' };
      this.livingAreaData = { areaType: '', breathingVolume: '' };
      this.dietData = { seafood: '', beer: '', tapWater: '' };
      this.dailyItemsData = { teaBags: '', plasticUtensils: '' };
      // 重置错误信息
      this.errors = {
        waterData: {},
        foodData: {},
        airData: {},
        clothingData: {},
        livingAreaData: {},
        dietData: {},
        dailyItemsData: {}
      };
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
</script>

<style scoped>
/* 基础变量 */
:root {
  --tiffany-blue: #81D8D0;
  --tiffany-dark: #66ABA4;
  --tiffany-light: #A7E8E2;
  --text-primary: #2C3E50;
  --text-secondary: #666;
  --error-color: #E74C3C;
  --success-color: #2ECC71;
}

/* 容器样式 */
.survey-container {
  max-width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at center, #ffffff 0%, #E0F5F4 100%);
  position: relative;
}

/* 进度条 */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(129, 216, 208, 0.2);
  z-index: 1000;
}

.progress {
  height: 100%;
  background: var(--tiffany-blue);
  transition: width 0.3s ease;
}

.page-indicator {
  position: fixed;
  top: 10px;
  right: 20px;
  background: var(--tiffany-dark);
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
}

/* 页面样式 */
.survey-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* 页面头部 */
.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-number {
  font-size: 2.2rem;
  color: var(--tiffany-dark);
  margin-right: 15px;
}

h2 {
  font-size: 2rem;
  color: var(--tiffany-dark);
  margin: 10px 0;
  font-weight: 600;
}

/* 信息卡片 */
.info-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 4px 6px rgba(129, 216, 208, 0.1);
}

.info-card h3 {
  color: var(--tiffany-dark);
  font-size: 1.4rem;
  margin: 0 0 15px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.dot {
  width: 8px;
  height: 8px;
  background: var(--tiffany-blue);
  border-radius: 50%;
  margin-top: 8px;
}

/* 输入区域 */
.input-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  padding: 15px 50px 15px 15px;
  border: 2px solid var(--tiffany-blue);
  border-radius: 12px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
}

.input-wrapper input:focus {
  border-color: var(--tiffany-dark);
  box-shadow: 0 0 0 3px rgba(129, 216, 208, 0.2);
  outline: none;
}

.unit {
  position: absolute;
  right: 15px;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 按钮样式 */
.navigation-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
  position: sticky;
  bottom: 20px;
  background: transparent;
  padding: 10px;
  z-index: 10;
}

.prev-button,
.next-button,
.analyze-button,
.restart-button {
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.next-button,
.analyze-button {
  background: var(--tiffany-blue);
  color: white;
}

.next-button:hover,
.analyze-button:hover {
  background: var(--tiffany-dark);
  transform: translateY(-2px);
}

.prev-button {
  background: white;
  border: 2px solid var(--tiffany-blue);
  color: var(--tiffany-blue);
}

.prev-button:hover {
  background: var(--tiffany-light);
  transform: translateY(-2px);
}

/* 选择器样式 */
.area-selector,
.diet-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin: 20px 0;
}

.option-button {
  padding: 15px;
  border: 2px solid var(--tiffany-blue);
  border-radius: 12px;
  background: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-button.active {
  background: var(--tiffany-blue);
  color: white;
}

/* 结果页样式 */
.result-content {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(129, 216, 208, 0.1);
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
  border-radius: 15px;
  text-align: center;
}

.category-item h4 {
  color: var(--tiffany-dark);
  margin: 0 0 10px;
  font-size: 1.2rem;
}

.amount {
  font-size: 1.8rem;
  color: var(--text-primary);
  font-weight: 600;
  margin: 0;
}

.total-result {
  background: var(--tiffany-dark);
  color: white;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  margin: 30px 0;
}

.total-result h3 {
  margin: 0 0 15px;
  font-size: 1.6rem;
}

.total-amount {
  font-size: 2.4rem;
  margin: 0;
  font-weight: 600;
}

.analysis-section {
  background: rgba(129, 216, 208, 0.1);
  padding: 20px;
  border-radius: 15px;
  margin: 20px 0;
}

.analysis-section h3 {
  color: var(--tiffany-dark);
  margin: 0 0 15px;
}

.analysis-section p {
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0;
}

.result-tips {
  background: rgba(129, 216, 208, 0.1);
  padding: 25px;
  border-radius: 15px;
  margin-top: 30px;
}

.result-tips h3 {
  color: var(--tiffany-dark);
  margin: 0 0 15px;
}

.result-tips ul {
  margin: 0;
  padding-left: 20px;
}

.result-tips li {
  color: var(--text-primary);
  margin: 10px 0;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .survey-page {
    min-height: calc(100vh - 80px);
    padding: 15px 0;
  }

  .navigation-buttons {
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.9);
    padding: 15px;
    margin: 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }

  .prev-button,
  .next-button,
  .analyze-button,
  .restart-button {
    flex: 1;
    min-width: unset;
    padding: 12px 20px;
    font-size: 1rem;
  }
}

.chart-container {
  width: 100%;
  height: 400px;
  margin: 20px 0;
}
</style> 