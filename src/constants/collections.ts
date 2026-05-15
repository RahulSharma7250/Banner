export interface Collection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  quote: string;
  image: string;
  previewImage: string;
  color: string;
  accent: string;
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'white',
    number: '01',
    title: 'The White Collection',
    subtitle: 'Avant-Garde Minimalism',
    quote: '"Elegance is not about being noticed, it\'s about being remembered."',
    image: '/src/white.png',
    previewImage: '/src/white.png',
    color: '#F2F1EF',
    accent: '#141414',
  },
  {
    id: 'black',
    number: '02',
    title: 'The Black Collection',
    subtitle: 'Sovereignty in Shadow',
    quote: '"Simplicity is the keynote of all true elegance, found in the depth of shadow."',
    image: '/src/black.png',
    previewImage: '/src/black.png',
    color: '#0A0A0A',
    accent: '#F2F1EF',
  },
  {
    id: 'winter',
    number: '03',
    title: 'The Winter Collection',
    subtitle: 'Ethereal Frost',
    quote: '"A dialogue between warmth and the void. Crafting luxury from the cold."',
    image: '/src/winter.png',
    previewImage: '/src/winter.png',
    color: '#E2E8F0',
    accent: '#1E293B',
  },
  {
    id: 'noir',
    number: '04',
    title: 'The Noir Collection',
    subtitle: 'City Silhouette',
    quote: '"Timeless silhouettes crafted for a new generation. Explore connection."',
    image: '/src/noir.png',
    previewImage: '/src/noir.png',
    color: '#0D0D0D',
    accent: '#FFFFFF',
  },
];
