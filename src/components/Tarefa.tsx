import { useState } from "react"
import { Item } from "../types/Item"

type Props = {
    item: Item
    onChange: (id: string, done: boolean) => void
    onClick: (id: string) => void
}

const Tarefa = ({item, onChange, onClick}: Props) =>{
    const [isChecked, setIsChecked] = useState(item.done)

    return(
        <div id={String(item.id)}>
            <input
                id="done"
                type="checkbox"
                checked={isChecked}
                onChange={
                    e => setIsChecked(e.target.checked)
                }
                onClick={ e => onChange(item.id.toString(), e.currentTarget.checked)}
            />

            <label className={String(isChecked)}>{item.tarefa}</label>
            <button className="delTaskBtn" onClick={ e => onClick(item.id.toString())}>x</button>
        </div>
    )
}

export default Tarefa
