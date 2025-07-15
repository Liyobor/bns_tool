// app.js
new Vue({
    el: '#app',
    data: {
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
});