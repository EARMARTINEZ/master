import axios from "axios";
import qs from "qs";


export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

export function getApiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_APIAUTH_URL || "http://localhost:1381"
  }${path}`;
}

export async function getEndpoint() {
  const URLogin = getStrapiURL("/api/auth/local")

    var response = await axios.post(URLogin, {
      identifier: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      password: process.env.NEXT_PUBLIC_ADMIN_PASS
    });
    const data_jwt = response.data.jwt;



  return data_jwt;
}

export async function getAPIEndpoint() {
  const URLogin = getApiURL("/auth/local")

    var response = await axios.post(URLogin, {
      identifier: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      password: process.env.NEXT_PUBLIC_ADMIN_PASS
    });
    const data_jwt = response.data.jwt;



  return data_jwt;
}
/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {RequestInit} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();

  return data;
}

/**
 *
 * @param {Object} options
 * @param {string} options.slug The page's slug
 * @param {string} options.locale The current locale specified in router.locale
 * @param {boolean} options.preview router isPreview value
 */
export async function getPageData({ slug, locale, limit, preview }) {


  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        fragment FileParts on UploadFileEntityResponse {
          data {
            id
            attributes {
              alternativeText
              width
              height
              mime
              url
              formats
            }
          }
        }
        query GetPages(
          $slug: String!
          $publicationState: PublicationState!
          $locale: I18NLocaleCode!


        ) {
          pages(
            filters: { slug: { eq: $slug } }
            publicationState: $publicationState
            locale: $locale

          ) {
            data {
              id
              attributes {
                locale
                localizations {
                  data {
                    id
                    attributes {
                      locale
                    }
                  }
                }
                slug
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }

                contentSections {
                  __typename
                  ... on ComponentSectionsBottomActions {
                    id
                    title
                    buttons {
                      id
                      newTab
                      text
                      type
                      url
                    }
                  }

                  ... on ComponentSectionsHero {
                    id
                    buttons {
                      id
                      newTab
                      text
                      type
                      url
                    }
                    title
                    description
                    label
                    smallTextWithLink
                    picture {
                      ...FileParts
                    }
                  }

                  ... on ComponentSectionsRichText {
                    id
                    content
                  }


                }
              }
            }
          }


        }
      `,
      variables: {
        slug,
        publicationState: preview ? "PREVIEW" : "LIVE",
        locale,
      },
    }),
  });

  const pagesData = await pagesRes.json();
  // Make sure we found something, otherwise return null
  //console.log(pagesData)
  if (pagesData.data?.pages == null || pagesData.data.pages.length === 0) {
    return null;
  }
  //console.log(pagesData)
  // Return the first item since there should only be one result per slug
  return pagesData.data.pages.data[0];
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData(locale) {
  const gqlEndpoint = getStrapiURL("/graphql");
  const globalRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        fragment FileParts on UploadFileEntityResponse {
          data {
            id
            attributes {
              alternativeText
              width
              height
              mime
              url
              formats
            }
          }
        }
        query GetGlobal($locale: I18NLocaleCode!) {
          global(locale: $locale) {
            data {
              id
              attributes {
                favicon {
                  ...FileParts
                }
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }
                metaTitleSuffix
                notificationBanner {
                  type
                  text
                }
                navbar {
                  logo {
                    ...FileParts
                  }
                  links {
                    id
                    url
                    newTab
                    text
                  }
                  button {
                    id
                    url
                    newTab
                    text
                    type
                  }
                }
                footer {
                  logo {
                    ...FileParts
                  }
                  smallText
                  columns {
                    id
                    title
                    links {
                      id
                      url
                      newTab
                      text
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        locale,
      },
    }),
  });

  const global = await globalRes.json();
  //console.log(global.data.global);
  return global.data.global;
}


export async function getDashGlobalData(locale) {
  const gqlEndpoint = getStrapiURL("/graphql");
  const globalRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        fragment FileParts on UploadFileEntityResponse {
          data {
            id
            attributes {
              alternativeText
              width
              height
              mime
              url
              formats
            }
          }
        }
        query GetDashglobal($locale: I18NLocaleCode!) {
          dashglobal(locale: $locale) {
            data {
              id
              attributes {
                favicon {
                  ...FileParts
                }
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }
                metaTitleSuffix
                notificationBanner {
                  type
                  text
                }
                navbar {
                  logo {
                    ...FileParts
                  }
                  links {
                    id
                    url
                    newTab
                    text
                  }
                  button {
                    id
                    url
                    newTab
                    text
                    type
                  }
                }
                footer {
                  logo {
                    ...FileParts
                  }
                  smallText
                  columns {
                    id
                    title
                    links {
                      id
                      url
                      newTab
                      text
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        locale,
      },
    }),
  });

  const global = await globalRes.json();
  //console.log(global.data);
  return global.data.dashglobal;
}


export async function getOrdenes({ emails }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");
  const data_jwt = await getEndpoint();


  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Authorization: "Bearer "+data_jwt
    },
    body: JSON.stringify({
      query: `
      query GetOrdenes(
        $emails: String!){

        orders(
          sort:"id:desc"
          filters:{email: { contains:$emails } }
          ){
         data{
          id
           attributes{
            cod_simb
            price
            amount
            Quantity
            operationtype
            status
           }
         }
        }
       }
      `, variables: {
        emails

      },

    }),
  });

  const pagesData = await pagesRes.json();
   //console.log('datos '+emails)
  // Make sure we found something, otherwise return null
  if (pagesData.data?.orders == null || pagesData.data.orders.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data;
}


