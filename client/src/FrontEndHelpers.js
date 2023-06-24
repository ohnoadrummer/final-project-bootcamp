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

export const giveOctaveNumber = (note) => {
    // change numbers 8 and above into their equivalents in the octave below (e.g. 9 becomes 2)
    if (note > 14) {
        note = note - 14
    } else if (note > 7) {
        note = note - 7
    }
    console.log('give oct')

    return note
}

export const makeDeepCopy = (original) => {
    console.log('deep copy')
    return JSON.parse(JSON.stringify(original))
}

// handles both turning off and on notes
export const handleNoteClick = (
    notesToPlay,
    setNotesToPlay,
    { beatNum, scaleIndex, whichGrid },
    setClickedNote
) => {
    console.log('note click?')
    const arrayKey = `note-${scaleIndex}`
    let obj = { ...notesToPlay }

    if (notesToPlay[`beat-${beatNum}`][arrayKey]?.[whichGrid]) {
        // if the note already exists, delete it
        if (obj[`beat-${beatNum}`][arrayKey][whichGrid]) {
            delete obj[`beat-${beatNum}`][arrayKey][whichGrid]
        }

        // if that note no longer plays anything, clean up the object
        if (Object.values(obj[`beat-${beatNum}`][arrayKey]).length === 0) {
            delete obj[`beat-${beatNum}`][arrayKey]
        }
    } else {
        obj[`beat-${beatNum}`][arrayKey] = {
            [whichGrid]: 1,
            ...obj[`beat-${beatNum}`][arrayKey],
        }
    }
    setNotesToPlay(obj)
    setClickedNote(null)
}

export const makeNotesToPlayMaster = () => {
    const obj = {}
    for (let i = 1; i <= 16; i++) {
        obj[`beat-${i}`] = {}
    }
    return obj
}

export const makeBlankStepCountArray = () => {
    let arr = []
    for (let i = 16; i > 0; i--) {
        arr.push(0)
    }
    return arr
}

export const updateBlankStepCountArray = (stepCount) => {
    let arr = []
    for (let i = stepCount; i > 0; i--) {
        arr.push(0)
    }
    return arr
}

export const updateNotesToPlayMaster = (stepCount, notesToPlay) => {
    const obj = { ...notesToPlay }

    const oldLength = Object.keys(notesToPlay).length
    if (oldLength < stepCount) {
        for (let i = oldLength + 1; i <= stepCount; i++) {
            obj[`beat-${i}`] = {}
        }
    } else {
        for (let i = stepCount + 1; i <= oldLength; i++) {
            delete obj[`beat-${i}`]
        }
    }

    return obj
}

let trackCheckboxes = 0

export const trackAndResetPattern = (sendChordPattern, setSendChordPattern) => {
    // increment track checkboxes
    trackCheckboxes++
    if (
        trackCheckboxes / sendChordPattern.pattern.length >=
        sendChordPattern.note.length
    ) {
        // re-init trackcheckboxes
        trackCheckboxes = 0
        setSendChordPattern(undefined)
    }
}
