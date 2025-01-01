import { supabaseClientWithAuth } from './supabaseClient';

export const postQuiz = async ({ userId, token, technology, title, description, questions }: any) => {
    const supabase = await supabaseClientWithAuth(token);


    let quizId: string;

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
