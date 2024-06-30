import { supabaseClientWithAuth, supabaseClientPublic } from './supabaseClient';

export const getTodos = async ({ userId, token }: any) => {
  const supabase = await supabaseClientWithAuth(token);
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
  const supabase = await supabaseClientWithAuth(token);
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


export const postMarkdown = async ({ userId, token, content, chapter, subject, technology }: any) => {
  const supabase = await supabaseClientWithAuth(token);

  const { data: markdownData, error: markdownError } = await supabase
    .from('markdown_content')
    .insert({
      user_id: userId,
      chapter: chapter,
      technology: technology,
      content: {
        content,
      },
      subject: subject,
    })
    .select();

  if (markdownError) {
    console.error('Error posting markdown content:', markdownError.message);
    return null;
  }

  const contentId = markdownData[0].id;

  const { data: menuData, error: menuError } = await supabase
    .from('menu')
    .insert({
      user_id: userId,
      chapter: chapter,
      technology: technology,
      subject: subject,
      content_id: contentId,
    })
    .select();

  if (menuError) {
    console.error('Error posting menu:', menuError.message);
    return null;
  }

  return { markdownData, menuData };
};

export const putMarkdown = async ({ userId, token, content, chapter, subject, technology, contentId }: any) => {
  const supabase = await supabaseClientWithAuth(token);

  const { data: markdownData, error: markdownError } = await supabase
      .from('markdown_content')
      .update({
          chapter: chapter,
          technology: technology,
          content: {
              content,
          },
          subject: subject,
      })
      .eq('id', contentId)
      .select();

  if (markdownError) {
      console.error('Error updating markdown content:', markdownError.message);
      return null;
  }

  const { data: menuData, error: menuError } = await supabase
      .from('menu')
      .update({
          chapter: chapter,
          technology: technology,
          subject: subject,
      })
      .eq('content_id', contentId)
      .select();

  if (menuError) {
      console.error('Error updating menu:', menuError.message);
      return null;
  }

  return { markdownData, menuData };
};

export const getMarkdown = async (technology: string) => {
  const { data, error } = await supabaseClientPublic
    .from("markdown_content")
    .select("*")
    .eq('technology', technology);

  if (error) {
    console.error('Error fetching:', error.message);
    return [];
  }

  return data;
};

export const getMarkdownBySubject = async (subject: string) => {
  const { data, error } = await supabaseClientPublic
    .from("markdown_content")
    .select("*")
    .eq('subject', subject);

  if (error) {
    console.error('Error fetching:', error.message);
    return [];
  }

  return data;
};

export const getMenu = async (technology: string) => {
  const { data, error } = await supabaseClientPublic
    .from("menu")
    .select("*")
    .eq('technology', technology);

  if (error) {
    console.error('Error fetching:', error.message);
    return [];
  }

  return data;
};

export const getMenuChapters = async () => {
  const { data, error } = await supabaseClientPublic
    .from("menu")
    .select("chapter")

  if (error) {
    console.error('Error fetching:', error.message);
    return [];
  }

  return data;
};