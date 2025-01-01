import { supabaseClientWithAuth, supabaseClientPublic } from './supabaseClient';

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


export const getAllQuizzes = async (token: string) => {
    try {
        const supabase = await supabaseClientWithAuth(token);

        const { data: quizzes, error } = await supabase
            .from('quizzes')
            .select('*'); 

        if (error) {
            console.error('Error fetching quizzes:', error.message);
            return [];
        }

        return quizzes;
    } catch (error) {
        console.error('Unexpected error fetching quizzes:', error);
        return [];
    }
};

export const deleteQuiz = async ({ quizId, token }: { quizId: string; token: string }) => {
    try {
        const supabase = await supabaseClientWithAuth(token);

        const { error: deleteQuizError } = await supabase
            .from('quizzes')
            .delete()
            .eq('id', quizId);

        if (deleteQuizError) {
            console.error('Error deleting quiz:', deleteQuizError.message);
            return false;
        }

        const { error: deleteQuestionsError } = await supabase
            .from('quiz_questions')
            .delete()
            .eq('quiz_id', quizId);

        if (deleteQuestionsError) {
            console.error('Error deleting quiz questions:', deleteQuestionsError.message);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Unexpected error deleting quiz:', error);
        return false;
    }
};

export const getQuizzesByTechnology = async (technology: string) => {    
    try {
        const supabase = await supabaseClientPublic;

        const { data: quizzes, error: quizError } = await supabase
            .from('quizzes')
            .select('id, title, description, quiz_questions(question, correct_answer, choices)')
            .eq('technology', technology)
            .order('id', { ascending: true });  

        if (quizError) {
            console.error('Error fetching quizzes by technology:', quizError.message);
            return [];
        }

        return quizzes;
    } catch (error) {
        console.error('Unexpected error fetching quizzes by technology:', error);
        return [];
    }
};