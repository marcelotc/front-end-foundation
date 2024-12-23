import { supabaseClientPublic } from './supabaseClient';

export const postQuiz = async ({ userId, technology, title, description, questions }: any) => {
  const supabase = await supabaseClientPublic;

  const { data: existingQuizData, error: existingQuizError } = await supabase
    .from('quizzes')
    .select('id, title')
    .eq('user_id', userId)
    .eq('technology', technology)
    .eq('title', title)
    .single();

  if (existingQuizError && existingQuizError.code !== 'PGRST116') {
    console.error('Error checking existing quiz:', existingQuizError.message);
    return null;
  }

  let quizId: string;

  if (existingQuizData) {
    const { data: updatedQuizData, error: updateQuizError } = await supabase
      .from('quizzes')
      .update({
        description,
      })
      .eq('id', existingQuizData.id)
      .select();

    if (updateQuizError) {
      console.error('Error updating quiz:', updateQuizError.message);
      return null;
    }

    quizId = existingQuizData.id;
  } else {
    const { data: quizData, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        user_id: userId,
        technology,
        title,
        description,
      })
      .select();

    if (quizError) {
      console.error('Error posting quiz:', quizError.message);
      return null;
    }

    quizId = quizData[0].id;
  }

  const questionResults = [];

  for (const question of questions) {
    const { data: existingQuestionData, error: existingQuestionError } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quizId)
      .eq('question', question.text)
      .single();

    if (existingQuestionError && existingQuestionError.code !== 'PGRST116') {
      console.error('Error checking existing question:', existingQuestionError.message);
      continue;
    }

    if (existingQuestionData) {
      const { data: updatedQuestionData, error: updateQuestionError } = await supabase
        .from('quiz_questions')
        .update({
          correct_answer: question.correctAnswer,
          choices: question.choices,
        })
        .eq('id', existingQuestionData.id)
        .select();

      if (updateQuestionError) {
        console.error('Error updating question:', updateQuestionError.message);
        continue;
      }

      questionResults.push(updatedQuestionData[0]);
    } else {
      const { data: newQuestionData, error: newQuestionError } = await supabase
        .from('quiz_questions')
        .insert({
          quiz_id: quizId,
          question: question.text,
          correct_answer: question.correctAnswer,
          choices: question.choices,
        })
        .select();

      if (newQuestionError) {
        console.error('Error posting question:', newQuestionError.message);
        continue;
      }

      questionResults.push(newQuestionData[0]);
    }
  }

  return { quizId, questionResults };
};
