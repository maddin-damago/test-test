import { expect, jest } from "@jest/globals";
import {
  buyCoffee,
  calculatePrice,
  isAvailableBeverage,
} from "./coffee_automat";

describe("Überprüfe die Preise", () => {
  it("Wenn espresso das getränk ist soll der preis 1.5 sein", () => {
    expect(calculatePrice({ drink: "espresso" })).toBe(1.5);
  });
  it("Wenn cappuccino das getränk ist soll der preis 2.0 sein", () => {
    expect(calculatePrice({ drink: "cappuccino" })).toBe(2.0);
  });
  it("Wenn latte das getränk ist soll der preis 2.5 sein", () => {
    expect(calculatePrice({ drink: "latte" })).toBe(2.5);
  });
});

describe("Montagsrabatt 20%", () => {
  it("Wenn montag und espresso das getränk ist soll der preis 1.2 sein", () => {
    expect(calculatePrice({ drink: "espresso", weekday: "monday" })).toBe(1.2);
  });
  it("Wenn montag und cappuccino das getränk ist soll der preis 1.2 sein", () => {
    expect(calculatePrice({ drink: "cappuccino", weekday: "monday" })).toBe(
      1.6,
    );
  });
  it("Wenn montag und latte das getränk ist soll der preis 1.2 sein", () => {
    expect(calculatePrice({ drink: "latte", weekday: "monday" })).toBe(2.0);
  });
});

describe("Bezahlung nicht ausreichend testen", () => {
  it("wenn getränk cappuccino und coins < 2.0, fail meldung", () => {
    expect(buyCoffee({ drink: "cappuccino", coins: 1.5 })).toBe(
      "Zu wenig Geld",
    );
  });
});

describe("Nicht existentes Produkt mit Fehlermeldung bedienen", () => {
  it("Nicht existentes Produkt gibt false zurück", () => {
    expect(isAvailableBeverage("pizza")).toBe(false);
  });
  it("Existentes Produkt gibt true zurück", () => {
    expect(isAvailableBeverage("latte")).toBe(true);
  });
});

describe("test calculatePrice with non existent product", () => {
  it("should return price 0 for further logic based on it when non existent product is choosen", () => {
    expect(calculatePrice("pizza")).toBe(0);
  });
});

describe("Give back product with change and message", () => {
  it("should return an object with the product, fitting change and a message", () => {
    const returnObj = {
      drink: "espresso",
      change: 0.5,
      message: "Bitte sehr!",
    };

    expect(buyCoffee({ drink: "espresso", coins: 2.0, random: 1 })).toEqual(
      returnObj,
    );
  });
  it("should return an object with the product, fitting change for discounted price and a message", () => {
    const returnObj = {
      drink: "espresso",
      change: 0.8,
      message: "Bitte sehr!",
    };

    expect(
      buyCoffee({
        drink: "espresso",
        coins: 2.0,
        weekday: "monday",
        random: 1,
      }),
    ).toEqual(returnObj);
  });
});

describe("Münzschlucker testen", () => {
  it("Münzschlucker aktiv returned drink null, change 0 und passende Meldung", () => {
    const returnObj = {
      drink: null,
      change: 0,
      message: "Der Automat hat Ihre Münzen verschluckt!",
    };

    expect(buyCoffee({ drink: "espresso", coins: 2.0, random: 0.09 })).toEqual(
      returnObj,
    );
  });
});
