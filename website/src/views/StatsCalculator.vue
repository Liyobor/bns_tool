<template>
  <div style="text-align: center; margin-bottom: 20px;">
      <router-link to="/">回到目錄</router-link>
  </div>
  <div id="app">
    <div class="stats-section">
      <h2>目前屬性</h2>
      <div class="input-group">
        <label for="currentCriticalRate">Critical Rate:</label>
        <input type="number" id="currentCriticalRate" v-model.number="currentStats.criticalRate">
        <p>計算結果: {{ calculateCriticalRate(currentStats.criticalRate).toFixed(2) }}%</p>
      </div>
      <div class="input-group">
        <label for="currentCriticalDamage">Critical Damage:</label>
        <input type="number" id="currentCriticalDamage" v-model.number="currentStats.criticalDamage">
        <p>計算結果: {{ calculateCriticalDamage(currentStats.criticalDamage).toFixed(2) }}%</p>
      </div>
      <div class="input-group">
        <label for="currentAccuracy">Accuracy:</label>
        <input type="number" id="currentAccuracy" v-model.number="currentStats.accuracy">
        <p>計算結果: {{ calculateAccuracy(currentStats.accuracy).toFixed(2) }}%</p>
      </div>
      <div class="input-group">
        <label for="currentPiercing">Piercing:</label>
        <input type="number" id="currentPiercing" v-model.number="currentStats.piercing">
        <p>計算結果: {{ calculatePiercing(currentStats.piercing).toFixed(2) }}%</p>
      </div>
    </div>

    <div class="stats-section">
      <h2>預期屬性</h2>
      <div class="input-group">
        <label for="expectedCriticalRate">Critical Rate:</label>
        <input type="number" id="expectedCriticalRate" v-model.number="expectedStats.criticalRate">
        <p>計算結果: {{ calculateCriticalRate(expectedStats.criticalRate).toFixed(2) }}%</p>
      </div>
      <div class="input-group">
        <label for="expectedCriticalDamage">Critical Damage:</label>
        <input type="number" id="expectedCriticalDamage" v-model.number="expectedStats.criticalDamage">
        <p>計算結果: {{ calculateCriticalDamage(expectedStats.criticalDamage).toFixed(2) }}%</p>
      </div>
      <div class="input-group">
        <label for="expectedAccuracy">Accuracy:</label>
        <input type="number" id="expectedAccuracy" v-model.number="expectedStats.accuracy">
        <p>計算結果: {{ calculateAccuracy(expectedStats.accuracy).toFixed(2) }}%</p>
      </div>
      <div class="input-group">
        <label for="expectedPiercing">Piercing:</label>
        <input type="number" id="expectedPiercing" v-model.number="expectedStats.piercing">
        <p>計算結果: {{ calculatePiercing(expectedStats.piercing).toFixed(2) }}%</p>
      </div>
    </div>

    <div class="stats-section">
      <h2>屬性差異</h2>
      <p>Critical Rate: {{ diffStats.criticalRate.toFixed(2) }}%</p>
      <p>Critical Damage: {{ diffStats.criticalDamage.toFixed(2) }}%</p>
      <p>Accuracy: {{ diffStats.accuracy.toFixed(2) }}%</p>
      <p>Piercing: {{ diffStats.piercing.toFixed(2) }}%</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsCalculator',
  data() {
    return {
      currentStats: {
        criticalRate: 0,
        criticalDamage: 0,
        accuracy: 0,
        piercing: 0
      },
      expectedStats: {
        criticalRate: 0,
        criticalDamage: 0,
        accuracy: 0,
        piercing: 0
      }
    }
  },
  computed: {
    diffStats() {
      return {
        criticalRate: this.calculateCriticalRate(this.expectedStats.criticalRate) - this.calculateCriticalRate(this.currentStats.criticalRate),
        criticalDamage: this.calculateCriticalDamage(this.expectedStats.criticalDamage) - this.calculateCriticalDamage(this.currentStats.criticalDamage),
        accuracy: this.calculateAccuracy(this.expectedStats.accuracy) - this.calculateAccuracy(this.currentStats.accuracy),
        piercing: this.calculatePiercing(this.expectedStats.piercing) - this.calculatePiercing(this.currentStats.piercing)
      }
    }
  },
  methods: {
    calculateCriticalRate(points) {
      return ((0.9785 * 100 * points) / (2509.9756 + points)) + 1;
    },
    calculateCriticalDamage(points) {
      return (((2.9262 * points) / (3371.1439 + points)) + 1.25) * 100;
    },
    calculateAccuracy(points) {
      return ((96.16 * points) / (820.5 + points)) / 100 + 0.85;
    },
    calculatePiercing(points) {
      return (0.942 * points) / (3070.3849 + points) * 100;
    }
  }
}
</script>

<style scoped>
#app {
  display: flex;
  justify-content: space-around;
  margin: 20px;
}

.stats-section {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  width: 30%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
