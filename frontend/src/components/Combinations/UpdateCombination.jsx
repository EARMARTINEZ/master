import React, { useEffect, useState, useRef } from 'react'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useTasks } from 'utils/ProviderContext';
import toast from 'react-hot-toast';

export const UpdateCombination = ({ editor, onReady, allReferences, availableImages, setAvailableImages, selectedImages, setSelectedImages, onAddImage, obtenerValorOption, obtenerValorTheme, obtenerValorGender, idReferencesInCombination, setIdReferencesInCombination, themes, genders, parts }) => {
  const {
    IdCollection,
    combinationsMap,
    doDeleteCombination,
    doUpdateCombination
  } = useTasks();

  const [idSelectedCombination, setIdSelectedCombination] = useState('');
  const firstUpdate = useRef(true);

  //USER SELECT A COMBINATION
  const handleSelectCombination = (e) => {

    console.log(allReferences)

    if(e.target.value !== 'select'){
      setIdReferencesInCombination([]);
      setSelectedImages([]);
      setAvailableImages([]); //DEBERIA TENER IMAGANES ??

      //Aca se debe cargar la combinacion seleccionada
      setIdSelectedCombination(e.target.value);

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

  const onUpdateCombination = () => {
    if(combinationsMap.length === 0){
      toast.error('You dont have any combination to update, please create one first!');
    }else{
      if(selectedImages.length !== 0){
        const theme = document.getElementById('theme-update').value;
        const gender = document.getElementById('gender-update').value;
        const option = document.getElementById('options-update').value;
        const references = idReferencesInCombination;
        const canvas = editor.canvas.toJSON();
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

  useEffect(() => {
    if(genderType === '' && themeType === '' && partType === ''){
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
      if(newArrayValueFilters.length === 0){
        setVacio(true);
      }else{

        const combinationSelected = combinationsMap.find(combination => parseInt(combination.id) === parseInt(idSelectedCombination));
        const references = combinationSelected.references.map(reference => reference.id);
        const newAvailableImages = allReferences.filter(image => references.includes(image.id));
        const objetosFiltrados = newArrayValueFilters.filter(objeto => {
          return !newAvailableImages.some(item => item.id === objeto.id);
        });
        setVacio(false);
        setAvailableImages(objetosFiltrados)
      }
    }
  }, [genderType, themeType, partType])

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

  function renderImages(){
    if(vacio){
      return (
        <h2>No images found with the selected filters</h2>
      );
    }else{
      return(
        <>
          {availableImages.map((image, index) => (
            <div key={image.id} onClick={() => onAddImage(image.src, image.id)}>
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
        </div>
      </div>
      {/* Combination */}
      <div className="mt-2 flex flex-row items-center justify-start gap-2">
        <b>Select Combination:</b>
        <select id="combination" onChange={(e) => handleSelectCombination(e)}>
          <option value="select">Please, select a combination</option>
          {/* <option value="30">(0000001,0000002,0000003)</option> */}
          {combinationsMap.map((combination, index) => (
            <option key={combination.id} value={combination.id}>
              (
              {combination.references
                .map((reference) => reference.id)
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
        <div className="flex h-[600px] w-[50%] flex-wrap items-center justify-center gap-2 overflow-scroll overflow-x-hidden border">
          {renderImages()}
        </div>
      </section>
      <div className="my-10 flex flex-row items-center justify-end gap-6">
        {/* save combination */}
        <button
          onClick={() => onUpdateCombination()}
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
