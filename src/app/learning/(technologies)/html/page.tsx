import MainWrapper from '../components/mainWrapper';
import TextEditor from '../components/TextEditor'

export default function Html() {

    return (
        <MainWrapper>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">HTML</h1>
            <TextEditor />
        </MainWrapper>
    );
}
