<template>
  <div style="text-align: center; margin-bottom: 20px;">
      <router-link to="/">回到目錄</router-link>
  </div>
  <div id="app">
    <!-- ... 前面所有的 price-table 區塊 ... -->
    <!-- 綠色珠子價格表 -->
    <div class="price-table">
        <h2>綠色珠子</h2>
        <div class="input-group">
            <label for="greenPrice">價格：</label>
            <input type="number" id="greenPrice" v-model.number="greenPrice">
        </div>
        <div class="input-group">
            <label for="blueSellingPriceFromGreen">藍色珠子售價：</label>
            <input type="number" id="blueSellingPriceFromGreen" v-model.number="blueSellingPriceFromGreen">
        </div>
        <div class="input-group">
            <label for="purpleSellingPriceFromGreen">紫色珠子售價：</label>
            <input type="number" id="purpleSellingPriceFromGreen" v-model.number="purpleSellingPriceFromGreen">
        </div>
        <div class="input-group">
            <label for="orangeSellingPriceFromGreen">橘色珠子售價：</label>
            <input type="number" id="orangeSellingPriceFromGreen" v-model.number="orangeSellingPriceFromGreen">
        </div>
        <p>藍色珠子成本：{{ bluePriceFromGreen }}</p>
        <p>紫色珠子成本：{{ purplePriceFromGreen }}</p>
        <p>橘色珠子成本：{{ orangePriceFromGreen }}</p>
        <p>藍色珠子期望收益：{{ blueExpectedProfitFromGreen }}</p>
        <p>紫色珠子期望收益：{{ purpleExpectedProfitFromGreen }}</p>
        <p>橘色珠子期望收益：{{ orangeExpectedProfitFromGreen }}</p>
    </div>

    <!-- 藍色珠子價格表 -->
    <div class="price-table">
        <h2>藍色珠子</h2>
        <div class="input-group">
            <label for="bluePrice">價格：</label>
            <input type="number" id="bluePrice" v-model.number="bluePrice">
        </div>
        <div class="input-group">
            <label for="purpleSellingPriceFromBlue">紫色珠子售價：</label>
            <input type="number" id="purpleSellingPriceFromBlue" v-model.number="purpleSellingPriceFromBlue">
        </div>
        <div class="input-group">
            <label for="orangeSellingPriceFromBlue">橘色珠子售價：</label>
            <input type="number" id="orangeSellingPriceFromBlue" v-model.number="orangeSellingPriceFromBlue">
        </div>
        <p>紫色珠子成本：{{ purplePriceFromBlue }}</p>
        <p>橘色珠子成本：{{ orangePriceFromBlue }}</p>
         <p>紫色珠子期望收益：{{ purpleExpectedProfitFromBlue }}</p>
        <p>橘色珠子期望收益：{{ orangeExpectedProfitFromBlue }}</p>
    </div>

    <!-- 紫色珠子價格表 -->
    <div class="price-table">
        <h2>紫色珠子</h2>
        <div class="input-group">
            <label for="purplePrice">價格：</label>
            <input type="number" id="purplePrice" v-model.number="purplePrice">
        </div>
         <div class="input-group">
            <label for="orangeSellingPriceFromPurple">橘色珠子售價：</label>
            <input type="number" id="orangeSellingPriceFromPurple" v-model.number="orangeSellingPriceFromPurple">
        </div>
        <p>橘色珠子成本：{{ orangePriceFromPurple }}</p>
        <p>橘色珠子期望收益：{{ orangeExpectedProfitFromPurple }}</p>
    </div>
    <!-- 移到最下面的輸入 -->
    <div class="input-group bottom-rate">
      <label for="goldToCrystalRate">1金幣 = </label>
      <input type="number" id="goldToCrystalRate" v-model.number="goldToCrystalRate">
      神石
    </div>
  </div>
</template>

