import { readFileSync } from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const match = html.match(/<script id="logic">([\s\S]*?)<\/script>/);
assert.ok(match, "logic script missing");
const context = {};
vm.createContext(context);
vm.runInContext(match[1], context);
const RS = context.RS;
assert.ok(RS && RS.computeSplit, "RS not exported");

const silk = `
1 Blackened Chicken Sandwich          $17.00
1 Southern Style Chicken Sandwich     $17.00
1 Bramble Sidecar                     $15.00
1 Cucumber Spritz                     $12.00
2 Stella Artois                       $12.00
2 Founders Solid Gold Draft           $12.00
1 Cheese Steak Egg Rolls              $15.00
1 Chicken Wings
Buffalo                               $16.00
2 Lychee Sunrise                      $28.00
1 Love City Pilsner                   $8.00
Subtotal                              $152.00
Tax                                   $13.90
Total                                 $165.90
20%: (Tip $30.40 Total $196.30)
`;

const parsed = RS.parseReceiptText(silk);
const asPairs = (list) => Array.from(list, (it) => [it.name, it.price]);
assert.deepEqual(asPairs(parsed.items), [
  ["Blackened Chicken Sandwich", 17],
  ["Southern Style Chicken Sandwich", 17],
  ["Bramble Sidecar", 15],
  ["Cucumber Spritz", 12],
  ["Stella Artois × 2", 12],
  ["Founders Solid Gold Draft × 2", 12],
  ["Cheese Steak Egg Rolls", 15],
  ["Chicken Wings Buffalo", 16],
  ["Lychee Sunrise × 2", 28],
  ["Love City Pilsner", 8]
]);
assert.equal(parsed.detectedTotal, 165.90);
assert.equal(RS.withTwentyTip(parsed.detectedTotal, 152), 196.30);

const krogh = `
Burnt Mills Pear                 $7.50     $7.50
Discount Veteran's Discount      -$0.75
Hop Pop IPA                      $8.00     $8.00
+Extra Cheese (3)                $3.00     $3.00
House Salad - Small   1   $7.00   $7.00
Subtotal                         $160.90
Discounts Included               -$20.10
Tax                              $11.98
Credit Card Surcharge            $5.79
Credit Card Total                $158.57
10% $22.56
20% $36.18
Please note, we impose a surcharge of 3% which is $5.79
`;
const kro = RS.parseReceiptText(krogh);
assert.deepEqual(asPairs(kro.items), [
  ["Burnt Mills Pear", 7.5],
  ["Discount Veteran's Discount", -0.75],
  ["Hop Pop IPA", 8],
  ["+Extra Cheese (3)", 3],
  ["House Salad - Small", 7]
]);
assert.equal(kro.detectedTotal, 158.57);

const people = [
  { id: "us", name: "Us", color: "#a33d22" },
  { id: "them", name: "Them", color: "#1f6b45" }
];
const ours = new Set(["Blackened Chicken Sandwich", "Southern Style Chicken Sandwich", "Stella Artois × 2", "Founders Solid Gold Draft × 2"]);
const items = parsed.items.map((it, i) => ({
  id: "i" + i,
  name: it.name,
  price: it.price,
  who: [ours.has(it.name) ? "us" : "them"]
}));
const split = RS.computeSplit(items, people, 196.30);
assert.equal(split.itemSum, 152);
assert.equal(split.unassignedSum, 0);
assert.equal(split.extras, 44.30);
assert.equal(split.people[0].itemsTotal, 58);
assert.equal(split.people[1].itemsTotal, 94);
assert.equal(split.people[0].owes, 74.90);
assert.equal(split.people[1].owes, 121.40);
assert.equal(split.balanced, true);
assert.equal(split.owesSum, 196.30);

const shared = RS.computeSplit(
  [{ id: "a", name: "Fries", price: 10.01, who: ["us", "them"] }],
  people,
  10.01
);
assert.equal(shared.people[0].itemsTotal + shared.people[1].itemsTotal, 10.01);
assert.equal(shared.people[0].owes + shared.people[1].owes, 10.01);
assert.equal(shared.balanced, true);

const odd = RS.computeSplit(
  [
    { id: "a", name: "A", price: 10, who: ["us"] },
    { id: "b", name: "B", price: 10, who: ["them"] }
  ],
  people,
  20.01
);
assert.equal(Math.round((odd.people[0].owes + odd.people[1].owes) * 100), 2001);
assert.equal(odd.balanced, true);

const discount = RS.computeSplit(
  [
    { id: "a", name: "Meal", price: 20, who: ["us"] },
    { id: "b", name: "Discount", price: -2, who: ["us"] },
    { id: "c", name: "Beer", price: 10, who: ["them"] }
  ],
  people,
  30
);
assert.equal(discount.people[0].itemsTotal, 18);
assert.equal(discount.people[1].itemsTotal, 10);
assert.equal(Math.round((discount.people[0].owes + discount.people[1].owes) * 100), 3000);
assert.equal(discount.balanced, true);

const open = RS.computeSplit(
  [
    { id: "a", name: "Mine", price: 10, who: ["us"] },
    { id: "b", name: "Loose", price: 4, who: [] }
  ],
  people,
  20
);
assert.equal(open.unassignedSum, 4);
assert.equal(open.balanced, false);
assert.equal(open.people[1].owes, 0);

const even = RS.computeSplit([], people, 40);
assert.equal(even.people[0].owes, 20);
assert.equal(even.people[1].owes, 20);
assert.equal(even.balanced, true);

assert.equal(RS.parseItemPrice("-$0.75"), -0.75);
assert.equal(RS.parseItemPrice("$16.50"), 16.5);
assert.equal(RS.parsePaid(""), null);
assert.equal(RS.formatMoney(-0.75), "-$0.75");

console.log("logic tests passed");
