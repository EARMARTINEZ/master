import  'flowbite'
import  React, {useEffect, useState, useRef  } from "react";
import { useTasks } from "utils/ProviderContext";
import { BasicTasks } from "utils/Provider/BasicProvider";
import { Button, Checkbox, Form, Input, Select, Space, Radio, Card  } from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleTwoTone } from '@ant-design/icons';

export function FormItemGender({form, ItemFilter, SelectGender, catalogType }) {
  const {
    IdCollection,
    ReferenceMap,
    StaticReferenceMap,
    setReferenceMap,
    doReferenceMapFilters,
    dofindCollectionFilters,
    filtersGenderMap,
    dogenerateFilters,
    setStaticReferenceMap,
    dofindCollectionFiltersCombination,
    doCombinationMapFilters,
    setStaticCombinationMap,
    setCombinationsMap,
  } = useTasks()

  const {
    ItemGender,
    ItemTheme,
    ItemProduct,
    setItemGender,
    setItemTheme,
    setItemProduct,
    ReferenceMapStatus,
    setReferenceMapStatus,
  } = BasicTasks()

  const [filtersStatusMap, setfiltersStatusMap] = useState([])
  const [ClonReferenceMap, setClonReferenceMap] = useState([])
  //const [initialValue, setInitialValue] = useState();
  const initialValue = useRef()
  const [formCatalogView] = Form.useForm()

  const groupGender = function () {
    let ItemStatusMap = []
    if (filtersGenderMap.length > 0) {
      // initialValue.current = filtersGenderMap[0].value
      // setItemGender(filtersGenderMap[0].value)
      initialValue.current = 'All Genders'
      setItemGender('All Genders')
    }
    // Actualizar ItemStatusMap
    ItemStatusMap = filtersGenderMap
    setfiltersStatusMap([...ItemStatusMap])
  }

// PROBLEMA DE RENDIMIENTO POR LA DEPENDENCIA DE filtersGenderMap
// EN ESTE USEEFFECT !!!

  // Se buscan los items filtrados por genero
  // Se ejecuta cuando se monta el componente.
  useEffect(() => {
    groupGender()
    form.setFieldsValue({ genders: initialValue.current })
    form.setFieldsValue({ theme: 'Search to Select' })
    form.setFieldsValue({ product: 'Search to Select' })

    if (filtersGenderMap.length >= 1) {
      if (catalogType === 'reference') {
        const FILTERS = dogenerateFilters(
          IdCollection,
          [initialValue.current],
          'gender'
        )
        console.log("buscando referencias 1")
        dofindCollectionFilters(FILTERS).then((keys) => {
          if (keys.data.length >= 1) {
            doReferenceMapFilters(keys.data)
            setStaticReferenceMap(keys.data)
          }
        })
      } else if (catalogType === 'combination') {
        const FILTERS = dogenerateFilters(
          IdCollection,
          [initialValue.current],
          'gender',
          false
        ) //
        dofindCollectionFiltersCombination(FILTERS).then((keys) => {
          if (keys?.data.length >= 1) {
            doCombinationMapFilters(keys.data) //
            setStaticCombinationMap(keys.data) //
            // doReferenceMapFilters(keys.data);
            // setStaticReferenceMap(keys.data);
          }
        })
      }
    }
  }, [filtersGenderMap])
  // }, [])

  const allGenders = {
    value: 'All Genders',
    text: 'All Genders',
    order_show: '0',
  }
  // const genders = filtersGenderMap;
  const genders = [allGenders, ...filtersGenderMap]

  // Se buscan los items filtrados por genero
  // Se ejecuta cuando se selecciona un valor del filtro de gender
  // Esta funcion hace lo mismo que la funcion de arriba, pero se ejecuta cuando se selecciona un valor del filtro
  const handleChange = async (value, label) => {
    try {
      console.log(`selected ${value}`)
      setItemGender(value)
      SelectGender(label.value)
      form.setFieldsValue({ theme: 'Search to Select' })
      form.setFieldsValue({ product: 'Search to Select' })

      if (ItemGender) {
        if (catalogType === 'reference') {
          console.log('buscando referencias 2')
          const FILTERS = dogenerateFilters(IdCollection, [value], 'gender')
          console.log(FILTERS)
          const response = await dofindCollectionFilters(FILTERS).then(
            (keys) => {
              if (keys.data.length >= 1) {
                setReferenceMapStatus(false)
                doReferenceMapFilters(keys.data)
                setStaticReferenceMap(keys.data)
                //  setFilterCatalogSelect(keys.data);
              }
            }
          )
        } else if (catalogType === 'combination') {
          const FILTERS = dogenerateFilters(
            IdCollection,
            [value],
            'gender',
            false
          )
          // console.log(FILTERS)
          dofindCollectionFiltersCombination(FILTERS).then((keys) => {
            if (keys.data.length >= 1) {
              setReferenceMapStatus(false)
              doCombinationMapFilters(keys.data)
              setStaticCombinationMap(keys.data)
            } else {
              console.log('No data found')
              setReferenceMapStatus(true)
              setCombinationsMap([])
            }
          })
        }
      }
    } catch (error) {
      console.error('Error fetching collection filters:', error)
    }
  }

  return (
    <>
      <div className="m-0 grid grid-cols-1 gap-1">
        <div className="col-span-6 sm:col-span-1  ">
          {genders.length > 0 && (
            <Form.Item
              name="genders"
              label="Gender"
              initialValue={initialValue.current}
              rules={[
                {
                  required: false,
                  message: 'Missing gender',
                },
              ]}
            >
              <Select
                options={genders}
                showSearch
                onChange={handleChange}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.label
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                //filterOption={(input, option) => (option?.label ?? '').includes(input)}
                // filterSort={(optionA, optionB) =>
                //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())

                // }
              />
            </Form.Item>
          )}
        </div>
      </div>
    </>
  )
}

