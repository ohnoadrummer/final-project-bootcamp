// ? trying to use useContext, i can only import those things inside of a custom hook or a react function component. otherwise, it may need to be tons of arguments passed to JS functions.

// ideally i can make things super pretty by having all the ugly shit over here. mb thats not realistic though. who knows.

export const generateAreChordBeatsCheckedInitialState = (
    makeChordNotesState,
    makeMelodyNotesState,
    blankStepCountArray,
    whichGrid
) => {
    const makeAreChordBeatsChecked = {}
    // DRYDRYDRY
    // TODO refactor and only pass in one of the makeXNotesState, no need to check chords/melody
    // ! did        makeAreChordBeatsChecked[`note-${num}`].push(0) because using blankstepcountarray caused problems with spread operator down the road, each array used the same reference and so a change to one lead to a change to all
    let amtOfArraysToMake

    whichGrid === 'chords'
        ? (amtOfArraysToMake = makeChordNotesState)
        : (amtOfArraysToMake = makeMelodyNotesState)
    // if (whichGrid === 'chords') {
    //     amtOfArraysToMake = makeChordNotesState
    // } else {
    //     amtOfArraysToMake = makeMelodyNotesState
    // }
    amtOfArraysToMake.forEach((num) => {
        makeAreChordBeatsChecked[`note-${num}`] = []
        blankStepCountArray.forEach((step) => {
            makeAreChordBeatsChecked[`note-${num}`].push(0)
        })
    })
    return makeAreChordBeatsChecked
}

export const clearAreChordBeatsChecked = (
    makeChordNotesState,
    blankStepCountArray,
    setAreChordBeatsChecked,
    setChosenAPIChords,
    setChordInputStep,
    setHookTheoryChords
) => {
    const makeAreChordBeatsChecked = {}
    makeChordNotesState.forEach((num) => {
        makeAreChordBeatsChecked[`note-${num}`] = [...blankStepCountArray]
    })
    setAreChordBeatsChecked(makeAreChordBeatsChecked)
    setChosenAPIChords('')
    setChordInputStep(1)
    setHookTheoryChords([])
}
export const clearAreMelodyBeatsChecked = (
    makeMelodyNotesState,
    blankStepCountArray,
    setAreMelodyBeatsChecked
) => {
    const makeAreMelodyBeatsChecked = {}
    makeMelodyNotesState.forEach((num) => {
        makeAreMelodyBeatsChecked[`note-${num}`] = [...blankStepCountArray]
    })
    setAreMelodyBeatsChecked(makeAreMelodyBeatsChecked)
    console.log('set new melody beats')
}

export const makeNewChordMaster = (
    makeChordNotesState,
    areChordBeatsChecked,
    blankStepCountArray
) => {
    const newMaster = {}
    makeChordNotesState.forEach((note) => {
        newMaster[`note-${note}`] = areChordBeatsChecked[`note-${note}`]
        // this takes away if the new length is smaller
        while (newMaster[`note-${note}`].length > blankStepCountArray.length) {
            newMaster[`note-${note}`].pop()
        }

        // this puts more in if the new length is greater
        while (newMaster[`note-${note}`].length < blankStepCountArray.length) {
            newMaster[`note-${note}`].push(0)
        }
    })
    return newMaster
}

export const makeNewMelodyMaster = (
    makeMelodyNotesState,
    areMelodyBeatsChecked,
    blankStepCountArray
) => {
    const newMelodyMaster = {}
    makeMelodyNotesState.forEach((note) => {
        newMelodyMaster[`note-${note}`] = areMelodyBeatsChecked[`note-${note}`]
        // this takes away if the new length is smaller
        while (
            newMelodyMaster[`note-${note}`].length > blankStepCountArray.length
        ) {
            newMelodyMaster[`note-${note}`].pop()
        }

        // this puts more in if the new length is greater
        while (
            newMelodyMaster[`note-${note}`].length < blankStepCountArray.length
        ) {
            newMelodyMaster[`note-${note}`].push(0)
        }
    })
    return newMelodyMaster
}

export const loadChangedSongList = (
    songSavedOrDeleted,
    user,
    setLoadUserSongs,
    setSongSavedOrDeleted,
    handleLoadSongsFetch
) => {
    const newSongList = {}
    if (
        songSavedOrDeleted === 'Song saved!' ||
        songSavedOrDeleted === 'Song deleted!'
    ) {
        fetch(`/api/user-login/${user.sub}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data, 'loading user and songs')
                setLoadUserSongs(handleLoadSongsFetch(data.data))
            })
        setTimeout(() => {
            setSongSavedOrDeleted(false)
        }, 5000)
    }
    return newSongList
}
