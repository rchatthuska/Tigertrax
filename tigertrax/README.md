# TigerTrax

---

### This README is only for our reference right now. We'll change it to a good looking one when we get closer to finishing up

---

## typescript install instructions:
1. get [nodejs](https://nodejs.org/en/download) for ur system (the js compiler everyone uses)
2. make sure u have nodejs installed properly and npm (version checks)
```sh
node -v
npm -v
```

3. install typescript (tsc -v is another version check)
```sh
npm install -g typescript
tsc -v
```

4. make a new proj
```sh
npx tsc --init
```

```ts
// whatevernameuwant.ts
let msg: string = "ok just testing";
console.log(msg);
```

5. compile and voila!
```
npx tsc
```

6. run the generated js file using node
```node whatevernameyouchose.js```

---

### first build

this is how i initialized the app:
```sh
npm install -g create-expo-app
npx create-expo-app my-app -t expo-template-blank-typescript
```

if you wanna test it on all platforms (for mobile use expo go):
```sh
npx expo install react-dom react-native-web
npm install   # ensure you have all the packages you need, but this should get most of em
npx expo start
```

---

## modularization
Super fuckin simple. If you want to move something around, find a good folder name (or a good already existing one).
Make sure to extrapolate all the logic into that one module, and then use export on the functions you need. Sumn like:
```ts
export default function blablabla(important: string): string {
    return important;
}
```

---

## any questions? hit me up. i will for real teach you anything
### — Noah