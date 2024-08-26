import React, { useEffect, useState, useRef } from 'react'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useTasks } from 'utils/ProviderContext';
import toast from 'react-hot-toast';
import logoEpkOld from '@/images/logoEpkOld.png'
import { Spin } from 'antd';

export const UpdateCombination = ({ editor, onReady, allReferences, availableImages, setAvailableImages, selectedImages, setSelectedImages, onAddImage, obtenerValorOption, obtenerValorTheme, obtenerValorGender, idReferencesInCombination, setIdReferencesInCombination, themes, genders, parts, formatCombinationImage, canvaToImage, revertCombinationImage, nameCol, refToEdit  }) => {
  const {
    IdCollection,
    combinationsMap,
    doDeleteCombination,
    doUpdateCombination,
    NameCollection,
  } = useTasks()

  const [idSelectedCombination, setIdSelectedCombination] = useState('');
  const [refIdSelectedCombination, setRefIdSelectedCombination] = useState('');
  const [imagesLoading, setImagesLoading] = useState(true);
  const firstUpdate = useRef(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (availableImages.length > 0) {
      setImagesLoading(false)
    }
  }, [availableImages])

  function updateCombination({
    refId,
    editor,
    canvaImage,
    idReferencesInCombination,
    selectedImages,
    references,
    gender,
    theme,
    option,
    jsonCombinationCanva,
  }) {
    toast.promise(
      doUpdateCombination({refId: refId, combinationID: idSelectedCombination, genderID:gender, themeID: theme, references: references, canvas: jsonCombinationCanva, collectionID: IdCollection, type: option, file: canvaImage }),
    {
      loading: 'Saving updated combination...',
      success: <p>Combination updated successfully!</p>,
      error: <p>An error has occurred, try again!</p>,
    }
  ).then(() => {
    //Borramos las imagenes seleccionadas
    editor.canvas.getObjects().forEach(obj => {
      if (obj.type === 'image') {
        editor.canvas.remove(obj);
      }
    });
    setIdReferencesInCombination([]);
    setSelectedImages([]);
    setAvailableImages([]);
    localStorage.setItem("updatedIdCombination", idSelectedCombination);
    // document.getElementById("combination").value = "select";
  });
  }

  async function updateCombinationFunction() {
    if(combinationsMap.length === 0){
      toast.error('You dont have any combination to update, please create one first!');
      return;
    }
    if (selectedImages.length !== 0) {
      const theme = document.getElementById('theme-update').value
      const gender = document.getElementById('gender-update').value
      const option = document.getElementById('options-update').value
      const jsonCombinationCanva = editor?.canvas.toJSON()
      const references = idReferencesInCombination

      let logo;
      // Load the image
      fabric.Image.fromURL(
        logoEpkOld.src,
        async function (img) {
          const originalHeight = editor?.canvas.getHeight()
          const backgroundImage = editor?.canvas.backgroundImage
          const newObjects = []

          const refId = refIdSelectedCombination

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

          updateCombination({
            refId,
            editor,
            canvaImage,
            idReferencesInCombination,
            selectedImages,
            references,
            gender,
            theme,
            option,
            jsonCombinationCanva
          })
        },
        { crossOrigin: 'anonymous' }
      )
    } else {
      toast.error('You must select at least one image to create a combination')
    }
  }

  //USER SELECT A COMBINATION
  const handleSelectCombination = (e) => {

    if(e.target.value !== 'select'){
      setIdReferencesInCombination([]);
      setSelectedImages([]);
      setAvailableImages([]);

      //Aca se debe cargar la combinacion seleccionada
      const [id, refId] = e.target.value.split(',')
      setIdSelectedCombination(id);
      setRefIdSelectedCombination(refId);

      //OBTENEMOS LA COMBINACION SELECCIONADA
      const combinationSelected = combinationsMap.find(combination => parseInt(combination.id) === parseInt(e.target.value));

      //HACEMOS UNA PETICION PARA OBTENER LA COMBINACION
      document.getElementById("combination").value = "select";

      //CARGAMOS EL JSON AL CANVAS
      loadCanvas(combinationSelected.canvas);

      //CARGAMOS LAS REFERENCIAS DE LA COMBINACION
      setIdReferencesInCombination(combinationSelected.references.map(reference => reference.id));

      //ACTUALIZAMOS LAS IMAGENES DISPONIBLES
      const references = combinationSelected.references.map(reference => reference.id);
      const newAvailableImages = allReferences.filter(image => !references.includes(image.id));
      setAvailableImages(newAvailableImages);

      //ACTUALIZAMOS LAS IMAGENES SELECCIONADAS
      setSelectedImages(combinationSelected.references);

      //CARGAMOS EL TEMA, EL GENERO Y LA OPCION DE LA COMBINACION
      //lo hago asi porque en el json tengo el nombre del tema pero no el id
      const selectElement = document.getElementById('theme-update')
      for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].innerHTML === combinationSelected.theme) {
          selectElement.selectedIndex = i
          break
        }
      }
      //lo hago asi porque en el json tengo el nombre del genero pero no el id
      const selectElementGender = document.getElementById('gender-update')
      for (let i = 0; i < selectElementGender.options.length; i++) {
        if (selectElementGender.options[i].innerHTML === combinationSelected.gender) {
          selectElementGender.selectedIndex = i
          break
        }
      }
      //lo hago asi porque en el json tengo el nombre de la opcion pero no el id
      const selectElementOption = document.getElementById('options-update')
      for (let i = 0; i < selectElementOption.options.length; i++) { //para hacer la primera letra Cap
        if (selectElementOption.options[i].innerHTML === combinationSelected.type.charAt(0).toUpperCase() + combinationSelected.type.slice(1)) {
          selectElementOption.selectedIndex = i
          break
        }
      }
    }
  }

  const loadCanvas = (json) => {
    if (editor) {
      editor.canvas.loadFromJSON(json, () => {
        editor.canvas.renderAll()
      })
    }
  }

  // reemplazado por updateCombinationFunction
  const onUpdateCombination = () => {
    if(combinationsMap.length === 0){
      toast.error('You dont have any combination to update, please create one first!');
    }else{
      if(selectedImages.length !== 0){
        const theme = document.getElementById('theme-update').value;
        const gender = document.getElementById('gender-update').value;
        const option = document.getElementById('options-update').value;
        const canvas = editor.canvas.toJSON();
        const references = idReferencesInCombination;
        const canvaImage = editor?.canvas.toDataURL({
          format: 'png',
          quality: 0.8,
        })
        const idCollection = IdCollection;

        toast.promise(
            doUpdateCombination({ combinationID: idSelectedCombination, genderID:gender, themeID: theme, references: references, canvas: canvas, collectionID: idCollection, type: option, file: canvaImage }),
          {
            loading: 'Saving updated combination...',
            success: <p>Combination updated successfully!</p>,
            error: <p>An error has occurred, try again!</p>,
          }
        ).then(() => {
          //Borramos las imagenes seleccionadas
          editor.canvas.getObjects().forEach(obj => {
            if (obj.type === 'image') {
              editor.canvas.remove(obj);
            }
          });
          setIdReferencesInCombination([]);
          setSelectedImages([]);
          setAvailableImages([]);
          localStorage.setItem("updatedIdCombination", idSelectedCombination);
          // document.getElementById("combination").value = "select";
        });
      }else{
        toast.error('You must select at least one image to update a combination');
      }
    }
  }

  useEffect(() => {
    if (firstUpdate.current) {
      localStorage.removeItem("updatedIdCombination");
      firstUpdate.current = false
      return
    }

    let updatedIdCombination = localStorage.getItem("updatedIdCombination");
    if (combinationsMap.length > 0 && updatedIdCombination !== null) {
      handleSelectCombination({target: {value: updatedIdCombination}});
    }
  }, [combinationsMap])

  const onDeleteCombination = () => {
    if (idSelectedCombination !== '') {
      console.log('delete combination', idSelectedCombination);
      localStorage.removeItem("updatedIdCombination");
      // doDeleteCombination(idSelectedCombination)
      toast.promise(
        doDeleteCombination(idSelectedCombination),
        {
          loading: 'Deleting combination...',
          success: <p>Combination deleted successfully!</p>,
          error: <p>An error has occurred, try again!</p>,
        }
      ).then(() => {
        //Borramos las imagenes seleccionadas
        editor.canvas.getObjects().forEach(obj => {
          if (obj.type === 'image') {
            editor.canvas.remove(obj);
          }
        });
        setIdReferencesInCombination([]);
        setSelectedImages([]);
        setAvailableImages([]);
        document.getElementById("combination").value = "select";
        setIdSelectedCombination('');
      });
    }
  }

  const [genderType, setGenderType] = useState('');
  const [themeType, setThemeType] = useState('');
  const [partType, setPartType] = useState('');
  const [vacio, setVacio] = useState(false);
  const [check, setCheck] = useState(false)

  useEffect(() => {
    if(genderType === '' && themeType === '' && partType === '' && !check){
      setVacio(false);
      setAvailableImages(allReferences);
    }else{
      var newArrayValueFilters = [];
      if(genderType !== ''){
        newArrayValueFilters = allReferences.filter(reference => reference.genderType === genderType)
      }
      if(themeType !== ''){
        if(newArrayValueFilters.length !== 0){
          newArrayValueFilters = newArrayValueFilters.filter(reference => reference.themeType === themeType);
        }else {
          newArrayValueFilters = allReferences.filter(reference => reference.themeType === themeType);
        }
      }
      if(partType !== ''){
        if(newArrayValueFilters.length !== 0){
          newArrayValueFilters = newArrayValueFilters.filter(reference => reference.partType === partType);
        }else {
          newArrayValueFilters = allReferences.filter(reference => reference.partType === partType);
        }
      }
      if (check) {
        if (newArrayValueFilters.length !== 0) {
          newArrayValueFilters = newArrayValueFilters.filter(
            (reference) => reference.status === 'Cancelled'
          )
        } else {
          newArrayValueFilters = allReferences.filter(
            (reference) => reference.status === 'Cancelled'
          )
        }
      }
      if(newArrayValueFilters.length === 0){
        setVacio(true);
      }else{
        if(idSelectedCombination !== ''){
          const combinationSelected = combinationsMap.find(combination => parseInt(combination.id) === parseInt(idSelectedCombination));
          const references = combinationSelected.references.map(reference => reference.id);
          const newAvailableImages = allReferences.filter(image => references.includes(image.id));
          const objetosFiltrados = newArrayValueFilters.filter(objeto => {
            return !newAvailableImages.some(item => item.id === objeto.id);
          });
          setVacio(false);
          setAvailableImages(objetosFiltrados)
        }else {
          const objetosFiltrados = newArrayValueFilters;
          setVacio(false);
          setAvailableImages(objetosFiltrados)
        }
      }
    }
  }, [genderType, themeType, partType, check])

  function handleGenderChange(event) {
    if(event.target.value !== '0'){
      setGenderType(event.target.selectedOptions[0].textContent);
    }else{
      setGenderType('');
    }
  }

  function handlePartChange(event) {
    if(event.target.value !== '0'){
      setPartType(event.target.selectedOptions[0].textContent);
    }else{
      setPartType('');
    }
  }

  function handleThemeChange(event) {
    if(event.target.value !== '0'){
      setThemeType(event.target.selectedOptions[0].textContent);
    }else{
      setThemeType('');
    }
  }

  useEffect(() => {
    if (availableImages.length > 0) {
      setLoading(true);
    }
  }, [availableImages]);

  function renderImages(){
    if(vacio){
      return (
        <h2>No images found with the selected filters</h2>
      );
    }else{
      return(
        <>
          {availableImages.length !== 0 ? (
            availableImages.map((image, index) => (
              <div key={image.id} onClick={() => addImageAndUpdateAvailableImages(image.src, image.id, image.typeproduct, image.ref)}>
                <article className="flex h-32 w-32 flex-col items-center justify-center border hover:border-black">
                  <img
                    src={image.src}
                    alt={`Available ${index + 1}`}
                    className="h-full w-full object-contain"
                    crossOrigin="anonymous"
                  />
                </article>
              </div>
            ))
          ) : (
            <h2>No hay mas referencias</h2>
          )}
        </>
      )
    }
  }

  function addImageAndUpdateAvailableImages(imageSrc, imageId, imageType, imageRef){
    onAddImage(imageSrc, imageId, imageType, imageRef);
    setAvailableImages(availableImages.filter(image => image.id !== imageId));
  }

  // if ref is not null, then we are in the edit tab and we need to select the combination with the ref, after the combinations are loaded
  useEffect(() => {
    if (parseInt(refToEdit) !== 0 && combinationsMap.length > 0 && availableImages.length > 0) {
      const combination = combinationsMap.find(combination => parseInt(combination.refId) === parseInt(refToEdit))
      if (combination) {
        const selectElement = document.getElementById('combination')
        for (let i = 0; i < selectElement.options.length; i++) {
          if (selectElement.options[i].value === `${combination.id},${combination.refId}`) {
            selectElement.selectedIndex = i
            break
          }
        }
        handleSelectCombination({ target: { value: `${combination.id},${combination.refId}` } })
      } else {
        if (parseInt(refToEdit) === 0){
          toast.error('Combination not found')
        }
      }
    }
  }
  , [combinationsMap, imagesLoading])

  return (
    <>
      {/* Filters */}
      <div className="mt-2 flex flex-row items-center justify-between space-x-6">
        <div>
          <h2 className="m-0">Update your combination</h2>
        </div>
        <div className=" flex flex-row items-center justify-end gap-2">
          <b>Filter Refs by:</b>
          <select id="gender" onChange={handleGenderChange}>
            <option value="0">All Genders</option>
            {genders.map((gender, index) => (
              <option key={gender.id} value={gender.id}>
                {gender.attributes.name}
              </option>
            ))}
          </select>
          <select id="theme" onChange={handleThemeChange}>
            <option value="0">All Themes</option>
            {themes.map((theme, index) => (
              <option key={theme.id} value={theme.id}>
                {theme.attributes.name}
              </option>
            ))}
          </select>
          <select id="part" onChange={handlePartChange}>
            <option value="0">All Parts</option>
            {parts.map((part, index) => (
              <option key={part.id} value={part.id}>
                {part.attributes.name}
              </option>
            ))}
          </select>
          <div className='flex flex-row justify-center items-center space-x-2'>
            <label>Items cancelados</label>
            <input
              type="checkbox"
              id="myCheckbox"
              checked={check}
              onChange={() => setCheck((prev) => !prev)}
            />
          </div>
        </div>
      </div>
      {/* Combination */}
      <div className="mt-2 flex flex-row items-center justify-start gap-2">
        <b>Select Combination:</b>
        <select id="combination" onChange={(e) => handleSelectCombination(e)}>
          <option value="select">Please, select a combination</option>
          {combinationsMap.map((combination, index) => (
            <option key={combination.id} value={`${combination.id},${combination.refId}`}>
              (
              {combination.references
                .map((reference) => reference.ref)
                .join(', ')}
              )
            </option>
          ))}
        </select>
        {idSelectedCombination !== '' && (
          <div className="font-bold text-blue-900">
            <p id="combinationId">
              <span>Combination selected: </span>
              {idSelectedCombination}
            </p>
          </div>
        )}
      </div>

      <section className="mb-5 mt-2 flex flex-col items-start justify-center">
        <b>Combination options:</b>
        {/* Options, Theme, Gender  */}
        <div className="mt-2 flex flex-row items-center justify-start gap-2">
          <select id="options-update">
            <option value="mannequin">Mannequin</option>
            <option value="impulse">Impulse</option>
            <option value="photo">Photo</option>
          </select>
          <select id="theme-update">
            {themes.map((theme, index) => (
              <option key={theme.id} value={theme.id}>
                {theme.attributes.name}
              </option>
            ))}
          </select>
          <select id="gender-update">
            {genders.map((gender, index) => (
              <option key={gender.id} value={gender.id}>
                {gender.attributes.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="flex flex-row items-center justify-center gap-5">
        <div className="flex w-[50%] flex-col items-center justify-center overflow-clip border">
          <FabricJSCanvas className="sample-canvas" onReady={onReady} />
        </div>
        {loading && availableImages.length > 0 ? (
            <div className="flex h-[600px] w-[50%] flex-wrap items-center justify-center gap-2 overflow-scroll overflow-x-hidden border">
              {renderImages()}
            </div>
         ): (
            vacio || availableImages.length === 0 ? (
              <h1>There are no more references with the selected filter</h1>
            ) : (
              loading && (
                <div className="flex h-[600px] w-[50%] flex-wrap items-center justify-center gap-2 overflow-scroll overflow-x-hidden border">
                  <Spin size="large" className='scale-200'/>
                </div>
              )
            )
        ) }
      </section>
      <div className="my-10 flex flex-row items-center justify-end gap-6">
        {/* save combination */}
        <button
          // onClick={() => onUpdateCombination()}
          onClick={() => updateCombinationFunction()}
          className="rounded bg-blue-950 px-4 py-2 text-white"
        >
          Update combination
        </button>
        <button
          onClick={() => onDeleteCombination()}
          className="rounded bg-red-950 px-4 py-2 text-white"
        >
          Delete combination
        </button>
      </div>
    </>
  )
}