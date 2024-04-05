import React from 'react'
import Header from '../../components/header/header'
import Button from '../../components/button/button'

export default function CreateLeague() {
  return (
    <div className='bg-bg6 bg-no-repeat bg-cover flex-col size-full justify-center item-center content-center'>
        <Header children='Create League' fontSize={'text-6xl'} className={'mb-10'}/>
        <div className='w-3/5 m-auto flex flex-col items-center content-center p-4 bg-gradient-to-br bg-white border-4 border-violet-500 rounded-xl bg-opacity-70 h-3/4'>
          <label htmlFor='name' className='text-4xl'>League name:</label>
          <input name='name' type='text' className='mt-3 w-2/4 h-8 rounded text-gray-800 border border-violet-400 focus:outline-none focus:ring-violet-600 focus:ring-1'/>
          <label htmlFor='' className='mt-5 text-xl'>Add Team</label>
          <input placeholder='dropdown here' className='mt-3 rounded text-gray-800 border border-violet-400 focus:outline-none focus:ring-violet-600 focus:ring-1'></input>
          <div className='mt-3 flex-col w-full h-3/5 p-3'>
            <label className='text-3xl ml-3'>Teams</label>
            <div className='mt-3 rounded border border-white size-full'>
              <div>teams here</div>
            </div>
          </div>
          <Button children={'CREATE'} size={'mt-12 w-36 h-10'}/>
        </div>
    </div>
  )
}
