import {motion, AnimatePresence} from 'framer-motion'
import {useSnapshot} from 'valtio'
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion'
import { CustomButton } from '../components'
import React from 'react'
import state from '../store'

const Home = () => {

  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
      {snap.intro &&(
        <motion.section className='home' {...slideAnimation('left')}>
          <motion.header {...slideAnimation('down')}>
            <img
            src='./threejs.png'
            alt='logo'
            className="w-12 h-12 object-contain"/>
          </motion.header>

          <motion.div className='home-content' {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className='head-text' style={{ fontSize: '5rem', fontWeight: 'bold' }}>
                LET'S <br className='xl:block hidden'/> DO IT.
              </h1>
            </motion.div>
            <motion.div {...headContentAnimation} className="flex flex-col gap-5">
              <p className="max-w-md font-normal text-gray-600 text-base">
                Create your own unique and exclusive shirt with our brand-new 3D customization tool.
                <strong>{" "}Unleash your imagination</strong>{" "} and define your own style.
              </p>
              
              <CustomButton
              type="filled"
              title="Customize It"
              handleClick={() => state.intro = false}    
              customStyles= "w-fit px-4 py-2.5 font-bold text-sm"  
              style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}         
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home