import { supabaseClientWithAuth, supabaseClientPublic } from './supabaseClient';

export const postMarkdown = async ({ userId, token, content, chapter, subject, technology, difficulty }: any) => {
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
      difficulty: difficulty,
    })
    .select();

  if (markdownError) {
    console.error('Error posting markdown content:', markdownError.message);
    return null;
  }

  const contentId = markdownData[0].id;

  const { data: existingMenuData, error: existingMenuError } = await supabase
    .from('menu')
    .select('id, subjects')
    .eq('user_id', userId)
    .eq('chapter', chapter)
    .eq('technology', technology)
    .eq('difficulty', difficulty)
    .single();

  if (existingMenuError && existingMenuError.code !== 'PGRST116') {
    console.error('Error checking existing menu:', existingMenuError.message);
    return null;
  }

  if (existingMenuData) {
    const updatedSubjects = Array.from(new Set([...existingMenuData.subjects, subject]));

    const { data: updatedMenuData, error: updateMenuError } = await supabase
      .from('menu')
      .update({
        subjects: updatedSubjects,
        content_id: contentId,
      })
      .eq('id', existingMenuData.id)
      .select();

    if (updateMenuError) {
      console.error('Error updating menu:', updateMenuError.message);
      return null;
    }

    return { markdownData, menuData: updatedMenuData };
  } else {
    const { data: menuData, error: menuError } = await supabase
      .from('menu')
      .insert({
        user_id: userId,
        chapter: chapter,
        technology: technology,
        subjects: [subject],
        difficulty: difficulty,
        content_id: contentId,
      })
      .select();

    if (menuError) {
      console.error('Error posting menu:', menuError.message);
      return null;
    }

    return { markdownData, menuData };
  }
};

export const putMarkdown = async ({ token, content, chapter, subject, technology, contentId }: any) => {
  const supabase = await supabaseClientWithAuth(token);

  const { data: markdownData, error: markdownError } = await supabase
    .from('markdown_content')
    .update({
      content: {
        content,
      },
      chapter: chapter,
      subject: subject,
      technology: technology,
    })
    .eq('id', contentId);

  if (markdownError) {
    console.error('Error updating markdown content:', markdownError.message);
    return null;
  }

  return { markdownData };
};

export const getMarkdownBySubjectTechnologyChapter = async (subject: string, technology: string, chapter: string) => {
  const { data, error } = await supabaseClientPublic
    .from("markdown_content")
    .select("*")
    .eq('subject', subject)
    .eq('technology', technology)
    .eq('chapter', chapter)

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
    .eq('technology', technology)
    //.eq('difficulty', 'Intermediate')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching:', error.message);
    return [];
  }

  return data;
};

export const getAllMenu = async () => {
  const { data, error } = await supabaseClientPublic
    .from("menu")
    .select("*")
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching:', error.message);
    return [];
  }

  return data;
};

export const getMenuChapters = async (technology: string) => {
  const { data, error } = await supabaseClientPublic
    .from("menu")
    .select("chapter")
    .eq('technology', technology)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching:', error.message);
    return [];
  }

  return data;
};

export const getMenuChaptersSubjects = async (technology: string, chapter: string) => {
  const { data, error } = await supabaseClientPublic
    .from("menu")
    .select("subjects")
    .eq('chapter', chapter)
    .eq('technology', technology)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching:', error.message);
    return [];
  }

  return data;
};

export const getChaptersAndSubjects = async (technology: string) => {
  const { data, error } = await supabaseClientPublic
    .from('markdown_content')
    .select('id, chapter, subject')
    .eq('technology', technology);

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  console.log('Chapters and Subjects:', data);
  return data;
}


export const deletePost = async ({ userId, token, chapter, technology, subject, contentId }: any) => {
  const supabase = await supabaseClientWithAuth(token);

  const { data: existingMenuData, error: existingMenuError } = await supabase
    .from('menu')
    .select('id, subjects')
    .eq('user_id', userId)
    .eq('chapter', chapter)
    .eq('technology', technology)
    .single();

  if (existingMenuError) {
    console.error('Error checking existing menu:', existingMenuError.message);
    return null;
  }

  if (existingMenuData) {
    const updatedSubjects = existingMenuData.subjects.filter((sub: string) => sub.trim().toLowerCase() !== subject.trim().toLowerCase());

    let updatedMenuData = null;
    if (updatedSubjects.length > 0) {
      const { data, error: updateMenuError } = await supabase
        .from('menu')
        .update({
          subjects: updatedSubjects,
        })
        .eq('id', existingMenuData.id)
        .select();
      updatedMenuData = data;

      if (updateMenuError) {
        console.error('Error updating menu:', updateMenuError.message);
        return null;
      }
    } else {
      // If no subjects left, delete the menu entry
      const { error: deleteMenuError } = await supabase
        .from('menu')
        .delete()
        .eq('id', existingMenuData.id);

      if (deleteMenuError) {
        console.error('Error deleting menu:', deleteMenuError.message);
        return null;
      }
    }

    // Delete the corresponding markdown content
    const { data: markdownData, error: markdownError } = await supabase
      .from('markdown_content')
      .delete()
      .eq('id', contentId);

    if (markdownError) {
      console.error('Error deleting markdown content:', markdownError.message);
      return null;
    }

    return { updatedMenuData, markdownData };
  } else {
    console.error('Menu not found for the given user, chapter, and technology');
    return null;
  }
};

export const uploadImage = async ({ image, token, imageId }: any) => {
  if (!image) return;

  try {
    const supabase = await supabaseClientWithAuth(token);

    const { error } = await supabase.storage
      .from('images')
      .upload(imageId, image)


    if (error) {
      throw error;
    }

  } catch (err: any) {
    console.error('err:', err);
  }
};
