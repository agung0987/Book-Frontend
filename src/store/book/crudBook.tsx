import {create} from 'zustand';
import axios from 'axios';
import { BooksType } from '@/types/books.type';

interface Book {
  books: BooksType[];
  fetchData: () => Promise<void>;
  addData: (data: any) => Promise<void>; 
  updateData: (id: number, updatedData: any) => Promise<void>; 
  deleteData: (id: number) => Promise<void>;
}

export const useBook = create<Book>((set) => ({
  books: [],
  fetchData: async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/books');
      set({ 
        books: response.data.data
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  addData: async (data) => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/books', data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set((state) => ({ books: [...state.books, response.data] }));
      
    } catch (error) {
      console.error('Error adding data:', error);
    }
  },
  updateData: async (id, updatedData) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:3000/api/books/${id}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set((state) => ({
        books: state.books.map((item) => (item.id === id ? response.data : item)),
      }));
    } catch (error) {
      console.error('Error updating data:', error);
    }
  },
  deleteData: async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/books/${id}`);
      set((state) => ({ books: state.books.filter((item) => item.id !== id) }));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  },
}));