export type StepType = 'text' | 'image' | 'multipleChoice'; 

export type Choice = { id: string; text: string }

export type Step = {
    id: string
    type: StepType
    text: { title: string; body: string}
    image: { url: string; alt: string }
    multipleChoice: {
        question: string
        choices: Choice[]
        correctChoiceId: string | null
    }
}