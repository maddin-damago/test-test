const preise = {
  espresso: 1.5,
  cappuccino: 2.0,
  latte: 2.5,
};

export function buyCoffee({ drink, coins, weekday, random }) {
  const toPay = calculatePrice({ drink, weekday });
  if (coins < toPay) {
    return "Zu wenig Geld";
  }
  const change = coins - toPay;

  if (random >= 0.1) {
    return {
      drink,
      change,
      message: "Bitte sehr!",
    };
  }

  return {
    drink: null,
    change: 0,
    message: "Der Automat hat Ihre Münzen verschluckt!",
  };
}

export function calculatePrice({ drink, weekday }) {
  if (isAvailableBeverage(drink) === false) {
    return 0;
  }
  let preis = preise[drink];
  if (weekday === "monday") {
    preis = preis * 0.8;
  }
  return +preis.toFixed(1);
}

export function isAvailableBeverage(drink) {
  if (!Object.keys(preise).includes(drink)) {
    return false;
  }
  return true;
}
