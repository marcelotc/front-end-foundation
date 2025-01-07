import { supabaseClientWithAuth, supabaseClientPublic } from './supabaseClient';

export const postCodePractice = async ({ token, markdownContentId, userId, question, correctHtmlCode, correctCssCode, correctJsCode }: any) => {
    const supabase = await supabaseClientWithAuth(token);

    const { data, error } = await supabase
        .from('code_practice')
        .insert(
            {
                markdown_content_id: markdownContentId,
                user_id: userId,
                question,
                correct_html_code: correctHtmlCode,
                correct_css_code: correctCssCode,
                correct_js_code: correctJsCode,
            }
        );

    if (error) {
        console.error("Error inserting code practice data:", error);
        throw error;
    }

    return data;
};

export const getCodePracticeByMarkdownContent = async (markdownContentId: any) => {
    const { data, error } = await supabaseClientPublic
        .from('code_practice')
        .select('*')
        .eq('markdown_content_id', markdownContentId);

    if (error) {
        console.error("Error inserting code practice data:", error);
        throw error;
    }
    return data;
};