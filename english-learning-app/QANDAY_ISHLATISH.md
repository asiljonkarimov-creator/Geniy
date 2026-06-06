# 🚀 QANDAY ISHLATISH - BOSQICHMA-BOSQICH

## ⚠️ MUHIM: Nima Uchun Oddiy Ochsangiz Ishlamaydi?

Brauzer xavfsizlik sababli mahalliy JavaScript fayllariga ruxsat bermaydi. Shuning uchun **server** kerak!

---

## ✅ 3 TA OSON USUL

### 🔵 **USUL 1: Tayyor Fayl Bilan (Eng Oson!)**

#### Windows:
1. `english-learning-app` papkasiga kiring
2. `START_SERVER.bat` faylni **ikki marta** bosing
3. Brauzer avtomatik ochiladi!
4. Agar ochilmasa: http://localhost:8000 ga o'zing kir

#### Mac / Linux:
1. `english-learning-app` papkasiga kiring
2. Terminal'ni oching (papkada o'ng tugma → "Open in Terminal")
3. Yozish:
```bash
chmod +x START_SERVER.sh
./START_SERVER.sh
```
4. Brauzer avtomatik ochiladi!

---

### 🔵 **USUL 2: Python (Qo'lda - 3 qadam)**

#### Tekshirish - Python o'rnatilganmi?
```bash
# Terminal/CMD'ni oching va yozing:
python --version
# yoki
python3 --version
```

Agar raqam ko'rsatsa (masalan, Python 3.10.0) - Python bor! ✅

#### Agar Python bo'lmasa:
**Windows:** https://www.python.org/downloads/ dan yuklab oling
**Mac:** o'rnatilgan bo'lishi kerak
**Linux:** 
```bash
sudo apt install python3
```

#### Server ishga tushirish:

**Windows:**
```cmd
1. Win+R bosing
2. Yozing: cmd
3. Papkaga boring:
   cd Desktop\Geniy-main\english-learning-app
4. Server ishga tushiring:
   python -m http.server 8000
5. Brauzerni oching: http://localhost:8000
```

**Mac/Linux:**
```bash
1. Terminal'ni oching
2. Papkaga boring:
   cd ~/Downloads/Geniy-main/english-learning-app
3. Server ishga tushiring:
   python3 -m http.server 8000
4. Brauzerni oching: http://localhost:8000
```

---

### 🔵 **USUL 3: Live Server Extension (VS Code)**

Agar VS Code o'rnatilgan bo'lsa:

1. VS Code'ni oching
2. `english-learning-app` papkasini oching
3. Extensions (Ctrl+Shift+X) → "Live Server" o'rnatish
4. `index.html` faylni oching
5. Pastki o'ng burchakda "Go Live" tugmasini bosing

---

## 🎯 SERVERLAR TAQQOSLASH:

| Usul | Osonlik | Vaqt | Tavsiya |
|------|---------|------|---------|
| START_SERVER.bat/sh | ⭐⭐⭐⭐⭐ | 5 soniya | ✅ ENG YAXSHI |
| Python (qo'lda) | ⭐⭐⭐⭐ | 1 daqiqa | ✅ Yaxshi |
| VS Code Live Server | ⭐⭐⭐ | 2 daqiqa | Agar VS Code bo'lsa |

---

## 🐛 MUAMMOLAR VA YECHIMLAR:

### ❌ "Python command not found"
**Yechim:** Python o'rnatilmagan
- Windows: https://www.python.org/downloads/
- O'rnatishda "Add Python to PATH" ni belgilash!

### ❌ "Port 8000 already in use"
**Yechim:** Boshqa port ishlatish:
```bash
python -m http.server 8080
# Keyin: http://localhost:8080
```

### ❌ Brauzer ochilmaydi
**Yechim:** Qo'lda oching:
- Chrome/Firefox ochish
- Address bar'ga yozish: `http://localhost:8000`

### ❌ "Permission denied" (Mac/Linux)
**Yechim:** 
```bash
chmod +x START_SERVER.sh
```

### ❌ Sahifa ochildi lekin bo'sh
**Yechim:** 
1. F12 bosish (Developer Tools)
2. Console'ni ko'rish - xatolar bormi?
3. Agar "CORS error" ko'rsatsa - server orqali ochish kerak (yuqoridagi usullar)

---

## 📱 SERVER TO'XTATISH:

**Barcha usullarda:**
- Terminal/CMD oynasida **Ctrl+C** bosing
- Yoki oynani yoping

---

## 🌐 BOSHQA QURILMALARDAN KIRISH:

Telefon yoki planshetdan test qilish:

1. Kompyuterda serverni ishga tushiring
2. Kompyuteringizning IP manzilini toping:

**Windows:**
```cmd
ipconfig
# IPv4 Address: 192.168.x.x
```

**Mac/Linux:**
```bash
ifconfig
# inet 192.168.x.x
```

3. Telefonda brauzerni oching:
```
http://192.168.x.x:8000
```

**Muhim:** Telefon va kompyuter bir Wi-Fi'da bo'lishi kerak!

---

## ✅ HAMMASI TO'G'RI ISHLAGANINI QANDAY BILISH:

Server to'g'ri ishlaganda:
- ✅ Brauzerda rang-barang sahifa ochiladi
- ✅ "Salom, Do'stim!" yozuvi ko'rinadi
- ✅ Ismni kiritish input'i bor
- ✅ "Boshlaymiz!" tugmasi bosiladi
- ✅ O'yinlar sahifasi ochiladi

---

## 🎮 FOYDALANISH:

1. **Ismni kiriting** - bolangizning ismi
2. **"Boshlaymiz!" tugmasini bosing**
3. **O'yinni tanlang:**
   - 🔤 Alifbo - harflarni o'rganish
   - 🎨 Ranglar - ranglarni o'rganish
   - 🔢 Raqamlar - sanashni o'rganish
   - 🎯 So'z Topish - so'zlarni moslashtirish

4. **O'rganishni boshlang!**

---

## 📞 YORDAM KERAKMI?

Agar hali ham ishlamasa:

1. **Screenshot oling** - xato xabarini
2. **Qaysi usuldan foydalandingiz?**
3. **Qaysi operatsion tizim?** (Windows/Mac/Linux)
4. **Menga yuboring** - men yordam beraman!

---

## 🎉 MUVAFFAQIYAT!

Agar server ishga tushsa va sahifa ochilsa - **TABRIKLAYMAN!** 🎊

Bolangiz bilan birga ingliz tilini qiziqarli o'rganing! 🚀📚

---

**Oxirgi yangilanish:** 2026-06-06
**Versiya:** 1.0
