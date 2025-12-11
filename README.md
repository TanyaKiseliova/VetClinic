# VetClinic "Хвостатый доктор"
# ![Logo](/img/icons/pawIconColored.png)

is a website for a vet clinic with custom interactive svg map and cloud DB (Supabase).

**Live Demo** : [deployed project on Vercel](https://vet-clinic-ten.vercel.app/)

--- 
## 🛠️ Used technologies
Tailwind and css, Supabase, Vercel, Leaflet

---

## ✅ Features 🌟

### 🔐 Authentication & Roles 
- **role system** 
  - **All unauthorized users** can see all except add, updete and delete doctors 
  - **Admin** can Full CRUD operations on doctors and see full site 

### 📱 User Experience 💻
- **Theme switching** Light/Dark theme which save in local storage
- **Animated loader** god GIF while data loading from DB
- **Adaptive design** which is working on diffrent devices
- **Header and Footer** on each page
- **Burger** in header
- **Map** with location of the shelter witch a custom icon
- **Video** from YouTube to learn more about vet clinics

### 👨🏻‍⚕️Doctor Management
- **Personal cards for each doctor** with photos and all necessary information 
- **Search** doctors by their name and specialization


### ⛃ Database
- **Supabase** is used as database, there are info about all admins and doctors, images saves as links to storage
