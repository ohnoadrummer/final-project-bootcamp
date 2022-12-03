import React, {useContext, useEffect, useState} from "react"
import styled from "styled-components"
import {Donut} from "react-dial-knob"
import {MusicParametersContext} from "../App"

const Parameters = ({playing, setPlaying}) => {
  //   const [tempo, setTempo] = useState(150)
  const {
    tempo,
    setTempo,
    stepCount,
    setStepCount,
    rootNote,
    setRootNote,
    wonkFactor,
    setWonkFactor,
    volume,
    setVolume,
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
  } = useContext(MusicParametersContext)
  const parseTempo = (e) => {
    setTempo(parseInt(e.target.value, 10))
  }

  const parseSteps = (e) => {
    setStepCount(parseInt(e.target.value))
  }

  const parseRoot = (e) => {
    setRootNote(parseInt(e.target.value))
  }
  const parseWonk = (e) => {
    setWonkFactor(parseInt(e.target.value))
  }
  const parseVolume = (e) => {
    setVolume(parseInt(e.target.value))
  }
  const parseSound = (e) => {
    setSound(e.target.value)
  }
  const parseFilterCutoff = (e) => {
    setFilterCutoff(parseInt(e.target.value))
  }
  const parseAttack = (e) => {
    setAttack(parseInt(e.target.value))
  }

  const parseDecay = (e) => {
    setDecay(parseInt(e.target.value))
  }
  const parseSustain = (e) => {
    setSustain(parseInt(e.target.value))
  }
  const parseRelease = (e) => {
    setRelease(parseInt(e.target.value))
  }
  //   useEffect(() => {
  //     setAreBeatsChecked(
  //       generateAreBeatsCheckedInitialState(makeNotesState, blankStepCountArray)
  //     )
  //   }, [stepCount])

  return (
    <MainDiv>
      <StartButtonDiv>
        <button
          onClick={() => {
            if (!playing) {
              setPlaying(true)
            } else {
              setPlaying(false)
            }
          }}
        >
          {playing ? "stop" : "start"}
        </button>
        <p>press s to start/stop</p>
      </StartButtonDiv>
      {/* <button onClick={() => synth.stop()}>stop synth</button> */}
      <ParameterDiv>
        <span>Tempo</span>
        <Parameter
          type="range"
          min="60.0"
          max="240.0"
          step="1"
          value={tempo}
          onInput={(e) => parseTempo(e)}
        />
        <span>{tempo}</span>
      </ParameterDiv>
      <ParameterDiv>
        <span>Wonk</span>
        <Parameter
          type="range"
          min="1.0"
          max="400.0"
          step="1"
          value={wonkFactor}
          onInput={(e) => parseWonk(e)}
        />
        <span>{wonkFactor}</span>
      </ParameterDiv>
      <ParameterDiv>
        <span>Volume</span>
        <Parameter
          type="range"
          min="0"
          max="100"
          step="1"
          value={volume}
          onInput={(e) => parseVolume(e)}
        />
        <span>{volume}</span>
      </ParameterDiv>
      <SoundFilterDiv>
        <ParameterDiv>
          <label>Sound</label>
          <select value={sound} onChange={parseSound}>
            <option value="sine">Sine Wave</option>
            <option value="square">Square Wave</option>
            <option value="sawtooth">Sawtooth Wave</option>
            <option value="triangle">Triangle Wave</option>
            <option value="64"></option>
          </select>
        </ParameterDiv>
        <SoundFilterDiv>
          <ParameterDiv>
            <span>Filter</span>
            <Filter
              type="range"
              min="0"
              max="11000"
              step="10"
              value={filterCutoff}
              onInput={(e) => parseFilterCutoff(e)}
            />
            <span>{filterCutoff}</span>
          </ParameterDiv>
        </SoundFilterDiv>
      </SoundFilterDiv>
      <ParameterDiv>
        <span>Attack</span>
        <Parameter
          type="range"
          min="1.0"
          max="100.0"
          step="1"
          value={attack}
          onInput={(e) => parseAttack(e)}
        />
        <span>{attack}</span>
      </ParameterDiv>
      <ParameterDiv>
        <span>Decay</span>
        <Parameter
          type="range"
          min="1.0"
          max="100.0"
          step="1"
          value={decay}
          onInput={(e) => parseDecay(e)}
        />
        <span>{decay}</span>
      </ParameterDiv>
      <ParameterDiv>
        <span>Sustain</span>
        <Parameter
          type="range"
          min="1.0"
          max="100.0"
          step="1"
          value={sustain}
          onInput={(e) => parseSustain(e)}
        />
        <span>{sustain}</span>
      </ParameterDiv>
      <ParameterDiv>
        <span>Release</span>
        <Parameter
          type="range"
          min="1.0"
          max="100.0"
          step="1"
          value={release}
          onInput={(e) => parseRelease(e)}
        />
        <span>{release}</span>
      </ParameterDiv>
      <SoundFilterDiv>
        <ParameterDiv>
          <label>Steps</label>
          <select value={stepCount} onChange={parseSteps}>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="24">24</option>
            <option value="32">32</option>
            <option value="64">64</option>
          </select>
        </ParameterDiv>
        <SoundFilterDiv>
          <ParameterDiv>
            <label>Root</label>
            <select value={rootNote} onChange={parseRoot}>
              <option value="0">A</option>
              <option value="1">A#</option>
              <option value="2">B</option>
              <option value="3">C</option>
              <option value="4">C#</option>
              <option value="5">D</option>
              <option value="6">D#</option>
              <option value="7">E</option>
              <option value="8">F</option>
              <option value="9">F#</option>
              <option value="10">G</option>
              <option value="11">G#</option>
            </select>
          </ParameterDiv>
        </SoundFilterDiv>
      </SoundFilterDiv>
    </MainDiv>
  )
}

export default Parameters
const MainDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid fuchsia;
`

const Parameter = styled.input`
  -webkit-appearance: slider-vertical;

  margin: 8px;
  height: 75px;
`
const ParameterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StartButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const SoundFilterDiv = styled.div`
  padding: 10px;
`
const Filter = styled.input`
  height: 20px;
`
