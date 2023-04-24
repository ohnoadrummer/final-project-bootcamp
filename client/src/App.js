import { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Sequencer from './Sequencer'
import GlobalStyle from './globalStyles'
import { generateAreChordBeatsCheckedInitialState } from './Helpers'
export const MusicParametersContext = createContext()
const App = () => {
    const audioContext = new AudioContext()
    const [amtOfNotes, setAmtOfNotes] = useState(8) // amt of chords, i.e. how many ROWS are there
    const [stepCount, setStepCount] = useState(16) // amt of steps, i.e. how many COLUMNS are there
    const makeMelodyNotesState = []
    // [8,7,6,5,4,3,2,1] where amtofnotes = 8
    for (let i = amtOfNotes * 2 - 1; i > 0; i--) {
        makeMelodyNotesState.push(i)
    }

    const makeChordNotesState = []
    // [8,7,6,5,4,3,2,1] where amtofnotes = 8
    for (let i = amtOfNotes; i > 0; i--) {
        makeChordNotesState.push(i)
    }
    const blankStepCountArray = []
    // [0,0,0,0,0,0,0,0] where stepCount = 8
    for (let i = stepCount; i > 0; i--) {
        blankStepCountArray.push(0)
    }
    const [areChordBeatsChecked, setAreChordBeatsChecked] = useState(
        generateAreChordBeatsCheckedInitialState(
            makeChordNotesState,
            makeMelodyNotesState,
            blankStepCountArray,
            'chords'
        )
    )
    // this is the proper format of the master reference of notes areChordBeatsChecked. the amtOfNotes would be 8
    // {
    // chord-8: [1, 0, 0, 0, 0, 0, 0, 1],
    // chord-7: [0, 1, 0, 0, 0, 0, 0, 0],
    // chord-6: [0, 0, 0, 0, 0, 0, 0, 0],
    // chord-5: [0, 0, 0, 0, 0, 1, 0, 0],
    // chord-4: [0, 0, 0, 0, 0, 0, 0, 0],
    // chord-3: [0, 0, 0, 0, 0, 0, 0, 0],
    // chord-2: [0, 0, 0, 0, 0, 0, 0, 0],
    // chord-1: [0, 0, 0, 1, 0, 0, 0, 0],
    // }
    const [areMelodyBeatsChecked, setAreMelodyBeatsChecked] = useState(
        generateAreChordBeatsCheckedInitialState(
            makeChordNotesState,
            makeMelodyNotesState,
            blankStepCountArray,
            'melody'
        )
    )
    const [tempo, setTempo] = useState(60)
    const [rootNote, setRootNote] = useState(0)
    const [wonkFactor, setWonkFactor] = useState(1)
    const [attack, setAttack] = useState(2)
    const [melodyVolume, setMelodyVolume] = useState(75)
    const [chordsVolume, setChordsVolume] = useState(50)
    const [sound, setSound] = useState('sine')
    const [filterCutoff, setFilterCutoff] = useState(7500)
    const [decay, setDecay] = useState(20)
    const [sustain, setSustain] = useState(20)
    const [release, setRelease] = useState(20)
    const [chordInputStep, setChordInputStep] = useState(1)
    const [chosenAPIChords, setChosenAPIChords] = useState([])
    const [hookTheoryChords, setHookTheoryChords] = useState([])
    const [loadUserSongs, setLoadUserSongs] = useState(null)
    const [loadSong, setLoadSong] = useState(
        '75442486-0878-440c-9db1-a7006c25a39f'
    )
    const [songName, setSongName] = useState('')
    const [songSavedOrDeleted, setSongSavedOrDeleted] = useState(false)
    const [songDeleted, setSongDeleted] = useState(false)

    // remove non-song data from the BE document
    const handleLoadSongsFetch = (songsAndIDs) => {
        const keysToUse = Object.keys(songsAndIDs).filter((key) => {
            return key !== 'userID' && key !== '_id'
        })
        const newState = {}
        keysToUse.forEach((key) => {
            newState[key] = songsAndIDs[key]
        })
        return newState
    }

    const hugeParametersObject = {
        // do these only contain the values of state when the object is called? how does this update? can this lead to bugs?
        amtOfNotes: amtOfNotes,
        stepCount: stepCount,
        areChordBeatsChecked: areChordBeatsChecked,
        areMelodyBeatsChecked: areMelodyBeatsChecked,
        tempo: tempo,
        rootNote: rootNote,
        wonkFactor: wonkFactor,
        attack: attack,
        melodyVolume: melodyVolume,
        chordsVolume: chordsVolume,
        sound: sound,
        filterCutoff: filterCutoff,
        decay: decay,
        sustain: sustain,
        release: release,
        chordInputStep: chordInputStep,
        chosenAPIChords: chosenAPIChords,
        hookTheoryChords: hookTheoryChords,
        loadUserSongs: loadUserSongs,
        loadSong: loadSong,
        songName: songName,
        songSavedOrDeleted: songSavedOrDeleted,
        songDeleted: songDeleted,
    }

    const hugeSetStateObject = {
        setTempo: setTempo,
        setStepCount: setStepCount,
        setRootNote: setRootNote,
        setWonkFactor: setWonkFactor,
        setChordInputStep: setChordInputStep,
        setLoadUserSongs: setLoadUserSongs,
        setLoadSong: setLoadSong,
        setSongName: setSongName,
        setMelodyVolume: setMelodyVolume,
        setChordsVolume: setChordsVolume,
        setSound: setSound,
        setFilterCutoff: setFilterCutoff,
        setAttack: setAttack,
        setDecay: setDecay,

        setSustain: setSustain,
        setRelease: setRelease,
        setSongSavedOrDeleted: setSongSavedOrDeleted,
        setSongDeleted: setSongDeleted,
        setAreChordBeatsChecked: setAreChordBeatsChecked,
        setAmtOfNotes: setAmtOfNotes,
        setAreMelodyBeatsChecked: setAreMelodyBeatsChecked,
        setHookTheoryChords: setHookTheoryChords,
        setChosenAPIChords: setChosenAPIChords,
    }

    return (
        <BrowserRouter>
            <MusicParametersContext.Provider
                value={{
                    audioContext,
                    tempo,
                    setTempo,
                    stepCount,
                    setStepCount,
                    rootNote,
                    setRootNote,
                    wonkFactor,
                    setWonkFactor,
                    chordInputStep,
                    setChordInputStep,
                    loadUserSongs,
                    setLoadUserSongs,
                    loadSong,
                    setLoadSong,
                    songName,
                    setSongName,
                    melodyVolume,
                    setMelodyVolume,
                    chordsVolume,
                    setChordsVolume,
                    sound,
                    setSound,
                    filterCutoff,
                    setFilterCutoff,
                    attack,
                    setAttack,
                    decay,
                    setDecay,
                    sustain,
                    setSustain,
                    release,
                    setRelease,
                    songSavedOrDeleted,
                    setSongSavedOrDeleted,
                    songDeleted,
                    setSongDeleted,
                    handleLoadSongsFetch,
                    areChordBeatsChecked,
                    setAreChordBeatsChecked,
                    areMelodyBeatsChecked,
                    amtOfNotes,
                    setAmtOfNotes,
                    setAreMelodyBeatsChecked,
                    makeChordNotesState,
                    makeMelodyNotesState,
                    blankStepCountArray,
                    chosenAPIChords,
                    hookTheoryChords,
                    setHookTheoryChords,
                    setChosenAPIChords,
                    hugeParametersObject,
                    hugeSetStateObject,
                }}
            >
                <GlobalStyle />
                <Header />
                <Routes>
                    <Route>
                        <Route path="/*" element={<Sequencer />} />
                    </Route>
                </Routes>
            </MusicParametersContext.Provider>
        </BrowserRouter>
    )
}

export default App