export async function getInfotransactions({ IdNumber, TransactionId }) {
  // Find the pages that match this slug
  const gqlEndpoint = getApiURL("/graphql");
  const data_jwt = await getAPIEndpoint();

   //console.log(data_jwt);
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Authorization: "Bearer "+data_jwt
    },
    body: JSON.stringify({
      query: `
      query Getinfotransactionsreceiveds(
        $IdNumber: String!
        $TransactionId: String!){

          infotransactionsreceiveds(
          sort:"id:desc"
          publicationState:PREVIEW
          where:{ MgiTransactionId_contains:$TransactionId, receiverIdNumber:$IdNumber }
          ){
          id
          loteid
          firstName
          lastName
          receiverIdNumber
          accountNumber
          receiveAmount
          StatusPaid
          controlStatus

        }
       }
      `, variables: {
        IdNumber,
        TransactionId

      },

    }),
  });

  const pagesData = await pagesRes.json();
   //console.log(pagesData.data.infotransactionsreceiveds)
  // Make sure we found something, otherwise return null
  if (pagesData.data?.infotransactionsreceiveds == null || pagesData.data.infotransactionsreceiveds.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data;
}


export async function getDayPaid({ ControlStatus, ValorStatus, FechaInicio, FechaFin }) {
  // Find the pages that match this slug
  const gqlEndpoint = getApiURL("/graphql");
  const data_jwt = await getAPIEndpoint();

   //console.log(data_jwt);
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Authorization: "Bearer "+data_jwt
    },
    body: JSON.stringify({
      query: `
      query GetinfotransactionsreceivedsConnection(
        $ControlStatus: String!
        $ValorStatus: String!
        $FechaInicio: String!
        $FechaFin: String! ){

        infotransactionsreceivedsConnection(
        where:{ StatusPaid_eq:$ControlStatus, valor_contains:$ValorStatus, updated_at_gte:$FechaInicio, updated_at_lt:$FechaFin }
        ){
        groupBy {
          date {
            key:key
            connection {
              aggregate {
                count
                sum {
                  receiveAmount
                  payment
                  }
                }
              }
            }
          }
        }
      }
      `, variables: {
        ControlStatus,
        ValorStatus,
        FechaInicio,
        FechaFin

      },

    }),
  });

  const pagesData = await pagesRes.json();
   //console.log(pagesData.data.infotransactionsreceiveds)
  // Make sure we found something, otherwise return null
  if (pagesData.data?.infotransactionsreceivedsConnection == null || pagesData.data.infotransactionsreceivedsConnection.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data.infotransactionsreceivedsConnection.groupBy.date;
}


export async function getPaidday({ ControlStatus,  FechaInicio }) {
  // Find the pages that match this slug
  const gqlEndpoint = getApiURL("/graphql");
  const data_jwt = await getAPIEndpoint();

   //console.log(data_jwt);
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Authorization: "Bearer "+data_jwt
    },
    body: JSON.stringify({
      query: `
      query GetinfotransactionsreceivedsConnection(
        $ControlStatus: String!
        $FechaInicio: String! ){

        infotransactionsreceivedsConnection(
        where:{ StatusPaid_eq:$ControlStatus, updated_at_gte:$FechaInicio }
        ){
        groupBy {
          date {
            key:key
            connection {
              aggregate {
                count
                sum {
                  receiveAmount
                  payment
                  }
                }
              }
            }
          }
        }
      }
      `, variables: {
        ControlStatus,
        FechaInicio,
      },
    }),
  });

  const pagesData = await pagesRes.json();
   //console.log(pagesData.data.infotransactionsreceiveds)
  // Make sure we found something, otherwise return null
  if (pagesData.data?.infotransactionsreceivedsConnection == null || pagesData.data.infotransactionsreceivedsConnection.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data.infotransactionsreceivedsConnection.groupBy.date;
}

