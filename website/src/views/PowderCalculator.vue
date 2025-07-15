<template>
  <div style="text-align: center; margin-bottom: 20px;">
      <router-link to="/">回到目錄</router-link>
  </div>
  <div id="powder_cal">
    <div class="calculators-container">
        <div class="price-table">
            <h2>精氣價格</h2>
            <div class="input-group">
                <label for="desertQiPrice">大漠精氣價格：</label>
                <input type="number" id="desertQiPrice" v-model.number="desertQiPrice">
            </div>
            <p>破碎結晶價格：{{ desertPowderPrice }}</p>
    
            <div class="input-group">
                <label for="moonwaterQiPrice">水月精氣價格：</label>
                <input type="number" id="moonwaterQiPrice" v-model.number="moonwaterQiPrice">
            </div>
            <p>破碎結晶價格：{{ moonwaterPowderPrice }}</p>
        </div>
    
        <div class="price-table profit-table">
            <h2>製作收益</h2>
            <div class="input-group">
                <label for="powderPriceForProfit">粉末價格(結晶x3)：</label>
                <input type="number" id="powderPriceForProfit" v-model.number="powderPriceForProfit">
            </div>
            <div class="input-group bottom-rate">
                <label for="goldToCrystalRate">1金幣 = </label>
                <input type="number" id="goldToCrystalRate" v-model.number="goldToCrystalRate">
                神石
            </div>
            <div class="profit-sub-block">
                <h3>緊急修理工具</h3>
                <div class="input-group">
                    <label for="sellingPrice1">售價(單價)：</label>
                    <input type="number" id="sellingPrice1" v-model.number="sellingPrice1"> 神石
                </div>
                <p>收益 : {{ dummyProfit1 }} 神石 / 50粉末</p>
            </div>
            <div class="profit-sub-block">
                <h3>印章箱</h3>
                <div class="input-group">
                    <label for="sellingPrice2">售價(單價)：</label>
                    <input type="number" id="sellingPrice2" v-model.number="sellingPrice2"> 神石
                </div>
                <p>收益 : {{ dummyProfit2 }} 神石 / 50粉末</p>
            </div>
            <div class="profit-sub-block">
                <h3>封印符包</h3>
                <div class="input-group">
                    <label for="sellingPrice3">售價(單價)：</label>
                    <input type="number" id="sellingPrice3" v-model.number="sellingPrice3"> 神石
                </div>
                <p>收益 : {{ dummyProfit3 }} 神石 / 50粉末</p>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PowderCalculator',
  data() {
    return {
        desertQiPrice: localStorage.getItem('desertQiPrice') || 0,
        moonwaterQiPrice: localStorage.getItem('moonwaterQiPrice') || 0,
        powderPriceForProfit: localStorage.getItem('powderPriceForProfit') || 0,
        goldToCrystalRate: localStorage.getItem('goldToCrystalRate') || 0,
        sellingPrice1: localStorage.getItem('sellingPrice1') || 0,
        sellingPrice2: localStorage.getItem('sellingPrice2') || 0,
        sellingPrice3: localStorage.getItem('sellingPrice3') || 0,
    }
  },
  computed: {
    desertPowderPrice: function() {
        return (this.desertQiPrice / 4.485).toFixed(2);
    },
    moonwaterPowderPrice: function() {
        return (this.moonwaterQiPrice / 4.3).toFixed(2);
    },
    dummyProfit1: function() {
        const profitFor20Tools = (this.sellingPrice1 * 20 * 0.916) - (0.4 * this.goldToCrystalRate) - (this.powderPriceForProfit * 72);
        return (profitFor20Tools / 72 * 50).toFixed(2);
    },
    dummyProfit2: function() {
        const profitFor3Boxes = (this.sellingPrice2 * 3 * 0.916) - (this.powderPriceForProfit * 36) - (1 * this.goldToCrystalRate);
        return (profitFor3Boxes / 36 * 50).toFixed(2);
    },
    dummyProfit3: function() {
        const profitFor1Pack = (this.sellingPrice3 * 0.916) - (this.powderPriceForProfit * 27) - (0.3 * this.goldToCrystalRate);
        return (profitFor1Pack / 27 * 50).toFixed(2);
    }
  },
  watch: {
    desertQiPrice: function(newVal) {
        localStorage.setItem('desertQiPrice', newVal);
    },
    moonwaterQiPrice: function(newVal) {
        localStorage.setItem('moonwaterQiPrice', newVal);
    },
    powderPriceForProfit: function(newVal) {
        localStorage.setItem('powderPriceForProfit', newVal);
    },
    goldToCrystalRate: function(newVal) {
        localStorage.setItem('goldToCrystalRate', newVal);
    },
    sellingPrice1: function(newVal) {
        localStorage.setItem('sellingPrice1', newVal);
    },
    sellingPrice2: function(newVal) {
        localStorage.setItem('sellingPrice2', newVal);
    },
    sellingPrice3: function(newVal) {
        localStorage.setItem('sellingPrice3', newVal);
    },
  }
}
</script>
