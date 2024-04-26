/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import React from 'react'
import { useEffect, useState } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { fabric } from 'fabric';
import { useTasks } from 'utils/ProviderContext'
import { UpdateCombination } from './UpdateCombination';
import { CreateCombination } from './CreateCombination';

const CombinationBoard = ({ action }) => {

  const {
    IdCollection,
    combinationsMap,
    dofetchReferenceForSilhouettes,
    dofindThemes,
    dofindGender,
    dofindParts,
    dofetchCombinationByCollection,
  } = useTasks()

  const [availableImages, setAvailableImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [idReferencesInCombination, setIdReferencesInCombination] = useState([]);
  const [allReferences, setAllReferences] = useState([]);
  const [themes, setThemes] = useState([]);
  const [genders, setGenders] = useState([]);
  const [parts, setParts] = useState([]);
  const { editor, onReady } = useFabricJSEditor()

  // AGREGA EL BOTÓN DE ELIMINAR A LA IMAGEN DE LA ROPA (TENERLO AFUERA CON UN USEEFECT PARA QUE NO DE PROBLEMAS EL ESTADO)
  useEffect(() => {
    const renderIcon = (ctx, left, top, styleOverride, fabricObject) => {
      var size = 24;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      // Dibujar círculo rojo
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(0, 0, size / 2, 0, 2 * Math.PI);
      ctx.fill();
      // Dibujar X blanca
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-size / 4, -size / 4);
      ctx.lineTo(size / 4, size / 4);
      ctx.moveTo(size / 4, -size / 4);
      ctx.lineTo(-size / 4, size / 4);
      ctx.stroke();

      ctx.restore();
    };
    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.65,  // Ajusta la posición horizontal
      y: -0.65, // Ajusta la posición vertical (-0.5 para colocarlo en la esquina superior)
      offsetY: 16, // Ajusta el desplazamiento vertical
      offsetX: -16, // Ajusta el desplazamiento horizontal (negativo para la esquina derecha)
      cursorStyle: 'pointer',
      mouseUpHandler: (fabricObject, options) => onRemoveObject(editor, allReferences, availableImages, selectedImages),
      render: renderIcon,
      cornerSize: 24,
    });
  }, [availableImages, selectedImages])

  //CARGA LAS SILUETAS DE LA ROPA, LOS GENEROS Y LOS TEMAS
  useEffect(() => {

    if (!IdCollection) {
      return;
    }

    const fetchSilhouettes = async () => {
      const response = await dofetchReferenceForSilhouettes(IdCollection);
      const initialImages = response.map((item) => ({
        id: item.id,
        src: item.silhouette.url,
        genderType: item.gender,
        themeType: item.theme,
        partType: item.part
      }));
      setAllReferences(initialImages);
      setAvailableImages(initialImages);
    }
    fetchSilhouettes();

    const fetchGenders = async () => {
      const { data } = await dofindGender();
      var selectElement;
      if(action === 'crear'){
        selectElement = document.getElementById("gender-create");
      }else{
        selectElement = document.getElementById("gender-update");
      }
      setGenders(data);
    }
    fetchGenders();

    const fetchThemes = async () => {
      let data  = await dofindThemes(IdCollection);
      var selectElement;
      if(action === 'crear'){
        selectElement = document.getElementById("theme-create");
      }else{
        selectElement = document.getElementById("theme-update");
      }
      setThemes(data.themes.data);
    }
    fetchThemes();

    const fetchParts = async () => {
      const { data } = await dofindParts();
      setParts(data);
    }
    fetchParts();

    dofetchCombinationByCollection(IdCollection);
  }, []);

  //CARGA LA IMAGEN DE FONDO DEL CANVAS
  useEffect(() => {
    if (editor) {
      let img = new Image()
      img.crossOrigin = 'anonymous';
      img.src = '/ref_maniqui.jpg';
      img.onload = function () {
        editor.canvas.setWidth(img.width)
        editor.canvas.setHeight(img.height)
        editor.canvas.setBackgroundImage(
          new fabric.Image(img),
          editor.canvas.renderAll.bind(editor.canvas),
        )
      }
    }
  }, [editor]);

  //AGREGA LA IMAGEN DE LA ROPA DENTRO DEL CANVAS
  const onAddImage = (url, id) => {
    if (editor) {
      let imgElement = new Image();
      // Importante para que no haya problema de CORS
      imgElement.crossOrigin = "anonymous"; // This should be set before setting "src"
      imgElement.src = url;
      imgElement.onload = () => {
        // Obtener el ancho y alto del canvas
        const canvasWidth = editor.canvas.width;
        const canvasHeight = editor.canvas.height;

        // Calcular las coordenadas para el centro del canvas
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        // Calcular las coordenadas para la esquina superior izquierda de la imagen (basado en el centro del canvas)
        const imgLeft = centerX - (imgElement.width * 0.4) / 2;
        const imgTop = centerY - (imgElement.height * 0.4) / 2;

        // Crear la instancia de la imagen con las coordenadas calculadas
        let imgInstance = new fabric.Image(imgElement, {
          left: imgLeft,
          top: imgTop,
          scaleX: 0.4,
          scaleY: 0.4,
          lockScalingX: false,
          lockScalingY: false,
          lockUniScaling: false,
          lockRotation: false,
          hasControls: true,
        });
        editor.canvas.add(imgInstance);
        // add to selected images
        setSelectedImages([...selectedImages, { id, src: url }])
        // remove from available images
        setAvailableImages(availableImages.filter((i) => i.id !== id))
        //Agregamos al objeto de idDeReferencias
        setIdReferencesInCombination([...idReferencesInCombination, id]);
        //Se le agrega el boton de eliminar al objeto
      };
    }
  }

  //ELIMINA LAS IMAGANES DE LA ROPA DENTRO DEL CANVAS
  const onRemoveObject = (editor, allReferences, availableImages, selectedImages) => {
    const activeObject = editor.canvas.getActiveObject();
    if (activeObject) {
      editor.canvas.remove(activeObject);
    }
    const { id, src } = allReferences.find((image) => image.src === activeObject?.getSrc()) || { id: null, src: null };
    if(id){
      setAvailableImages([...availableImages, { id, src }])
      setSelectedImages(selectedImages.filter((i) => i.id !== id))
      //Tuve que ponerle parseInt porque id viene como string
      setIdReferencesInCombination(idReferencesInCombination.filter((i) => parseInt(i) !== parseInt(id)))
    }
  };

  //CARGA EL CANVAS CON EL JSON DE LA COMBINACIÓN
  const loadCanvas = (json) => {
    if (editor) {
      editor.canvas.loadFromJSON(json, () => {
        editor.canvas.renderAll()
      })
    }
  }

  //DESCARGA LA IMAGEN DEL CANVAS
  const downloadImage = () => {
    if (editor) {
      const dataURL = editor?.canvas.toDataURL({
        format: 'png',
      })
      const link = document.createElement('a');
      link.download = 'image.png';
      link.href = dataURL;
      link.click();
    }
  }

  // FUNCIONES PARA OBTENER LOS VALORES DE LOS INPUTS
  function obtenerValorOption(selectedOption) {
    var selectElement = document.getElementById(`options-${selectedOption}`);
    var valorSeleccionado = selectElement.options[selectElement.selectedIndex].value;
    return valorSeleccionado;
  }

  function obtenerValorTheme(selectedOption) {
    var selectElement = document.getElementById(`theme-${selectedOption}`);
    var valorSeleccionado = selectElement.options[selectElement.selectedIndex].value;
    return valorSeleccionado;
  }

  function obtenerValorGender(selectedOption) {
    var selectElement = document.getElementById(`gender-${selectedOption}`);
    var valorSeleccionado = selectElement.options[selectElement.selectedIndex].value;
    return valorSeleccionado;
  }

  if(action === 'crear'){
    return (
      <CreateCombination
      editor={editor}
      onReady={onReady}
      allReferences={allReferences}
      availableImages={availableImages}
      setAvailableImages={setAvailableImages}
      selectedImages={selectedImages}
      setSelectedImages={setSelectedImages}
      onAddImage={onAddImage}
      obtenerValorOption={obtenerValorOption}
      obtenerValorTheme={obtenerValorTheme}
      obtenerValorGender={obtenerValorGender}
      idReferencesInCombination={idReferencesInCombination}
      setIdReferencesInCombination={setIdReferencesInCombination}
      themes={themes}
      genders={genders}
      parts={parts}
      />
    )
  }else{
    return (
      <UpdateCombination
        editor={editor}
        onReady={onReady}
        allReferences={allReferences}
        availableImages={availableImages}
        setAvailableImages={setAvailableImages}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        onAddImage={onAddImage}
        obtenerValorOption={obtenerValorOption}
        obtenerValorTheme={obtenerValorTheme}
        obtenerValorGender={obtenerValorGender}
        idReferencesInCombination={idReferencesInCombination}
        setIdReferencesInCombination={setIdReferencesInCombination}
        themes={themes}
        genders={genders}
        parts={parts}
      />
    )
  }

};

export default CombinationBoard