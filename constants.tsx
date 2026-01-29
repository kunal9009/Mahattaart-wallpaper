
import React from 'react';
import { Wallpaper, Review } from './types';
import { Leaf, UserCheck, ShieldCheck, Award, Zap, Palette, Ruler, CheckCircle } from 'lucide-react';

export const CATEGORIES = [
  { name: 'Floral', image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=600' },
  { name: 'Abstract', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600' },
  { name: 'Modern', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=600' },
  { name: 'Traditional', image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=600' },
  { name: 'Nature', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600' },
  { name: 'Kids', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600' },
];

export const SUB_CATEGORIES: Record<string, string[]> = {
  'Modern': ['Geometric', 'Minimalistic', 'Urban', 'Industrial'],
  'Floral': ['Vintage', 'Tropical', 'Botanical', 'Dainty'],
  'Abstract': ['Concept', 'Fluid', 'Textured', 'Gradient'],
};

export const SPACES = [
  { name: 'Living Room', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400' },
  { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=400' },
  { name: 'Office', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=400' },
  { name: 'Kids Room', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400' },
];

export const MOODS = [
  { name: 'Calm', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800', description: 'Serene textures and soft palettes for a peaceful sanctuary.' },
  { name: 'Bold', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800', description: 'High contrast and striking patterns that demand attention.' },
  { name: 'Playful', image: 'https://images.unsplash.com/photo-1513694490325-24b3921b3dca?auto=format&fit=crop&q=80&w=800', description: 'Vibrant colors and imaginative designs for creative spirits.' },
  { name: 'Elegant', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800', description: 'Refined textures and timeless aesthetics for sophisticated living.' },
  { name: 'Industrial', image: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800', description: 'Urban-inspired finishes with raw appeal and metallic accents.' },
  { name: 'Zen', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800', description: 'Minimalist compositions that bring balance and harmony to any room.' },
];

export const PROMISES = [
  { name: 'Easy to Choose, Easy to Install', icon: <Zap className="w-8 h-8 text-[#600b0b]" /> },
  { name: 'Curated by Design Experts', icon: <Palette className="w-8 h-8 text-[#600b0b]" /> },
  { name: 'Made to Fit, Perfectly', icon: <Ruler className="w-8 h-8 text-[#600b0b]" /> },
  { name: 'Scratch-resistant', icon: <ShieldCheck className="w-8 h-8 text-[#600b0b]" /> },
];

export const MOCK_WALLPAPERS: Wallpaper[] = [
  { id: '1', name: 'Black Beige Textured Horizontal', price: 75.65, image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600', category: 'Abstract', roomType: 'Office', collection: 'Concept Design', surface: 'Matte', mood: 'Bold', color: 'Beige' },
  { id: '2', name: 'Distressed Vertical Texture Beige', price: 75.65, image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600', category: 'Abstract', roomType: 'Living Room', collection: 'Concept Design', surface: 'Matte', mood: 'Calm', color: 'Beige' },
  { id: '3', name: 'Abstract Fringed Vertical Blue', price: 75.65, image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=600', category: 'Modern', roomType: 'Bedroom', collection: 'Concept Design', surface: 'Glossy', mood: 'Bold', color: 'Blue' },
  { id: '4', name: 'Geometric Tribal Pattern Beige', price: 75.65, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=600', category: 'Traditional', roomType: 'Living Room', collection: 'Concept Design', surface: 'Matte', mood: 'Bold', color: 'Beige' },
  { id: '5', name: 'Abstract Geometric Kilim Grey', price: 75.65, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600', category: 'Modern', roomType: 'Living Room', collection: 'Concept Design', surface: 'Matte', mood: 'Sophisticated', color: 'Grey' },
  { id: '6', name: 'Geometric Pattern Teal Pink', price: 75.65, image: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?auto=format&fit=crop&q=80&w=600', category: 'Modern', roomType: 'Kids Room', collection: 'Pattern Design', surface: 'Glossy', mood: 'Playful', color: 'Pink' },
];

export const REVIEWS: Review[] = [
  { id: '1', customerName: 'Sarah Jenkins', text: 'Absolutely love my new bedroom mural. The installation was seamless and the colors are exactly as shown.', image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=600' },
  { id: '2', customerName: 'Michael Chen', text: 'The custom design process was so easy. Our office wall looks incredible now. Highly recommend MahattaArt!', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600' },
];
