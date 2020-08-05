import './styles.css'
import { numberToCurrencyString } from './utils';

const amountEl = document.getElementById('amount') as HTMLInputElement; // this makes the browswer know it's an HTML element
const billAmountEl = document.getElementById('billAmount') as HTMLSpanElement;
const tipPercentageEl = document.getElementById('tipPercentage') as HTMLSpanElement;
const tipAmountEl = document.getElementById('tipAmount') as HTMLSpanElement;
const totalEl = document.getElementById('total') as HTMLSpanElement;


const tipButtons = document.querySelectorAll('.tipButton') as NodeListOf<HTMLButtonElement>;
tipButtons.forEach(b => b.addEventListener('click', handleTipChange));

let currentTip = .20;




console.log({ amountEl, billAmountEl, tipPercentageEl, tipAmountEl, totalEl });

amountEl.addEventListener('keyup', handleChange);

function handleChange() {
    let billAmount = 0;
    let tipAmount = 0;
    let total = 0;
    if (!isNaN(amountEl.valueAsNumber)) {
        billAmount = amountEl.valueAsNumber;
        tipAmount = amountEl.valueAsNumber * currentTip;
        total = billAmount + tipAmount;
    }
    billAmountEl.innerText = numberToCurrencyString(billAmount); tipPercentageEl.innerText = (currentTip * 100).toString(); tipAmountEl.innerText = numberToCurrencyString(tipAmount); totalEl.innerText = numberToCurrencyString(total);
}

function handleTipChange() {



    const that = this as HTMLButtonElement; // 'this' refers to the element that triggered the event
    // set the currentTip to the data of the element clicked
    currentTip = parseFloat(that.dataset.tip);
    console.log(currentTip);
    // enable the one that was selected before
    (document.querySelector('.tipButton[disabled]') as HTMLButtonElement).disabled = false;
    // disable this button
    that.disabled = true;
    // update the UI
    handleChange();
}