import React, {useState, useEffect} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import {downloadCanvasToImage, reader} from '../config/helpers';
import {EditorTabs, FilterTabs, DecalTypes} from '../config/constants';
import {fadeAnimation, slideAnimation} from '../config/motion';
import { AIpicker, Colorpicker, CustomButton, FilePicker, Tab } from '../components';


const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [prompt, setprompt] = useState('');
  const [generatingImg, setgeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("")
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })


  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <Colorpicker/>
      case "filepicker":
        return <FilePicker
          file = {file}
          setFile = {setFile}
          readFile = {readFile}
          />
      case "aipicker":
        return <AIpicker
          prompt={prompt}
          setPrompt={setprompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
           />
    
      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt");

    try {
      
    } catch (error) {
      alert(error)
    } finally {
      setgeneratingImg(false);
      setActiveEditorTab("");
    }
  }


  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }

    setActiveFilterTab((prevState) => {
      return{
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("")
      })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div 
          key='custom' 
          className='absolute top-0 left-0 z-10'
          {...slideAnimation('left')}>
            <div className='flex items-center min-h-screen'>
              <div className='editorabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab
                  key = {tab.name}
                  tab = {tab}
                  handleClick = {() => 
                    setActiveEditorTab(tab.name)
                    }/>
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div className='absolute z-10 top-5 right-5'
          {...fadeAnimation}>
            <CustomButton
            type="filled"
            title="Go Back"
            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            handleClick={() => state.intro = true}/>
          </motion.div>
          <motion.div className='filterabs-container'
          {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab
              key = {tab.name}
              tab= {tab}
              isFilterTab
              isActiveTab={activeFilterTab[tab.name]}
              handleClick={() => handleActiveFilterTab(tab.name)}/>
            ))}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer