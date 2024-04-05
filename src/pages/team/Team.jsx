import React from 'react'
import './styles.css'
import Standings from '../../components/standings/Standings'

export default function Team() {
  return (
    <div className='team-background size-full flex item-center content-center justify-center p-20'>
      <Standings/>
    </div>
  )
}
