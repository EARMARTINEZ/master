import { useSession } from 'next-auth/react';
import { useState, useCallback, createContext, useContext } from "react";
import {
  getCollectionReference,
  getIDReference,
  getReference,
  getCollection,
  getIDCollection,
  getStrapiURL,
  fetchAPI,
  getSystemColor,
  getSizesAll,
  getThemesCollection,
  getCollectionStamps,
  getCollectionFilters,
  getSilhouetteByCollection,
  getCombinationByCollection,
  getCombinationById,
  createCombination,
  updateCombination,
  deleteCombination,
  getCollectionFiltersCombination,
  getLastCollection,
} from 'utils/api'
import { linstance } from "utils/axioapi";
import { Button, Select, Space, theme } from 'antd';
import ImgReference from '@/components/Cards/DetailReference/ImgReference'
import { set } from 'react-hook-form';
export const UserContext = createContext({ isAuthenticated: false });
export const useTasks = () => useContext(UserContext);

const UserProvider = ({ children }) => {

        function MapStaticReference(MapValues) {
          let RefMap = [];
          let FilterRefMap = [];
          let CodigoSizes=[];
          let ItemMap = [];
          setStaticReferenceMap([]);
          MapValues.data?.map((dataRef, index) => {
                const {
                  referencia,
                  description = description ? description : '',
                  genderName,
                  status,
                  collection,
                  color_pantone,
                  similarRefs,
                  theme,
                  Composition,
                  sizes,
                  drawings,
                  drawingsPDF,
                  provider,
                  comments,
                  pendings,
                  stamp } = dataRef ? dataRef.attributes : '0';

                  sizes.data?.map((Sizes, index) => {
                    const IdSizes = Sizes.attributes ? Sizes.attributes.name : 'null'
                    CodigoSizes.push(IdSizes);
                  });
                   //Filtro referencia en FiltersTable
                   let FiltersTableReferences = {
                    value: referencia,
                    text: referencia
                  };
                  ItemMap.push(FiltersTableReferences,);

                  // let TableDataSource = {
                  //     'key': dataRef ? dataRef.id : '0',
                  //     'references': referencia,
                  //     'reference':<Button type="link"
                  //                         onClick={() => {
                  //                         doshowDrawer( dataRef.attributes.referencia),
                  //                         dogetSystemColor()
                  //                         }}
                  //                 >{referencia}</Button>,

                  //     'collection': collection.data.attributes.name,
                  //     'gender': genderName,
                  //     'typeproduct': Composition.typeproduct.data.attributes.name,
                  //     'theme': theme.data ? theme.data.attributes.name : '',
                  //     'sizeref':CodigoSizes.join(' '),
                  //     'drawings':<div className="flex mb-5 -space-x-4">
                  //                 {dataRef.attributes.drawings.data?.map((_ImgRef) => (

                  //                   _ImgRef.attributes.name===referencia+'.jpg' &&  <ImgReference  key={ _ImgRef.attributes.url} url={ _ImgRef.attributes.formats.thumbnail.url} UrlId={_ImgRef.attributes.id} compact={true} />
                  //                 ))}
                  //               </div>,
                  //     'status': status,

                  //     'stamps':stamp.data ? stamp.data.attributes.name :'',
                  //     'stamp':<Button type="link"
                  //                     onClick={() => {
                  //                     doShowStampsDrawer(true, dataRef.attributes.referencia )
                  //                     }}
                  //             >{stamp.data ? stamp.data.attributes.name :''}
                  //             </Button>,
                  // };
                  // CodigoSizes=[''];
                  // FilterRefMap.push(TableDataSource,);
                  RefMap.push(dataRef );
          });

         // setFiltersReferenceMap([...FilterRefMap]);
         // setSoloReferenceMap([...ItemMap]);
          setMetaReferenceMap(MapValues.meta);
          setStaticReferenceMap([...RefMap]);

          return FilterRefMap;

        }
        function MapReference(MapValues) {
          let RefMap = [];
          let FilterRefMap = [];
          let FilterTableStampsMap = [];
          let CodigoSizes=[];
          let ItemMap = [];
                  // setReferencia();
                  // setDescription();
                  // setSimilarRefs();
                   setStatusReference([]);
                  //setCollection([]);//[]
                  //setNameCollection();
                  //setIdPrefixCollection();
                  //setIdCollection()
                  // setDrawings([]);//[]
                  // setDrawingsPDF([]);//[]
                  // setSize([]);//[]
                  // setColor_pantone([]);//[]
                  // setThemes([]);//[]
                  // setComposition({});//{}
                  // setProvider({});//{}
                  // setStamp({});//{}
                  // setRefeComments([]);//[]
                  // setRefePendings([]);//[]
                 
          MapValues.data?.map((dataRef, index) => {
                setIdMaster(dataRef ? dataRef.id : '0');

                const {
                  referencia,
                  description = description || '',
                  genderName,
                  status,
                  collection,
                  color_pantone,
                  similarRefs,
                  theme,
                  Composition,
                  sizes,
                  drawings,
                  drawingsPDF,
                  // silhouette,
                  provider,
                  comments,
                  pendings,
                  stamp } = dataRef ? dataRef.attributes : '0';

                  const{commentstamp, pendingstamp }= stamp.data ? stamp.data.attributes : []
                  const prefixid = collection.data.attributes.prefix_id ? collection.data.attributes.prefix_id : '24';
                  const collectiontype = collection.data.attributes.collection_type.data.attributes.prefix_id ? collection.data.attributes.collection_type.data.attributes.prefix_id : '1';
                  const collectionName = collection.data.attributes.name ? collection.data.attributes.name : '';

                  setReferencia(referencia);
                  setDescription(description);
                  setSimilarRefs(similarRefs);
                  setStatusReference(status);
                  setCollection(collection);//[]
                  setNameCollection(collectionName);
                  setIdPrefixCollection( `${collectiontype}${prefixid}`);
                  setIdCollection(collection.data.id)
                  setDrawings(drawings.data);//[]
                  setDrawingsPDF(drawingsPDF.data);//[]
                  setSize(sizes.data);//[]
                  setColor_pantone(color_pantone);//[]
                  setThemes(theme.data);//[]
                  setComposition(Composition);//{}
                  setProvider(provider);//{}
                  setStamp(stamp);//{}
                  setRefeComments(comments);//[]
                  setRefePendings(pendings);//[]
                  setRefeCommentstamp(commentstamp);//[]
                  setRefePendingstamp(pendingstamp);//[]

                  sizes.data?.map((Sizes, index) => {
                    const IdSizes = Sizes.attributes ? Sizes.attributes.name : 'null'
                    CodigoSizes.push(IdSizes);
                  });
                   //Filtro referencia en FiltersTable
                   let FiltersTableReferences = {
                    value: referencia,
                    text: referencia
                  };
                  ItemMap.push(FiltersTableReferences,);

                  let TableDataSource = {
                      'key': dataRef ? dataRef.id : '0',
                      'references': referencia,
                      'reference':<Button type="link"
                                          onClick={() => {
                                          doshowDrawer( dataRef.attributes.referencia),
                                          dogetSystemColor()
                                          }}
                                  >{referencia}</Button>,

                      'collection': collection.data.attributes.name,
                      'gender': genderName,
                      'typeproduct': Composition.typeproduct.data.attributes.name,
                      'theme': theme.data ? theme.data.attributes.name : '',
                      'sizeref':CodigoSizes.join(' '),
                      'drawings':<div className="flex mb-5 -space-x-4">
                                  {dataRef.attributes.drawings.data?.map((_ImgRef) => (
                                    _ImgRef.attributes.name===referencia+'.jpg' &&  <ImgReference  key={ _ImgRef.attributes.url} url={ _ImgRef.attributes.formats.thumbnail.url} UrlId={_ImgRef.attributes.id} compact={true} />
                                  ))}
                                </div>,
                      'status': status,

                      'stamps':stamp.data ? stamp.data.attributes.name :'',
                      'stamp':<Button type="link"
                                      onClick={() => {
                                      doShowStampsDrawer(true, dataRef.attributes.referencia )
                                      }}
                              >{stamp.data ? stamp.data.attributes.name :''}
                              </Button>,
                  };
                  CodigoSizes=[''];
                  FilterRefMap.push(TableDataSource,);
                  RefMap.push(dataRef );
          });
           setMetaReferenceMap(MapValues.meta);
           setFiltersReferenceMap([...FilterRefMap]);
           setSoloReferenceMap([...ItemMap]);
           setTableStampsMap([...FilterTableStampsMap]);

           console.log("Set Reference Map", RefMap)
           setReferenceMap([...RefMap]);

          return FilterRefMap;
        }

        function MapReferencesForSilhouettes(MapValues) {
          let silMap = []

          setSilhouetteMap([]);

            MapValues.data?.map((dataRef, index) => {
              const {
                referencia,
                genderName,
                status,
                collection,
                theme,
                Composition,
                silhouette,
                productname,
              } = dataRef ? dataRef.attributes : '0'

              let ParsedDataSource = {
                id: dataRef ? dataRef.id : '0',
                ref: referencia,
                productname: productname,
                status: status,
                collection: {
                  id: collection.data.id,
                  name: collection.data.attributes.name,
                },
                gender: genderName || '',
                typeproduct: Composition?.typeproduct?.data?.attributes?.name || '',
                part: Composition?.typeproduct?.data?.attributes?.id_part?.data?.attributes?.name || '',
                color: Composition?.color?.data?.attributes?.name || '',
                fabric: Composition?.fabric?.data?.attributes?.name || '',
                theme: theme.data ? theme.data.attributes.name : '',
                silhouette: silhouette?.data ? {
                  id: silhouette.data.id || '',
                  url: getStrapiURL(silhouette.data.attributes?.url || ''),
                } : null,
              }
              silMap.push(ParsedDataSource)
            })
            // console.log(silMap)
          setSilhouetteMap(silMap)
          return silMap
        }

        function MapCombinations(MapValues) {
          let combinationMap = []
          MapValues.data?.map((dataRef, index) => {
            const {
              refId,
              type,
              canvas,
              collection,
              gender,
              theme,
              image,
              a_create_references
            } = dataRef ? dataRef.attributes : '0'

            let ParsedDataSource = {
              id: dataRef ? dataRef.id : '0',
              refId: refId,
              type: type,
              canvas: canvas,
              collection: {
                id: collection.data.id,
                name: collection.data.attributes.name,
              },
              gender: gender.data.attributes.name,
              g_order_show: gender.data.attributes.order_show,
              theme: theme.data ? theme.data.attributes.name : '',
              image: getStrapiURL(image?.data.attributes.url),
              references: a_create_references.data.map((ref, index) => {
                return {
                  id: ref.id,
                  typeproduct:ref.attributes.Composition.typeproduct.data.attributes.name,
                  ref: ref.attributes.referencia,
                  silhouette: {
                    url: getStrapiURL(
                      ref.attributes.silhouette.data.attributes.url
                    ),
                    name: ref.attributes.silhouette.data.attributes.name,
                  },
                }
              }),
            }
            combinationMap.push(ParsedDataSource)
          })
          setCombinationsMap(combinationMap)
          return combinationMap
        }

        function MapCombination(MapValue) {
            const {
              refId,
              type,
              canvas,
              collection,
              gender,
              theme,
              image,
              a_create_references,
            } = MapValue ? MapValue.data.attributes : '0'

            let ParsedDataSource = {
              id: MapValue ? MapValue.data.id : '0',
              refId: refId,
              type: type,
              canvas: canvas,
              collection: {
                id: collection.data.id,
                name: collection.data.attributes.name,
              },
              gender: gender.data.attributes.name,
              g_order_show: gender.data.attributes.order_show,
              theme: theme.data ? theme.data.attributes.name : '',
              image: getStrapiURL(image?.data.attributes.url),
              references: a_create_references.data.map((ref, index) => {
                return {
                  id: ref.id,
                  typeproduct: ref.attributes.Composition.typeproduct.data.attributes.name,
                  ref: ref.attributes.referencia,
                  silhouette: {
                    url: getStrapiURL(ref.attributes.silhouette.data.attributes.url),
                    name: ref.attributes.silhouette.data.attributes.name,
                  }
                }
              })
            }
            return ParsedDataSource
          }

        function MapCollection(MapValues) {
          let RefMap = [];
          setCollectionMap([]);
          MapValues?.map((dataRef, index) => {
                const { id } = dataRef ? dataRef.id : '0';
                //setIdCollection(id);
                const { name } = dataRef ? dataRef.attributes : '0';
                setCollection(name);
                RefMap.push(dataRef);
          });
          setCollectionMap([...RefMap]);
        }

        function MapIDCollection(MapValues) {
          let RefMap = [];

          MapValues?.map((dataRef, index) => {

            setIdCollection(dataRef ? dataRef.id : '0');
            setCollection(dataRef ? dataRef.attributes.name : '');

            const {prefix_id, collection_type } = dataRef ? dataRef.attributes : '0';

            const prefixid = prefix_id ? prefix_id : '24';
            const collectiontype = collection_type.data.attributes.prefix_id ? collection_type.data.attributes.prefix_id : '1';

            setIdPrefixCollection( `${collectiontype}${prefixid}`);

            //Agrupa Gender, Product por Collection
            dogetGenderReference(`${collectiontype}${prefixid}`);
            dogetProducReference(`${collectiontype}${prefixid}`);
            getGroupSize(dataRef.id),
            dofindThemes(dataRef.id),
            dofindStamps(),

            RefMap.push(dataRef );
          });
        }

  async function fetchCollectionName(values) {
    try {
      const pageData = await  getIDCollection({
          NCollection: values ? values : "29",
        }).then( keys => {
          keys.collections.data?.map((dataRef, index) => {
            setNameCollection(dataRef.attributes.name);
          });
          return keys.collections.data
      });
    } catch (error) {
      console.log("error", error)
    }
  }

  /******************************************** */

  // se busca el refId mas alto
  async function doFetchLastCombinationId() {
    try {
      const pageData = await fetchAPI(
        '/combinations?fields[0]=refId&pagination[page]=1&pagination[pageSize]=1&sort=id:DESC',
        {}
      ).then((keys) => {
        if (keys.data.length > 0) {
          return parseInt(keys.data[0].attributes.refId);
        }
        return 0;
      })
      return pageData;
    } catch (error) {
      console.log("error", error)
    }
  }

  async function doIDReference(values) {
    console.log('do id reference')
    try {
      const pageData = await  getIDReference({
        IDReference: values, //1240001 2230003
        }).then( keys => {
          const Map = MapReference(keys.masters);
          return Map;
      });

          setShowModalLoading(false);
    } catch (error) {
      console.log("error", error)
      setShowModalLoading(false);
    }
  }
    async function dofetchReference(values) {
      console.log('do fetch reference')
      try {
        let Prefix = values.length === 4 ? `${IdPrefixCollection}${values}`  : values;
        const pageData = await  getReference({
            NReference: Prefix, //1240001 2230003
          }).then( keys => {
          const Map = MapReference(keys.masters);
            return Map;
        });
            setShowModalLoading(false);
      } catch (error) {
        console.log("error", error)
        setShowModalLoading(false);
      }
    }

    // hacer tantas peticiones como pageCount hayan
    async function dofetchReferenceForSilhouettes(values) {
      console.log('do fetch reference for silhouettes')
      try {
        // console.log(values)
        await fetchCollectionName(values);
        const pageData = await  getSilhouetteByCollection({
          NCollection: values | '0'
        }).then( keys => {   
          console.log(keys)       
          let refs = MapReferencesForSilhouettes(keys.masters);          
          return refs;
      });
          setShowModalLoading(false);
          return pageData;
      } catch (error) {
        console.log("error silhouettes", error)
        setShowModalLoading(false);
      }
    }

    async function dofetchCombinationByCollection(collectionID) {
      try {
          const pageData = await  getCombinationByCollection({
            NCollection: collectionID | '0'
          }).then( keys => {
            MapCombinations(keys.combinations);
            return keys.combinations;
        });
          setShowModalLoading(false);
          return pageData;
      } catch (error) {
        console.log('error', error)
        setShowModalLoading(false)
      }
    }

    async function dofetchCombinationById(combinationID) {
      try {
        const pageData = await  getCombinationById(
          combinationID
        ).then( keys => {
          let combination = MapCombination(keys.combination);
          return combination;
        });
      } catch (error) {
        console.log('error', error)
        setShowModalLoading(false)
      }
    }

    async function doCreateCombination({refId, genderID, themeID, references, canvas, collectionID, type, file}) {
      try {
        const raw = {
          refId: refId,
          gender: genderID,
          theme: themeID,
          a_create_references: references,
          canvas: canvas,
          collection: collectionID,
          type: type
        }
        const pageData = await createCombination(raw, file).then( keys => {
          let newCombination =  MapCombination(keys.createCombination);
          setCombinationsMap([...combinationsMap, newCombination]);
          return newCombination;
        });
        return pageData;
      } catch (error) {
        console.log('error', error)
        setShowModalLoading(false)
      }
    }

    async function doUpdateCombination({refId, combinationID, genderID, themeID, references, canvas, collectionID, type, file}) {
      try {
        const raw = {
          gender: genderID,
          theme: themeID,
          a_create_references: references,
          canvas: canvas,
          collection: collectionID,
          type: type
        }
        const pageData = await updateCombination(combinationID, raw, file).then( keys => {
          let newCombination =  MapCombination(keys.updateCombination);
          const updatedCombinations = combinationsMap.map((combination) => {
            return combination.id === combinationID ? newCombination : combination;
          });
          setCombinationsMap(updatedCombinations);
          return newCombination;
        });
      } catch (error) {
        console.log('error', error)
        setShowModalLoading(false)
      }
    }

    async function doDeleteCombination(combinationID) {
      try {
        const pageData = await deleteCombination(combinationID).then( keys => {
          const updatedCombinations = combinationsMap.filter(
            (combination) => parseInt(combination.id) !== parseInt(combinationID)
          )
          setCombinationsMap(updatedCombinations);
          return keys;
        });
        return pageData;
      } catch (error) {
        console.log('error', error)
        setShowModalLoading(false)
      }
    }

      async function dogetCollectionReference(values, Start, PageSize, FILTERS) {
        console.log('do get collection reference')
        try {
            setIdCollection(values);
            //VAMOS A GUARDAR EL ID DE LA COLLECTION EN EL LOCALSTORAGE
            localStorage.setItem('IdCollection', values);

            const pageData = await  getCollectionReference({
              NCollection: values ? values : '0' , //28 29
              start: Start ? Start : 1,
              pageSize : PageSize ? PageSize : 10,
              FILTERS: FILTERS, 
            }).then( keys => {
              MapReference(keys.masters);
              MapStaticReference(keys.masters);
              return keys.masters;
          });
            setTimeout(() => {
              setShowModalLoading(false);
            },20000);
            setLoading(false);
          return pageData;
        } catch (error) {
          console.log("error", error)
        }
      }

      async function dofindCollectionFilters(Filters) {
        try {
            const pageData = await  getCollectionFilters({
              FILTERS: Filters ? Filters : ' ',
            }).then( keys => {
                //MapReference(keys.masters);
              return keys.masters;
          });
          console.log(pageData)
          return pageData;
          } catch (error) {
              console.log("error", error)
          }
      }

      async function dofindCollectionFiltersCombination(Filters) {
        try {
            const pageData = await  getCollectionFiltersCombination({
              FILTERS: Filters ? Filters : ' ',
            }).then( keys => {
              //MapReference(keys.masters);
              // console.log(keys)
              return keys?.combinations;
          });
          return pageData;
          } catch (error) {
              console.log("error", error)
        }
      }

      async function doReferenceMapFilters(ArrayMap) {
        console.log('do reference map filters')
        try {
          let data = {data: ArrayMap ? ArrayMap : [] };
              MapReference(data);
              setLoading(false);
          } catch (error) {
              console.log("error", error)
          }
      }

      async function doCombinationMapFilters(arrayMap) {
        try {
          // let data = {data: arrayMap ? arrayMap : [] };
          let data = {data: arrayMap || []};
              MapCombinations(data);
          } catch (error) {
              console.log("error", error)
          }
      }

      async function doGetLastCollection() {
        try {
          const pageData = await getLastCollection().then( keys => {
            return keys.collections.data;
          });
          return pageData;
        } catch (error) {
          console.log('error', error)
        }
      }

            //reference=true, filtro para referencia | reference=false, filtro para combinaciones
            const dogenerateFilters = (IdCollection, newStatusMap, columnKey, reference = true) => {
              const newStatusArr = Object.values(newStatusMap).flat();
              let response;
      
              const columnKeys = {
                  theme: 'theme',
                  typeproduct: 'productname',
                  gender: 'genderName',
                  stamp:'stamp',
                  sizeref:'sizes',
                  status:'status'
              };
      
              const combinationColumnKeys = {
                  theme: 'theme',
                  gender: 'gender',
              }
      
              const defaultColumnKey = 'theme';
              let selectedColumnKey;
              if (reference) {
                selectedColumnKey = columnKeys[columnKey] || defaultColumnKey;
              } else {
                selectedColumnKey = combinationColumnKeys[columnKey] || defaultColumnKey;
              }
      
                  if (newStatusArr.length > 0) {
                    let filterValue = JSON.stringify(newStatusArr);
                      switch (selectedColumnKey) {
                          case 'theme':
                          case 'stamp':
                          case 'sizes':
                              response = `collection:{
                                  id:{eq:"${IdCollection || null}"}}
                                  ${selectedColumnKey}:{name:{in: ${filterValue}}}`;
                              break;
                          case 'productname':
                          case 'status':
                              response = `collection:{
                                  id:{eq:"${IdCollection || null}"}}
                                  ${selectedColumnKey}:{in: ${filterValue}}`;
                              break;
                          default:
                              if (JSON.parse(filterValue).includes("All Genders")){
                                  response = `collection:{id:{eq:"${IdCollection || null}"}}`;
                              } else {
                                if (reference) {
                                    response = `
                                      collection:{id:{eq:"${IdCollection || null}"}}
                                      ${selectedColumnKey}:{in: ${filterValue}}`;
                                } else { // combination
                                    response =
                                      `collection:{id:{eq:"${IdCollection || null}"}}
                                      ${selectedColumnKey}:{name:{in: ${filterValue}}}`;
                                }
                              }
                              break;
                      }
                  }
                      return response;
              };

  /******************************************** */
  async function dofetchCollection(values) {
    try {
      const pageData = await  getCollection({
          NCollection: values ? values : "-",
        }).then( keys => {
          MapCollection(keys.collections.data);
          return keys.collections.data
      });
          setShowModalLoading(false);
    } catch (error) {
      console.log("error", error)
      setShowModalLoading(false);
    }
}
    async function dofetchIDCollection(values) {
      try {
        const pageData = await  getIDCollection({
            NCollection: values ? values : '0',
          }).then( keys => {
            MapIDCollection(keys.collections.data);
            return keys.collections.data
        });
        return pageData
            setShowModalLoading(false);
      } catch (error) {
        console.log("error", error)
        setShowModalLoading(false);
      }
    }

  /******************************************** */
  async function dogetGenderReference(values) {
    try {

        const Nreferencia = values ? values : '0'
        // setfiltersGenderMap([]);

        const pageData = await fetchAPI("/mastercontrol/getGenderReference/"+Nreferencia, {
            //Nreferencia: "1240001",
          }).then( MapGender => {
            let filtersGenderMap = [];
            MapGender?.map((dataRef, index) => {
              let filtersGender = {

                value: dataRef.gender_name ? dataRef.gender_name: '',
                text: dataRef.gender_name ? dataRef.gender_name: '',
                order_show: dataRef.order_show ? dataRef.order_show: '',
              };
              filtersGenderMap.push(filtersGender,);

          });
            setfiltersGenderMap([...filtersGenderMap]);
          return MapGender;
  });
      return pageData;
      } catch (error) {
          console.log("error", error)
        }
  }
    async function dogetProducReference(values) {
      try {

      const Nreferencia = values ? values : '0'
      setfiltersProductMap([]);

        const pageData = await fetchAPI("/mastercontrol/getProducReference/"+Nreferencia, {
          //Nreferencia: "1240001",
            }).then( MapProduct => {
              let filtersProductMap = [];
              MapProduct?.map((dataRef, index) => {
                let filtersProduct = {
                  text: dataRef.productname ? dataRef.productname: '',
                  value: dataRef.productname ? dataRef.productname: '',
                };
                filtersProductMap.push(filtersProduct,);

            });

            setfiltersProductMap([...filtersProductMap]);
            return MapProduct;
            });
        return pageData;

        } catch (error) {
            console.log("error", error)
          }
    }
      async function getGroupSize(values) {
        try {

        const Nreferencia = values ? values : '0'
        setfiltersSizeMap([]);
        setfilterSizeArray([]);

          const pageData = await fetchAPI("/mastercontrol/getGroupSize/"+Nreferencia, {

          }).then( MapSize => {
                let filtersSizeMap = [];
                let filtersSizeArray = [];
                MapSize?.map((dataRef, index) => {
                  let filtersSize = {
                    text: dataRef.name ? dataRef.name: '',
                    value: dataRef.name ? dataRef.name: '',
                  };
                  filtersSizeArray.push(dataRef.name,);
                  filtersSizeMap.push(filtersSize,);
              });
              setfiltersSizeMap([...filtersSizeMap]);
              setfilterSizeArray([...filtersSizeArray]);
            return MapSize;
          });
              return pageData;
          } catch (error) {
              console.log("error", error)
          }
      }

        async function dofindThemes(values) {
          try {
              let ItemMap = [];
              setfiltersThemesMap([]);
              const pageData = await  getThemesCollection({
                NCollection: values ? values :"0" , //28 29
              }).then( ResMap => {
                  ResMap.themes.data?.map((dataRef, index) => {
                    let Item = {
                      text: dataRef.attributes ? dataRef.attributes.name: '',
                      value:dataRef.attributes ? dataRef.attributes.name: '',
                    };
                    ItemMap.push(Item,);
                });
                setfiltersThemesMap([...ItemMap]);
                return ResMap;
            });
            return pageData;
            } catch (error) {
                console.log("error", error)
            }
        }

          async function dofindStamps(Start, PageSize) {
            try {
                let ItemMap = [];
                let TotalItemMap = [];

                let idCollectionInLocalStorage = localStorage.getItem('IdCollection');

                setfiltersStampsMap([]);                
                const pageData = await  getCollectionStamps({
                  NCollection: idCollectionInLocalStorage ? idCollectionInLocalStorage :"29" , //28 29
                  start: Start ? Start : 1,
                  pageSize : PageSize ? PageSize : 10,
                }).then( ResMap => {

                  
                  const { stamps } = ResMap ? ResMap : [];

                  if(stamps){
                    stamps.data?.map((dataRef, index) => {
                      let Item = {
                        text: dataRef.attributes ? dataRef.attributes.name: '',
                        value:dataRef.attributes ? dataRef.attributes.name: '',
                        //picture_url: dataRef.attributes.picture.data  ? getStrapiURL( dataRef.attributes.picture.data[0].attributes.url ) : '',
                        reference: dataRef.attributes.masters.data?.map((Ref, index) => {
                                   return Ref.attributes.referencia
                              }),
                        picture_url: dataRef.attributes.picture.data?.map((Picture, index) => {
                                return getStrapiURL(Picture.attributes.url)
                           }),
                      };
                      ItemMap.push(Item,);
                      TotalItemMap.push(dataRef);
                  });
                  setfiltersStampsMap([...ItemMap]);
                  setTotalStampsMap(stamps);
                  setLoading(false);
                  return ResMap;
                }
              });

              return pageData;

              } catch (error) {
                  console.log("error", error)
                }
          }
          async function dofindGender() {
            try {
              let ItemGenderMap = [];
              // setfiltersGenderMap([]);
              const pageData = await fetchAPI("/genders", {
              }).then( MapGender => {
                  MapGender.data?.map((dataRef, index) => {
                    let ItemGender = {
                      value: dataRef.attributes.name ? dataRef.attributes.name: '',
                      label: dataRef.attributes ? dataRef.attributes.name: ''
                    };
                    ItemGenderMap.push(ItemGender,);
                });
                // console.log(ItemGenderMap)
                  setfiltersGenderMap(ItemGenderMap);
                  return MapGender;
              });
                  return pageData;
              } catch (error) {
                  console.log("error", error)
                }
          }

          async function dofindParts() {
            try {
              let ItemPartMap = [];
              // setfiltersPartMap([]);
              const pageData = await fetchAPI("/parts", {
              }).then( MapPart => {
                // console.log(MapPart)
                  MapPart.data?.map((dataRef, index) => {
                    let ItemPart = {
                      value: dataRef.attributes.name ? dataRef.attributes.name: '',
                      label: dataRef.attributes ? dataRef.attributes.name: ''
                    };
                    ItemPartMap.push(ItemPart,);
                });
                  // setfiltersPartMap(ItemPartMap);
                  return MapPart;
              });
                  return pageData;
              } catch (error) {
                  console.log("error", error)
                }
          }

/******************************************** */
  async function dogetSystemColor(values) {

    try {
          setSystemColor([])

          const pageData = await  getSystemColor({
          }).then( MapColor => {

                let filtersSysColorMap = [];
                const {colors} = MapColor

                colors.data?.map((dataRef, index) => {
                  let filtersSysColor = {
                    id:     dataRef ? dataRef.id: '',
                    codigo: dataRef ? dataRef.attributes.codigo: '',
                    name:   dataRef ? dataRef.attributes.name : '',
                  };
                  filtersSysColorMap.push(filtersSysColor,);
              });
              setSystemColor([...filtersSysColorMap]);

            return MapColor;
        });
    } catch (error) {
      console.log("error", error)
    }
  }


/*Create Reference*/
   async function CreateNewcolor(Newcolor) {
    try {
            let  raw = JSON.stringify({
              "data": {
                "name": Newcolor[0].newcolor,
                "collection": {
                  "id": IdCollection
                },
                // "masters": {
                //   "id": IdMastar
                // }
              }
            });
            const options = {
              method: "POST",
              body: raw,
            };
            const Iddata = await fetchAPI("/mixcolors/", '', options,{
            }).then( keys => { return keys.data.id });
        return Iddata
      } catch (error) {
          console.log("error", error)
        }
  }
    async function CreateNewfabric(Newfabric) {
      try {

            let  raw = JSON.stringify({
              "data": {
                "name": Newfabric[0].newfabric,
              }});
            const options = {
                method: "POST",
                body: raw,
              };

            const Iddata = await fetchAPI("/fabrics/", '', options,{
            }).then( keys => { return keys.data.id });

        return Iddata

        } catch (error) {
            console.log("error", error)

          }
    }
      async function CreateNewproduct(Newproduct) {
        try {

              let  raw = JSON.stringify({
                "data": {
                  "name": Newproduct[0].newproduct,
                }});
              const options = {
                  method: "POST",
                  body: raw,
                };

              const Iddata = await fetchAPI("/products/", '', options,{
              }).then( keys => { return keys.data.id });

          return Iddata

          } catch (error) {
              console.log("error", error)

            }
      }
        async function CreateNewStamp(NewStamp) {
          try {

                let  raw = JSON.stringify({
                  "data": {
                    "name": NewStamp[0].newStamp,
                  }});
                const options = {
                    method: "POST",
                    body: raw,
                  };

                const Iddata = await fetchAPI("/stamps/", '', options,{
                }).then( keys => {  return keys.data.id });

            return Iddata

            } catch (error) {
                console.log("error", error)

              }
        }
          async function CreateNewtheme(Newtheme) {
            try {

                    let  raw = JSON.stringify({
                      "data": {
                        "name": Newtheme[0].newtheme,
                        "collection": {
                          "id": IdCollection
                        },
                        // "masters": {
                        //   "id": IdMastar
                        // }
                      }
                    });
                    const options = {
                      method: "POST",
                      body: raw,
                    };

                    const Iddata = await fetchAPI("/themes/", '', options,{
                    }).then( keys => { return keys.data.id });

                return Iddata

              } catch (error) {
                  console.log("error", error)
                }
          }
            async function doUpdateSize(keys, size, valor) {
              try {

                const UpdateSize = valor ? valor : false
                //console.log(keys);
                let raw = JSON.stringify({
                  "reference": keys.id ? keys.id : '',
                  "size": { size }
                });
                  const options = {
                    method: "POST",
                    body: raw,
                  };

                await fetchAPI("/mastercontrol/doUpdateSize/", '', options,{
                }).then( keys => {

                  if(UpdateSize){
                      dofetchReference(keys ? keys.referencia : '0');
                  }
                  return keys;
                  });
                } catch (error) {
                    console.log("error", error)

                  }
            }

 /******************************************** */
/******************************************** */
  async function doSaveReference(values, Idcollection) {
    try {


   let {
        Newcolor,
        Newfabric,
        Newproduct,
        NewStamp,
        Newtheme,
        RefenceSequence,
        status,
        theme,
        product,
        provider,
        gender,
        size,
        fabric,
        color,
        stamp,
        systemColor,
        description,
        similarRefs, } = values;


        if (Newcolor){
          if(Newcolor.length>=1){
          const IdData = await CreateNewcolor(Newcolor
          ).then( Idkeys => { return Idkeys });
          color = IdData ? IdData : color
          }
        }
          if (Newfabric){
            if(Newfabric.length>=1){
            const IdData = await CreateNewfabric(Newfabric
            ).then( Idkeys => { return Idkeys });
            fabric = IdData ? IdData : fabric
            }
          }
            if (Newproduct){
              if(Newproduct.length>=1){
                const IdData = await CreateNewproduct(Newproduct
                ).then( Idkeys => { return Idkeys });
                product = IdData ? IdData : product
              }
            }
              if (NewStamp){
                if(NewStamp.length>=1){
                const IdData = await CreateNewStamp(NewStamp
                ).then( Idkeys => { return Idkeys });
                stamp = IdData ? IdData : stamp
                }
              }
                if (Newtheme){
                  if(Newtheme.length>=1){
                    const IdData = await CreateNewtheme(Newtheme
                    ).then( Idkeys => { return Idkeys });
                    theme = IdData ? IdData : theme
                  }
                }
        let raw = JSON.stringify({
          "status": status ? status : 'Pending',
          "referencia": RefenceSequence,
          "description": description ? description : '',
          "similarRefs": similarRefs ? similarRefs : '',
          "genderName": ItemGenderName ? ItemGenderName : '',
          "productname": ItemProductName ? ItemProductName : '',
          "collection": {
            "id": Idcollection ? Idcollection : '29'
          },
          "Composition": {
            "gender": {
              "id": gender ? gender : '3'
            },
            "fabric": {
              "id": fabric ? fabric : ''
            },
            "color": {
              "id": systemColor ? systemColor : ''
            },
            "typeproduct": {
              "id": product ? product : '1'
            }
          },
          "color_pantone": {
            "id": color ? color : ''
          },
          "provider": {
            "id": provider ? provider : ''
          },
          "stamp": {
            "id": stamp ? stamp : ''
          },
          "theme": {
            "id": theme ? theme : ''
          }
        });
        const options = {
          method: "POST",
          body: raw,
        };


      await fetchAPI("/mastercontrol/createreferencia/", '', options,{
      }).then( keys => {
        const NumerReference = keys ? keys.referencia : null;

            // console.log(keys);
            if (size){
               doUpdateSize(keys, size);
            }
            
            // setTimeout(() => {
            //   dogetCollectionReference(Idcollection ? Idcollection : '0')
            //  },5000);
            setTimeout(() => {
              dofetchReference(NumerReference); 
              setShowModalLoading(false);
              onCloseFormDrawer();
             },1000);
        return keys;
        });
      } catch (error) {
          console.log("error", error)

        }
  }

    async function doUpdateReference(values, Idcollection) {
      try {
        // console.log(values)

    let {
          Newcolor,
          Newfabric,
          Newproduct,
          NewStamp,
          Newtheme,
          status,
          theme,
          product,
          provider,
          genders,
          size,
          fabrics,
          color,
          stamp,
          systemColor,
          description,
          similarRefs, } = values;
          if (Newcolor){
            if(Newcolor.length>=1){
            const IdData = await CreateNewcolor(Newcolor
            ).then( Idkeys => { return Idkeys });
            color = IdData ? IdData : color
            }
          }
            if (Newfabric){
              if(Newfabric.length>=1){
              const IdData = await CreateNewfabric(Newfabric
              ).then( Idkeys => { return Idkeys });
              fabrics = IdData ? IdData : fabrics
              }
            }
              if (Newproduct){
                if(Newproduct.length>=1){
                  const IdData = await CreateNewproduct(Newproduct
                  ).then( Idkeys => { return Idkeys });
                  product = IdData ? IdData : product
                }
              }
                if (NewStamp){
                  if(NewStamp.length>=1){
                  const IdData = await CreateNewStamp(NewStamp
                  ).then( Idkeys => { return Idkeys });
                  stamp = IdData ? IdData : stamp
                  }
                }
                  if (Newtheme){
                    if(Newtheme.length>=1){
                      const IdData = await CreateNewtheme(Newtheme
                      ).then( Idkeys => { return Idkeys });
                      theme = IdData ? IdData : theme
                    }
                  }
          let raw = JSON.stringify({

                  "status": status ? status : 'Pending',
                  // "referencia": Referencia ? Referencia : '124',
                  "description": description ? description : '',
                  "similarRefs": similarRefs ? similarRefs : '',
                  "collection": {
                    "id": Idcollection ? Idcollection : '30'
                  },
                  "Composition": {
                      "gender": {
                        "id": genders.id ? genders.id : genders
                      },
                      "fabric": {
                        "id": fabrics.id ? fabrics.id : fabrics
                      },
                      "color": {
                        "id": systemColor ? systemColor : ''
                      },
                      "typeproduct": {
                        "id": product.id ? product.id : product
                      }
                    },
                    "color_pantone": {
                      "id": color.id ? color.id : color
                    },
                    "provider": {
                      "id": provider.id ? provider.id : provider
                    },
                    "stamp": {
                      "id": stamp.id ? stamp.id : stamp
                    },
                    "theme": {
                      "id": theme.id ? theme.id : theme
                    }

          });
          const options = {
            method: "PUT",
            body: raw,
          };


        await fetchAPI("/mastercontrol/updatereferencia/"+IdMaster, '', options,{
        }).then( keys => {
            // console.log(keys);
              if (size){
                // console.log('keys');
                doUpdateSize(keys, size, true);
              }
              doIDReference(keys ? keys.id : '0')
              onCloseFormDrawerEdit();
          return keys;
          });
        } catch (error) {
            console.log("error", error)
          }
    }

      async function doDeleteImgReference(values) {
        try {

        const IdIMG = values ? values : '0'

        const options = {
          method: "DELETE"

        };

          await fetchAPI("/upload/files/"+IdIMG, '', options,{
          }).then( keys => {

            dofetchReference(keys ? Referencia : null);

            return keys;
            });

          } catch (error) {
              console.log("error", error)

            }
      }

        async function doLoadSizeEdit() {
          try {
              let ItemMap = [];
              let SizeArray = [];

              setSizesEditMap();

              const handleChange = (value) => {
                console.log(`Provider Selected: ${value}`);
              };
              //console.log(`Genders: ${Genders} Typeproducts: ${Typeproducts}`);

                await  getSizesAll({
              }).then( ResMap => {
                  ResMap.sizes.data?.map((dataRef, index) => {
                      let Item = {
                        value:dataRef.attributes ? dataRef.attributes.name: '',
                        label:dataRef.attributes ? dataRef.attributes.name: ''
                      };
                      ItemMap.push(Item,);
                    });
                });


                    Size?.map((dataRef, index) => {
                    let Item = {
                      value:dataRef.id ? dataRef.id: '',
                      label:dataRef.attributes ? dataRef.attributes.name: ''
                    };
                    //ItemMap.push(Item,);
                    SizeArray.push(dataRef.attributes.name,);
                  });

                setSizesEditMap(
                    <Select
                    name="selecSizeEdit"
                    options={ItemMap}
                    defaultValue={SizeArray}
                    //defaultActiveFirstOption={false}
                    value={ItemMap}
                    onChange={handleChange}
                    mode="multiple"
                    //showSearch="single"
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    />
                  )

            } catch (error) {
                console.log("error", error)

              }
        }

/*Reference Comment******************************************* */
  async function CreateNewcommenttype(Newcommenttype, type) {
    try {

      //console.log(Newcommenttype)
      let  raw = JSON.stringify({
        "data": {
          "name": Newcommenttype[0].newcommenttype,
          "type": type
        }});
      const options = {
          method: "POST",
          body: raw,
        };

      const Iddata = await fetchAPI("/typecomments/", '', options,{
      }).then( keys => { return keys.data.id });

        return Iddata

      } catch (error) {
          console.log("error", error)
        }
  }
    async function doUpdateComment(comment,user, CommentType) {
      try {

        let { Newcommenttype, commenttype  } = CommentType;

            if (Newcommenttype){
              if(Newcommenttype.length>=1){
              const IdData = await CreateNewcommenttype(Newcommenttype, 'comment'
              ).then( Idkeys => { return Idkeys });
              commenttype = IdData ? IdData : commenttype
              }
            }

        let raw = JSON.stringify({

            "comments": [
              {
                "comment": comment,
                "date": new Date(),
                "user": session.user.email ? SessionUser : 'admin@epkweb.net',
                "type": commenttype ? commenttype : '',
                "city": session.user.email ? SessionUserCity : '',
              }
            ],
            "toMaker": session.user.email ? SessiontoMaker : false,
          });
          const options = {
            method: "PUT",
            body: raw,
          };


        await fetchAPI("/mastercontrol/UpdateComment/"+IdMaster, '', options,{
        }).then( keys => {
              doIDReference(keys ? keys.IdMastar : '0')
              onCloseFormDrawerEdit();
          return keys;
          });


        } catch (error) {
            console.log("error", error)

          }
    }
      async function doUpdatePendingsComment(commentid, comment,user, CommentType, status) {

        let options = {};

        try {
         
            let { Newcommenttype, pendingtype  } = CommentType;

                if (Newcommenttype){
                  if(Newcommenttype.length>=1){
                  const IdData = await CreateNewcommenttype(Newcommenttype, 'pending'
                  ).then( Idkeys => { return Idkeys });
                  pendingtype = IdData ? IdData : pendingtype
                  }
                }

                if(commentid){
                      let raw = JSON.stringify({
                      "pendings": [
                        {
                          "id": commentid,
                          "comment": comment,
                          "date": new Date(),
                          "user": session.user.email ? session.user.email : 'admin@epkweb.net',
                          "type": pendingtype ? Number(pendingtype) : null,
                          "status": status
                        }
                      ],

                    });
                      options = {
                        method: "PUT",
                        body: raw,
                      };
                }
                  if(!commentid){
                      let raw = JSON.stringify({
                      "pendings": [
                        {
                          "comment": comment,
                          "date": new Date(),
                          "user": session.user.email ? session.user.email : 'admin@epkweb.net',
                          "type": pendingtype ? pendingtype : ''
                        }
                      ],

                      });
                      options = {
                        method: "PUT",
                        body: raw,
                      };
                  }
         
          await fetchAPI("/mastercontrol/UpdatePendingsComment/"+IdMaster, '', options,{
          }).then( keys => {
            
                 doIDReference(keys ? keys.IdMastar : '0')
                 onCloseFormDrawerEdit();
            return keys;
            });
          } catch (error) {
              console.log("error", error)
            }
      }

        async function doUpdateStatusReference(values) {
          try {


        let { status } = values;
        setStatusReference(values);

              let raw = JSON.stringify({
                      "status": status ? status : 'Pending',

              });
              const options = {
                method: "PUT",
                body: raw,
              };


            await fetchAPI("/mastercontrol/updateStatusReferencia/"+IdMaster, '', options,{
            }).then( keys => {

                  doIDReference(keys ? keys.id : '0')
                  onCloseFormDrawerEdit();


              return keys;
              });



            } catch (error) {
                console.log("error", error)

              }
        }


 /**Stamp Comment****************************************** */
 async function doUpdateStampComment(comment,user, CommentType) {
  try {

    let { Newcommenttype, commenttype  } = CommentType;


        if (Newcommenttype){
          if(Newcommenttype.length>=1){
          const IdData = await CreateNewcommenttype(Newcommenttype, 'comment'
          ).then( Idkeys => { return Idkeys });
          commenttype = IdData ? IdData : commenttype
          }
        }


    let raw = JSON.stringify({

        "commentstamp": [
          {
            "comment": comment,
            "date": new Date(),
            "user": session.user.email ? session.user.email : 'admin@epkweb.net',
            "type": commenttype ? commenttype : '',
            "city": session.user.email ? SessionUserCity : '',
          }
        ],

      });
      const options = {
        method: "PUT",
        body: raw,
      };


    await fetchAPI("/mastercontrol/UpdateStampComment/"+Stamp.data.id, '', options,{
    }).then( keys => {


          doIDReference(keys ? keys.IdMastar : '0')
          onCloseFormDrawerEdit();


      return keys;
      });

    } catch (error) {
        console.log("error", error)

      }
}
  async function doUpdateStampPendingsComment(commentid, comment,user, CommentType, status) {

    let options = {};

    try {

        let { Newcommenttype, pendingtype  } = CommentType;

            if (Newcommenttype){
              if(Newcommenttype.length>=1){
              const IdData = await CreateNewcommenttype(Newcommenttype, 'pending'
              ).then( Idkeys => { return Idkeys });
              pendingtype = IdData ? IdData : pendingtype
              }
            }

            if(commentid){
                  let raw = JSON.stringify({
                  "pendingstamp": [
                    {
                      "id": commentid,
                      "comment": comment,
                      "date": new Date(),
                      "user": session.user.email ? session.user.email : 'admin@epkweb.net',
                      "type": pendingtype ? Number(pendingtype) : null,
                      "status": status
                    }
                  ],

                });
                  options = {
                    method: "PUT",
                    body: raw,
                  };
            }
              if(!commentid){
                  let raw = JSON.stringify({
                  "pendingstamp": [
                    {
                      "comment": comment,
                      "date": new Date(),
                      "user": session.user.email ? session.user.email : 'admin@epkweb.net',
                      "type": pendingtype ? pendingtype : ''
                    }
                  ],

                  });
                  options = {
                    method: "PUT",
                    body: raw,
                  };
              }

      await fetchAPI("/mastercontrol/UpdateStampPendingsComment/"+Stamp.data.id, '', options,{
      }).then( keys => {
            doIDReference(keys ? keys.IdMastar : '0')
            onCloseFormDrawerEdit();
        return keys;
        });
      } catch (error) {
          console.log("error", error)
        }
  }

    async function doupdateStatusStamp(values) {
      try {
        let { status } = values;
        setStatusReference(values);

          let raw = JSON.stringify({
                  "status": status ? status : 'Pending',
          });
          const options = {
            method: "PUT",
            body: raw,
          };


        await fetchAPI("/mastercontrol/updateStatusStamp/"+Stamp.data.id, '', options,{
        }).then( keys => {

              doIDReference(keys ? keys.IdMastar : '0')
              onCloseFormDrawerEdit();


          return keys;
          });



        } catch (error) {
            console.log("error", error)

          }
    }


/*Generales*/
  const doImgReferencia = async (values) => {
    setshowUrlImg(values);
    setShowImgModalReference(true);
    try {


    } catch (error) {
      return 'No existe';
    }

  };

  const doshowDrawer = (nfer) => {

    setDrawings([]);
    setDrawingsPDF([]);
    setfileListIMG([]);
    setFileListPDF([]);
    setSendUploadIMG(true);
    setSendUploadPDF(true);
    setShowModalLoading(true);
    dofetchReference( nfer ? nfer : '0');

    setOpen(true);
   };
    const onClose = (values) => {

      if(values){
        setOpen(false);
      }
      if(!values){
        const value = IdCollection ? IdCollection :"0"
        const fixCollection = IdPrefixCollection ? IdPrefixCollection :"0"
         dogetCollectionReference(value);
         dofetchIDCollection(value);
        setOpen(false);
      }

    };

  const doshowFormDrawer = (nfer) => {
    setDrawings([]);
    setDrawingsPDF([]);
    setopenFormDrawer(true);
   };
    const onCloseFormDrawer = () => {

      const value = IdCollection ? IdCollection :"0"
      const fixCollection = IdPrefixCollection ? IdPrefixCollection :"0"
      //dogetCollectionReference(value)
      dofetchIDCollection(fixCollection);
      setopenFormDrawer(false);
    };

  const doshowFormDrawerEdit = (nfer) => {
    // setDrawings([]);
    // setDrawingsPDF([]);
    setopenFormDrawerEdit(true);
   };
    const onCloseFormDrawerEdit = () => {
      const value = Referencia ? Referencia :"0"
      //dofetchReference(value)
      setopenFormDrawerEdit(false);
    };

  const doShowStampsDrawer = (value, nfer) => {
    value==true ? setStatusOnCloseStamps(true) : setStatusOnCloseStamps(false)
    setShowModalLoading(true);
    console.log(nfer)
    dofetchReference( nfer ? nfer : '0');
    setStampsOpen(true);
   };

   const onCloseStamps = ( ) => {

   

      if(StatusOnCloseStamps==true){

        const Start= 1;  
        const PageSize= 1;     
        // fetchData(Start, PageSize);
       
      }
      if(StatusOnCloseStamps==false){
          dofetchReference( Referencia ? Referencia : '0');
          // dofindStamps();
          setOpen(true)
      }

      setStampsOpen(false);
    };


  const doMapDrawings = () => {

    let UrlDrawings=[];

    Drawings?.map((Img, index) => {
        const UrlImg = Img.attributes ? Img.attributes.url : 'null'
        const NameImg = Img.attributes ? Img.attributes.name : 'null'
        const UrlId = Img ? Img.id : 'null'

        const OrdenImg = NameImg.includes('os-back') ? 'D' : UrlImg.includes('os') ? 'C' : UrlImg.includes('page_2') ? 'B' : 'A'

        const DrawingsUrl = {
            'orden': OrdenImg,
            'url': UrlImg,
            'name':NameImg,
            'id': UrlId,
        }
        UrlDrawings.push(DrawingsUrl);
    });

    const objetoOrdenado = UrlDrawings.sort((a, b) => a.orden.localeCompare(b.orden));

      return objetoOrdenado;
   };
  const doMapDrawingsPDF = () => {

    let UrlDrawingsPDF=[];

    DrawingsPDF?.map((Img, index) => {
      const UrlImg = Img.attributes ? Img.attributes.url : 'null'
      const UrlId = Img ? Img.id : 'null'

      const DrawingsUrlPDF = {
          'url':   getStrapiURL(UrlImg),
          'id': UrlId
      }
      UrlDrawingsPDF.push(DrawingsUrlPDF);

  });

      return UrlDrawingsPDF;
   };

  const doSystemColorValue = () => {

    const {color} = Composition

    setSystemColorValue( color.data ? parseInt(color.data.id) : '' );

  };

  async function GetGenders() {
    try {
      const response = await fetch('https://devmaster.epkweb.com/api/genders/');       //cambiar por el url del servidor
      const responseData  = response.json();
      return responseData;
    } catch (error) {
      console.error('Error fetching genders:', error);
      return null;
    }
  }
  async function GetThemes() {
    try {
      const response = await fetch('https://devmaster.epkweb.com/api/themes/');       //cambiar por el url del servidor
      const responseData  = response.json();
      return responseData;
    } catch (error) {
      console.error('Error fetching genders:', error);
      return null;
    }
  }

  function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', {year: 'numeric'});
    const month = date.toLocaleString('default', {
      month: '2-digit',
    });
    const day = date.toLocaleString('default', {day: '2-digit'});

    return [year, month, day].join('-');
  }

  const fetchData = useCallback(async (Start, PageSize, FILTERS) => {
    try {
    // Obtener el ID de la colección del localStorage
    let idCollectionInLocalStorage = localStorage.getItem('IdCollection');

    // Si no hay ID de colección en el localStorage
    if (idCollectionInLocalStorage === null) {
        // Obtener la última colección
        const lastCol = await doGetLastCollection();

        // Determinar la referencia de la colección a obtener
        const collectionId = (lastCol && lastCol.length > 0) ? lastCol[0].id : '29';
        dogetCollectionReference(collectionId, Start, PageSize, FILTERS);
        dofetchIDCollection(collectionId)
        dogetSystemColor();
    } else {
        // Usar el ID de colección del localStorage
        dogetCollectionReference(idCollectionInLocalStorage, Start, PageSize, FILTERS);
        dofetchIDCollection(idCollectionInLocalStorage);
        dogetSystemColor();
    }
    
    } catch (error) {
    console.error('Error al obtener datos de la colección:', error);
    }
}, [dogetCollectionReference, doGetLastCollection]);

  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [SessionUser, setSessionUser] = useState();
  const [SessiontoMaker, setSessiontoMaker] = useState();
  const [SessionUserCity, setSessionUserCity] = useState();

  const [open, setOpen] = useState(false);
  const [openFormDrawer, setopenFormDrawer] = useState(false);
  const [openFormDrawerEdit, setopenFormDrawerEdit] = useState(false);
  const [StampsOpen, setStampsOpen] = useState(false);
  const [StatusOnCloseStamps, setStatusOnCloseStamps] = useState(false);

  const [CollectionMap, setCollectionMap] = useState([]);
  const [StaticReferenceMap, setStaticReferenceMap] = useState([]);
  const [ReferenceMap, setReferenceMap] = useState([]);
  const [MetaReferenceMap, setMetaReferenceMap] = useState({});
  const [SoloReferenceMap, setSoloReferenceMap] = useState([]);
  const [FiltersReferenceMap, setFiltersReferenceMap] = useState([]);
  const [TableStampsMap, setTableStampsMap] = useState([]);
  const [filtersGenderMap, setfiltersGenderMap] = useState([]);
  const [filtersProductMap, setfiltersProductMap] = useState([]);
  const [filtersSizeMap, setfiltersSizeMap] = useState([]);
  const [filterSizeArray, setfilterSizeArray] = useState([]);
  const [SystemColor, setSystemColor] = useState([]);
  const [SizesEditMap, setSizesEditMap] = useState();
  const [filtersThemesMap, setfiltersThemesMap] = useState([]);
  const [filtersStampsMap, setfiltersStampsMap] = useState([]);
  const [TotalStampsMap, setTotalStampsMap] = useState([]);

  const [staticCombinationMap, setStaticCombinationMap] = useState([])

  const [silhouetteMap, setSilhouetteMap] = useState([])
  const [combinationsMap, setCombinationsMap] = useState([])

  const [IdCollection, setIdCollection] = useState(null);
  const [NameCollection, setNameCollection] = useState('');
  const [IdPrefixCollection, setIdPrefixCollection] = useState();
  const [IdMaster, setIdMaster] = useState();
  const [Referencia, setReferencia] = useState();
  const [SimilarRefs, setSimilarRefs] = useState();
  const [Description, setDescription] = useState();
  const [GenderName, setGenderName] = useState();
  const [StatusReference, setStatusReference] = useState([]);

  const [Collection, setCollection] = useState({});
  const [Drawings, setDrawings] = useState([]);
  const [DrawingsPDF, setDrawingsPDF] = useState([]);
  const [Size, setSize] = useState([]);
  const [Themes, setThemes] = useState([]);
  const [Color_pantone, setColor_pantone] = useState([]);

  const [Composition, setComposition] = useState({});
  const [Provider, setProvider] = useState({});
  const [Stamp, setStamp] = useState({});

  const [fileListIMG, setfileListIMG] = useState([]);
  const [fileListPDF, setFileListPDF] = useState([]);
  const [SendUploadIMG, setSendUploadIMG] = useState(true);
  const [SendUploadPDF, setSendUploadPDF] = useState(true);

  const [showImgModalReference, setShowImgModalReference] = useState(false);
  const [showModalLoading, setShowModalLoading] = useState(false);
  const [showUrlImg, setshowUrlImg] = useState('');
  const [ShowDrawerLoading, setShowDrawerLoading] = useState(false);


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [SystemColorValue, setSystemColorValue] = useState();
  const [LoadSizeEdit, setLoadSizeEdit] = useState(true);


  const [RefeComments, setRefeComments] = useState([]);
  const [RefePendings, setRefePendings] = useState([]);
  const [RefeCommentstamp, setRefeCommentstamp] = useState([]);
  const [RefePendingstamp, setRefePendingstamp] = useState([]);

  const [ItemProductName, setItemProductName] = useState();
  const [ItemGenderName, setItemGenderName] = useState();

  //modal
