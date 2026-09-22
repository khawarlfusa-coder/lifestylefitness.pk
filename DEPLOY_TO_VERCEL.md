# Git aur Vercel par Live Karne Ka Asaan Tareeqa

Aapko is website ke liye **kisi alag backend server ki zaroorat NAHI hai**! 

Yeh website **Next.js** par bani hai aur **Next.js Vercel ki apni banayi hui technology hai**. Yeh frontend aur backend dono Vercel par **100% FREE** chalati hai.

---

## Step 1: GitHub par Repository Banayein

1. [github.com](https://github.com) par jayein aur apna account login karein.
2. Top right par **"+"** icon daba kar **"New repository"** par click karein.
3. Repository name dein: `lifestyle-fitness-pk`
4. Isko **Public** ya **Private** rakhein aur **"Create repository"** par click karein.

---

## Step 2: Code GitHub par Push Karein

Humne aapke project me **Git pehle hi initialize aur commit kar diya hai**! 
Aapko bas terminal me yeh 2 commands chalani hain:

```bash
# Apne project folder me jayein
cd "C:\Users\USER\.gemini\antigravity\scratch\lifestyle-fitness-pk"

# Apni GitHub repository ka link connect karein (USERNAME ki jagah apna GitHub username likhein)
git remote add origin https://github.com/YOUR_USERNAME/lifestyle-fitness-pk.git

# Code push karein
git push -u origin main
```

---

## Step 3: Vercel par 1-Click Deploy Karein (Bilkul Muft)

1. [vercel.com](https://vercel.com) par jayein aur **"Continue with GitHub"** se login karein.
2. Dashboard par **"Add New..." > "Project"** par click karein.
3. Aapke samne `lifestyle-fitness-pk` ka project nazar aayega, uske aage **"Import"** dabayein.
4. Framework automatically **Next.js** detect ho jaega.
5. Seedha **"Deploy"** button par click kar dein!

### Nateeja:
- 1 minute ke andar aapki website **dunya bhar ke liye live** ho jaegi!
- Vercel aapko free fast URL dega (maslan: `lifestylefitness.vercel.app`).
- Agar aapke paas apni domain hai (jaise `lifestylefitness.pk`), to Vercel Settings me ja kar **"Domains"** me 1 click se connect kar sakte hain wo bhi bilkul free SSL (Green padlock) ke sath!
