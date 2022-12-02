import { useState, KeyboardEvent } from "react"

type Props = {
    onEnter: (taskName: string) => void
}

const Create = ({onEnter}: Props) => {
    const [inputText, setInputText] = useState('')

    const handleKeyUp = (e: KeyboardEvent) => {
        if(e.code === 'Enter' && inputText !== ''){
            onEnter(inputText)
            setInputText('')
        }
    }

    return(
        <div id="create">
            <input
                className="addTarefa"
                type="text"
                placeholder="Adicione uma tarefa:"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyUp={handleKeyUp}
            />

            <button
                className="addTarefaBtn"
                onClick={e => onEnter(inputText)}
            >+</button>
        </div>
    )
}

export default Create
