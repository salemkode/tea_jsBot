module.exports = {
  //  التحقق هل الرساله للبوت ام لا

  checker(input) {
    return input.startsWith("عبود") || input.endsWith("عبود");
  },

  // استبدال لكي يعمل

  replace(input) {
    let x = input.toString();
    x = x.replaceAll("ياعبود", "عبود");
    x = x.replaceAll("عبودي", "عبود");
    x = x.replaceAll("ياعبودي", "عبود");
    x = x.replaceAll(" ", "");
    x = x.replaceAll("/n", "");
    x = x.replaceAll("ة", "ه");
    x = x.replaceAll("أ", "ا");
    x = x.replaceAll("القهوه", "قهوه");
    x = x.replaceAll("الشاي", "شاي");
    x = x.replaceAll("البرتقال", "برتقال");
    x = x.replaceAll("اليمون", "ليمون");
    x = x.replaceAll("ماكولات", "اكلات");
    x = x.replaceAll("كولا", "كوكولا");
    x = x.replaceAll("شورما", "شاورما");
    x = x.replaceAll("ليموناضه", "عصيرليمون");
    return x;
  },

  eatReplay(index) {
    let eat = require("./lists").eat;

    let { random } = require("./lib");

    return random(eat.ls4).replaceAll("%3", eat.ls3[index]) + eat.ls2[index];
  },

  drinkReplay(index) {
    let drink = require("./lists").drink;

    let { random } = require("./lib");

    return (
      random(drink.ls4).replaceAll("%3", drink.ls3[index]) + drink.ls2[index]
    );
  },

  random(array = []) {
    return array[Math.floor(Math.random() * array.length)];
  },

  getApi() {
    const prompt = require("prompt-sync")();

    const fs = require("fs");

    const api = prompt("What is your api bot? => ");

    const content = "BOT_TOKEN=" + api;

    fs.writeFile("./.env", content, (err) => {});

    return api;
  },

  replayId(
    ctx,
    txt,
    extra = { reply_to_message_id: ctx.update.message.message_id }
  ) {
    ctx.reply(txt, extra);
  },
  Supporter() {
    const supporter = {
      Elmatador91: "المُثْنىَ الدِمَشْقِي",
    };
    let text = "";
    for (let support in supporter) {
      text += supporter[support] + " : @" + support + "\n";
    }
    return text;
  },
};
