import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { QuestionType } from '../common/types';
import { COLORS } from '../common/utils/colors';
import { shuffle } from '../common/utils/utility';

const QuestionCard: React.FC<any> = (props) => {
    const [selectedAnswer, setSelectedAnswer] = React.useState<number | undefined>();
    const [options, setOptions] = React.useState([])
    const answer: string = props.answer
    const setAnswer: React.Dispatch<React.SetStateAction<string>> = props.setAnswer
    const handleSelectAnswer = (_: number) => {
        setSelectedAnswer(_);
        setAnswer(options[_])
    }
    const question: QuestionType = props.question;

    React.useEffect(() => {
        setAnswer("");
        setSelectedAnswer(undefined)
        if (question && question?.options)
            setOptions(shuffle([...question.options, question.answer]))
    }, [question])
    if (!!!question) return null
    return (
        <View
            style={styles.questionCard}>
            <View style={{ margin: 20 }}>
                <Text
                    style={styles.question}>
                    {question.question}
                </Text>
            </View>
            <View style={styles.answerContainer}>
                {
                    question?.answerType && question?.answerType === "option" ? options.map((option, _: number) => {
                        const selected = _ === selectedAnswer

                        return (
                            <TouchableOpacity
                                key={_}
                                style={[styles.answerButton, selected ? styles.selectedButton : null]}
                                onPress={() => handleSelectAnswer(_)}>
                                <Text
                                    style={[styles.answerButtonText, selected ? styles.selectedButtonText : null]}>
                                    {String(option)}
                                </Text>
                            </TouchableOpacity>
                        )
                    }) : question?.answerType && question?.answerType === "write" ? (
                        <View
                            style={styles.instructionsCard}>
                            <View
                                style={styles.instructionsContainer}>
                                <Text style={styles.textInputtitle}>
                                    Your answer
                                </Text>
                            </View>
                            <View style={{ marginLeft: 6, paddingTop: 12 }}>
                                <TextInput multiline={true} style={{ fontSize: 16 }} value={answer} onChangeText={(text) => setAnswer(text)} />
                            </View>
                        </View>
                    ) :
                        (
                            <View
                                style={[styles.answeredButton, question.answer === question.correctAnswer ? styles.correctAnswer : null]}
                            >
                                <Text
                                    style={[styles.answeredButtonText, question.answer === question.correctAnswer ? styles.correctAnswerText : null]}>
                                    {String(question.answer)}
                                </Text>
                            </View>
                        )
                }
            </View>
        </View >
    )
}

export default QuestionCard

const styles = StyleSheet.create({
    questionCard: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 15,
    },
    question: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.BLACK,
    },
    answerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignItems: "center"
    },
    answerButton: {
        backgroundColor: '#B3FFD9',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        marginBottom: 10,
    },
    answerButtonText: {
        color: '#00CC66',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedButton: {
        backgroundColor: '#00CC66',

    },
    selectedButtonText: {
        color: '#B3FFD9',
    },
    textInputtitle: { fontWeight: 'bold', color: COLORS.BLACK },
    instructionsCard: {
        backgroundColor: 'transparent',
        borderColor: '#00CC66',
        borderWidth: 1,
        borderRadius: 16,
        marginBottom: 24,
        width: "95%"
    },
    instructionsContainer: {
        position: 'absolute',
        paddingHorizontal: 10
    },

    answeredButton: {
        backgroundColor: COLORS.RED,
        paddingTop: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        marginBottom: 10,
        flexWrap: "nowrap"
    },
    answeredButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center"
    },
    correctAnswer: {
        backgroundColor: '#00CC66',
    },
    correctAnswerText: {
        color: '#B3FFD9',
    },

})