<script>
export default {
  name: 'MantraCalculator',
  data() {
    return {
        greenPrice: localStorage.getItem('greenPrice') || 0, // 綠色珠子價格
        bluePrice: localStorage.getItem('bluePrice') || 0, // 藍色珠子價格
        purplePrice: localStorage.getItem('purplePrice') || 0, // 紫色珠子價格
        blueSellingPriceFromGreen: localStorage.getItem('blueSellingPriceFromGreen') || 0, // 藍色珠子售價 (從綠色合成)
        purpleSellingPriceFromGreen: localStorage.getItem('purpleSellingPriceFromGreen') || 0, // 紫色珠子售價 (從綠色合成)
        orangeSellingPriceFromGreen: localStorage.getItem('orangeSellingPriceFromGreen') || 0, // 橘色珠子售價 (從綠色合成)
        purpleSellingPriceFromBlue: localStorage.getItem('purpleSellingPriceFromBlue') || 0, // 紫色珠子售價 (從藍色合成)
        orangeSellingPriceFromBlue: localStorage.getItem('orangeSellingPriceFromBlue') || 0, // 橘色珠子售價 (從藍色合成)
        orangeSellingPriceFromPurple: localStorage.getItem('orangeSellingPriceFromPurple') || 0, // 橘色珠子售價 (從紫色合成)
        goldToCrystalRate: localStorage.getItem('goldToCrystalRate') || 0 // 金幣換神石比例
    }
  },
  computed: {
    // 根據綠色珠子價格計算藍色、紫色、橘色珠子價格
    bluePriceFromGreen: function() {
        return this.greenPrice * 9 + 2 * this.goldToCrystalRate;
    },
    purplePriceFromGreen: function() {
        return (this.greenPrice * 9 + 2 * this.goldToCrystalRate) * 9 + 2 * this.goldToCrystalRate * 2;
    },
    orangePriceFromGreen: function() {
        return ((this.greenPrice * 9 + 2 * this.goldToCrystalRate) * 9 + 2 * this.goldToCrystalRate * 2) * 9 + 2 * this.goldToCrystalRate * 4;
    },
    // 根據藍色珠子價格計算紫色、橘色珠子價格
    purplePriceFromBlue: function() {
        return this.bluePrice * 9 + 2 * this.goldToCrystalRate * 2;
    },
    orangePriceFromBlue: function() {
        return (this.bluePrice * 9 + 2 * this.goldToCrystalRate * 2) * 9 + 2 * this.goldToCrystalRate * 4;
    },
    // 根據紫色珠子價格計算橘色珠子價格
    orangePriceFromPurple: function() {
        return this.purplePrice * 9 + 2 * this.goldToCrystalRate * 4;
    },
    // 根據綠色珠子計算的期望收益
    blueExpectedProfitFromGreen: function() {
        return (this.blueSellingPriceFromGreen * 0.916 - this.bluePriceFromGreen).toFixed(0);
    },
    purpleExpectedProfitFromGreen: function() {
        return (this.purpleSellingPriceFromGreen * 0.916 - this.purplePriceFromGreen).toFixed(0);
    },
    orangeExpectedProfitFromGreen: function() {
        return (this.orangeSellingPriceFromGreen * 0.916 - this.orangePriceFromGreen).toFixed(0);
    },
    // 根據藍色珠子計算的期望收益
    purpleExpectedProfitFromBlue: function() {
        return (this.purpleSellingPriceFromBlue * 0.916 - this.purplePriceFromBlue).toFixed(0);
    },
    orangeExpectedProfitFromBlue: function() {
        return (this.orangeSellingPriceFromBlue * 0.916 - this.orangePriceFromBlue).toFixed(0);
    },
    // 根據紫色珠子計算的期望收益
    orangeExpectedProfitFromPurple: function() {
        return (this.orangeSellingPriceFromPurple * 0.916 - this.orangePriceFromPurple).toFixed(0);
    }
  },
  watch: {
    greenPrice: function(newVal) {
        localStorage.setItem('greenPrice', newVal);
    },
    bluePrice: function(newVal) {
        localStorage.setItem('bluePrice', newVal);
    },
    purplePrice: function(newVal) {
        localStorage.setItem('purplePrice', newVal);
    },
    blueSellingPriceFromGreen: function(newVal) {
        localStorage.setItem('blueSellingPriceFromGreen', newVal);
    },
    purpleSellingPriceFromGreen: function(newVal) {
        localStorage.setItem('purpleSellingPriceFromGreen', newVal);
    },
    orangeSellingPriceFromGreen: function(newVal) {
        localStorage.setItem('orangeSellingPriceFromGreen', newVal);
    },
    purpleSellingPriceFromBlue: function(newVal) {
        localStorage.setItem('purpleSellingPriceFromBlue', newVal);
    },
    orangeSellingPriceFromBlue: function(newVal) {
        localStorage.setItem('orangeSellingPriceFromBlue', newVal);
    },
    orangeSellingPriceFromPurple: function(newVal) {
        localStorage.setItem('orangeSellingPriceFromPurple', newVal);
    },
    goldToCrystalRate: function(newVal) {
        localStorage.setItem('goldToCrystalRate', newVal);
    }
  }
}
</script>
