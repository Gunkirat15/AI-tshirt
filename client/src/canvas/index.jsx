import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei'

import Shirt from './Shirt'
import BackDrop from './BackDrop'
import CameraRig from './CameraRig'


const CanvasModel = () => {
  return (
    <Canvas shadows 
    camera={{ position: [0, 0, 5], fov: 50 }}
    gl={{ preserveDrawingBuffer: true }}>
      <ambientLight intensity={0.5}/>
      <Environment preset='city'/>
      <CameraRig>
          <Center>
            <Shirt/>
          </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel