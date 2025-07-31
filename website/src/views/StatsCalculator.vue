<template>
  <div class="calculator-container">
    

    <div style="text-align: center; margin-bottom: 15px;">
      <router-link to="/">回到目錄</router-link>
    </div>

    <div class="level-info">
      <strong>適用等級:</strong> 60
    </div>

    <div class="main-content">
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

      <div class="extra-settings-container">
        <div class="extra-settings">
            <label for="monsterDefensePoints">怪物防禦點數:</label>
            <input type="number" id="monsterDefensePoints" v-model.number="monsterDefensePoints">
        </div>
      </div>
    </div>

    <div class="damage-change-section">
      <div class="grid-label">預期傷害變化</div>
      <div class="grid-result-final">{{ damageChange.toFixed(2) }}%</div>
    </div>
    <div class="note" style="text-align: center; margin-top: 10px;">
      此計算未考慮命中率。
    </div>

    <div class="increase-sections-container">
      <div class="crit-increase-section">
        <h4>基於當前屬性，暴擊提升會增加的傷害量</h4>
        <div class="crit-increase-grid">
          <div class="grid-label">+100 暴擊</div>
          <div class="grid-result-final">{{ damageChangeCrit100.toFixed(2) }}%</div>
          <div class="grid-label">+200 暴擊</div>
          <div class="grid-result-final">{{ damageChangeCrit200.toFixed(2) }}%</div>
          <div class="grid-label">+400 暴擊</div>
          <div class="grid-result-final">{{ damageChangeCrit400.toFixed(2) }}%</div>
        </div>
      </div>

      <div class="crit-increase-section">
        <h4>基於當前屬性，暴擊傷害提升會增加的傷害量</h4>
        <div class="crit-increase-grid">
          <div class="grid-label">+100 暴傷</div>
          <div class="grid-result-final">{{ damageChangeCritDmg100.toFixed(2) }}%</div>
          <div class="grid-label">+200 暴傷</div>
          <div class="grid-result-final">{{ damageChangeCritDmg200.toFixed(2) }}%</div>
          <div class="grid-label">+400 暴傷</div>
          <div class="grid-result-final">{{ damageChangeCritDmg400.toFixed(2) }}%</div>
        </div>
      </div>

      <div class="crit-increase-section">
        <h4>基於當前屬性，貫穿提升會增加的傷害量</h4>
        <div class="crit-increase-grid">
          <div class="grid-label">+100 貫穿</div>
          <div class="grid-result-final">{{ damageChangePiercing100.toFixed(2) }}%</div>
          <div class="grid-label">+200 貫穿</div>
          <div class="grid-result-final">{{ damageChangePiercing200.toFixed(2) }}%</div>
          <div class="grid-label">+400 貫穿</div>
          <div class="grid-result-final">{{ damageChangePiercing400.toFixed(2) }}%</div>
        </div>
      </div>
    </div>

    <div class="description-section">
      <!-- <h3>計算公式與說明</h3> -->
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
      monsterDefensePoints: savedData?.monsterDefensePoints || 0
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

      const currentRemainingDefense = this.monsterDefensePoints * (1 - currentPiercing);
      const currentMonsterReduction = this.calculateMonsterDamageReduction(currentRemainingDefense);
      
      const expectedRemainingDefense = this.monsterDefensePoints * (1 - expectedPiercing);
      const expectedMonsterReduction = this.calculateMonsterDamageReduction(expectedRemainingDefense);

      const currentDamageMultiplier = (1 - currentCritRate + (currentCritRate * currentCritDamage)) * (1 - currentMonsterReduction) * this.currentStats.attackPower;
      const expectedDamageMultiplier = (1 - expectedCritRate + (expectedCritRate * expectedCritDamage)) * (1 - expectedMonsterReduction) * this.expectedStats.attackPower;

      if (currentDamageMultiplier === 0) {
        return 0;
      }

      return ((expectedDamageMultiplier / currentDamageMultiplier) - 1) * 100;
    },
    damageChangeCrit100() {
      return this.calculateCritIncrease(100);
    },
    damageChangeCrit200() {
      return this.calculateCritIncrease(200);
    },
    damageChangeCrit400() {
      return this.calculateCritIncrease(400);
    },
    damageChangeCritDmg100() {
      return this.calculateCritDmgIncrease(100);
    },
    damageChangeCritDmg200() {
      return this.calculateCritDmgIncrease(200);
    },
    damageChangeCritDmg400() {
      return this.calculateCritDmgIncrease(400);
    },
    damageChangePiercing100() {
      return this.calculatePiercingIncrease(100);
    },
    damageChangePiercing200() {
      return this.calculatePiercingIncrease(200);
    },
    damageChangePiercing400() {
      return this.calculatePiercingIncrease(400);
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
    monsterDefensePoints() {
      this.saveData();
    }
  },
  methods: {
    saveData() {
      const data = {
        currentStats: this.currentStats,
        expectedStats: this.expectedStats,
        monsterDefensePoints: this.monsterDefensePoints
      };
      localStorage.setItem('statsCalculatorData', JSON.stringify(data));
    },
    calculateCritIncrease(critToAdd) {
      const currentCritRate = this.calculateCriticalRate(this.currentStats.criticalRate) / 100;
      const currentCritDamage = this.calculateCriticalDamage(this.currentStats.criticalDamage) / 100;
      const currentPiercing = this.calculatePiercing(this.currentStats.piercing) / 100;

      const expectedCritRate = this.calculateCriticalRate(this.currentStats.criticalRate + critToAdd) / 100;
      
      const currentRemainingDefense = this.monsterDefensePoints * (1 - currentPiercing);
      const currentMonsterReduction = this.calculateMonsterDamageReduction(currentRemainingDefense);

      const currentDamageMultiplier = (1 - currentCritRate + (currentCritRate * currentCritDamage)) * (1 - currentMonsterReduction);
      const expectedDamageMultiplier = (1 - expectedCritRate + (expectedCritRate * currentCritDamage)) * (1 - currentMonsterReduction);

      if (currentDamageMultiplier === 0) {
        return 0;
      }
      
      return ((expectedDamageMultiplier / currentDamageMultiplier) - 1) * 100;
    },
    calculateCritDmgIncrease(critDmgToAdd) {
      const currentCritRate = this.calculateCriticalRate(this.currentStats.criticalRate) / 100;
      const currentCritDamage = this.calculateCriticalDamage(this.currentStats.criticalDamage) / 100;
      const currentPiercing = this.calculatePiercing(this.currentStats.piercing) / 100;

      const expectedCritDamage = this.calculateCriticalDamage(this.currentStats.criticalDamage + critDmgToAdd) / 100;
      
      const currentRemainingDefense = this.monsterDefensePoints * (1 - currentPiercing);
      const currentMonsterReduction = this.calculateMonsterDamageReduction(currentRemainingDefense);

      const currentDamageMultiplier = (1 - currentCritRate + (currentCritRate * currentCritDamage)) * (1 - currentMonsterReduction);
      const expectedDamageMultiplier = (1 - currentCritRate + (currentCritRate * expectedCritDamage)) * (1 - currentMonsterReduction);

      if (currentDamageMultiplier === 0) {
        return 0;
      }
      
      return ((expectedDamageMultiplier / currentDamageMultiplier) - 1) * 100;
    },
    calculatePiercingIncrease(piercingToAdd) {
      const currentCritRate = this.calculateCriticalRate(this.currentStats.criticalRate) / 100;
      const currentCritDamage = this.calculateCriticalDamage(this.currentStats.criticalDamage) / 100;
      const currentPiercing = this.calculatePiercing(this.currentStats.piercing) / 100;

      const expectedPiercing = this.calculatePiercing(this.currentStats.piercing + piercingToAdd) / 100;
      
      const currentRemainingDefense = this.monsterDefensePoints * (1 - currentPiercing);
      const currentMonsterReduction = this.calculateMonsterDamageReduction(currentRemainingDefense);

      const expectedRemainingDefense = this.monsterDefensePoints * (1 - expectedPiercing);
      const expectedMonsterReduction = this.calculateMonsterDamageReduction(expectedRemainingDefense);

      const currentDamageMultiplier = (1 - currentCritRate + (currentCritRate * currentCritDamage)) * (1 - currentMonsterReduction);
      const expectedDamageMultiplier = (1 - currentCritRate + (currentCritRate * currentCritDamage)) * (1 - expectedMonsterReduction);

      if (currentDamageMultiplier === 0) {
        return 0;
      }
      
      return ((expectedDamageMultiplier / currentDamageMultiplier) - 1) * 100;
    },
    calculateMonsterDamageReduction(points) {
      if (points <= 0) return 0;
      return (0.942788 * points) / (10665.5022 + points);
    },
    calculateCriticalRate(points) {
      if (points <= 0) return 1;
      // level 60
      return ((0.9968 * 100 * points) / (8922.5043 + points)) + 1;
    },
    calculateCriticalDamage(points) {
      if (points <= 0) return 125;
      // level 60
      return (((2.8969 * points) / (8377.3824 + points)) + 1.25) * 100;
    },
    calculateAccuracy(points) {
      if (points <= 0) return 85;
      // level 60
      return (((95.5467 * points) / (6294.5977 + points)) / 100 + 0.85) * 100;
    },
    calculatePiercing(points) {
      if (points <= 0) return 0;
      // level 60
      return (0.942788 * points) / (10665.5022 + points) * 100;
    }
  }
}
</script>

<style scoped>
.calculator-container {
  margin: 10px auto;
  padding: 15px;
  max-width: 1200px;
}

.level-info {
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 15px;
}

.main-content {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.calculator-body {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  gap: 8px 12px;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  flex-grow: 1;
}

.extra-settings-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
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
  text-align: center;
}

.extra-settings label {
    display: block;
    margin-bottom: 10px;
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

.increase-sections-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.crit-increase-section {
  text-align: center;
  padding: 0 20px;
  border-right: 2px solid #830000;
}

.crit-increase-section:last-child {
  border-right: none;
}

.crit-increase-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 12px;
  align-items: center;
  max-width: 400px;
  margin: 10px auto;
}
</style>