///Master Lis
export async function getIDReference({ IDReference }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetIDReference(
        $IDReference: ID!){
          masters(
          sort:"id:desc"
          publicationState:PREVIEW
          filters:{ id: { eq:$IDReference } }
          ){
            data {
              id
              attributes {
                referencia
                description
                genderName
                status
                collection {
                  data {
                    id
                    attributes {
                      name
                      prefix_id
                      collection_type{data{attributes{prefix_id}}}
                      pantones {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
                color_pantone{data{id attributes{name}}}
                similarRefs
                theme {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                Composition {
                  gender {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                  typeproduct {
                    data {
                      id
                      attributes {
                        name
                        id_part{data{id attributes{name}}}
                        order_show
                      }
                    }
                  }
                  fabric {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                  color {
                    data {
                      id
                      attributes {
                        name
                        codigo
                      }
                    }
                  }
                }
                sizes(sort:"id:asc") {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                provider{data{id attributes{name}}}
                stamp{data{id attributes{
                  name
                  masters( publicationState: PREVIEW){data{attributes{ referencia}}}
                  status
                  picture{data{id attributes{url formats}}}
                  commentstamp(sort: ["id:desc"] ){id comment date user status type{data{id attributes{name}}}}
                  pendingstamp(sort: ["status:asc", "id:desc"] ){id comment date user status type{data{id attributes{name}}}}
                }}}
                drawings(sort:"url:asc"){
                  data {id attributes{ext url hash mime name caption alternativeText formats}}
                }
                drawingsPDF{data{id attributes{url}}}
                comments(sort: ["id:desc"] ){id comment date user status type{data{id attributes{name}}}}
                pendings(sort: ["status:asc", "id:desc"] ){id comment date user status type{data{id attributes{name}}}}
              }
            }
        }
       }
      `, variables: {
        IDReference
      },
    }),
  });

  const pagesData = await pagesRes.json();
   //console.log('datos '+emails)
  // Make sure we found something, otherwise return null
  if (pagesData.data?.masters == null || pagesData.data.masters.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data;
}

export async function getReference({ NReference }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetReference(
        $NReference: String!){
          masters(
          sort:"id:desc"
          publicationState:PREVIEW
          filters:{referencia: { eq:$NReference } }
          ){
            data {
              id
              attributes {
                referencia
                description
                genderName
                status
                collection {
                  data {
                    id
                    attributes {
                      name
                      prefix_id
                      collection_type{data{attributes{prefix_id}}}
                      pantones {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
                color_pantone{data{id attributes{name}}}
                similarRefs
                theme {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                Composition {
                  gender {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                  typeproduct {
                    data {
                      id
                      attributes {
                        name
                        id_part{data{id attributes{name}}}
                        order_show
                      }
                    }
                  }
                  fabric {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                  color {
                    data {
                      id
                      attributes {
                        name
                        codigo
                      }
                    }
                  }
                }
                sizes(sort:"id:asc") {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                provider{data{id attributes{name}}}
                stamp{data{id attributes{
                  name
                  masters( publicationState: PREVIEW){data{attributes{ referencia}}}
                  status
                  picture{data{id attributes{url formats}}}
                  commentstamp(sort: ["id:desc"] ){id comment date user status type{data{id attributes{name}}}}
                  pendingstamp(sort: ["status:asc", "id:desc"] ){id comment date user status type{data{id attributes{name}}}}
                }}}
                drawings(sort:"url:asc"){
                  data {id attributes{ext url hash mime name caption alternativeText formats}}
                }
                drawingsPDF{data{id attributes{url name}}}
                comments(sort: ["id:desc"] ){id comment date user status type{data{id attributes{name}}}}
                pendings(sort: ["status:asc", "id:desc"] ){id comment date user status type{data{id attributes{name}}}}

              }
            }
            meta {
              pagination {
                page
                pageSize
                total
                pageCount
              }
            }
        }
       }
      `, variables: {
        NReference
      },
    }),
  });

  const pagesData = await pagesRes.json();
   //console.log('datos '+emails)
  // Make sure we found something, otherwise return null
  if (pagesData.data?.masters == null || pagesData.data.masters.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data;
}


export async function getCollectionReference({ NCollection, start }) {
  // Medir el tiempo de inicio de la función
  console.time('getCollectionReference');

  const gqlEndpoint = getStrapiURL("/graphql");
  const Start = start ? start : 1;
  const Limite = 10;

  console.time('fetchData');
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetCollectionReference(
        $NCollection: ID!
        $Start: Int!
        $Limite: Int!
      ) {
        masters(
          publicationState: PREVIEW
          sort: "referencia:asc"
          filters: { collection: { id: { eq: $NCollection } } }
          pagination: { page: $Start, pageSize: $Limite }
        ) {
          data {
            id
            attributes {
              referencia
              description
              genderName
              status
              collection {
                data {
                  id
                  attributes {
                    name
                    prefix_id
                    collection_type { data { attributes { prefix_id } } }
                    pantones {
                      data {
                        attributes {
                          url
                        }
                      }
                    }
                  }
                }
              }
              color_pantone { data { id attributes { name } } }
              similarRefs
              theme {
                data {
                  id
                  attributes {
                    name
                  }
                }
              }
              Composition {
                gender {
                  data {
                    id
                    attributes {
                      name
                      order_show
                    }
                  }
                }
                typeproduct {
                  data {
                    id
                    attributes {
                      name
                      id_part { data { id attributes { name } } }
                      order_show
                    }
                  }
                }
                fabric {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                color {
                  data {
                    id
                    attributes {
                      name
                      codigo
                    }
                  }
                }
              }
              sizes(sort: "id:asc") {
                data {
                  id
                  attributes {
                    name
                  }
                }
              }
              provider {
                data {
                  id
                  attributes {
                    name
                  }
                }
              }
              stamp {
                data {
                  id
                  attributes {
                    name
                    masters(publicationState: PREVIEW) { data { attributes { referencia } } }
                    status
                    picture { data { id attributes { url formats } } }
                    commentstamp(sort: ["id:desc"]) { id comment date user status type { data { id attributes { name } } } }
                    pendingstamp(sort: ["status:asc", "id:desc"]) { id comment date user status type { data { id attributes { name } } } }
                  }
                }
              }
              drawings(sort: ["id:asc", "url:desc"]) {
                data {
                  id
                  attributes {
                    ext
                    url
                    hash
                    mime
                    name
                    caption
                    alternativeText
                    formats
                  }
                }
              }
              drawingsPDF { data { id attributes { url } } }
              comments(sort: ["id:desc"]) { id comment date user status type { data { id attributes { name } } } }
              pendings(sort: ["status:asc", "id:desc"]) { id comment date user status type { data { id attributes { name } } } }
            }
          }
          meta {
            pagination {
              page
              pageSize
              total
              pageCount
            }
          }
        }
      }
      `,
      variables: {
        NCollection,
        Start,
        Limite,
      },
    }),
  });
  console.timeEnd('fetchData');

  const pagesData = await pagesRes.json();

 
  if (pagesData.data?.masters == null || pagesData.data.masters.length === 0) {
   
    return null;
  }

  
  console.timeEnd('getCollectionReference');

  return pagesData.data;
}


// Obtener las siluetas por coleccion
export async function getSilhouetteByCollection({ NCollection, start }) {
  const gqlEndpoint = getStrapiURL("/graphql");

  const Start = start ? start : 1
  const Limite = 50

  const pagesRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `

      query GetSilhouetteByCollection(
        $NCollection: ID!
        $Start: Int!, $Limite: Int!
        $Status1: String, $Status2: String,
        ){
          masters(
            publicationState: PREVIEW
            sort:"referencia:asc"
            filters:{
              collection:{id:{eq:$NCollection}}
              status:{in:[$Status1, $Status2]}
            }
            pagination:{page: $Start ,pageSize: $Limite }
          ){
            data {
              id
              attributes {
                referencia
                genderName
                status
                productname
                collection {
                  data {
                    id
                    attributes {
                      name
                      prefix_id
                    }
                  }
                }
                theme {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                Composition {
                   color {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                  fabric{
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                  gender{
                    data{
                      id
                      attributes{
                        name
                        order_show
                      }
                    }
                  }
                  typeproduct {
                    data {
                      id
                      attributes {
                        name
                        id_part{data{id attributes{name}}}
                        order_show
                      }
                    }
                  }
                }
                silhouette { data {id attributes {url formats} } }
              }
            }
            meta {
              pagination {
                page
                pageSize
                total
                pageCount
              }
            }
          }
       }
      `,
      variables: {
        NCollection,
        Start,
        Limite,
        Status1: 'Approved',
        Status2: 'Pending',
      },
    }),
  })

  const pagesData = await pagesRes.json();
  // Make sure we found something, otherwise return null
  if (pagesData.data?.masters == null || pagesData.data.masters.length === 0) {
    return null;
  }
  return pagesData.data;
}

// Obtener las combinaciones por coleccion
export async function getCombinationByCollection({ NCollection, start }) {
  const gqlEndpoint = getStrapiURL("/graphql");

  const Start = start ? start : 1
  const Limite = 400

  const pagesRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query getCombination (
        $NCollection: ID!
        $Start: Int!, $Limite: Int!
        ){
          combinations(
            filters:{
              collection:{id:{eq:$NCollection}}
            }
            pagination:{page: $Start ,pageSize: $Limite }
          ){
            data {
              id
              attributes {
                refId
                type
                canvas
                collection {
                  data {
                    id
                    attributes {
                      name
                      prefix_id
                      collection_type{data{attributes{prefix_id}}}
                    }
                  }
                }
                gender {
                  data {
                    id
                    attributes {
                      name
                      order_show
                    }
                  }
                }
                theme {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                image {
                  data {
                    id
                    attributes {
                      url
                      name
                    }
                  }
                }
                a_create_references(publicationState: PREVIEW) {
                  data {
                    id
                    attributes {
                      referencia
                      Composition {
                        typeproduct {
                          data {
                            attributes {
                              name
                            }
                          }
                        }
                      }
                      silhouette {
                        data {
                          id
                          attributes {
                            url
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        NCollection,
        Start,
        Limite,
      },
    }),
  })

  const pagesData = await pagesRes.json();
  // Make sure we found something, otherwise return null
  if (pagesData.data?.combinations == null || pagesData.data.combinations.length === 0) {
    return null;
  }
  return pagesData.data;
}

// Obtener las combinaciones por ID
export async function getCombinationById(id) {
  const gqlEndpoint = getStrapiURL('/graphql')
  console.log(id)
  const res = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query getCombination ($id: ID!) {
                combination(id: $id) {
                data{
                  id
                  attributes {
                    refId
                    type
                    canvas
                    collection {
                      data {
                        id
                        attributes {
                          name
                          prefix_id
                          collection_type{data{attributes{prefix_id}}}
                        }
                      }
                    }
                    gender {
                      data {
                        id
                        attributes {
                          name
                          order_show
                        }
                      }
                    }
                    theme {
                      data {
                        id
                        attributes {
                          name
                        }
                      }
                    }
                    a_create_references(publicationState: PREVIEW) {
                      data {
                        id
                        attributes {
                          referencia
                          Composition {
                            typeproduct {
                              data {
                                attributes {
                                  name
                                }
                              }
                            }
                          }
                          silhouette {
                            data {
                              id
                              attributes {
                                url
                                name
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
      `,
      variables: {
        id,
      },
    }),
  })

  const data = await res.json()
  console.log(data)
  // Make sure we found something, otherwise return null
  if (data.data?.combination == null) {
    return null
  }
  return data.data
}

// Crear una combinación
// Combination data should be an object with the following structure:
// {
//   "refId": number,
//   "gender": ID,
//   "theme": ID,
//   "a_create_references": [ID],
//   "canvas": JSON,
//   "collection": ID,
//   "image": ID,
//   "type": "mannequin | impulse | photo",
// }

// OJO: el ID de a_create_references es distint a su referencia.
export async function createCombination( combinationData, file ) {

  let imageUploaded = uploadImageToCombination(file)

  if (!imageUploaded) {
    return null
  }

  combinationData.image = await imageUploaded

  const gqlEndpoint = getStrapiURL('/graphql')
  const response = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      mutation CreateCombination($input: CombinationInput!) {
        createCombination(data: $input) {
          data {
            id
            attributes {
              refId
              type
              canvas
              collection {
                data {
                  id
                  attributes {
                    name
                    prefix_id
                    collection_type{data{attributes{prefix_id}}}
                  }
                }
              }
              gender {
                data {
                  id
                  attributes {
                    name
                    order_show
                  }
                }
              }
              theme {
                data {
                  id
                  attributes {
                    name
                  }
                }
              }
              image {
                data {
                  id
                  attributes {
                    url
                    name
                  }
                }
              }
              a_create_references(publicationState: PREVIEW) {
                data {
                  id
                  attributes {
                    referencia
                    Composition {
                      typeproduct {
                        data {
                          attributes {
                            name
                          }
                        }
                      }
                    }
                    silhouette {
                      data {
                        id
                        attributes {
                          url
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      `,
      variables: {
        input: {
          ...combinationData,
        },
      },
    }),
  })

  const responseData = await response.json()
  // Make sure we found something, otherwise return null
  if (responseData.data?.createCombination == null) {
    return null
  }
  return responseData.data
}

// Actualizar una combinación
export async function updateCombination(id, data, file ) {
  const gqlEndpoint = getStrapiURL('/graphql')

  if (file) {
    let imageUploaded = uploadImageToCombination(file)
    if (!imageUploaded) {
      return null
    }
    data.image = await imageUploaded
  }

  const response = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation UpdateCombination($id: ID!, $data: CombinationInput!) {
          updateCombination(id: $id, data: $data) {
            data {
              id
              attributes {
                refId
                type
                canvas
                collection {
                  data {
                    id
                    attributes {
                      name
                      prefix_id
                      collection_type{data{attributes{prefix_id}}}
                    }
                  }
                }
                gender {
                  data {
                    id
                    attributes {
                      name
                      order_show
                    }
                  }
                }
                theme {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                image {
                  data {
                    id
                    attributes {
                      url
                      name
                    }
                  }
                }
                a_create_references(publicationState: PREVIEW) {
                  data {
                    id
                    attributes {
                      referencia
                      Composition {
                        typeproduct {
                          data {
                            attributes {
                              name
                            }
                          }
                        }
                      }
                      silhouette {
                        data {
                          id
                          attributes {
                            url
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        id,
        data,
      },
    }),
  })

  const responseData = await response.json()
  // Make sure we found something, otherwise return null
  if (responseData.data?.updateCombination == null) {
    return null
  }
  return responseData.data
}

// Eliminar una combinación
export async function deleteCombination( id ) {
  const gqlEndpoint = getStrapiURL('/graphql')

  const response = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation DeleteCombination($id: ID!) {
          deleteCombination(id: $id) {
            data {
              id
            }
          }
        }
      `,
      variables: {
        id,
      },
    }),
  })

  const responseData = await response.json()
  // Make sure we found something, otherwise return null
  if (responseData.data?.deleteCombination == null) {
    return null
  }
  return responseData.data
}

// Subir una imagen a una combinacion usando el API de Strapi

export async function uploadImageToCombination( file ) {
  const apiEndpoint = getStrapiURL('/api/upload/')

  const imageBlob = dataURItoBlob(file)

  const formData = new FormData()
  formData.append('files', imageBlob)
  // formData.append('ref', 'api::combination.combination')
  // formData.append('refId', combinationId)
  // formData.append('field', 'image')

  const response = await fetch(apiEndpoint, {
    method: 'POST',
    body: formData,
  })
  const responseData = await response.json()
  if (responseData == null) {
    return null
  }

  let imageId = parseInt(responseData[0].id)

  if (isNaN(imageId)) {
    return null
  }

  return imageId

  function dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(',')[1])
    let array = []
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    return new Blob([new Uint8Array(array)], { type: 'image/png'})
  }

}

// export async function uploadCombinationImage( id, file ) {
//   const gqlEndpoint = getStrapiURL('/api/combinations/')

//   const formData = new FormData()
//   formData.append('files', file)
//   formData.append('refId', id)
//   formData.append('ref', 'combination')
//   formData.append('field', 'canvas')

//   const response = await fetch(gqlEndpoint, {
//     method: 'POST',
//     body: formData,
//   })

//   const responseData = await response.json()
//   // Make sure we found something, otherwise return null
//   if (responseData == null) {
//     return null
//   }
//   return responseData
// }


export async function getCollectionNavigation({ NCollection }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");

  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetCollectionNavigation(
        $NCollection: ID!){
          masters(
            publicationState: PREVIEW
            sort:"referencia:asc"
            filters:{collection:{id:{eq:$NCollection}}}
            pagination:{limit:30 }
          ){
            data {
              id
              attributes {
                referencia
                description
                genderName
                status
                collection {
                  data {
                    id
                    attributes {
                      name
                      prefix_id
                      collection_type{data{attributes{prefix_id}}}
                      pantones {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
                color_pantone{data{id attributes{name}}}
                similarRefs
                theme {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                Composition {
                  gender{
                    data{
                      id
                      attributes{
                        name
                      }
                    }
                  }
                  typeproduct {
                    data {
                      id
                      attributes {
                        name
                        id_part{data{id attributes{name}}}
                        order_show
                      }
                    }
                  }
                  fabric {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                  color {
                    data {
                      id
                      attributes {
                        name
                        codigo
                      }
                    }
                  }
                }
                sizes {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                provider {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                stamp {
                  data {id attributes {name picture {
                        data {id attributes {url} }
                 }}}}
                drawings(sort: ["id:asc", "url:desc"]) {
                  data {id attributes{ext url hash mime name caption alternativeText formats}}
                }
                drawingsPDF{
                  data {id attributes {url name} }
                }
                comments(sort: ["id:desc"] ){id comment date user status type{data{id attributes{name}}}}
                pendings(sort: ["status:asc", "id:desc"] ){id comment date user status type{data{id attributes{name}}}}
              }
            }
          }
       }
      `, variables: {
         NCollection
      },
    }),
  });

  const pagesData = await pagesRes.json();

  // Make sure we found something, otherwise return null
  if (pagesData.data?.masters == null || pagesData.data.masters.length === 0) {
    return null;
  }
  // Return the first item since there should only be one result per slug
  return pagesData.data;
}


export async function getCollection({ NCollection }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");

  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      query: `
      query GetCollection(
        $NCollection: String!){

          collections(
            sort: "id:desc"
            filters:{name:{contains:$NCollection}}
          ){
            data{
              id
              attributes{
                name
                prefix_id
                collection_type{data{attributes{prefix_id}}}

              }
            }

          }
       }
      `, variables: {
         NCollection

      },

    }),
  });

  const pagesData = await pagesRes.json();
  //console.log(pagesData)
  // Make sure we found something, otherwise return null
  if (pagesData.data?.collections == null || pagesData.data.collections.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data;
}


export async function getIDCollection({ NCollection }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      query: `
      query GetIDCollection(
        $NCollection: ID!){

          collections(
            sort: "id:desc"
            filters:{id:{eq:$NCollection}}
          ){
            data{
              id
              attributes{
                name
                prefix_id
                collection_type{data{attributes{prefix_id}}}
              }
            }
          }
       }
      `, variables: {
         NCollection

      },

    }),
  });

  const pagesData = await pagesRes.json();
  //console.log(pagesData)
  // Make sure we found something, otherwise return null
  if (pagesData.data?.collections == null || pagesData.data.collections.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data;
}


export async function getSystemColor({ }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      query: `
      query GetSystemColor{

        colors(
          sort: "id:asc"
          pagination:{limit:-1}
          ){
            data{
              id
              attributes{
                name
                codigo
              }
            }

          }
       }
      `

    }),
  });

  const pagesData = await pagesRes.json();
  // console.log(pagesData)
  // Make sure we found something, otherwise return null
  if (pagesData.data?.colors == null || pagesData.data.colors.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data;
}

export async function getThemesCollection({ NCollection }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");

  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetThemesCollection(
        $NCollection: ID!){
          themes(
            sort:"id:asc"
            filters:{
              masters:{collection:{id:{eq:$NCollection}}}
            }
          ){
            data{
              id
              attributes{
                name
                collection{data{id attributes{name}}}
              }
            }
          }
       }
      `, variables: {
         NCollection
      },
    }),
  });

  const pagesData = await pagesRes.json();

  // Make sure we found something, otherwise return null
  if (pagesData.data?.themes == null || pagesData.data.themes.length === 0) {
    return null;
  }
  //console.log(pagesData.data.masters.data)
  // Return the first item since there should only be one result per slug
  return pagesData.data;
}

export async function getCollectionStamps({ NCollection }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetCollectionStamps(
        $NCollection: ID!){
          stamps(
            sort:"id:asc"
            filters:{masters:{collection:{id:{eq:$NCollection}}} }
          ){
            data{
              id
              attributes{
                name
                masters( publicationState: PREVIEW) {data{attributes{referencia}}}
                picture{
                  data {id attributes{ext url hash mime name caption alternativeText formats}}
                }
              }
            }
          }
       }
      `, variables: {
         NCollection
      },

    }),
  });

  const pagesData = await pagesRes.json();

  // Make sure we found something, otherwise return null
  if (pagesData.data?.stamps == null || pagesData.data.stamps.length === 0) {
    return null;
  }
  //console.log(pagesData.data.stamps.data)
  // Return the first item since there should only be one result per slug
  return pagesData.data;
}

export async function getColorPantoneCollection({ NCollection }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      query: `
      query GetColorPantoneCollection(
        $NCollection: ID!){

          mixcolors(

            sort:"id:asc"
            filters:{collection:{id:{eq:$NCollection}}}
          ){
            data{
              id
              attributes{
                name
                collection{data{id attributes{name}}}
              }
            }
          }
       }
      `, variables: {
         NCollection

      },

    }),
  });

  const pagesData = await pagesRes.json();

  // Make sure we found something, otherwise return null
  if (pagesData.data?.mixcolors == null || pagesData.data.mixcolors.length === 0) {
    return null;
  }
  //console.log(pagesData.data.masters.data)
  // Return the first item since there should only be one result per slug
  return pagesData.data;
}

export async function getStampsCollection({ NCollection }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      query: `
      query GetStampsCollection(
        $NCollection: String!){

          stamps(

            sort:"id:asc"
            filters:{masters:{referencia:{contains:$NCollection}}}
          ){
            data{
              id
              attributes{
                name

              }
            }
          }
       }
      `, variables: {
         NCollection

      },

    }),
  });

  const pagesData = await pagesRes.json();

  // Make sure we found something, otherwise return null
  if (pagesData.data?.stamps == null || pagesData.data.stamps.length === 0) {
    return null;
  }
  //console.log(pagesData.data.masters.data)
  // Return the first item since there should only be one result per slug
  return pagesData.data;
}

export async function getSizesAll({ NGenders, NTypeproducts }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      query: `
      query GetSizesAll{

          sizes(

            sort:"id:asc"
            pagination:{limit:-1}

          ){
            data{
              id
              attributes{
                name

              }
            }
          }
       }
      `

    }),
  });

  const pagesData = await pagesRes.json();

  // Make sure we found something, otherwise return null
  if (pagesData.data?.sizes == null || pagesData.data.sizes.length === 0) {
    return null;
  }
  //console.log(pagesData.data.masters.data)
  // Return the first item since there should only be one result per slug
  return pagesData.data;
}

export async function getSizesCollection({ NGenders, NTypeproducts }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      query: `
      query GetSizesCollection(
        $NGenders: ID!
        $NTypeproducts: ID!){

          sizes(

            sort:"id:asc"
            pagination:{limit:-1}
            filters:{
              genders:{id:{eq:$NGenders}}
              and:{typeproducts:{id: {eq: $NTypeproducts}} }

          }
          ){
            data{
              id
              attributes{
                name

              }
            }
          }
       }
      `, variables: {
        NGenders,
        NTypeproducts

      },

    }),
  });

  const pagesData = await pagesRes.json();

  // Make sure we found something, otherwise return null
  if (pagesData.data?.sizes == null || pagesData.data.sizes.length === 0) {
    return null;
  }
  //console.log(pagesData.data.masters.data)
  // Return the first item since there should only be one result per slug
  return pagesData.data;
}


export async function getSizesActives({ NGenders, NTypeproducts }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");

  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      query: `
      query GetSizesActives(
        $NGenders: ID!
        $NTypeproducts: ID!){

          sizeactives(

            sort:"id:asc"
            pagination:{limit:-1}
            filters:{
              gender:{id:{eq:$NGenders}}
              and:{typeproduct:{id: {eq: $NTypeproducts}} }

          }
          ){
            data{
              id
              attributes{

                sizes{data{id attributes{name}}}
                activateSearch

              }
            }
          }
       }
      `, variables: {
        NGenders,
        NTypeproducts
      },
    }),
  });

  const pagesData = await pagesRes.json();

  // Make sure we found something, otherwise return null
  if (pagesData.data?.sizeactives == null || pagesData.data.sizeactives.length === 0) {
    return null;
  }
  //console.log(pagesData.data.masters.data)
  // Return the first item since there should only be one result per slug
  return pagesData.data;
}

///Catalog


export async function getCollectionFilters({FILTERS} ) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");

  FILTERS ? FILTERS : '';

  //console.log(FILTERS)
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query {
          masters(
            publicationState: PREVIEW
            sort:"id:desc"
            filters:{
              ${FILTERS}
            }
            pagination:{limit:10 }
          ){
            data {
              id
              attributes {
                referencia
                description
                genderName
                productname
                status
                collection {
                  data {
                    id
                    attributes {
                      name
                      prefix_id
                      collection_type{data{attributes{prefix_id}}}
                      pantones {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
                color_pantone{data{id attributes{name}}}
                similarRefs
                theme {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                Composition {
                  gender{
                    data{
                      id
                      attributes{
                        name
                        order_show
                      }
                    }
                  }
                  typeproduct {
                    data {
                      id
                      attributes {
                        name
                        id_part{data{id attributes{name}}}
                        order_show
                      }
                    }
                  }
                  fabric {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                  color {
                    data {
                      id
                      attributes {
                        name
                        codigo
                      }
                    }
                  }
                }
                sizes(sort:"id:asc") {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                provider {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                stamp{data{id attributes{
                  name
                  masters( publicationState: PREVIEW){data{attributes{ referencia}}}
                  status
                  picture{data{id attributes{url formats}}}
                  commentstamp(sort: ["id:desc"] ){id comment date user status type{data{id attributes{name}}}}
                  pendingstamp(sort: ["status:asc", "id:desc"] ){id comment date user status type{data{id attributes{name}}}}
                }}}
                drawings(sort: ["id:asc", "url:desc"]) {
                  data {id attributes{ext url hash mime name caption alternativeText formats}}
                }
                drawingsPDF{ data {id attributes {url } } }
                comments(sort: ["id:desc"] ){id comment date user status type{data{id attributes{name}}}}
                pendings(sort: ["status:asc", "id:desc"] ){id comment date user status type{data{id attributes{name}}}}
              }
            }
            meta {
              pagination {
                page
                pageSize
                total
                pageCount
              }
            }
          }
       }
      `,
    }),
  });

  const pagesData = await pagesRes.json();

  // Make sure we found something, otherwise return null
  if (pagesData.data?.masters == null || pagesData.data.masters.length === 0) {
    return null;
  }
  //console.log(pagesData.data.masters.data)
  // Return the first item since there should only be one result per slug
  return pagesData.data;
}

export async function getCollectionFiltersCombination({ FILTERS }) {
  console.log("GET COLLECTION FILTERS COMBINATION")
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL('/graphql')
  FILTERS ? FILTERS : ''
  //console.log(FILTERS)
  const pagesRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query {
          combinations(
            sort:"id:desc"
            filters:{
              ${FILTERS}
            }
            pagination:{limit:400}
          ){
            data {
              id
              attributes {
                refId
                type
                canvas
                collection {
                  data {
                    id
                    attributes {
                      name
                      prefix_id
                      collection_type{data{attributes{prefix_id}}}
                    }
                  }
                }
                gender {
                  data {
                    id
                    attributes {
                      name
                      order_show
                    }
                  }
                }
                theme {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                image {
                  data {
                    id
                    attributes {
                      url
                      name
                    }
                  }
                }
                a_create_references(publicationState: PREVIEW) {
                  data {
                    id
                    attributes {
                      referencia
                      Composition {
                        typeproduct {
                          data {
                            attributes {
                              name
                            }
                          }
                        }
                      }
                      silhouette {
                        data {
                          id
                          attributes {
                            url
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            meta {
              pagination {
                page
                pageSize
                total
                pageCount
              }
            }
          }
       }
      `,
    }),
  })

  const pagesData = await pagesRes.json()
  console.log("PAGES DATA FILTERED")
  console.log(pagesData)
  // Make sure we found something, otherwise return null
  if (pagesData.data?.combinations == null || pagesData.data.combinations.length === 0) {
    return null
  }
  //console.log(pagesData.data.combinations.data)
  // Return the first item since there should only be one result per slug
  return pagesData.data
}

export async function getLastCollection() {
  const gqlEndpoint = getStrapiURL("/graphql");
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query {
          collections(
            sort:"id:desc"
            pagination:{limit:1}
          ){
            data{
              id
              attributes{
                name
                prefix_id
                collection_type{data{attributes{prefix_id name}}}
              }
            }
          }
       }
      `
    }),
  });

  const pagesData = await pagesRes.json();

  // Make sure we found something, otherwise return null
  if (pagesData.data?.collections == null || pagesData.data.collections.length === 0) {
    return null;
  }
  // Return the first item since there should only be one result per slug
  return pagesData.data;
}