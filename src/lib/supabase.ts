import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          age: number | null;
          weight: number | null;
          height: number | null;
          goal: string | null;
          activity_level: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          age?: number | null;
          weight?: number | null;
          height?: number | null;
          goal?: string | null;
          activity_level?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          age?: number | null;
          weight?: number | null;
          height?: number | null;
          goal?: string | null;
          activity_level?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      meals: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          calories: number;
          protein: number;
          carbs: number;
          fat: number;
          meal_type: string;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          calories: number;
          protein: number;
          carbs: number;
          fat: number;
          meal_type: string;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          calories?: number;
          protein?: number;
          carbs?: number;
          fat?: number;
          meal_type?: string;
          date?: string;
          created_at?: string;
        };
      };
      exercises: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          duration: number;
          calories_burned: number;
          type: string;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          duration: number;
          calories_burned: number;
          type: string;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          duration?: number;
          calories_burned?: number;
          type?: string;
          date?: string;
          created_at?: string;
        };
      };
      water_intake: {
        Row: {
          id: string;
          user_id: string;
          amount_ml: number;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount_ml: number;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount_ml?: number;
          date?: string;
          created_at?: string;
        };
      };
    };
  };
};
