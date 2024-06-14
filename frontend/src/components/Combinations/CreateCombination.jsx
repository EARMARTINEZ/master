import React, { useEffect, useState } from 'react'
import { FabricJSCanvas } from 'fabricjs-react'
import toast from 'react-hot-toast';
import { useTasks } from 'utils/ProviderContext';
import Image from 'next/image';
import { Spin } from 'antd';

import logoEpkOld from '@/images/logoEpkOld.png';

export const CreateCombination = ({
  editor,
  onReady,
  allReferences,
  availableImages,
  setAvailableImages,
  selectedImages,
  setSelectedImages,
  onAddImage,
  obtenerValorOption,
  obtenerValorTheme,
  obtenerValorGender,
  idReferencesInCombination,
  setIdReferencesInCombination,
  themes,
  genders,
  parts,
  formatCombinationImage,
  canvaToImage,
  revertCombinationImage,
  fetchLastCombinationId,
}) => {
  const { IdCollection, doCreateCombination, NameCollection } = useTasks()
  const [loading, setLoading] = useState(false);


  function saveCombination({
    refId,
    editor,
    canvaImage,
    idReferencesInCombination,
    selectedImages,
    allReferences,
    gender,
    theme,
    option,
    jsonCobinationCanva
  }) {
    const references = idReferencesInCombination
    // console.log(selectedImages)
    toast
      .promise(
        doCreateCombination({
          refId: refId,
          genderID: gender,
          themeID: theme,
          references: references,
          canvas: jsonCobinationCanva,
          collectionID: IdCollection,
          type: option,
          file: canvaImage
        }),
        {
          loading: 'Saving...',
          success: <p>Combination created successfully!</p>,
          error: <p>An error has occurred, try again!</p>,
        }
      )
      .then(() => {
        //Borramos las imagenes seleccionadas
        editor.canvas.getObjects().forEach((obj) => {
          if (obj.type === 'image') {
            editor.canvas.remove(obj)
          }
        })
        setIdReferencesInCombination([])
        setSelectedImages([])
        setAvailableImages(allReferences)
      })
  }

  async function createCombinationFunction() {
    if (selectedImages.length !== 0) {
      let option = obtenerValorOption('create')
      let theme = obtenerValorTheme('create')
      let gender = obtenerValorGender('create')
      const jsonCobinationCanva = editor?.canvas.toJSON()

      let logo
      // Load the image
      fabric.Image.fromURL(
        logoEpkOld.src,
        async function (img) {
          const originalHeight = editor?.canvas.getHeight()
          const backgroundImage = editor?.canvas.backgroundImage
          const newObjects = []

          const refId = await fetchLastCombinationId() + 1

          await formatCombinationImage(
            editor,
            newObjects,
            selectedImages,
            backgroundImage,
            originalHeight,
            NameCollection,
            refId
          )

          img.scaleToWidth(48)
          img.set({
            left: editor?.canvas.getWidth() - img.getScaledWidth() - 2,
            top: 2,
          })
          editor?.canvas.add(img)
          img.bringToFront()
          logo = img

          const canvaImage = canvaToImage(editor)
          revertCombinationImage(
            editor,
            newObjects,
            logo,
            backgroundImage,
            originalHeight
          )

          saveCombination({
            refId,
            editor,
            canvaImage,
            idReferencesInCombination,
            selectedImages,
            allReferences,
            gender,
            theme,
            option,
            jsonCobinationCanva
          })
        },
        { crossOrigin: 'anonymous' }
      )
    } else {
      toast.error('You must select at least one image to create a combination')
    }
  }

  const [genderType, setGenderType] = useState('')
  const [themeType, setThemeType] = useState('')
  const [partType, setPartType] = useState('')
  const [vacio, setVacio] = useState(false)

  useEffect(() => {
    if (genderType === '' && themeType === '' && partType === '') {
      setVacio(false)
      setAvailableImages(allReferences)
    } else {
      var newArrayValueFilters = []
      if (genderType !== '') {
        newArrayValueFilters = allReferences.filter(
          (reference) => reference.genderType === genderType          
        )
        console.log(genderType)
      }
      if (themeType !== '') {
        if (newArrayValueFilters.length !== 0) {
          newArrayValueFilters = newArrayValueFilters.filter(
            (reference) => reference.themeType === themeType
          )
        } else {
          newArrayValueFilters = allReferences.filter(
            (reference) => reference.themeType === themeType
          )
        }
      }
      if (partType !== '') {
        if (newArrayValueFilters.length !== 0) {
          newArrayValueFilters = newArrayValueFilters.filter(
            (reference) => reference.partType === partType
          )
        } else {
          newArrayValueFilters = allReferences.filter(
            (reference) => reference.partType === partType
          )
        }
      }
      if (newArrayValueFilters.length === 0) {
        setVacio(true)
      } else {
        setVacio(false)
        setAvailableImages(newArrayValueFilters)
      }
    }
  }, [genderType, themeType, partType])

  function handleGenderChange(event) {
    if (event.target.value !== '0') {
      setGenderType(event.target.selectedOptions[0].textContent)
    } else {
      setGenderType('')
    }
  }

  function handlePartChange(event) {
    if (event.target.value !== '0') {
      setPartType(event.target.selectedOptions[0].textContent)
    } else {
      setPartType('')
    }
  }

  function handleThemeChange(event) {
    if (event.target.value !== '0') {
      setThemeType(event.target.selectedOptions[0].textContent)
    } else {
      setThemeType('')
    }
  }
  useEffect(() => {
    if (availableImages.length > 0) {
      setLoading(true);
    }
  }, [availableImages]);

  function renderImages() {
    if (vacio) {
      return <h2>No images found with the selected filters</h2>
    } else {
      return (
        <>            
          {availableImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() =>
                onAddImage(image.src, image.id, image.typeproduct, image.ref)
              }
            >
              <article className="flex h-32 w-32 flex-col items-center justify-center border hover:border-black">
                <img
                  src={image.src}
                  alt={`Available ${index + 1}`}
                  className="h-full w-full object-contain"
                  crossOrigin="anonymous"
                />
              </article>
            </div>
          ))}        
        </>
      )
    }
  }

  return (
    <>
      {/* Filters */}
      <div className="mt-2 flex flex-row items-center justify-between space-x-6">
        <div>
          <h2 className="m-0">Create your combination</h2>
        </div>
        <div className=" flex flex-row items-center justify-end gap-2">
          <b>Filter Refs by:</b>
          <select id="genderFilter" onChange={handleGenderChange}>
            <option value="0">All Genders</option>
            {genders.map((gender, index) => (
              <option key={gender.id} value={gender.id}>
                {gender.attributes.name}
              </option>
            ))}
          </select>
          <select id="themeFilter" onChange={handleThemeChange}>
            <option value="0">All Themes</option>
            {themes.map((theme, index) => (
              <option key={theme.id} value={theme.id}>
                {theme.attributes.name}
              </option>
            ))}
          </select>
          <select id="partFilter" onChange={handlePartChange}>
            <option value="0">All Parts</option>
            {parts.map((part, index) => (
              <option key={part.id} value={part.id}>
                {part.attributes.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <section className="mb-5 mt-2 flex flex-col items-start justify-center">
        <b>Combination options:</b>
        {/* Options, Theme, Gender  */}
        <div className="mt-2 flex flex-row items-center justify-start gap-2">
          <select id="options-create">
            <option value="mannequin">Mannequin</option>
            <option value="impulse">Impulse</option>
            <option value="photo">Photo</option>
          </select>
          <select id="theme-create">
            {themes.map((theme, index) => (
              <option key={theme.id} value={theme.id}>
                {theme.attributes.name}
              </option>
            ))}
          </select>
          <select id="gender-create">
            {genders.map((gender, index) => (
              <option key={gender.id} value={gender.id}>
                {gender.attributes.name}
              </option>
            ))}
          </select>
        </div>
      </section>
      {/* Combination */}
      <section className="flex flex-row items-center justify-center gap-5">
        <div className="flex w-[50%] flex-col items-center justify-center overflow-clip border">
          <FabricJSCanvas className="sample-canvas" onReady={onReady} />
        </div>
        {loading && availableImages.length > 1 ? (            
            <div className="flex h-[600px] w-[50%] flex-wrap items-center justify-center gap-2 overflow-scroll overflow-x-hidden border">
              {renderImages()}
            </div>
         ): (
            <div className="flex h-[600px] w-[50%] flex-wrap items-center justify-center gap-2 overflow-scroll overflow-x-hidden border">
            <Spin size="large" className='scale-200'/>
            </div>         
        ) }
      </section>
      <div className="my-10 flex flex-col items-center justify-end">
        <button
          onClick={() => createCombinationFunction()}
          className="rounded bg-blue-950 px-4 py-2 text-white"
        >
          Save Combination
        </button>
      </div>
    </>
  )
}
