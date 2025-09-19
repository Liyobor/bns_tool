<template>
  <div class="calculator-container">
    

    <div style="text-align: center; margin-bottom: 15px;">
      <router-link to="/">回到目錄</router-link>
    </div>

    <div class="level-info">
      <strong>適用等級:</strong>
      <select v-model.number="level">
        <option value="60">60</option>
        <option value="61">61</option>
        <option value="62">62</option>
        <option value="63">63</option>
      </select>
    </div>

    <div class="main-content">
      <div class="calculator-body">
        <!-- Headers -->
        <div class="grid-header"></div>
        <div class="grid-header"><h3>目前屬性</h3></div>
        <div class="grid-header"><h3>預期屬性</h3></div>
        <div class="grid-header"><h3>畫冊屬性評估</h3></div>
        

        <!-- Attack Power -->
        <div class="grid-label">攻擊力</div>
        <div><input type="number" v-model.number="currentStats.attackPower"></div>
        <div><input type="number" v-model.number="expectedStats.attackPower"></div>
        <div><input type="number" v-model.number="additionalStats.attackPower"></div>
        

        <!-- Critical Rate -->
        <div class="grid-label">暴擊</div>
        <div><input type="number" v-model.number="currentStats.criticalRate"></div>
        <div><input type="number" v-model.number="expectedStats.criticalRate"></div>
        <div><input type="number" v-model.number="additionalStats.criticalRate"></div>

        <div class="grid-label-result"></div>
        <div class="grid-result-percent">{{ (calculateCriticalRate(currentStats.criticalRate) + (currentStats.additionalCriticalRate || 0)).toFixed(2) }}%</div>
        <div class="grid-result-percent">{{ (calculateCriticalRate(expectedStats.criticalRate) + (expectedStats.additionalCriticalRate || 0)).toFixed(2) }}%</div>
        <div class="grid-result-percent">{{ (calculateCriticalRate(currentStats.criticalRate + additionalStats.criticalRate) + (currentStats.additionalCriticalRate || 0) + (additionalStats.additionalCriticalRate || 0)).toFixed(2) }}%</div>

        <!-- Critical Damage -->
        <div class="grid-label">暴擊傷害<br></div>
        <div><input type="number" v-model.number="currentStats.criticalDamage"></div>
        <div><input type="number" v-model.number="expectedStats.criticalDamage"></div>
        <div><input type="number" v-model.number="additionalStats.criticalDamage"></div>
        
        <div class="grid-label-result"></div>
        <div class="grid-result-percent">{{ (calculateCriticalDamage(currentStats.criticalDamage) + (currentStats.additionalCriticalDamage || 0)).toFixed(2) }}%</div>
        <div class="grid-result-percent">{{ (calculateCriticalDamage(expectedStats.criticalDamage) + (expectedStats.additionalCriticalDamage || 0)).toFixed(2) }}%</div>
        <div class="grid-result-percent">{{ (calculateCriticalDamage(currentStats.criticalDamage + additionalStats.criticalDamage) + (currentStats.additionalCriticalDamage || 0) + (additionalStats.additionalCriticalDamage || 0)).toFixed(2) }}%</div>

        <!-- Accuracy -->
        <div class="grid-label">命中</div>
        <div><input type="number" v-model.number="currentStats.accuracy"></div>
        <div><input type="number" v-model.number="expectedStats.accuracy"></div>
        <div></div>
        
        <div class="grid-label-result"></div>
        <div class="grid-result-percent">{{ calculateAccuracy(currentStats.accuracy).toFixed(2) }}%</div>
        <div class="grid-result-percent">{{ calculateAccuracy(expectedStats.accuracy).toFixed(2) }}%</div>
        <div></div>

        <!-- Piercing -->
        <div class="grid-label">貫穿</div>
        <div><input type="number" v-model.number="currentStats.piercing"></div>
        <div><input type="number" v-model.number="expectedStats.piercing"></div>
        <div><input type="number" v-model.number="additionalStats.piercing"></div>

        <div class="grid-label-result"></div>
        <div class="grid-result-percent">{{ calculatePiercing(currentStats.piercing).toFixed(2) }}%</div>
        <div class="grid-result-percent">{{ calculatePiercing(expectedStats.piercing).toFixed(2) }}%</div>
        <div class="grid-result-percent">{{ calculatePiercing(currentStats.piercing + additionalStats.piercing).toFixed(2) }}%</div>

        <!-- Additional Critical Rate -->
        <div class="grid-label">額外暴擊率(%)</div>
        <div><input type="number" v-model.number="currentStats.additionalCriticalRate"></div>
        <div><input type="number" v-model.number="expectedStats.additionalCriticalRate"></div>
        <div><input type="number" v-model.number="additionalStats.additionalCriticalRate"></div>

        <!-- Additional Critical Damage -->
        <div class="grid-label">額外暴擊傷害(%)</div>
        <div><input type="number" v-model.number="currentStats.additionalCriticalDamage"></div>
        <div><input type="number" v-model.number="expectedStats.additionalCriticalDamage"></div>
        <div><input type="number" v-model.number="additionalStats.additionalCriticalDamage"></div>
        
        <div class="placeholder"></div>
        <div class="placeholder"></div>
        <div class="placeholder"></div>
        <div></div>
        <!-- Damage Multiplier -->
        <div class="grid-label">傷害倍率</div>
        <div class="grid-result-final">{{ currentDamageMultiplier.toFixed(2) }}</div>
        <div class="grid-result-final">{{ expectedDamageMultiplier.toFixed(2) }}</div>
        <div class="grid-result-final">{{ additionalDamageMultiplier.toFixed(2) }}</div>

        <!-- Damage Change -->
        <div class="grid-label">
          傷害變化
        </div>
        <div></div> <!-- Empty for current stats -->
        <div class="grid-result-final-percent">{{ damageChange.toFixed(2) }}%</div>
        <div class="grid-result-final-percent">{{ additionalDamageChange.toFixed(2) }}%</div>
        <div class="note-inline">此計算未考慮命中率</div>
      </div>
      

      <div class="extra-settings-container">
        <div class="extra-settings">
            <label for="monsterDefensePoints">怪物防禦點數:</label>
            <input type="number" id="monsterDefensePoints" v-model.number="monsterDefensePoints">
        </div>
      </div>
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
      <h3>計算公式與說明 (等級 {{ level }})</h3>
      <ul>
        <li><strong>暴擊率 (%):</strong> (( {{ formulas.criticalRate.a.toFixed(4) }} * 100 * 數值) / ( {{ formulas.criticalRate.b.toFixed(4) }} + 數值)) + {{ formulas.criticalRate.c }}</li>
        <li><strong>暴擊傷害 (%):</strong> ((( {{ formulas.criticalDamage.a.toFixed(4) }} * 數值) / ( {{ formulas.criticalDamage.b.toFixed(4) }} + 數值)) + 1.25) * 100</li>
        <li><strong>命中率 (%):</strong> (((({{ formulas.accuracy.a.toFixed(4) }} * 數值) / ({{ formulas.accuracy.b.toFixed(4) }} + 數值)) / 100) + 0.85) * 100</li>
        <li><strong>貫穿率 (%):</strong> ({{ formulas.piercing.a.toFixed(4) }} * 數值) / ({{ formulas.piercing.b.toFixed(4) }} + 數值) * 100</li>
      </ul>
      <p class="note">某些屬性會因為自身與怪物的等級差距而產生變化。</p>
    </div>
  </div>
