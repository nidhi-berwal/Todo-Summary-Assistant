// models/Todo.js
const supabase = require('../config/db');

const Todo = {
  async getAll() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(todo) {
    const { data, error } = await supabase
      .from('todos')
      .insert([todo])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async delete(id) {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  async getPending() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('completed', false)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

module.exports = Todo;