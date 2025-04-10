import { createStore } from 'vuex'

export default createStore({
  state: {
    waterData: {
      purified: '',
      untreated: '',
      treated: ''
    },
    foodData: {
      milk: '',
      takeaway: '',
      honey: '',
      sugar: '',
      salt: '',
      rice: '',
      instantRice: ''
    },
    airData: {
      weight: ''
    },
    dailyItemsData: {
      teaBags: '',
      plasticUtensils: ''
    },
    clothingData: {
      polyester: '',
      cotton: '',
      carpetArea: '',
      carpetDays: ''
    },
    livingAreaData: {
      areaType: '',
      breathingVolume: ''
    },
    dietData: {
      seafood: '',
      beer: '',
      tapWater: ''
    }
  },
  mutations: {
    updateWaterData(state, payload) {
      state.waterData = { ...state.waterData, ...payload }
    },
    updateFoodData(state, payload) {
      state.foodData = { ...state.foodData, ...payload }
    },
    updateAirData(state, payload) {
      state.airData = { ...state.airData, ...payload }
    },
    updateDailyItemsData(state, payload) {
      state.dailyItemsData = { ...state.dailyItemsData, ...payload }
    },
    updateClothingData(state, payload) {
      state.clothingData = { ...state.clothingData, ...payload }
    },
    updateLivingAreaData(state, payload) {
      state.livingAreaData = { ...state.livingAreaData, ...payload }
    },
    updateDietData(state, payload) {
      state.dietData = { ...state.dietData, ...payload }
    },
    resetAllData(state) {
      state.waterData = {
        purified: '',
        untreated: '',
        treated: ''
      }
      state.foodData = {
        milk: '',
        takeaway: '',
        honey: '',
        sugar: '',
        salt: '',
        rice: '',
        instantRice: ''
      }
      state.airData = {
        weight: ''
      }
      state.dailyItemsData = {
        teaBags: '',
        plasticUtensils: ''
      }
      state.clothingData = {
        polyester: '',
        cotton: '',
        carpetArea: '',
        carpetDays: ''
      }
      state.livingAreaData = {
        areaType: '',
        breathingVolume: ''
      }
      state.dietData = {
        seafood: '',
        beer: '',
        tapWater: ''
      }
    }
  },
  getters: {
    totalPlastics: (state) => {
      return {
        water: calculateWaterPlastics(state.waterData),
        food: calculateFoodPlastics(state.foodData),
        air: calculateAirPlastics(state.airData),
        dailyItems: calculateDailyItemsPlastics(state.dailyItemsData),
        clothing: calculateClothingPlastics(state.clothingData),
        livingArea: calculateLivingAreaPlastics(state.livingAreaData),
        diet: calculateDietPlastics(state.dietData),
        total: calculateTotalPlastics(state)
      }
    }
  }
})

// 辅助计算函数
const rates = {
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
  dailyItems: {
    teaBags: 2000,
    plasticUtensils: 125
  },
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
  }
}

function calculateWaterPlastics(waterData) {
  const { purified, untreated, treated } = waterData
  return Math.round(
    parseFloat(purified || 0) * rates.water.purified +
    parseFloat(untreated || 0) * rates.water.untreated +
    parseFloat(treated || 0) * rates.water.treated
  )
}

function calculateFoodPlastics(foodData) {
  return Math.round(
    parseFloat(foodData.milk || 0) * rates.food.milk +
    parseFloat(foodData.takeaway || 0) * rates.food.takeaway +
    parseFloat(foodData.honey || 0) * rates.food.honey +
    parseFloat(foodData.sugar || 0) * rates.food.sugar +
    parseFloat(foodData.salt || 0) * rates.food.salt +
    (parseFloat(foodData.rice || 0) / 100) * rates.food.rice +
    (parseFloat(foodData.instantRice || 0) / 100) * rates.food.instantRice
  )
}

function calculateAirPlastics(airData) {
  const weight = parseFloat(airData.weight || 0)
  const breathingVolume = weight * 12.5 / 1000
  return Math.round(breathingVolume * rates.air)
}

function calculateClothingPlastics(clothingData) {
  return Math.round(
    parseFloat(clothingData.polyester || 0) * rates.clothing.polyester +
    parseFloat(clothingData.cotton || 0) * rates.clothing.cotton +
    parseFloat(clothingData.carpetArea || 0) * parseFloat(clothingData.carpetDays || 0) * rates.clothing.carpet
  )
}

function calculateLivingAreaPlastics(livingAreaData) {
  const volume = parseFloat(livingAreaData.breathingVolume || 0)
  const rate = rates.area[livingAreaData.areaType] || 0
  return Math.round(volume * rate)
}

function calculateDietPlastics(dietData) {
  return Math.round(
    parseFloat(dietData.seafood || 0) * rates.diet.seafood +
    parseFloat(dietData.beer || 0) * rates.diet.beer +
    parseFloat(dietData.tapWater || 0) * rates.diet.tapWater
  )
}

function calculateDailyItemsPlastics(dailyItemsData) {
  return Math.round(
    parseFloat(dailyItemsData.teaBags || 0) * rates.dailyItems.teaBags +
    parseFloat(dailyItemsData.plasticUtensils || 0) * rates.dailyItems.plasticUtensils
  )
}

function calculateTotalPlastics(state) {
  return calculateWaterPlastics(state.waterData) +
         calculateFoodPlastics(state.foodData) +
         calculateAirPlastics(state.airData) +
         calculateDailyItemsPlastics(state.dailyItemsData) +
         calculateClothingPlastics(state.clothingData) +
         calculateLivingAreaPlastics(state.livingAreaData) +
         calculateDietPlastics(state.dietData)
} 