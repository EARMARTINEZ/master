/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { fabric } from 'fabric';
import { useTasks } from 'utils/ProviderContext'
import { UpdateCombination } from './UpdateCombination';
import { CreateCombination } from './CreateCombination';

const CombinationBoard = ({ action }) => {

  const {
    setIdCollection,
    IdCollection,
    combinationsMap,
    dofetchReferenceForSilhouettes,
    dofindThemes,
    dofindGender,
    dofindParts,
    dofetchCombinationByCollection,
    dofetchIDCollection,
    NameCollection,
    doFetchLastCombinationId,
  } = useTasks()

  const [availableImages, setAvailableImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [idReferencesInCombination, setIdReferencesInCombination] = useState([]);
  const [allReferences, setAllReferences] = useState([]);
  const [themes, setThemes] = useState([]);
  const [genders, setGenders] = useState([]);
  const [parts, setParts] = useState([]);
  const { editor, onReady } = useFabricJSEditor()


  async function fetchLastCombinationId() {
    const lastCombinationId = await doFetchLastCombinationId()
    return lastCombinationId
  }

  async function formatCombinationImage(editor, newObjects, selectedImages, backgroundImage, originalHeight, nameCollection, refId) {
    // Store the original canvas height
    const canvasWidth = editor?.canvas.getWidth();

    // Increase the canvas height by 150 (or any value you want)
    editor?.canvas.setHeight(originalHeight + 150);

    // Shift all objects (images) down by 100
    editor?.canvas.getObjects().forEach((obj) => {
      obj.top += 150;
      obj.setCoords();
    });

    // Move the background image down
    if (backgroundImage) {
      // backgroundImage.top += 150;
      backgroundImage.visible = false;
      backgroundImage.setCoords();
    }

    // Add text to the canvas
    // buscar el id de la ultima combinacion y sumarle 1
    const combinationNumber = "Combination " + refId;
    const seasonText = "Season: " + nameCollection;
    const createadOn =
      "Created on " +
      new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

    // Create a white rectangle
    const rect = new fabric.Rect({
      left: 0,
      top: 0,
      width: editor?.canvas.getWidth(),
      height: editor?.canvas.getHeight(),
      fill: "white",
    });
    const text1 = new fabric.Text(combinationNumber, {
      left: 3,
      top: 8,
      fontSize: 28,
      fontFamily: "Arial",
      fontWeight: "normal",
    });
    const createdText = new fabric.Text(createadOn, {
      left: canvasWidth - 260,
      top: 36,
      fontSize: 12,
      fontFamily: "Arial",
      fill: "gray",
      fontWeight: "normal",
    });
    const line = new fabric.Line([0, 50, canvasWidth, 50], {
      stroke: "black",
      strokeWidth: 1,
    });
    const text2 = new fabric.Text(seasonText, {
      left: 3,
      top: 60,
      fontSize: 23,
      fontFamily: "Arial",
      fontWeight: "normal",
    });

    newObjects.push(rect, text1, createdText, line, text2);

    selectedImages.forEach((image, index) => {
      const text = new fabric.Text(image.typeproduct + " " + image.ref, {
        left: 3,
        top: 83 + 23 * index,
        fontSize: 22,
        fontFamily: "Arial",
        fontWeight: "normal",
      });
      newObjects.push(text);
      editor?.canvas.add(text);
    });

    editor?.canvas.add(...newObjects);

    rect.sendToBack();

    // Render the canvas again to reflect the changes
    // editor?.canvas.renderAll();
  }

  function canvaToImage(editor) {
    return editor?.canvas.toDataURL({
      format: "png",
      quality: 0.8,
    });
  }

  function revertCombinationImage(editor, newObjects, logo, backgroundImage, originalHeight) {

    // Shift all objects (images) back up
    editor?.canvas.getObjects().forEach((obj) => {
      obj.top -= 150;
      obj.setCoords();
    });

    // Move the background image back up
    if (backgroundImage) {
      // backgroundImage.top -= 150;
      backgroundImage.visible = true;
      backgroundImage.setCoords();
    }

    // Remove the text from the canvas
    newObjects.push(logo);
    newObjects.forEach((newO) => {
      editor?.canvas.remove(newO);
    });

    // Revert the canvas back to its original size
    editor?.canvas.setHeight(originalHeight);
  }

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


  // // Borrar al hacer commit
  // useEffect(() => {
  //   setIdCollection(35)
  // })

  // // IMPORTANTE AAAA ^^^^


  //CARGA LAS SILUETAS DE LA ROPA, LOS GENEROS Y LOS TEMAS
  useEffect(() => {

    console.log('IdCollection', IdCollection)

    if (!IdCollection) {
      return;
    }

    const fetchCollectioName = async () => {
      const response = await dofetchIDCollection(IdCollection);
      setNameCol(response.name);
    }

    const fetchSilhouettes = async () => {
      const response = await dofetchReferenceForSilhouettes(IdCollection);
      const initialImages = response.map((item) => ({
        id: item.id,
        ref: item.ref,
        src: item.silhouette.url,
        genderType: item.gender,
        themeType: item.theme,
        partType: item.part,
        typeproduct: item.typeproduct
      }));
      console.log('initialImages', initialImages)
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
  const onAddImage = (url, id, typeproduct, ref) => {
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
        setSelectedImages([...selectedImages, { id, src: url, typeproduct, ref}])
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
        formatCombinationImage={formatCombinationImage}
        canvaToImage={canvaToImage}
        revertCombinationImage={revertCombinationImage}
        fetchLastCombinationId={fetchLastCombinationId}
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
        formatCombinationImage={formatCombinationImage}
        canvaToImage={canvaToImage}
        revertCombinationImage={revertCombinationImage}
      />
    )
  }

};

export default CombinationBoard