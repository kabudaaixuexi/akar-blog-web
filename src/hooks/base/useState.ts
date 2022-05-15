import { ref } from 'vue'

const states: any[] = [], stateSetters: any[] = []
let stateIndex: number = 0

const createState = (initialState: any, stateIndex: number) => {
    const state = ref(initialState)
    return states[stateIndex] !== undefined ? states[stateIndex] : state
}
const createStateSetter = (stateIndex: number) => {
    return function(newState: any) {
        if(typeof newState === 'function') {
            states[stateIndex].value = newState(states[stateIndex])
        } else {
            states[stateIndex].value = newState
        }
    }
}
const useState = (initialState: any) => {
    states[stateIndex] = createState(initialState, stateIndex)

    if(!stateSetters[stateIndex]) {
        stateSetters.push(createStateSetter(stateIndex))
    }

    const _state = states[stateIndex],
          _setState = stateSetters[stateIndex]

    stateIndex ++

    return [
        _state,
        _setState
    ]
}

export default useState