export function FormItemTheme({ form, ItemFilter, SelectTheme, catalogType }) {
  const {
    Themes,
    IdCollection,
    doReferenceMapFilters,
    dogenerateFilters,
    dofindCollectionFilters,
    ReferenceMap,
    StaticReferenceMap,
    filtersThemesMap,
    setStaticCombinationMap,
    combinationsMap,
    staticCombinationMap,
    doCombinationMapFilters,
  } = useTasks()

  const {
    ItemGender,
    ItemTheme,
    ItemProduct,
    setIemtGender,
    setItemTheme,
    setItemProduct,
    ReferenceMapStatus,
    setReferenceMapStatus,
    setFilterCatalogSelect,
  } = BasicTasks()

  const [filtersStatusMap, setfiltersStatusMap] = useState([])
  const [ClonReferenceMap, setClonReferenceMap] = useState([])
  const [ItemOpen, setItemOpen] = useState(true)
  const [Themevalue, setThemevaluet] = useState()
  const [initialValue, setInitialValue] = useState()


  const groupTheme = function () {
    const newStatusMap = {}
    let ItemStatusMap = []
    if (catalogType === 'reference') {

      // const ArryFilterGender = ItemGender
      //   ? StaticReferenceMap.filter(
      //       (type) => type.attributes.genderName == ItemGender
      //     )
      //   : StaticReferenceMap.filter(
      //       (type) => type.attributes.genderName == 'Baby Girl'
      //     )

      let ArryFilterGender = StaticReferenceMap
      if (ItemGender != 'All Genders') {
        ArryFilterGender = StaticReferenceMap.filter(
          (type) => type.attributes.genderName == ItemGender
        )
      }

      ArryFilterGender?.forEach((dataRef) => {
        const { theme, Composition } = dataRef.attributes || {}
        const { attributes } = theme.data || {}

        // Verificar si el theme ya existe en el mapa
        if (!newStatusMap[attributes.name]) {
          newStatusMap[attributes.name] = {
            value: attributes.name,
            label: attributes.name,
            order_show: Composition?.gender?.data?.attributes?.order_show || 0, // Acceder a la propiedad de manera segura
          }
        }
      })

      // Convertir el objeto en un arreglo de valores
      const newStatusArr = Object.values(newStatusMap)
      // Ordenar el arreglo por el campo order_show de manera ascendente
      newStatusArr.sort((a, b) => a.order_show - b.order_show)
      // Establecer el valor inicial

      if (newStatusArr.length > 0) {
        setInitialValue(newStatusArr[0].value)
        setItemTheme(newStatusArr[0].value)
      }

      // Actualizar ItemStatusMap
      ItemStatusMap = newStatusArr
      setfiltersStatusMap([...ItemStatusMap])

    } else if (catalogType === 'combination') {

      // const ArryFilterGender = ItemGender
      //   ? staticCombinationMap.filter(
      //       (type) => type.attributes.gender.data.attributes.name == ItemGender
      //     )
      //   : staticCombinationMap.filter(
      //       (type) => type.attributes.gender.data.attributes.name == 'Baby Girl'
      //     )

      let ArryFilterGender = StaticReferenceMap
      if (ItemGender != "All Genders") {
        ArryFilterGender = staticCombinationMap.filter(
          (type) => type.attributes.gender.data.attributes.name == ItemGender
        )
      }

      ArryFilterGender?.forEach((dataRef) => {
        const { theme } = dataRef.attributes || {}
        const { attributes } = theme.data || {}

        // Verificar si el theme ya existe en el mapa
        if (!newStatusMap[attributes.name]) {
          newStatusMap[attributes.name] = {
            value: attributes.name,
            label: attributes.name,
            order_show: dataRef.g_order_show || 0, // Acceder a la propiedad de manera segura
          }
        }
      })

      // Convertir el objeto en un arreglo de valores
      const newStatusArr = Object.values(newStatusMap)
      // Ordenar el arreglo por el campo order_show de manera ascendente
      newStatusArr.sort((a, b) => a.order_show - b.order_show)
      // Establecer el valor inicial

      if (newStatusArr.length > 0) {
        setInitialValue(newStatusArr[0].value)
        setItemTheme(newStatusArr[0].value)
      }

      // Actualizar ItemStatusMap
      ItemStatusMap = newStatusArr
      setfiltersStatusMap([...ItemStatusMap])
    }
  }

  useEffect(() => {
    groupTheme()
  }, [ReferenceMap, combinationsMap])

  const theme = filtersStatusMap

  const handleChange = async (value, label) => {
    setItemTheme(value)
    SelectTheme(label.label)
    if (ItemGender) {
      if (catalogType === 'reference') {

        let ArryFilterTheme = StaticReferenceMap.filter(
          (type) => type.attributes.theme.data.attributes.name === value
        )
        let ArryFilterGender = ArryFilterTheme.filter(
          (type) => type.attributes.genderName === ItemGender
        )

        // console.log(ArryFilterGender)

        setReferenceMapStatus(false)
        doReferenceMapFilters(ArryFilterTheme)
        setFilterCatalogSelect(ArryFilterGender)

      } else if (catalogType === 'combination') {

        let ArryFilterTheme = staticCombinationMap.filter(
          (type) => type.attributes.theme.data.attributes.name === value
        )
        let ArryFilterGender = ArryFilterTheme.filter(
          (type) => type.attributes.gender === ItemGender
        )

        // console.log(ArryFilterGender)

        setReferenceMapStatus(false)
        doCombinationMapFilters(ArryFilterTheme)
        setFilterCatalogSelect(ArryFilterGender)
      }
    }
  }

  return (
    <>
      <div className="m-0 grid grid-cols-1 gap-1">
        <div className="m-0 grid grid-cols-2 gap-1">
          {ItemOpen ? (
            <div className="col-span-4 col-start-1">
              {theme.length > 0 && (
                <Form.Item
                  name="theme"
                  label="Theme"
                  rules={[
                    {
                      required: false,
                      message: 'Missing theme',
                    },
                  ]}
                >
                  <Select
                    options={theme}
                    onChange={handleChange}
                    showSearch
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.label
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    //filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                  />
                </Form.Item>
              )}
            </div>
          ) : <div> No data found </div>}
        </div>
      </div>
    </>
  )
}

