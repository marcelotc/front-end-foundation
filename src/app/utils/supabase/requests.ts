import { supabaseClient } from './supabaseClient';

// Function to fetch todos from Supabase
export const getTodos = async ({ userId, token }: any) => {
  const supabase = await supabaseClient(token);
  const { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error('Error fetching todos:', error.message);
    return [];
  }

  return todos;
};

export const postTodo = async ({ userId, token, e }: any) => {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from('todos')
      .insert({
        user_id: userId,
        todo: e.target[0].value,
        tag: e.target[1].value,
      })
      .select();
  
    if (error) {
      console.error('Error posting todo:', error.message);
      return null;
    }
  
    return data;
  };
  
  
  export const postMarkdown = async ({ userId, token, e }: any) => {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from('markdown_content')
      .insert({
        user_id: userId,
        todo: e.target[0].value,
        tag: e.target[1].value,
      })
      .select();
  
    if (error) {
      console.error('Error posting todo:', error.message);
      return null;
    }
  
    return data;
  };