import {useEffect } from "react"; 
import { BasicTasks } from "utils/Provider/BasicProvider";
import { useTasks } from "utils/ProviderContext";
import { getStrapiURL } from "utils/api";  
import { Document, Text, Page, View, Image, StyleSheet } from '@react-pdf/renderer';


const ReporViewer = ({CaptureR, NameCollection, ItemSelectTheme, ItemSelectGender, ItemSelectProduct }) => {

    const { ReferenceMap} = useTasks();
    const { doReportCapture  } = BasicTasks();

       const styles = StyleSheet.create({
        body: {
          paddingTop:35,
          paddingBottom:65,
          paddingHorizontal: 35
        },
        page: {
          display: "flex",
          flexDirection: 'row',           
          padding: 2,
          margin:20
        },
        subpage: {
          display: "flex",
          flexDirection: 'row',         
          justifyContent: "center",
          padding: 2,
          marginTop:0
        },
        section: {
          display: "flex",
          justifyContent: "space-around",
          margin: 0,
          padding: 2,
          flexGrow: 1,
          marginTop:40
          
        },
        image: {
          width: 150,
          height: 200,
      },
      layout: {
       
        position:'relative',
        fontSize:20,
        right:10,
        color:'grey',
        textAlign:"right",     
    },
    text: {
      color: '#228b22',
     
      marginTop:1,
  }
      });
      
     
 return (  
    
  <>    

   <Document pageMode={'useAttachments'} >   
    <Page wrap size="A4" style={styles.body}> 
            
          <Text style={styles.layout} render={({ pageNumber, totalPages }) => (
                      `${ItemSelectTheme ? ItemSelectTheme : ''} 
                      ${ItemSelectProduct ? ItemSelectProduct :'' }  `
                    )} fixed />

           <Text style={styles.layout} render={({ pageNumber, totalPages }) => (
                      `
                      ${ItemSelectGender ? ItemSelectGender : ''}  ${pageNumber} / ${totalPages}`
                    )} fixed />
      
    <View style={styles.subpage}>    
    
              {CaptureR?.map((el, ind) => (       
                
                <View >
                  
                    { el.map((item, index) => (
                        
                      <View  >

                        <View  style={styles.section}>
                          <Image
                            src={getStrapiURL(item.url)}
                            style={styles.image}
                              />

                          </View>

                        </View>
                      )) }
              
                  </View>
              ))}  
          </View>
    </Page>
  </Document>      
   


  </>
   
  )
}

export default ReporViewer