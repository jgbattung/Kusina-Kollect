export const cuisineLinks: { name: string, path: string, image: string }[] = [
  { name: "Ilocano", path: "/cuisines/ilocano", image: '/assets/cuisines/main.png' },
  { name: "Tagalog", path: "/cuisines/tagalog", image: '/assets/cuisines/main.png' },
  { name: "Kapampangan", path: "/cuisines/kapampangan", image: '/assets/cuisines/main.png' },
  { name: "Pangasinan", path: "/cuisines/pangasinan", image: '/assets/cuisines/main.png' },
  { name: "Bisaya", path: "/cuisines/bisaya", image: '/assets/cuisines/main.png' },
  { name: "Bicolano", path: "/cuisines/bicolano", image: '/assets/cuisines/main.png' },
  { name: "Nueva Ecija", path: "/cuisines/nueva-ecija", image: '/assets/cuisines/main.png' }, 
  { name: "Batangueno", path: "/cuisines/batangueno", image: '/assets/cuisines/main.png' }, 
  { name: "Negros", path: "/cuisines/negros", image: '/assets/cuisines/main.png' }, 
  { name: "Davao", path: "/cuisines/davao", image: '/assets/cuisines/main.png' }, 
  { name: "Cebu", path: "/cuisines/cebu", image: '/assets/cuisines/main.png' }, 
  { name: "Bulacan", path: "/cuisines/bulacan", image: '/assets/cuisines/main.png' }, 
  { name: "Mindanao", path: "/cuisines/mindanao", image: '/assets/cuisines/main.png' }, 
  { name: "Filipino", path: "/cuisines/filipino", image: '/assets/cuisines/main.png' }, 
]

export enum CuisineName {
  ILOCANO = "Ilocano",
  TAGALOG = "Tagalog",
  KAPAMPANGAN = "Kapampangan",
  PANGASINAN = "Pangasinan",
  BISAYA = "Bisaya",
  BICOLANO = "Bicolano",
  NUEVA_ECIJA = "Nueva Ecija",
  BATANGUENO = "Batangueno",
  NEGROS = "Negros",
  DAVAO = "Davao",
  CEBU = "Cebu",
  BULACAN = "Bulacan",
  MINDANAO = "Mindanao",
  FILIPINO = "Filipino",
}

export const CUISINE_DESCRIPTIONS: { [key in CuisineName]: string } = {
  [CuisineName.ILOCANO]: "Delve into the hearty and savory world of Ilocano cuisine, famous for its use of vegetables and bagoong.",
  [CuisineName.TAGALOG]: "Experience the rich flavors of Tagalog dishes, where simplicity and depth of flavor reign supreme.",
  [CuisineName.KAPAMPANGAN]: "Indulge in the culinary treasures of Kapampangan cuisine, known for its bold and creative dishes.",
  [CuisineName.PANGASINAN]: "Explore Pangasinan cuisine, with its exceptional seafood dishes that highlight the coastal bounty.",
  [CuisineName.BISAYA]: "Savor the unique tastes of Bisaya cuisine, featuring fresh ingredients and straightforward yet delicious flavors.",
  [CuisineName.BICOLANO]: "Embrace the spicy and coconut-rich dishes of Bicolano cuisine, for those who love a bit of heat.",
  [CuisineName.NUEVA_ECIJA]: "Enjoy the simple yet satisfying flavors of Nueva Ecija cuisine, showcasing the harvest of the 'Rice Granary of the Philippines'.",
  [CuisineName.BATANGUENO]: "Taste Batangueno cuisine, where coffee and hearty meals create a perfect blend of comfort and tradition.",
  [CuisineName.NEGROS]: "Dive into the sweet and savory world of Negros cuisine, where sugar cane influences both the dishes and the people's warmth.",
  [CuisineName.DAVAO]: "Feast on Davao cuisine, a melting pot of flavors influenced by the region's diverse cultures and bountiful harvest.",
  [CuisineName.CEBU]: "Relish in Cebu's culinary delights, from its world-famous lechon to its rich and diverse street food scene.",
  [CuisineName.BULACAN]: "Sample Bulacan cuisine, with its sweet pastries and historic dishes that have been passed down through generations.",
  [CuisineName.MINDANAO]: "Experience the rich culinary heritage of Mindanao, with flavors influenced by indigenous, Malay, and Arabic cuisines.",
  [CuisineName.FILIPINO]: "Celebrate the essence of Filipino cuisine, a blend of taste and tradition that brings together the best of the country's regional dishes.",
};