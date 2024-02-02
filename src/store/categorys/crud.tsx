import {create} from 'zustand';
import axios from 'axios';
import { CategoryType } from '@/types/category.type';

interface Categorys {
  categories: CategoryType[];
  fetchData: () => Promise<void>;
  addData: (data: any) => Promise<void>; 
  updateData: (id: number, updatedData: any) => Promise<void>; 
  deleteData: (id: number) => Promise<void>;
}

export const useCategories = create<Categorys>((set) => ({
  categories: [],
  fetchData: async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/categories');
      set({ 
        categories: response.data.data
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  addData: async (data) => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/categories', data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set((state) => ({ categories: [...state.categories, response.data] }));
      
    } catch (error) {
      console.error('Error adding data:', error);
    }
  },
  updateData: async (id, updatedData) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:3000/api/categories/${id}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set((state) => ({
        categories: state.categories.map((item) => (item.id === id ? response.data : item)),
      }));
    } catch (error) {
      console.error('Error updating data:', error);
    }
  },
  deleteData: async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/categories/${id}`);
      set((state) => ({ categories: state.categories.filter((item) => item.id !== id) }));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  },
}));