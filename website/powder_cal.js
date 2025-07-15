// app2.js
new Vue({
    el: '#powder_cal',
    data: {
        desertQiPrice: localStorage.getItem('desertQiPrice') || 0,
        moonwaterQiPrice: localStorage.getItem('moonwaterQiPrice') || 0,
        powderPriceForProfit: localStorage.getItem('powderPriceForProfit') || 0,
        goldToCrystalRate: localStorage.getItem('goldToCrystalRate') || 0,
        sellingPrice1: localStorage.getItem('sellingPrice1') || 0,
        sellingPrice2: localStorage.getItem('sellingPrice2') || 0,
        sellingPrice3: localStorage.getItem('sellingPrice3') || 0,
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
});