</template>

<script>
const levelFormulas = {
  60: {
    criticalRate: { a: 0.9707, b: 8215.300 , c : 0.070631 },
    criticalDamage: { a: 2.8969, b: 8377.3824 },
    accuracy: { a: 95.5467, b: 6294.5977 },
    piercing: { a: 0.942788, b: 10665.5022 },
    monsterDamageReduction: { a: 0.942788, b: 10665.5022 }
  },
  61: {
    criticalRate: { a: 0.963106, b: 8646.72 , c : -0.358622},
    criticalDamage: { a: 2.906465950, b: 7570.32616045 },
    accuracy: { a: 95.847128372, b: 6885.57322650 },
    piercing: { a: 0.942478491, b: 11580.76553879 },
    monsterDamageReduction: { a: 0.942478491, b: 11580.76553879 }
  },
  62: {
    criticalRate: { a: 0.9703, b: 9653.87 , c : -0.00726},
    criticalDamage: { a: 2.897642, b: 7932.785763 },
    accuracy: { a: 95.233848, b: 7434.701142 },
    piercing: { a: 0.948398, b: 12682.003542 },
    monsterDamageReduction: { a: 0.948398, b: 12682.003542 }
  },
  63: {
    criticalRate: { a: 0.9675, b: 10429.5, c: -0.0309 },
    criticalDamage: { a: 2.9094, b: 8400.7, c: 1.25 },
    accuracy: { a: 95.6970, b: 8163.1451, c: 0.8503 },
    piercing: { a: 0.9475, b: 13755.0 },
    monsterDamageReduction: { a: 0.9475, b: 13755.0 }
  }
};

