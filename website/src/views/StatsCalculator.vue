<template>
  <div class="calculator-container">
    <div style="text-align: center; margin-bottom: 15px;">
      <router-link to="/">回到目錄</router-link>
    </div>

    <div class="calculator-body">
      <!-- Headers -->
      <div class="grid-header"></div>
      <div class="grid-header"><h3>目前屬性</h3></div>
      <div class="grid-header"><h3>預期屬性</h3></div>
      <div class="grid-header"><h3>屬性差異</h3></div>

      <!-- Attack Power -->
      <div class="grid-label">攻擊力</div>
      <div><input type="number" v-model.number="currentStats.attackPower"></div>
      <div><input type="number" v-model.number="expectedStats.attackPower"></div>
      <div class="grid-result">{{ diffStats.attackPower }}</div>

      <!-- Critical Rate -->
      <div class="grid-label">暴擊</div>
      <div><input type="number" v-model.number="currentStats.criticalRate"></div>
      <div><input type="number" v-model.number="expectedStats.criticalRate"></div>
      <div class="grid-result">{{ diffStats.criticalRate.toFixed(2) }}%</div>
      <div class="grid-label-result"></div>
      <div class="grid-result-percent">{{ calculateCriticalRate(currentStats.criticalRate).toFixed(2) }}%</div>
      <div class="grid-result-percent">{{ calculateCriticalRate(expectedStats.criticalRate).toFixed(2) }}%</div>
      <div class="grid-result"></div>

      <!-- Critical Damage -->
      <div class="grid-label">暴擊傷害</div>
      <div><input type="number" v-model.number="currentStats.criticalDamage"></div>
      <div><input type="number" v-model.number="expectedStats.criticalDamage"></div>
      <div class="grid-result">{{ diffStats.criticalDamage.toFixed(2) }}%</div>
      <div class="grid-label-result"></div>
      <div class="grid-result-percent">{{ calculateCriticalDamage(currentStats.criticalDamage).toFixed(2) }}%</div>
      <div class="grid-result-percent">{{ calculateCriticalDamage(expectedStats.criticalDamage).toFixed(2) }}%</div>
      <div class="grid-result"></div>

      <!-- Accuracy -->
      <div class="grid-label">命中</div>
      <div><input type="number" v-model.number="currentStats.accuracy"></div>
      <div><input type="number" v-model.number="expectedStats.accuracy"></div>
      <div class="grid-result">{{ diffStats.accuracy.toFixed(2) }}%</div>
      <div class="grid-label-result"></div>
      <div class="grid-result-percent">{{ calculateAccuracy(currentStats.accuracy).toFixed(2) }}%</div>
      <div class="grid-result-percent">{{ calculateAccuracy(expectedStats.accuracy).toFixed(2) }}%</div>
      <div class="grid-result"></div>

      <!-- Piercing -->
      <div class="grid-label">貫穿</div>
      <div><input type="number" v-model.number="currentStats.piercing"></div>
      <div><input type="number" v-model.number="expectedStats.piercing"></div>
      <div class="grid-result">{{ diffStats.piercing.toFixed(2) }}%</div>
      <div class="grid-label-result"></div>
      <div class="grid-result-percent">{{ calculatePiercing(currentStats.piercing).toFixed(2) }}%</div>
      <div class="grid-result-percent">{{ calculatePiercing(expectedStats.piercing).toFixed(2) }}%</div>
      <div class="grid-result"></div>
    </div>

    <div class="extra-settings">
        <label for="monsterDefenseReduction">怪物防禦減傷比例 (%):</label>
        <input type="number" id="monsterDefenseReduction" v-model.number="monsterDefenseReduction">
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsCalculator',
  data() {
    return {
      currentStats: {
        attackPower: 0,
        criticalRate: 0,
        criticalDamage: 0,
        accuracy: 0,
        piercing: 0
      },
      expectedStats: {
        attackPower: 0,
        criticalRate: 0,
        criticalDamage: 0,
        accuracy: 0,
        piercing: 0
      },
      monsterDefenseReduction: 0
    }
  },
  computed: {
    diffStats() {
      return {
        attackPower: this.expectedStats.attackPower - this.currentStats.attackPower,
        criticalRate: this.calculateCriticalRate(this.expectedStats.criticalRate) - this.calculateCriticalRate(this.currentStats.criticalRate),
        criticalDamage: this.calculateCriticalDamage(this.expectedStats.criticalDamage) - this.calculateCriticalDamage(this.currentStats.criticalDamage),
        accuracy: this.calculateAccuracy(this.expectedStats.accuracy) - this.calculateAccuracy(this.currentStats.accuracy),
        piercing: this.calculatePiercing(this.expectedStats.piercing) - this.calculatePiercing(this.currentStats.piercing)
      }
    }
  },
  methods: {
    calculateCriticalRate(points) {
      if (points <= 0) return 0;
      return ((0.9785 * 100 * points) / (2509.9756 + points)) + 1;
    },
    calculateCriticalDamage(points) {
      if (points <= 0) return 0;
      return (((2.9262 * points) / (3371.1439 + points)) + 1.25) * 100;
    },
    calculateAccuracy(points) {
      if (points <= 0) return 0;
      return ((96.16 * points) / (820.5 + points)) / 100 + 0.85;
    },
    calculatePiercing(points) {
      if (points <= 0) return 0;
      return (0.942 * points) / (3070.3849 + points) * 100;
    }
  }
}
</script>

<style scoped>
.calculator-container {
  margin: 10px auto;
  padding: 15px;
  max-width: 800px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.calculator-body {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 1fr;
  gap: 8px 12px;
  align-items: center;
}

.grid-header {
  text-align: center;
}

.grid-label {
  font-weight: bold;
  text-align: right;
}

.grid-label-result {
  grid-column: 1;
  text-align: right;
  font-size: 0.9em;
  color: #555;
}

.grid-result, .grid-result-percent {
  text-align: center;
  font-size: 0.9em;
}

.grid-result-percent {
    color: #3a87ad;
}

input[type="number"] {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

.extra-settings {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  text-align: center;
}

.extra-settings label {
    margin-right: 10px;
}

.extra-settings input {
    width: 100px;
}

h3 {
    margin: 0 0 10px 0;
}
</style>