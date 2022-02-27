const accountListTag = document.querySelector('.account-list');
const addAccountBtn = document.querySelector("#add");
const doubleBtn = document.querySelector("#double");
const inputFrom = document.querySelector ("#input-from");
const inputTo = document.querySelector ("#input-to");
const messageContent = document.querySelector (".message__content");
const billionBtn = document.querySelector ("#check-billionaire");
const millionBtn = document.querySelector ("#check-millionaires");
const currencySelectTag = document.querySelector("#currency");

let accounts = [];
let lastId = 1;

const currencies = {
  USD: {
    value: 1,
    symbol: "$"
  },
  EURO: {
    value: 0.88,
    symbol: "€"
  },
  SOM: {
    value: 84.5,
    symbol: "с"
  }
};

let currentCurrency = currencies[currencySelectTag.value];

currencySelectTag.onchange = () => {
  currentCurrency = currencies[currencySelectTag.value];
  updateAccountList();
};

function parseBalance(num) {
  if (num < 1000) return num;
  const digits = String(num).split("").reverse(); 
  const digits2 = [];
  for (let i = 0; i < digits.length; i++) {
    if (i % 3 === 0) {
      digits2.push(" ");
    }
    digits2.push(digits[i]);
  }
  return digits2.reverse().join("");
}

// console.log(parseBalance(100))
// console.log(parseBalance(1000))
// console.log(parseBalance(10000))
// console.log(parseBalance(100000))

// addAccountBtn.onclick = () => {
//   addNewAccountToList (2, defaultBalance)
//   defaultBalance += 500
// }


function createAccount(id, balance) {
  const accountTag = document.createElement("div");
  accountTag.classList.add("account");

  const accountIdTag = document.createElement("span");
  accountIdTag.classList.add("account__id");
  accountIdTag.textContent = id;

  const accountBalanceTag = document.createElement("span");
  accountBalanceTag.classList.add("account__balance");
  const balanceValue = Math.round(balance * currentCurrency.value);
  accountBalanceTag.textContent = `${parseBalance(balanceValue)} ${currentCurrency.symbol}`;

  const accountBtn = document.createElement("button");
  accountBtn.classList.add("account__btn");
  accountBtn.textContent = "✖︎";

  accountTag.append(accountIdTag, accountBalanceTag, accountBtn);
  return accountTag;
}


//можно и так, но так ты ограничиваешь свои возможности и массив может быть супер огромным
//addNewAccountToList (accounts[0].id, accounts[0].balance)
//addNewAccountToList (accounts[1].id, accounts[1].balance)


//другой способ работы с циклом 
// for (let i = 0; i < accounts.length; i++) {
//   addNewAccountToList (accounts[i].id, accounts[i].balance)
// }


addAccountBtn.onclick = () => {
  const randomBalance = random(1000, 10000);
  accounts.push({ id: lastId, balance: randomBalance });
  messageContent.textContent = `#${lastId} Баланс добавлен`;
  updateAccountList(accounts);
  lastId++;
};

function random (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
//если хотели по порядку, а не рандомно, то 
// let defaultBalance = 1000
 
doubleBtn.onclick = () => {
  accounts = accounts.map((oldAcc) => {
    return {
      ...oldAcc,
      balance: oldAcc.balance * 2
    };
  });
  messageContent.textContent = `Счета удвоены!`;
  updateAccountList(accounts);
};


billionBtn.onclick = () => {
  const hasBillionaire = accounts.some((acc) => acc.balance >= 1000000000);
  if (hasBillionaire) {
    messageTag.textContent = `Миллиардер найден!`;
  } else {
    messageTag.textContent = `Миллиардер не найден`;
  }
};

billionBtn.onclick = () => {
  let hasBillionaire = false;
  for (i = 0; i < accounts.length; i++) {
    if (accounts[i].balance * currentCurrency.value >= 10000000000) {
      hasBillionaire = true;
      break
    }
  }

  // const hasBillionaire = accounts.some ((acc) => acc.balance >= 10000000000);
  if (hasBillionaire) {
    messageContent.textContent = `Миллардер найден!`;
  } else {
    messageContent.textContent = `Миллардер не найден!`;
  }
}

millionBtn.onclick = () => {

  let isAllMillionaires = true 
  for (let i=0; i < accounts.length; i++) {
    if (accounts[i].balance * currentCurrency.value< 1000000) {
      isAllMillionaires = false;
    }

  }
  // const isAllMillionaires = accounts.every ((acc) => acc.balance >= 1000000);

  if (isAllMillionaires) {
    messageContent.textContent = `Все миллионеры!`;
  } else {
    messageContent.textContent = `Не все миллионеры!`;
  }
}

const onFilterAccounts = () => {
  const min = +inputFrom.value;
  const max = +inputTo.value >= min ? +inputTo.value : Infinity;
  const filteredAccounts = accounts.filter(
    (acc) => acc.balance >= min && acc.balance <= max
  );
  updateAccountList(filteredAccounts);
};

inputFrom.oninput = onFilterAccounts;

inputTo.oninput = onFilterAccounts;

function updateAccountList(data) {
  accountListTag.innerHTML = ""; // стирает все что, там есть 
  data.forEach((acc) => { // пробегает циклом 
    accountListTag.append(createAccount(acc.id, acc.balance));
  });
}






