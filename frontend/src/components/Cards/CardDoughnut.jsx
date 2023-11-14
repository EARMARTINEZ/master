import {useEffect } from "react"; 
import {Chart} from "chart.js";


export const CardDoughnut = () => {       

  useEffect(() => {
                let ctx = document.getElementById("doughnut-chart").getContext("2d");              
                let data = {
                  labels:['Next.js', 'Node.js' ,'Flutter','GraphQL'],              
                  
               
                  datasets: [
                    {
                   
                    barPercentage: 0.5,
                    barThickness: 8,              
                    data: [50, 50, 50, 50],
                    fill: false,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(54, 162, 235, 0.2)',                      
                      'rgba(75, 192, 192, 0.2)',
                     
                     
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(54, 162, 235, 1)',                      
                      'rgba(75, 192, 192, 1)',
                     
                    
                    ],
                    borderWidth: 1,
                   
                  },
                  {
                
                    barPercentage: 0.5,
                    barThickness: 8,                   
                    data: [50, 50, 50, 50, 50],
                    fill: false,
                    backgroundColor: [
                      'rgba(341, 192, 192, 0.2)',
                      'rgba(341, 192, 192, 0.2)',            
                      'rgba(341, 192, 192, 0.2)',
                      'rgba(341, 192, 192, 0.2)',
                      'rgba(341, 192, 192, 0.2)',
                     
                    ],
                    borderColor: [
                      '#7b869d',
                      '7b869d',               
                      '7b869d',
                      '7b869d',
                      '7b869d',
                    
                    ],
                    borderWidth: 1,
                 
                  }, 
                             
                ],
                }
                Chart.defaults.global.defaultFontSize = 16;
                window.myBar =new Chart(ctx, {
                    type: 'doughnut',
                    data: data,                    
                    width:400,
                    height:100,
                    options: {
                      legend: {
                          labels: {                             
                              fontColor: '#7b869d',
                            
                           
                          }
                      }
                  }
                });      
    
   
              }, []);
   
      return (
        <>
 
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-1 lg:px-8 xl:gap-x-16 xl:px-1">
            <div className="py- sm:px- lg:relative lg:px-0 lg:py-6 ">      
              <canvas id="doughnut-chart"  ></canvas>            
            </div>
          </div>
     
        </>

);
  }
  
 