export function FormItemProduct({ItemFilter, SelectProduct}) {

    const { IdCollection, filtersProductMap, doReferenceMapFilters, ReferenceMap, StaticReferenceMap, } = useTasks();

    const {
      ItemGender,
      ItemTheme,
      ItemProduct,
      setItemGender,
      setItemTheme,
      setItemProduct,
      ReferenceMapStatus,
      setReferenceMapStatus,
      setFilterCatalogSelect
       } = BasicTasks();

       let ItemStatusMap = [];
       const [filtersStatusMap, setfiltersStatusMap] = useState([]);
       const [ClonReferenceMap, setClonReferenceMap] = useState([]);
       const [initialValue, setInitialValue] = useState();

       const groupProduct = function(){

        const newStatusMap = {};
        let ItemStatusMap = [];

        const ArryFilterGender = ItemGender ?
              StaticReferenceMap.filter(type => type.attributes.genderName == ItemGender )
              :StaticReferenceMap.filter(type => type.attributes.genderName == 'Baby Girl' )

            ArryFilterGender?.forEach((dataRef) => {
              const { Composition } = dataRef.attributes || {};
              const { typeproduct } = Composition;
              const { attributes } =  typeproduct.data || {};

               // Verificar si el theme ya existe en el mapa
              if (!newStatusMap[attributes.name]) {
                  newStatusMap[attributes.name] = {
                  value: attributes.name,
                  label: attributes.name,
                  order_show: Composition?.gender?.data?.attributes?.order_show || 0, // Acceder a la propiedad de manera segura
                };
              }
          });

          // Convertir el objeto en un arreglo de valores
          const newStatusArr = Object.values(newStatusMap);
          // Ordenar el arreglo por el campo order_show de manera ascendente
          newStatusArr.sort((a, b) => a.order_show - b.order_show);
          // Establecer el valor inicial

          if (newStatusArr.length > 0) {
            setInitialValue(newStatusArr[0].value);
            setItemProduct(newStatusArr[0].value);
          }
          // Actualizar ItemStatusMap
          ItemStatusMap = newStatusArr;
          setfiltersStatusMap([...ItemStatusMap])
      }


       useEffect(() => {
          groupProduct();
           }, [ReferenceMap]);


      const product = filtersStatusMap;

      const [ItemOpen, setItemOpen] = useState(true);


       const handleChange = (value, label) => {
             console.log(`selected ${value}`);
             setItemProduct(value);
             SelectProduct(label.label);

             if(ItemGender){
              let ArryFilter = StaticReferenceMap.filter(type => type.attributes.Composition.typeproduct.data.attributes.name === value)
              let ArryFilterGender = ArryFilter.filter(type => type.attributes.genderName === ItemGender)

              setReferenceMapStatus(false);
              doReferenceMapFilters(ArryFilterGender);
              setFilterCatalogSelect(ArryFilterGender);
             }
      };

    return (
    <>
      <div className="grid grid-cols-1 gap-1 m-0">
        <div className="grid grid-cols-2 gap-1 m-0">

              {ItemOpen ? (
                <div className="col-start-1 col-span-4">

                    <Form.Item
                        name="product"
                        label="Product"
                        rules={[
                        {
                            required: false,
                            message: 'Missing Product',
                        },
                        ]}
                    >
                        <Select
                        options={product}
                        onChange={handleChange}
                        showSearch
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => option?.label.toString().toLowerCase().includes(input.toLowerCase())}
                        //filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())

                        }
                        />
                    </Form.Item>
                </div>
              ) : null}
         </div>
    </div>
    </>

  )
}


