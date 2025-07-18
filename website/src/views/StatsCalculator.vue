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
      

      <!-- Attack Power -->
      <div class="grid-label">攻擊力</div>
      <div><input type="number" v-model.number="currentStats.attackPower"></div>
      <div><input type="number" v-model.number="expectedStats.attackPower"></div>
      

      <!-- Critical Rate -->
      <div class="grid-label">暴擊</div>
      <div><input type="number" v-model.number="currentStats.criticalRate"></div>
      <div><input type="number" v-model.number="expectedStats.criticalRate"></div>
      
      <div class="grid-label-result"></div>
      <div class="grid-result-percent">{{ calculateCriticalRate(currentStats.criticalRate).toFixed(2) }}%</div>
      <div class="grid-result-percent">{{ calculateCriticalRate(expectedStats.criticalRate).toFixed(2) }}%</div>

      <!-- Critical Damage -->
      <div class="grid-label">暴擊傷害</div>
      <div><input type="number" v-model.number="currentStats.criticalDamage"></div>
      <div><input type="number" v-model.number="expectedStats.criticalDamage"></div>
      
      <div class="grid-label-result"></div>
      <div class="grid-result-percent">{{ calculateCriticalDamage(currentStats.criticalDamage).toFixed(2) }}%</div>
      <div class="grid-result-percent">{{ calculateCriticalDamage(expectedStats.criticalDamage).toFixed(2) }}%</div>

      <!-- Accuracy -->
      <div class="grid-label">命中</div>
      <div><input type="number" v-model.number="currentStats.accuracy"></div>
      <div><input type="number" v-model.number="expectedStats.accuracy"></div>
      
      <div class="grid-label-result"></div>
      <div class="grid-result-percent">{{ calculateAccuracy(currentStats.accuracy).toFixed(2) }}%</div>
      <div class="grid-result-percent">{{ calculateAccuracy(expectedStats.accuracy).toFixed(2) }}%</div>

      <!-- Piercing -->
      <div class="grid-label">貫穿</div>
      <div><input type="number" v-model.number="currentStats.piercing"></div>
      <div><input type="number" v-model.number="expectedStats.piercing"></div>
      
      <div class="grid-label-result"></div>
      <div class="grid-result-percent">{{ calculatePiercing(currentStats.piercing).toFixed(2) }}%</div>
      <div class="grid-result-percent">{{ calculatePiercing(expectedStats.piercing).toFixed(2) }}%</div>
    </div>

    <div class="damage-change-section">
      <div class="grid-label">預期傷害變化</div>
      <div class="grid-result-final">{{ damageChange.toFixed(2) }}%</div>
    </div>
    <div class="note" style="text-align: center; margin-top: 10px;">
      此計算未考慮命中率。
    </div>

    <div class="extra-settings">
        <label for="monsterDefenseReduction">怪物防禦減傷比例 (%):</label>
        <input type="number" id="monsterDefenseReduction" v-model.number="monsterDefenseReduction">
    </div>

    <div class="description-section">
      <!-- <h3>計算公式與說明</h3> -->
      <p><strong>適用等級:</strong> 55</p>
      <ul>
        <li><strong>暴擊率 (%):</strong> ((0.9785 * 100 * 數值) / (2509.9756 + 數值)) + 1</li>
        <li><strong>暴擊傷害 (%):</strong> (((2.9262 * 數值) / (3371.1439 + 數值)) + 1.25) * 100</li>
        <li><strong>命中率 (%):</strong> ((96.16 * 數值) / (820.5 + 數值)) / 100 + 0.85</li>
        <li><strong>貫穿率 (%):</strong> (0.942 * 數值) / (3070.3849 + 數值) * 100</li>
      </ul>
      <p class="note">某些屬性會因為自身與怪物的等級差距而產生變化。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsCalculator',
  data() {
    const savedData = JSON.parse(localStorage.getItem('statsCalculatorData'));
    return {
      currentStats: savedData?.currentStats || {
        attackPower: 0,
        criticalRate: 0,
        criticalDamage: 0,
        accuracy: 0,
        piercing: 0
      },
      expectedStats: savedData?.expectedStats || {
        attackPower: 0,
        criticalRate: 0,
        criticalDamage: 0,
        accuracy: 0,
        piercing: 0
      },
      monsterDefenseReduction: savedData?.monsterDefenseReduction || 0
    }
  },
  computed: {
    
    damageChange() {
      const currentCritRate = this.calculateCriticalRate(this.currentStats.criticalRate) / 100;
      const currentCritDamage = this.calculateCriticalDamage(this.currentStats.criticalDamage) / 100;
      const currentPiercing = this.calculatePiercing(this.currentStats.piercing) / 100;

      const expectedCritRate = this.calculateCriticalRate(this.expectedStats.criticalRate) / 100;
      const expectedCritDamage = this.calculateCriticalDamage(this.expectedStats.criticalDamage) / 100;
      const expectedPiercing = this.calculatePiercing(this.expectedStats.piercing) / 100;

      const monsterReduction = this.monsterDefenseReduction / 100;

      const currentDamageMultiplier = (1 - currentCritRate + (currentCritRate * currentCritDamage)) * (1 - (monsterReduction * (1 - currentPiercing))) * this.currentStats.attackPower;
      const expectedDamageMultiplier = (1 - expectedCritRate + (expectedCritRate * expectedCritDamage)) * (1 - (monsterReduction * (1 - expectedPiercing))) * this.expectedStats.attackPower;

      if (currentDamageMultiplier === 0) {
        return 0;
      }

      return ((expectedDamageMultiplier / currentDamageMultiplier) - 1) * 100;
    }
  },
  watch: {
    currentStats: {
      handler() { this.saveData(); },
      deep: true
    },
    expectedStats: {
      handler() { this.saveData(); },
      deep: true
    },
    monsterDefenseReduction() {
      this.saveData();
    }
  },
  methods: {
    saveData() {
      const data = {
        currentStats: this.currentStats,
        expectedStats: this.expectedStats,
        monsterDefenseReduction: this.monsterDefenseReduction
      };
      localStorage.setItem('statsCalculatorData', JSON.stringify(data));
    },
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
      return (((96.16 * points) / (820.5 + points)) / 100 + 0.85) * 100;
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
}

.calculator-body {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  gap: 8px 12px;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
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

.grid-result-final {
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  color: #2c3e50;
}

.damage-change-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
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

.description-section {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.description-section h3 {
  margin-top: 0;
  text-align: center;
}

.description-section ul {
  padding-left: 20px;
  list-style-type: disc;
}

.description-section li {
  margin-bottom: 8px;
}

.note {
  margin-top: 15px;
  font-size: 0.9em;
  color: #777;
}
</style>