export default {
  name: 'StatsCalculator',
  data() {
    const savedData = JSON.parse(localStorage.getItem('statsCalculatorData'));
    return {
      level: savedData?.level || 60,
      currentStats: savedData?.currentStats || {
        attackPower: 0,
        criticalRate: 0,
        criticalDamage: 0,
        accuracy: 0,
        piercing: 0,
        additionalCriticalRate: 0,
        additionalCriticalDamage: 0
      },
      expectedStats: savedData?.expectedStats || {
        attackPower: 0,
        criticalRate: 0,
        criticalDamage: 0,
        accuracy: 0,
        piercing: 0,
        additionalCriticalRate: 0,
        additionalCriticalDamage: 0
      },
      additionalStats: {
        attackPower: 0,
        criticalRate: 0,
        criticalDamage: 0,
        piercing: 0,
        additionalCriticalRate: 0,
        additionalCriticalDamage: 0
      },
      monsterDefensePoints: savedData?.monsterDefensePoints || 0
    }
  },
  computed: {
    formulas() {
      return levelFormulas[this.level] || levelFormulas[60];
    },
    currentDamageMultiplier() {
      const currentCritRate = (this.calculateCriticalRate(this.currentStats.criticalRate) + (this.currentStats.additionalCriticalRate || 0)) / 100;
      const currentCritDamage = (this.calculateCriticalDamage(this.currentStats.criticalDamage) + (this.currentStats.additionalCriticalDamage || 0)) / 100;
      const currentPiercing = this.calculatePiercing(this.currentStats.piercing) / 100;
      const currentRemainingDefense = this.monsterDefensePoints * (1 - currentPiercing);
      const currentMonsterReduction = this.calculateMonsterDamageReduction(currentRemainingDefense);
      return (1 - currentCritRate + (currentCritRate * currentCritDamage)) * (1 - currentMonsterReduction) * this.currentStats.attackPower;
    },
    expectedDamageMultiplier() {
      const expectedCritRate = (this.calculateCriticalRate(this.expectedStats.criticalRate) + (this.expectedStats.additionalCriticalRate || 0)) / 100;
      const expectedCritDamage = (this.calculateCriticalDamage(this.expectedStats.criticalDamage) + (this.expectedStats.additionalCriticalDamage || 0)) / 100;
      const expectedPiercing = this.calculatePiercing(this.expectedStats.piercing) / 100;
      const expectedRemainingDefense = this.monsterDefensePoints * (1 - expectedPiercing);
      const expectedMonsterReduction = this.calculateMonsterDamageReduction(expectedRemainingDefense);
      return (1 - expectedCritRate + (expectedCritRate * expectedCritDamage)) * (1 - expectedMonsterReduction) * this.expectedStats.attackPower;
    },
    additionalDamageMultiplier() {
      const expectedAttackPower = this.currentStats.attackPower + this.additionalStats.attackPower;
      const expectedCritRate = (this.calculateCriticalRate(this.currentStats.criticalRate + this.additionalStats.criticalRate) + (this.currentStats.additionalCriticalRate || 0) + (this.additionalStats.additionalCriticalRate || 0)) / 100;
      const expectedCritDamage = (this.calculateCriticalDamage(this.currentStats.criticalDamage + this.additionalStats.criticalDamage) + (this.currentStats.additionalCriticalDamage || 0) + (this.additionalStats.additionalCriticalDamage || 0)) / 100;
      const expectedPiercing = this.calculatePiercing(this.currentStats.piercing + this.additionalStats.piercing) / 100;
      const expectedRemainingDefense = this.monsterDefensePoints * (1 - expectedPiercing);
      const expectedMonsterReduction = this.calculateMonsterDamageReduction(expectedRemainingDefense);

      return (1 - expectedCritRate + (expectedCritRate * expectedCritDamage)) * (1 - expectedMonsterReduction) * expectedAttackPower;
    },
    additionalDamageChange() {
      if (this.currentDamageMultiplier === 0) {
        return 0;
      }
      return ((this.additionalDamageMultiplier / this.currentDamageMultiplier) - 1) * 100;
    },
    damageChange() {
      if (this.currentDamageMultiplier === 0) {
        return 0;
      }
      return ((this.expectedDamageMultiplier / this.currentDamageMultiplier) - 1) * 100;
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
    level() {
      this.saveData();
    },
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
        level: this.level,
        currentStats: this.currentStats,
        expectedStats: this.expectedStats,
        monsterDefensePoints: this.monsterDefensePoints
      };
      localStorage.setItem('statsCalculatorData', JSON.stringify(data));
    },
    calculateCritIncrease(critToAdd) {
      const currentCritRate = (this.calculateCriticalRate(this.currentStats.criticalRate) + this.currentStats.additionalCriticalRate || 0) / 100;
      const currentCritDamage = (this.calculateCriticalDamage(this.currentStats.criticalDamage) + this.currentStats.additionalCriticalDamage || 0) / 100;
      const currentPiercing = this.calculatePiercing(this.currentStats.piercing) / 100;

      const expectedCritRate = (this.calculateCriticalRate(this.currentStats.criticalRate + critToAdd) + this.currentStats.additionalCriticalRate || 0) / 100;
      
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
      const currentCritRate = (this.calculateCriticalRate(this.currentStats.criticalRate) + this.currentStats.additionalCriticalRate || 0) / 100;
      const currentCritDamage = (this.calculateCriticalDamage(this.currentStats.criticalDamage) + this.currentStats.additionalCriticalDamage || 0) / 100;
      const currentPiercing = this.calculatePiercing(this.currentStats.piercing) / 100;

      const expectedCritDamage = (this.calculateCriticalDamage(this.currentStats.criticalDamage + critDmgToAdd) + this.currentStats.additionalCriticalDamage || 0) / 100;
      
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
      const { a, b } = this.formulas.monsterDamageReduction;
      return (a * points) / (b + points);
    },
    calculateCriticalRate(points) {
      if (points <= 0) return 1;
      const { a, b,c } = this.formulas.criticalRate;
      return ((a * 100 * points) / (b + points)) + c;
    },
    calculateCriticalDamage(points) {
      if (points <= 0) return 125;
      const { a, b, c } = this.formulas.criticalDamage;
      const base = (typeof c === 'number') ? c : 1.25;
      return (((a * points) / (b + points)) + base) * 100;
    },
    calculateAccuracy(points) {
      if (points <= 0) return 85;
      const { a, b, c } = this.formulas.accuracy;
      const base = (typeof c === 'number') ? c : 0.85;
      return (((a * points) / (b + points)) / 100 + base) * 100;
    },
    calculatePiercing(points) {
      if (points <= 0) return 0;
      const { a, b } = this.formulas.piercing;
      return (a * points) / (b + points) * 100;
    }
  }
}
</script>

<style scoped>
.calculator-container {
  margin: 10px auto;
  padding: 15px;
  max-width: 1300px;
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
  grid-template-columns: 1fr 1.5fr 1.5fr 1.5fr;
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
  text-align: center;
  width: 150px;
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

.grid-result-final-percent {
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  color: #2c3e50;
  padding-left: 1em;
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
    width: 120px;
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

.note-inline {
  font-size: 0.5em;
  color: #777;
  text-align: center;
  font-weight: normal;
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