const [isModalOpen, setIsModalOpen] = useState(false);
const showModal = () => {
setIsModalOpen(true);
};
const handleOk = () => {
setIsModalOpen(false);
};
const handleCancel = () => {
setIsModalOpen(false);
};
//end
  //modal Stamp
  const [isModalStampOpen, setIsModalStampOpen] = useState(false);
  const showModalStamp = () => {
    setIsModalStampOpen(true);
  };
  const handleStampOk = () => {
    setIsModalStampOpen(false);
  };
  const handleStampCancel = () => {
    setIsModalStampOpen(false);
  };
  //end


  const useract = {
    setSessionUser: setSessionUser,
    SessionUser: SessionUser,

    setLoading: setLoading,
    loading: loading,

    setSessiontoMaker: setSessiontoMaker,
    SessiontoMaker: SessiontoMaker,

    setSessionUserCity: setSessionUserCity,
    SessionUserCity: SessionUserCity,

    showModal: showModal,
    handleOk: handleOk,
    handleCancel: handleCancel,
    setIsModalOpen: setIsModalOpen,
    isModalOpen: isModalOpen,
    showModalStamp: showModalStamp,
    handleStampOk: handleStampOk,
    handleStampCancel: handleStampCancel,
    setIsModalStampOpen: setIsModalStampOpen,
    isModalStampOpen: isModalStampOpen,

    // combinations
    silhouetteMap: silhouetteMap,
    setSilhouetteMap: setSilhouetteMap,
    combinationsMap: combinationsMap,
    setCombinationsMap: setCombinationsMap,

    dofetchReferenceForSilhouettes: dofetchReferenceForSilhouettes,
    dofetchCombinationByCollection: dofetchCombinationByCollection,
    dofetchCombinationById: dofetchCombinationById,
    doCreateCombination: doCreateCombination,
    doUpdateCombination: doUpdateCombination,
    doDeleteCombination: doDeleteCombination,
    dofindThemes: dofindThemes,
    dofindParts: dofindParts,
    doFetchLastCombinationId: doFetchLastCombinationId,
    dofindCollectionFiltersCombination: dofindCollectionFiltersCombination,
    doCombinationMapFilters: doCombinationMapFilters,
    staticCombinationMap: staticCombinationMap,
    setStaticCombinationMap: setStaticCombinationMap,
    doGetLastCollection: doGetLastCollection,
    //

    dofetchCollection: dofetchCollection,
    dofetchIDCollection: dofetchIDCollection,
    doImgReferencia: doImgReferencia,
    doMapDrawings: doMapDrawings,
    doMapDrawingsPDF: doMapDrawingsPDF,
    dofetchReference: dofetchReference,
    dogetCollectionReference: dogetCollectionReference,
    dofindCollectionFilters: dofindCollectionFilters,
    doDeleteImgReference: doDeleteImgReference,
    dogetSystemColor: dogetSystemColor,
    doSaveReference: doSaveReference,
    doUpdateReference: doUpdateReference,
    doSystemColorValue: doSystemColorValue,
    doLoadSizeEdit: doLoadSizeEdit,
    dofindStamps: dofindStamps,
    dofindGender: dofindGender,

    doUpdateComment: doUpdateComment,
    doUpdatePendingsComment: doUpdatePendingsComment,
    doUpdateStatusReference: doUpdateStatusReference,

    doUpdateStampComment: doUpdateStampComment,
    doUpdateStampPendingsComment: doUpdateStampPendingsComment,
    doupdateStatusStamp: doupdateStatusStamp,

    doReferenceMapFilters: doReferenceMapFilters,
    dogenerateFilters: dogenerateFilters,

    IdCollection: IdCollection,
    NameCollection: NameCollection,
    IdPrefixCollection: IdPrefixCollection,
    IdMaster: IdMaster,
    Referencia: Referencia,
    SimilarRefs: SimilarRefs,
    Description: Description,
    GenderName: GenderName,
    StatusReference: StatusReference,
    Collection: Collection,
    Drawings: Drawings,
    DrawingsPDF: DrawingsPDF,
    Size: Size,
    Themes: Themes,
    Color_pantone,
    Composition: Composition,
    Provider: Provider,
    Stamp: Stamp,

    doshowDrawer: doshowDrawer,
    doshowFormDrawer: doshowFormDrawer,
    doshowFormDrawerEdit: doshowFormDrawerEdit,
    onClose: onClose,
    onCloseFormDrawer: onCloseFormDrawer,
    onCloseFormDrawerEdit: onCloseFormDrawerEdit,
    setOpen: setOpen,
    open: open,
    openFormDrawer: openFormDrawer,
    setopenFormDrawer: setopenFormDrawer,
    openFormDrawerEdit: openFormDrawerEdit,
    setStampsOpen: setStampsOpen,
    StampsOpen: StampsOpen,
    onCloseStamps: onCloseStamps,
    setopenFormDrawerEdit: setopenFormDrawerEdit,
    setIdCollection: setIdCollection,
    setNameCollection: setNameCollection,
    setIdPrefixCollection: setIdPrefixCollection,
    setIdMaster: setIdMaster,
    setReferencia: setReferencia,
    setSimilarRefs: setSimilarRefs,
    setDescription: setDescription,
    setGenderName: setGenderName,
    setStatusReference: setStatusReference,
    setCollection: setCollection,
    setDrawings: setDrawings,
    setDrawingsPDF: setDrawingsPDF,
    setSize: setSize,
    setThemes: setThemes,
    setColor_pantone: setColor_pantone,
    setComposition: setComposition,
    setProvider: setProvider,
    setStamp: setStamp,
    doShowStampsDrawer: doShowStampsDrawer,

    setCollectionMap: setCollectionMap,
    CollectionMap: CollectionMap,
    setStaticReferenceMap: setStaticReferenceMap,
    StaticReferenceMap: StaticReferenceMap,
    setReferenceMap: setReferenceMap,
    ReferenceMap: ReferenceMap,
    setMetaReferenceMap: setMetaReferenceMap,
    MetaReferenceMap: MetaReferenceMap,
    setFiltersReferenceMap: setFiltersReferenceMap,
    FiltersReferenceMap: FiltersReferenceMap,
    setTableStampsMap: setTableStampsMap,
    TableStampsMap: TableStampsMap,
    setfiltersGenderMap: setfiltersGenderMap,
    filtersGenderMap: filtersGenderMap,
    setfiltersProductMap: setfiltersProductMap,
    filtersProductMap: filtersProductMap,
    setfiltersSizeMap: setfiltersSizeMap,
    filtersSizeMap: filtersSizeMap,
    setfilterSizeArray: setfilterSizeArray,
    filterSizeArray: filterSizeArray,
    setSystemColor: setSystemColor,
    SystemColor: SystemColor,
    setfiltersThemesMap: setfiltersThemesMap,
    filtersThemesMap: filtersThemesMap,
    setfiltersStampsMap: setfiltersStampsMap,
    filtersStampsMap: filtersStampsMap,
    setTotalStampsMap:setTotalStampsMap,
    TotalStampsMap:TotalStampsMap,

    showImgModalReference: showImgModalReference,
    setShowImgModalReference: setShowImgModalReference,
    showModalLoading: showModalLoading,
    setShowModalLoading: setShowModalLoading,
    showUrlImg: showUrlImg,
    ShowDrawerLoading: ShowDrawerLoading,
    setShowDrawerLoading: setShowDrawerLoading,

    isSubmitting: isSubmitting,
    setSystemColorValue: setSystemColorValue,
    SystemColorValue: SystemColorValue,
    setSizesEditMap: setSizesEditMap,
    SizesEditMap: SizesEditMap,
    setLoadSizeEdit: setLoadSizeEdit,
    LoadSizeEdit: LoadSizeEdit,

    setfileListIMG: setfileListIMG,
    fileListIMG: fileListIMG,
    setFileListPDF: setFileListPDF,
    fileListPDF: fileListPDF,
    setSendUploadIMG: setSendUploadIMG,
    SendUploadIMG: SendUploadIMG,
    setSendUploadPDF: setSendUploadPDF,
    SendUploadPDF: SendUploadPDF,

    RefeComments: RefeComments,
    setRefeComments: setRefeComments,
    RefePendings: RefePendings,
    setRefePendings: setRefePendings,

    RefeCommentstamp: RefeCommentstamp,
    setRefeCommentstamp: setRefeCommentstamp,
    RefePendingstamp: RefePendingstamp,
    setRefePendingstamp: setRefePendingstamp,

    SoloReferenceMap: SoloReferenceMap,

    GetGenders: GetGenders,
    GetThemes: GetThemes,

    fetchData:fetchData,

    setItemGenderName:setItemGenderName,
    ItemGenderName:ItemGenderName,
    setItemProductName:setItemProductName,
    ItemProductName:ItemProductName
  }
  return (
    <UserContext.Provider value={useract}>{children}</UserContext.Provider>


  );
};

export default UserProvider;