export function FormSelectCatalog({CatalogSelec, SelectTheme, SelectProduct}) {
  const {
    IdCollection,
    doReferenceMapFilters,
    StaticReferenceMap,
    dogenerateFilters,
    dofindCollectionFiltersCombination,
    setCombinationsMap,
    doCombinationMapFilters,
    setStaticCombinationMap,
  } = useTasks()

   const {
        setReferenceMapStatus,
   } = BasicTasks();

        const { Option } = Select;
        const Status = [
          {
            label: 'Collection Catalog',
            value: 'Collection Catalog',
          },
          {
            label: 'Gender / Product Catalog',
            value: 'Gender / Product Catalog',
          },
          {
            label: 'Combination Catalog',
            value: 'Combination Catalog',
          }
        ];
        const handleChange = (value) => {
          console.log(value);
          CatalogSelec(value);
          SelectTheme();
          SelectProduct();

          if (value === 'Combination Catalog') {
            console.log('buscando combinaciones en FormSelectCatalog')
            const FILTERS = dogenerateFilters(
              IdCollection,
              ['All Genders'],
              'gender',
              false
            )
            // console.log(FILTERS)
            dofindCollectionFiltersCombination(FILTERS).then((keys) => {
              if (keys.data.length >= 1) {
                setReferenceMapStatus(false)
                doCombinationMapFilters(keys.data)
                setStaticCombinationMap(keys.data)
              } else {
                console.log('No data found')
                setReferenceMapStatus(true)
                setCombinationsMap([])
              }
            })
          }

          setReferenceMapStatus(true)
          doReferenceMapFilters(StaticReferenceMap)

        };
      return (
      <>
        <div className="grid grid-cols-1 gap-1 m-0">
              <div className="col-span-6 sm:col-span-1  ">
                  <Form.Item
                      name="status"
                      label="Select Catalog type"
                      initialValue="Collection Catalog"
                      rules={[
                      {
                          required: false,
                          message: '',
                      },
                      ]}
                  >
                      <Select
                      options={Status}
                      showSearch
                      onChange={handleChange}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())

                      }
                      />
                  </Form.Item>
              </div>
      </div>
      </>
    )
    }