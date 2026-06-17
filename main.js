"use strict";
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
});
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            var _a;
            const tabId = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            if (tabId) {
                (_a = document.getElementById(tabId)) === null || _a === void 0 ? void 0 : _a.classList.add('active');
            }
        });
    });
    const subTabBtns = document.querySelectorAll('.sub-tab-btn');
    subTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            var _a;
            const subTabId = btn.dataset.subTab;
            subTabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.sub-tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            if (subTabId) {
                (_a = document.getElementById(subTabId)) === null || _a === void 0 ? void 0 : _a.classList.add('active');
            }
        });
    });
    const modeTabBtns = document.querySelectorAll('.mode-tab-btn');
    modeTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const container = btn.closest('.sub-tab-content, .tab-content');
            const mode = btn.dataset.mode || btn.dataset.fundMode;
            if (container) {
                container.querySelectorAll('.mode-tab-btn').forEach(b => b.classList.remove('active'));
                container.querySelectorAll('.mode-content').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                if (mode) {
                    const modeContent = container.querySelector(btn.dataset.mode ? '#mode-' + mode : '#fund-mode-' + mode);
                    modeContent === null || modeContent === void 0 ? void 0 : modeContent.classList.add('active');
                }
            }
        });
    });
}
function calculateByAmount() {
    const existingWeight = parseFloat(document.getElementById('existing-weight-amount').value);
    const existingPrice = parseFloat(document.getElementById('existing-price-amount').value);
    const newAmount = parseFloat(document.getElementById('new-amount').value);
    const newPrice = parseFloat(document.getElementById('new-price-amount').value);
    if (isNaN(existingWeight) || isNaN(existingPrice) || isNaN(newAmount) || isNaN(newPrice)) {
        alert('请填写所有输入项');
        return;
    }
    const existingCost = existingWeight * existingPrice;
    const newWeight = newAmount / newPrice;
    const newTotalWeight = existingWeight + newWeight;
    const newTotalCost = existingCost + newAmount;
    const newAvgPrice = newTotalCost / newTotalWeight;
    displayDepositResult(newTotalWeight, newTotalCost, newAvgPrice);
}
function calculateByWeight() {
    const existingWeight = parseFloat(document.getElementById('existing-weight-weight').value);
    const existingPrice = parseFloat(document.getElementById('existing-price-weight').value);
    const newWeight = parseFloat(document.getElementById('new-weight').value);
    const newPrice = parseFloat(document.getElementById('new-price-weight').value);
    if (isNaN(existingWeight) || isNaN(existingPrice) || isNaN(newWeight) || isNaN(newPrice)) {
        alert('请填写所有输入项');
        return;
    }
    const existingCost = existingWeight * existingPrice;
    const newCost = newWeight * newPrice;
    const newTotalWeight = existingWeight + newWeight;
    const newTotalCost = existingCost + newCost;
    const newAvgPrice = newTotalCost / newTotalWeight;
    displayDepositResult(newTotalWeight, newTotalCost, newAvgPrice);
}
function calculateByPercentage() {
    const existingPrice = parseFloat(document.getElementById('existing-price-percent').value);
    const newPercent = parseFloat(document.getElementById('new-percent').value);
    const newPrice = parseFloat(document.getElementById('new-price-percent').value);
    if (isNaN(existingPrice) || isNaN(newPercent) || isNaN(newPrice)) {
        alert('请填写所有输入项');
        return;
    }
    const newTotalWeight = 100 + newPercent;
    const newTotalCost = 100 * existingPrice + newPercent * newPrice;
    const newAvgPrice = newTotalCost / newTotalWeight;
    displayDepositResult(newTotalWeight, newTotalCost, newAvgPrice, true);
}
function displayDepositResult(weight, cost, avgPrice, isPercent = false) {
    const weightEl = document.getElementById('new-total-weight');
    const costEl = document.getElementById('new-total-cost');
    const priceEl = document.getElementById('new-avg-price');
    if (weightEl) {
        if (isPercent) {
            weightEl.textContent = weight.toFixed(2) + '% 权重';
        }
        else {
            weightEl.textContent = weight.toFixed(4) + ' 克';
        }
    }
    if (costEl) {
        costEl.textContent = '¥' + cost.toFixed(2);
    }
    if (priceEl) {
        priceEl.textContent = '¥' + avgPrice.toFixed(4);
    }
}
function calculateFundByAmount() {
    const existingWeight = parseFloat(document.getElementById('fund-existing-weight-amount').value);
    const existingPrice = parseFloat(document.getElementById('fund-existing-price-amount').value);
    const newAmount = parseFloat(document.getElementById('fund-new-amount').value);
    const newPrice = parseFloat(document.getElementById('fund-new-price-amount').value);
    if (isNaN(existingWeight) || isNaN(existingPrice) || isNaN(newAmount) || isNaN(newPrice)) {
        alert('请填写所有输入项');
        return;
    }
    const existingCost = existingWeight * existingPrice;
    const newWeight = newAmount / newPrice;
    const newTotalWeight = existingWeight + newWeight;
    const newTotalCost = existingCost + newAmount;
    const newAvgPrice = newTotalCost / newTotalWeight;
    displayFundResult(newTotalWeight, newTotalCost, newAvgPrice);
}
function calculateFundByWeight() {
    const existingWeight = parseFloat(document.getElementById('fund-existing-weight-weight').value);
    const existingPrice = parseFloat(document.getElementById('fund-existing-price-weight').value);
    const newWeight = parseFloat(document.getElementById('fund-new-weight').value);
    const newPrice = parseFloat(document.getElementById('fund-new-price-weight').value);
    if (isNaN(existingWeight) || isNaN(existingPrice) || isNaN(newWeight) || isNaN(newPrice)) {
        alert('请填写所有输入项');
        return;
    }
    const existingCost = existingWeight * existingPrice;
    const newCost = newWeight * newPrice;
    const newTotalWeight = existingWeight + newWeight;
    const newTotalCost = existingCost + newCost;
    const newAvgPrice = newTotalCost / newTotalWeight;
    displayFundResult(newTotalWeight, newTotalCost, newAvgPrice);
}
function displayFundResult(weight, cost, avgPrice) {
    const weightEl = document.getElementById('fund-new-total-weight');
    const costEl = document.getElementById('fund-new-total-cost');
    const priceEl = document.getElementById('fund-new-avg-price');
    if (weightEl) {
        weightEl.textContent = weight.toFixed(4) + ' 份';
    }
    if (costEl) {
        costEl.textContent = '¥' + cost.toFixed(2);
    }
    if (priceEl) {
        priceEl.textContent = '¥' + avgPrice.toFixed(4);
    }
}
