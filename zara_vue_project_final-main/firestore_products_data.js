// Firebase Firestore'a Toplu Ürün Ekleme Scripti
// Bu scripti tarayıcı console'unda çalıştırabilirsin

import { getFirestore, collection, addDoc } from 'firebase/firestore'

const products = [
  {
    id: 2,
    name: 'LİKİT AYDINLATICI - TEMPTING GLOW',
    price: '790,00 TL',
    imageUrl: '/images/sepet_alti3.jpg',
  },
  { id: 3, name: 'ASİMETRİK YAKA TOP', price: '990,00 TL', imageUrl: '/images/sepet_alti4.jpg' },
  {
    id: 4,
    name: 'LIMITED EDITION ÇİFT YÜZLÜ CEKET',
    price: '9.990,00 TL',
    imageUrl: '/images/sepet_alti1.jpg',
  },
  {
    id: 5,
    name: 'METALİK İPLİKLİ PALAZZO PANTOLON',
    price: '1.490,00 TL',
    imageUrl: '/images/sepet_alti2.jpg',
  },
  {
    id: 6,
    name: 'ÇİFT YÜZLÜ SUNİ SÜET CEKET',
    price: '3.690,00 TL',
    imageUrl: '/images/sepet_alti.jpg',
  },
  {
    id: 7,
    name: 'SUNİ DERİ TRABİLLA CEKET',
    price: '2.990,00 TL',
    imageUrl: '/images/sepet_alti3.jpg',
  },
  {
    id: 8,
    name: 'SÜET GÖRÜNÜMLÜ BOMBER CEKET',
    price: '2.990,00 TL',
    imageUrl: '/images/sepet_alti4.jpg',
  },
  {
    id: 9,
    name: 'ÇİFT TARAFLI ZW KOLEKSİYONU CEKET',
    price: '4.990,00 TL',
    imageUrl: '/images/sepet_alti1.jpg',
  },
  {
    id: 10,
    name: 'ÇİFT TARAFLI ZW KOLEKSİYONU CEKET',
    price: '4.990,00 TL',
    imageUrl: '/images/sepet_alti2.jpg',
  },
  {
    id: 11,
    name: 'SÜET GÖRÜNÜMLÜ BOMBER CEKET',
    price: '2.990,00 TL',
    imageUrl: '/images/sepet_alti.jpg',
  },
  {
    id: 12,
    name: 'ÇİFT YÜZLÜ SUNİ KÜRK ÇİFT TARAFLI CEKET',
    price: '3.690,00 TL',
    imageUrl: '/images/sepet_alti3.jpg',
  },
  {
    id: 13,
    name: 'ÇİFT BEL BANTLI WIDE LEG PANTOLON',
    price: '1.790,00 TL',
    imageUrl: '/images/sepet_alti4.jpg',
  },
  { id: 14, name: 'KRUVAZE KISA KABAN', price: '2.490,00 TL', imageUrl: '/images/sepet_alti1.jpg' },
  {
    id: 15,
    name: 'KISA SU GEÇİRMEZ RÜZGAR GEÇİRMEZ ŞİŞME ANORAK',
    price: '2.490,00 TL',
    imageUrl: '/images/sepet_alti2.jpg',
  },
]

// Not: Bu script Firebase Console'da çalışmaz, manuel olarak eklemelisin
// Veya kalan 14 ürünü Firebase Console'da tek tek ekle
